import { Icons } from "./Icons"

export function Popup({
    onClose = () => { },
    isOpen,
    children
}) {

    return (
        <div onClick={onClose} className={`popup-container ${isOpen ? ' open' : 'close'}`}>
            <div onClick={(ev) => ev.stopPropagation()} className='popup'>
                {children}
            </div>
        </div>
    )
}

Popup.Header = function PopupHeader({ children, onClose = () => { } }) {
    return (
        <div className='popup-header'>
            {children}
            <div className='close-popup' onClick={onClose} >
                <Icons icon="close" />
            </div>
        </div>
    )
}

Popup.Body = function PopupBody({ children }) {
    return (
        <div className='popup-body'>
            {children}
        </div>
    )
}

Popup.Footer = function PopupFooter({ children }) {
    return (
        <div className='popup-footer'>
            {children}
        </div>
    )
}

