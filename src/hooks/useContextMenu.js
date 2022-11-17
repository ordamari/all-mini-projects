import { useEffect, useState } from "react";

export function useContextMenu() {

    const [isShowContextMenu, setIsShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 })

    const openContextMenu = (ev) => {
        ev.preventDefault();
        setIsShowContextMenu(true);
        setContextMenuPosition({ top: ev.pageY, left: ev.pageX })
    }

    useEffect(() => {
        const handleClick = () => setIsShowContextMenu(false)
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [])

    return {
        contextMenuPosition,
        isShowContextMenu,
        contextMenuHandler: openContextMenu
    }
}