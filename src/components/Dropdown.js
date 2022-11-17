import { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import useEventListener from "../hooks/useEventListener";
import { useToggle } from "../hooks/useToggle"
import { Icons } from "./Icons";

export function Dropdown({
    icon = 'dropdown',
    text = '',
    children
}) {

    const containerRef = useRef()
    const dropdownRef = useRef()
    const [isOpen, toggleIsOpen] = useToggle();
    useClickOutside(containerRef, () => { toggleIsOpen(false) })

    const [style, setStyle] = useState({
        left: 0,
        right: 'unset',
        top: '100%',
        bottom: 'unset',
        transformOrigin: 'top left'
    })

    const updateStyle = () => {
        if (dropdownRef.current && isOpen) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const width = dropdownRef.current.offsetWidth
            const height = dropdownRef.current.offsetHeight
            if (rect.x + width > window.innerWidth) {
                setStyle(prev => ({ ...prev, right: 0, left: 'unset' }))
            } else {
                setStyle(prev => ({ ...prev, left: 0, right: 'unset' }))
            }
            if (rect.y + height > window.innerHeight) {
                setStyle(prev => ({ ...prev, top: 'unset', bottom: '100%' }))
            } else {
                setStyle(prev => ({ ...prev, bottom: 'unset', top: '100%' }))
            }
            const transformOrigin = `${(rect.y + height > window.innerHeight) ? 'bottom' : 'top'} ${(rect.x + width > window.innerWidth) ? 'right' : 'left'}`
            setStyle(prev => ({ ...prev, transformOrigin: transformOrigin }))
        }
    }

    useEffect(() => {
        updateStyle();
    }, [dropdownRef, isOpen])

    return (

        <div ref={containerRef} className="dropdown-container">
            <button
                className="toggele-dropdown-button"
                onClick={() => toggleIsOpen()}
            >
                <Icons icon={icon} />
                {
                    text &&
                    <span className="text" >{text}</span>
                }
            </button>
            <div style={style} ref={dropdownRef} className={`dropdown flex column ${isOpen ? 'open' : 'close'}`}>
                {children}
            </div>
        </div>
    )

}