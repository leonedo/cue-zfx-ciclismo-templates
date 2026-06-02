// version 2.0 - multi-stage model
//  created by cuecore systems - https://www.cuecoresystems.com/
// 

let isOn = false;
let framesMilliseconds;
let fontsLoaded = false;
let animLoaded = false;
let animElementsLength;
let markers = {};

// Multi-stage state
let stages = [];
let multiStageMode = false;
let currentStageIndex = null;
let exitStage = false;
let pendingReturnToStage = null;

let animContainer = document.getElementById('bm');
let anim = null;

const addFont = (fam, path) => {
    const newFont = document.createElement('style');
    newFont.appendChild(document.createTextNode(`\
    @font-face {\
        font-family: ${fam};\
        src: url('${path}');\
    }\
    `));
    document.head.appendChild(newFont);
};

// Pre-fetch the JSON so we can normalize markers (object payload -> stringified cm)
// before Lottie parses them. Lottie only reads `cm` to populate `marker.payload`,
// so the user's tool can emit either the legacy stringified-cm form or a clean
// `{ ..., payload: { name, type, order, update? } }` object.
const animPromise = new Promise((resolve, reject) => {
    console.log('loading ' + data_file);
    fetch(data_file)
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(json => {
            if (json.markers) {
                json.markers.forEach(m => {
                    if (m.payload && typeof m.payload === 'object') {
                        m.cm = JSON.stringify(m.payload);
                    }
                });
            }

            // Match the path resolution Lottie used to do internally with `path:`,
            // so external image assets in the Lottie keep resolving correctly.
            const assetsPath = data_file.substring(0, data_file.lastIndexOf('/') + 1);

            anim = lottie.loadAnimation({
                container: animContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: json,
                assetsPath
            });

            // With animationData, config_ready fires synchronously inside loadAnimation
            // (no fetch to wait for), so we'd miss it if we attached a listener now.
            // Run the setup explicitly instead — all the data is already available.
            setupStagesAndFonts();
            attachAnimListeners();

            anim.addEventListener('DOMLoaded', () => {
                animLoaded = true;
                resolve('Animation ready to play');
            });
            anim.addEventListener('data_failed', () => {
                console.error('[Lottie] failed to load:', data_file);
                reject(new Error(`Lottie load failed: ${data_file}`));
            });
        })
        .catch(err => {
            console.error('[Lottie] failed to fetch JSON:', data_file, err);
            reject(err);
        });
});

function setupStagesAndFonts() {
    framesMilliseconds = 1000 / anim.renderer.data.fr;

    if (anim.markers) {
        anim.markers.forEach(m => {
            if (m.payload && m.payload.name) {
                markers[m.payload.name] = m;
            }
        });
    }

    stages = (anim.markers || [])
        .filter(m => m.payload && m.payload.type && m.payload.order != null)
        .map(m => ({
            name: m.payload.name,
            type: m.payload.type,
            order: Number(m.payload.order),
            time: m.time,
            duration: m.duration,
            update: m.payload.update || null,
            updateDelay: Number(m.payload.updateDelay || 0),
            stop: m.payload.stop || null
        }))
        .sort((a, b) => a.order - b.order);

    multiStageMode = stages.length > 0;

    if (!fontsLoaded && anim.renderer.data.fonts) {
        const fonts = anim.renderer.data.fonts.list;
        for (const font in fonts) {
            const family = fonts[font].fFamily;
            const fontPath = fonts[font].fPath;
            if (fontPath !== '') addFont(family, fontPath);
        }
        fontsLoaded = true;
    }
}

function attachAnimListeners() {
    anim.addEventListener('complete', completeHandler);
    anim.addEventListener('enterFrame', enterFrameHandler);
}

// Resolves and triggers an update marker animation when the anim is paused.
// Returns the ms delay before the caller should apply text replacement
// (0 if no update was triggered). Used by both the data handler and the clock
// — without an animation, layers with in/out points outside the current frame
// won't repaint via renderFrame alone.
function triggerUpdateAnim() {
    if (!anim || !anim.isPaused) return 0;

    let updateName = null;
    let pendingStage = null;
    let delay = 0;
    let useSegments = false;

    if (currentStageIndex !== null) {
        const stage = stages[currentStageIndex];
        if (stage.update && markers[stage.update]) updateName = stage.update;
        else if (markers['update']) updateName = 'update';
        if (updateName) {
            pendingStage = stage.name;
            delay = stage.updateDelay;
        }
    } else if (markers['update']) {
        updateName = 'update';
        useSegments = true;
    }

    if (!updateName) return 0;

    exitStage = true;
    pendingReturnToStage = pendingStage;
    currentStageIndex = null;
    if (useSegments) {
        const m = markers[updateName];
        anim.playSegments([m.time, m.time + m.duration], true);
    } else {
        anim.goToAndPlay(updateName, true);
    }
    return framesMilliseconds * delay;
}

webcg.on('data', function (data) {
    console.log('data from casparcg received');
    console.log(JSON.stringify(data, null, 2));

    animPromise.then(resolve => {
        // Colors and opacity are CSS-only — apply immediately, no animation
        // needed. Inside the promise so we don't lose them if anim takes
        // longer than the retry window to load.
        for (const key in data) {
            if (key.toLowerCase().includes('color')) checkandcolor(key, data[key]);
            if (key.toLowerCase().includes('opacidad')) checkandupdate(key, data[key]);
        }

        // Only trigger an update animation if the anim is currently frozen.
        // If it's playing (loop, transition, or an update already running),
        // do silent replacement — the next rendered frame will show the change.
        const updateTiming = triggerUpdateAnim();

        animElementsLength = anim.renderer.elements.length;
        console.log(resolve);

        setTimeout(() => {
            for (let i = 0; i < animElementsLength; i++) {
                let animElement = anim.renderer.elements[i];
                if (
                    animElement.hasOwnProperty('data') && animElement.data.hasOwnProperty('cl') &&
                    data && data.hasOwnProperty(animElement.data.cl)
                ) {
                    let cl = animElement.data.cl;
                    let newPath;

                    if (animElement.data.hasOwnProperty('refId') && animElement.data.refId.includes('image')) {
                        newPath = data[cl] ? data[cl].text || data[cl] : '';
                        const group = document.querySelector(`g.${cl}`);
                        const image = group ? group.querySelector('image') : null;

                        if (image) {
                            image.setAttribute('href', newPath);
                        }
                    } else {
                        try {
                            animElement.canResizeFont(true);
                            animElement.updateDocumentData({
                                t: data[cl] ? data[cl].text || data[cl] : ''
                            }, 0);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            }
            // Force a repaint if paused — silent text/image replacements are
            // otherwise invisible until the renderer ticks again.
            if (anim.isPaused) anim.renderer.renderFrame(null);
        }, updateTiming);
    }).catch(error => console.error(error));
});

function completeHandler() {
    if (pendingReturnToStage) {
        const stageName = pendingReturnToStage;
        pendingReturnToStage = null;
        const idx = stages.findIndex(s => s.name === stageName);
        if (idx === -1) return;
        const s = stages[idx];

        // Restore stage tracking so the next data still triggers the update.
        currentStageIndex = idx;
        exitStage = false;

        if (s.type === 'pause') {
            // Stay at the end of the update segment; pause to avoid Lottie
            // continuing forward through the rest of the timeline.
            anim.pause();
        } else if (s.type === 'loop') {
            // Re-enter the loop from its start.
            anim.goToAndPlay(s.name, true);
        }
        return;
    }

    // Fallback: a loop stage's segment ended naturally without enterFrame
    // catching tm+dr-0.5 in time (low framerate or skipped frame). Without
    // this, the loop dies silently. Skip if we're exiting on purpose (next).
    if (
        multiStageMode &&
        isOn &&
        !exitStage &&
        currentStageIndex !== null &&
        stages[currentStageIndex] &&
        stages[currentStageIndex].type === 'loop'
    ) {
        anim.goToAndPlay(stages[currentStageIndex].name, true);
        return;
    }
    // Otherwise: animation rests at final frame, waiting for goto/next/stop from operator.
}


// Custom methods

function update_color(campo, color) {
    document.querySelectorAll(`.${campo}`).forEach(el => {
        el.style.setProperty('fill', color);
    });
}

function update_opacidad(campo, value) {
    document.querySelectorAll(`.${campo}`).forEach(el => {
        el.style.setProperty('opacity', value);
    });
}

function normalizeValue(v) {
    return (typeof v === 'object' && v !== null && 'text' in v) ? v.text : v;
}

function checkandcolor(item, colorData, retries = 20) {
    const color = normalizeValue(colorData);
    if (itemExists(item)) {
        update_color(item, color);
    } else if (retries > 0) {
        setTimeout(() => checkandcolor(item, colorData, retries - 1), 100);
    } else {
        console.log(`[checkandcolor] element not found: ${item}`);
    }
}

function checkandupdate(item, valueData, retries = 20) {
    const value = normalizeValue(valueData);
    if (itemExists(item)) {
        update_opacidad(item, value);
    } else if (retries > 0) {
        setTimeout(() => checkandupdate(item, valueData, retries - 1), 100);
    } else {
        console.log(`[checkandupdate] element not found: ${item}`);
    }
}

function itemExists(item) {
    return document.querySelector(`.${item}`) !== null;
}


// CasparCG control

webcg.on('startclock', () => startClock());
webcg.on('stopclock', () => stopClock());

webcg.on('play', function () {
    animPromise.then(() => {
        console.log('play');
        resetSfxPlayed();
        currentStageIndex = null;
        exitStage = false;
        pendingReturnToStage = null;
        anim.goToAndPlay('play', true);
        isOn = true;
    }).catch(error => console.error(error));
});

webcg.on('stop', function () {
    if (!anim) return;
    console.log('stop');

    // Per-stage custom stop: if the active stage declares stop: "<marker>"
    // and that marker exists, play it as a self-contained segment.
    let customStop = null;
    if (multiStageMode && currentStageIndex !== null) {
        const s = stages[currentStageIndex];
        if (s.stop) {
            customStop = markers[s.stop] || null;
            if (!customStop) {
                console.warn(`[stop] custom stop marker not found: ${s.stop}, falling back to global stop`);
            }
        }
    }

    currentStageIndex = null;
    exitStage = false;
    pendingReturnToStage = null;

    if (customStop) {
        // playSegments keeps the custom stop self-contained — animation pauses
        // at the end of the segment instead of continuing past it.
        anim.playSegments([customStop.time, customStop.time + customStop.duration], true);
    } else {
        anim.goToAndPlay('stop', true);
    }

    isOn = false;
});

webcg.on('next', function () {
    if (!anim || !multiStageMode || currentStageIndex === null) {
        console.warn('[next] no active stage');
        return;
    }
    const nextStage = stages[currentStageIndex + 1];
    if (!nextStage) {
        console.warn('[next] no next stage');
        return;
    }
    currentStageIndex = null;
    exitStage = false;
    pendingReturnToStage = null;
    anim.goToAndPlay(nextStage.name, true);
});

webcg.on('goto', function (stageName) {
    if (!anim || !multiStageMode) {
        console.warn('[goto] no stages defined');
        return;
    }
    if (!stages.find(s => s.name === stageName)) {
        console.warn(`[goto] no stage named: ${stageName}`);
        return;
    }
    currentStageIndex = null;
    exitStage = false;
    pendingReturnToStage = null;
    anim.goToAndPlay(stageName, true);
});

webcg.on('playAnimation', function (animationName) {
    if (!anim) return;
    console.log('playAnimation ' + animationName);
    anim.goToAndPlay(animationName, true);
});


// SFX + stage tracking on each frame
let sfxPlayedFlags = [];

function resetSfxPlayed() {
    const clips = (typeof audio_clips !== 'undefined' && Array.isArray(audio_clips)) ? audio_clips : [];
    sfxPlayedFlags = clips.map(() => false);
}

function enterFrameHandler(e) {
    // e.currentTime is relative to anim.firstFrame; markers use absolute frames.
    const absFrame = e.currentTime + anim.firstFrame;

    // SFX one-shot per clip
    if (typeof audio_clips !== 'undefined' && Array.isArray(audio_clips)) {
        for (let i = 0; i < audio_clips.length; i++) {
            const clip = audio_clips[i];
            if (!clip) continue;
            const inframe = Number(clip.inframe);
            if (!Number.isFinite(inframe)) continue;
            if (absFrame >= inframe && !sfxPlayedFlags[i]) {
                const audio = document.getElementById('sfx_' + i);
                if (audio) {
                    audio.volume = 1.0;
                    audio.currentTime = 0;
                    audio.play();
                    sfxPlayedFlags[i] = true;
                }
            }
        }
    }

    // Stage tracking
    if (!multiStageMode || !isOn) return;

    // Release stage tracking if we've moved outside the current stage's range
    // (e.g. after playAnimation jumped us elsewhere, or after exit-and-expand).
    if (currentStageIndex !== null) {
        const cs = stages[currentStageIndex];
        if (absFrame < cs.time || absFrame >= cs.time + Math.max(cs.duration, 1)) {
            currentStageIndex = null;
        }
    }

    // Entry detection: latch onto the stage whose range we're now in
    if (currentStageIndex === null) {
        for (let i = 0; i < stages.length; i++) {
            const s = stages[i];
            if (absFrame >= s.time && absFrame < s.time + Math.max(s.duration, 1)) {
                currentStageIndex = i;
                exitStage = false;
                // We're now anchored in a real stage — drop any pending "return
                // to original stage" intent left over from an update marker
                // playback that transitioned us here.
                pendingReturnToStage = null;
                break;
            }
        }
    }

    // Action at end of segment (tm + dr)
    if (currentStageIndex !== null) {
        const s = stages[currentStageIndex];
        if (absFrame >= s.time + s.duration - 0.5) {
            if (exitStage) {
                currentStageIndex = null;
                // Expand segment so animation can continue past tm+dr toward next stage / end of timeline
                anim.playSegments([absFrame, anim.animationData.op], true);
            } else if (s.type === 'loop') {
                anim.goToAndPlay(s.name, true);
            } else if (s.type === 'pause') {
                anim.pause();
            }
        }
    }
}


// Clock and date
const ENABLE_CLOCK = window.ENABLE_CLOCK === true;
const CLOCK_SECONDS = window.CLOCK_SECONDS === true;
let clockInterval = null;
let clockTimeout = null;
let clockEnabled = false;

const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    ...(CLOCK_SECONDS && { second: '2-digit' }),
    hour12: true
});

const dateFormatter = new Intl.DateTimeFormat('es-DO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

function updateLottieText(className, text) {
    if (!anim || !anim.renderer) return;
    for (let i = 0; i < anim.renderer.elements.length; i++) {
        const el = anim.renderer.elements[i];
        if (
            el.data &&
            el.data.cl === className &&
            typeof el.updateDocumentData === 'function'
        ) {
            try {
                el.canResizeFont(true);
                el.updateDocumentData({ t: text }, 0);
            } catch (e) {
                console.log('[Clock] Failed to update', className, e);
            }
            return;
        }
    }
}

function updateClock() {
    const now = new Date();
    updateLottieText('time', timeFormatter.format(now));
    updateLottieText('date', dateFormatter.format(now));

    // Don't disturb the graphic visually if it's not on air (before first play
    // or after stop). The text data is still updated in memory; next play will
    // pick up the latest values when the clock layer enters its visible range.
    if (!isOn) return;
    if (!anim || !anim.isPaused) return;

    // Anim paused mid-flow → try to play an update marker so the renderer
    // re-renders the time/date layer (covers layers with in/out ranges).
    triggerUpdateAnim();
    // No update marker available → best-effort renderFrame (only works if
    // the layer is currently in its visible range).
    if (anim.isPaused) anim.renderer.renderFrame(null);
}

function startClock() {
    if (clockEnabled) return;

    clockEnabled = true;
    updateClock();

    // Align first tick to next second/minute boundary so the displayed
    // value never lags more than a few ms behind real time.
    const intervalMs = CLOCK_SECONDS ? 1000 : 60 * 1000;
    const msUntilNextTick = intervalMs - (Date.now() % intervalMs);

    clockTimeout = setTimeout(() => {
        clockTimeout = null;
        if (!clockEnabled) return;
        updateClock();
        clockInterval = setInterval(updateClock, intervalMs);
    }, msUntilNextTick);
}

function stopClock() {
    clockEnabled = false;

    if (clockTimeout) {
        clearTimeout(clockTimeout);
        clockTimeout = null;
    }
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }

    updateLottieText('time', '');
    updateLottieText('date', '');
}

animPromise.then(() => {
    if (ENABLE_CLOCK) startClock();
}).catch(error => console.error(error));
