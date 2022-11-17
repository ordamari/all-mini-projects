import { useEffect, useRef, useState } from "react";

export function ContextMenu({
    children,
    isShowContextMenu,
    position
}) {

    const [style, setStyle] = useState({});
    const contextMenuRef = useRef();


    useEffect(() => {
        let left = position?.left;
        let right = 'unset';
        let top = position?.top;
        let bottom = 'unset';
        let transformOriginVertical = 'top';
        let transformOriginHorizontal = 'left';

        if (position?.left + contextMenuRef.current?.offsetWidth > window.innerWidth) {
            left = 'unset'
            right = window.innerWidth - position?.left;
            transformOriginHorizontal = 'right';
        }

        if (position?.top + contextMenuRef.current?.offsetHeight > window.innerHeight) {
            top = 'unset'
            bottom = window.innerHeight - position?.top;
            transformOriginVertical = 'bottom';
        }

        setStyle({
            top: top === 'unset' ? top : `${top}px`,
            bottom: bottom === 'unset' ? bottom : `${bottom}px`,
            left: left === 'unset' ? left : `${left}px`,
            right: right === 'unset' ? right : `${right}px`,
            transformOrigin: `${transformOriginVertical} ${transformOriginHorizontal}`
        })
    }, [position, contextMenuRef])

    if (!isShowContextMenu) return null;

    return (
        <div
            style={style}
            className="context-menu-container"
            ref={contextMenuRef}
        >
            {
                isShowContextMenu && children
            }
        </div >
    )
}