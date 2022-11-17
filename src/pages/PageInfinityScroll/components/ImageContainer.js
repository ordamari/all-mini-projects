import { useEffect } from "react"
import { Icons } from "../../../components/Icons";
import { useToggle } from "../../../hooks/useToggle";

export function ImageContainer({
    src,
    thumbSrc,
    aspectRatio,
    alt = ""
}) {

    const [isShowFullScreen, toggleIsShowFullScreen] = useToggle();

    const imageStyle = {
        aspectRatio: aspectRatio,
        backgroundImage: `url(${thumbSrc})`,
        backgroundSize: 'cover',
        width: "100%",
    }

    return (
        <div
            className="flex-center container-box image-container"
        >

            <img
                style={imageStyle}
                src={src}
                alt={alt}
                onClick={() => toggleIsShowFullScreen(true)}
            />

            {
                isShowFullScreen &&
                <div className='full-screen-image' >
                    <div className="close-btn" >
                        <div onClick={() => toggleIsShowFullScreen(false)} >
                            <Icons icon='close' />
                        </div>
                        <img
                            src={src}
                            alt={alt}
                            onClick={() => toggleIsShowFullScreen(true)}
                        />
                    </div>
                </div>
            }
        </div>
    )
}