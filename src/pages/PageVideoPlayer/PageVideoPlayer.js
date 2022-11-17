import videoSrc from '../../assets/videos/video.mp4'
import { VideoPlayer } from '../../components/VideoPlayer'

export function PageVideoPlayer() {
    return (
        <div
            className="video-player-page page flex column gap-1"
        >
            <VideoPlayer
                src={videoSrc}
            />
        </div>
    )
}