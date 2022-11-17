import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";

export function Carrousel({
    children,
    elementsLength,
    rowLength,
    aspectRatio = [1, 1],
}) {

    const [page, setPage] = useState(0);
    const carrouselContainerRef = useRef();
    const isNextDisabled = Math.ceil(elementsLength / rowLength) <= page + 1
    const isPrevDisabled = page === 0

    useEffect(() => {
        carrouselContainerRef.current.style.setProperty('--carrousel-item-in-row', rowLength);
    }, [carrouselContainerRef, rowLength])

    useEffect(() => {
        carrouselContainerRef.current.style.setProperty('--carrousel-item-aspect-ratio', `${aspectRatio[0]}/${aspectRatio[1]}`);
    }, [carrouselContainerRef, aspectRatio])

    useEffect(() => {
        carrouselContainerRef.current.style.setProperty('--carrousel-page', page);
    }, [page, carrouselContainerRef])

    return (
        <div
            ref={carrouselContainerRef}
            className="carrousel-container"
        >
            <div className="arrows-container">
                <button
                    className="arrow"
                    disabled={isPrevDisabled}
                    onClick={() => { setPage(prev => prev - 1) }}
                >
                    <Icons icon="arrow-left" />
                </button>
                <button
                    className="arrow"
                    disabled={isNextDisabled}
                    onClick={() => { setPage(prev => prev + 1) }}
                >
                    <Icons icon="arrow-right" />
                </button>
            </div>
            <div className="carrousel">
                {children}
            </div>
        </div>
    )
}