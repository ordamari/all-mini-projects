import { useToggle } from "../hooks/useToggle"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";
import useEventListener from "../hooks/useEventListener";
import { timeService } from "../services/timeService";

export function VideoPlayer({
    src,
    closedCaptionSrc = '',
    srcLang = 'en',
    previewImages = []
}) {



    const [isPlayed, toggleIsPlayed] = useToggle();
    const [isWasPaused, toggleIsWasPaused] = useToggle();
    const [isFullScreen, toggleIsFullScreen] = useToggle();
    const [isScrubbing, toggleIsScrubbing] = useToggle();
    const [isTheaterMode, toggleIsTheaterMode] = useToggle();
    const [isMiniPlayer, toggleIsMiniPlayer] = useToggle();
    const [isShowCaption, toggleIsShowCaption] = useToggle();
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [totalTime, setTotalTime] = useState('');
    const [previewImageSrc, setPreviewImageSrc] = useState('')
    const videoRef = useRef();
    const containerRef = useRef();
    useEventListener('keydown', (e) => { onKeyDown(e) })
    useEventListener('mouseup', (e) => { if (isScrubbing) updateIsScrubbing(e) })
    useEventListener('mousemove', (e) => { if (isScrubbing) handleTimeLineUpdate(e) })


    const onKeyDown = (e) => {
        const tagName = document.activeElement.tagName.toLowerCase()
        if (tagName === 'input') return;
        switch (e.key.toLowerCase()) {
            case ' ':
                if (tagName === 'button') return;
            case 'k':
                togglePlay();
                break;
            case 'f':
                toggleFullScreenMode();
                break;
            case 't':
                toggleIsTheaterMode();
                break;
            case 'i':
                toggleMiniPlayerMode();
                break;
            case 'm':
                toggleMute();
                break;
            case 'arrowleft':
            case 'j':
                skip(-5);
                break;
            case 'arrowright':
            case 'l':
                skip(5);
                break;
            case 'c':
                toggleCaption();
                break;

            default:
                break;
        }
    }

    const togglePlay = () => {
        if (!videoRef) return;
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }

    const toggleFullScreenMode = () => {
        toggleIsFullScreen()
        if (document.fullscreenElement == null) {
            if (containerRef) containerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    const toggleMiniPlayerMode = () => {
        if (isMiniPlayer) {
            document.exitPictureInPicture();
        } else {
            if (videoRef) videoRef.current.requestPictureInPicture();
        }
        toggleIsMiniPlayer();
    }

    const toggleMute = () => {
        setVolume(prev => (prev > 0) ? 0 : 1)
    }

    const updateTotalTime = (e) => {
        const time = e.target.duration
        setTotalTime(timeService.formatDuration(time))
    }

    const updateCurrentTime = (e) => {
        const time = e.target.currentTime
        const precent = e.target.currentTime / e.target.duration
        containerRef.current.style.setProperty('--progress-position', precent)
        setCurrentTime(timeService.formatDuration(time))

    }

    const updateIsScrubbing = (e) => {
        const rect = e.target.getBoundingClientRect();
        const precent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
        const isCurrScrubbing = (e.buttons & 1) === 1
        toggleIsScrubbing(isCurrScrubbing)
        if (isCurrScrubbing) {
            toggleIsWasPaused(videoRef.current.paused)
            videoRef.current.pause();
        } else {
            videoRef.current.currentTime = precent * videoRef.current.duration
            if (!isWasPaused) videoRef.current.play();
        }
        handleTimeLineUpdate(e)
    }

    const skip = (duration) => {
        videoRef.current.currentTime += duration;

    }

    const toggleCaption = () => {
        if (!videoRef || !closedCaptionSrc) return;
        videoRef.current.textTracks[0].mode = isShowCaption ? 'hidden' : 'showing';
        toggleIsShowCaption();
    }

    const changePlaybackSpeed = () => {
        if (!videoRef) return;
        const newPlaybackRate = (playbackRate === 2) ? 0.25 : playbackRate + 0.25
        videoRef.current.playbackRate = newPlaybackRate
        setPlaybackRate(newPlaybackRate)
    }

    const handleTimeLineUpdate = (e) => {
        if (!videoRef || !containerRef) return;
        const rect = e.target.getBoundingClientRect();
        const precent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
        if (previewImages.length) {
            const frameCountImage = videoRef.current.duration / previewImages.length
            const previewImgNumber = Math.max(1, Math.floor(precent * videoRef.current.duration / frameCountImage))
            setPreviewImageSrc(previewImages[previewImgNumber + 1])
        }

        containerRef.current.style.setProperty('--preview-position', precent)

        if (isScrubbing) {
            e.preventDefault();
            containerRef.current.style.setProperty('--progress-position', precent)
        }
    }


    useEffect(() => {
        if (!videoRef) return;
        videoRef.current.volume = volume;
    }, [volume])

    useEffect(() => {
        if (!videoRef || !closedCaptionSrc) return;
        videoRef.current.textTracks[0].mode = 'hidden';
    }, [videoRef])

    return (
        <div
            ref={containerRef}
            className={`video-container ${isPlayed ? 'played' : 'paused'
                } ${isTheaterMode ? 'theater' : 'default'
                } ${isScrubbing ? 'scrubbing' : ''}`}
        >
            {
                !!previewImages.length &&
                <img className="thumbnail-img" src={previewImageSrc} />
            }
            <div className="video-controls-container">
                <div
                    className="timeline-container"
                    onMouseMove={handleTimeLineUpdate}
                    onMouseDown={updateIsScrubbing}
                >
                    <div className="timeline">
                        {
                            !!previewImages.length &&

                            <img src={previewImageSrc} className="preview-img" />
                        }
                        <div className="thumb-indicator" />
                    </div>
                </div>
                <div className="controls">
                    <button onClick={togglePlay}>
                        <VideoPlayer.Icons icon={isPlayed ? 'pause' : 'play'} />
                    </button>
                    <div className="volume-container" >
                        <button onClick={toggleMute} >
                            {
                                !volume &&
                                <VideoPlayer.Icons icon='mute' />
                            }
                            {
                                volume >= 0.5 &&
                                <VideoPlayer.Icons icon='volume-high' />
                            }
                            {
                                volume < 0.5 &&
                                volume > 0 &&
                                <VideoPlayer.Icons icon='volume-low' />
                            }
                        </button>
                        <input
                            className="volume-slider"
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={volume}
                            onChange={({ target }) => { setVolume(+target.value) }}
                        />
                    </div>
                    <div className="duration-container">
                        <div className="current-time">{currentTime}</div>
                        <span>/</span>
                        <div className="total-time">{totalTime}</div>
                    </div>
                    {
                        closedCaptionSrc &&
                        <button onClick={() => { toggleCaption() }} className={`caption ${isShowCaption ? 'show' : ''}`} >
                            <VideoPlayer.Icons icon='caption' />
                        </button>
                    }
                    <button onClick={changePlaybackSpeed} className="wide" >
                        {playbackRate}x
                    </button>
                    <button onClick={toggleMiniPlayerMode} >
                        <VideoPlayer.Icons icon='mini-player' />
                    </button>
                    <button onClick={() => { toggleIsTheaterMode() }}>
                        <VideoPlayer.Icons icon={isTheaterMode ? 'default-mode' : 'theater-mode'} />
                    </button>
                    <button onClick={toggleFullScreenMode} >
                        <VideoPlayer.Icons icon={isFullScreen ? 'reg-screen' : 'full-screen'} />
                    </button>

                </div>
            </div>
            <video
                ref={videoRef}
                src={src}
                onPlay={() => toggleIsPlayed(true)}
                onPause={() => toggleIsPlayed(false)}
                onClick={togglePlay}
                onVolumeChange={() => { }}
                onLoadedData={updateTotalTime}
                onTimeUpdate={updateCurrentTime}
            >
                {
                    closedCaptionSrc &&
                    <track kind="captions" srcLang={srcLang} src={closedCaptionSrc} />
                }
            </video>
        </div >
    )
}

VideoPlayer.Icons = function VideoPlayerIcons({ icon }) {
    switch (icon) {
        case 'play':
            return <FontAwesomeIcon icon={fa.faPlay} />
        case 'pause':
            return <FontAwesomeIcon icon={fa.faPause} />
        case 'full-screen':
            return <FontAwesomeIcon icon={fa.faExpand} />
        case 'reg-screen':
            return <FontAwesomeIcon icon={fa.faCompress} />
        case 'volume-high':
            return <FontAwesomeIcon icon={fa.faVolumeHigh} />
        case 'volume-low':
            return <FontAwesomeIcon icon={fa.faVolumeLow} />
        case 'mute':
            return <FontAwesomeIcon icon={fa.faVolumeMute} />
        case 'caption':
            return <FontAwesomeIcon icon={fa.faClosedCaptioning} />
        case 'mini-player':
            return (
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M810.666667 469.333333H469.333333v255.786667h341.333334V469.333333z m170.666666 341.333334V212.48C981.333333 165.546667 942.933333 128 896 128H128C81.066667 128 42.666667 165.546667 42.666667 212.48V810.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h768c46.933333 0 85.333333-38.4 85.333333-85.333333z m-85.333333 0.853333H128V212.053333h768v599.466667z" />
                </svg>
            )
        case 'theater-mode':
            return (
                <svg
                    version="1.1"
                    viewBox="5 5 26 26"
                >
                    <path d="m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z" fillRule="evenodd"></path>
                </svg>
            )
        case 'default-mode':
            return (
                <svg version="1.1" viewBox="5 5 26 26">
                    <path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fillRule="evenodd"></path>
                </svg>
            )
        default:
            return <FontAwesomeIcon icon={fa.faQuestion} />
    }
}