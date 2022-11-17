import { useEffect, useRef, useState } from "react"
import useEventListener from "../hooks/useEventListener";
import { useToggle } from "../hooks/useToggle";

export function StyledScrollbar({
    children
}) {

    const childrenRef = useRef();
    const ref = useRef();
    const trackRef = useRef();
    const resizeObserver = useRef(null);
    const [trackHeight, setTrakHight] = useState(0);
    const [isScrubbing, toggleIsScrubbing] = useToggle();
    const [isShowScroolbar, toggleIsShowScroolbar] = useToggle();
    useEventListener('mouseup', (e) => { if (isScrubbing) updateIsScrubbing(e) })
    useEventListener('mousemove', (e) => { if (isScrubbing) updateIsScrubbing(e) })

    useEffect(() => {
        if (!childrenRef.current) return;
        resizeObserver.current = new ResizeObserver(() => {
            if (!childrenRef || !ref) return;
            const rect = childrenRef.current.getBoundingClientRect();
            const scrolledHeight = childrenRef.current.scrollHeight;
            console.log(rect.height !== scrolledHeight);
            toggleIsShowScroolbar(rect.height !== scrolledHeight)
            const trackHeightPrecent = rect.height / scrolledHeight * 100
            setTrakHight(trackHeightPrecent)
            ref.current.style.setProperty('--track-height', `${trackHeightPrecent}%`);
        });
        resizeObserver.current.observe(childrenRef.current);
        return () => resizeObserver.current.disconnect(); // clean up 
    }, [childrenRef, ref, childrenRef.current])


    const onScroll = (ev) => {
        if (!trackRef) return;
        const scrollTopPrecent = calculateScrollTopPrecent();
        ref.current.style.setProperty('--scroll-top', `${scrollTopPrecent}%`);
    }

    const updateIsScrubbing = (ev) => {
        const mouseHightPrecent = calculateMousePositionPrecent(ev)
        const isCurrScrubbing = (ev.buttons & 1) === 1
        toggleIsScrubbing(isCurrScrubbing)
        if (isCurrScrubbing) {
            const mouseHight = (mouseHightPrecent - (trackHeight / 2)) * childrenRef.current.scrollHeight / 100
            childrenRef.current.scrollTop = mouseHight;
        }
    }

    const calculateMousePositionPrecent = (ev, rect) => {
        if (!childrenRef) return;
        if (!rect) rect = childrenRef.current.getBoundingClientRect();
        const clickHeight = ev.pageY - rect.top
        return clickHeight / rect.height * 100
    }

    const calculateScrollTopPrecent = () => {
        if (!childrenRef) return;
        const scrolledHeight = childrenRef.current.scrollHeight;
        return childrenRef.current.scrollTop / scrolledHeight * 100
    }


    return (
        <div ref={ref} className={`styled-scrollbar ${isShowScroolbar ? 'scrollbar-show' : ''}`} >
            <div
                className="scrollbar"
                onMouseDown={updateIsScrubbing}
            >
                <div
                    className="track"
                    ref={trackRef}
                />
            </div>
            <div
                ref={childrenRef}
                className="children"
                onScroll={onScroll}
            >
                {children}
            </div>
        </div>
    )
}