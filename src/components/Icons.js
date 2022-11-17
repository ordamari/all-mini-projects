import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'

export function Icons({
    icon
}) {
    switch (icon) {
        case 'add':
            return <FontAwesomeIcon icon={fa.faAdd} />
        case 'inc':
            return <FontAwesomeIcon icon={fa.faMinus} />
        case 'scroll':
            return <FontAwesomeIcon icon={fa.faScroll} />
        case 'computer-mouse':
            return <FontAwesomeIcon icon={fa.faComputerMouse} />
        case 'components':
            return <FontAwesomeIcon icon={fa.faShapes} />
        case 'menu':
            return <FontAwesomeIcon icon={fa.faBars} />
        case 'table':
            return <FontAwesomeIcon icon={fa.faTable} />
        case 'arrow-up':
            return <FontAwesomeIcon icon={fa.faAngleUp} />
        case 'arrow-down':
            return <FontAwesomeIcon icon={fa.faAngleDown} />
        case 'error':
            return <FontAwesomeIcon icon={fa.faShield} />
        case 'warning':
            return <FontAwesomeIcon icon={fa.faTriangleExclamation} />
        case 'info':
            return <FontAwesomeIcon icon={fa.faCircleInfo} />
        case 'success':
            return <FontAwesomeIcon icon={fa.faSquareCheck} />
        case 'bell':
            return <FontAwesomeIcon icon={fa.faBell} />
        case 'fire':
            return <FontAwesomeIcon icon={fa.faFire} />
        case 'close':
            return <FontAwesomeIcon icon={fa.faXmark} />
        case 'controls':
            return <FontAwesomeIcon icon={fa.faGamepad} />
        case 'input':
            return <FontAwesomeIcon icon={fa.faKeyboard} />
        case 'picker':
            return <FontAwesomeIcon icon={fa.faCrosshairs} />
        case 'arrow-right':
            return <FontAwesomeIcon icon={fa.faAngleRight} />
        case 'arrow-left':
            return <FontAwesomeIcon icon={fa.faAngleLeft} />
        case 'double-arrow-right':
            return <FontAwesomeIcon icon={fa.faAngleDoubleRight} />
        case 'double-arrow-left':
            return <FontAwesomeIcon icon={fa.faAngleDoubleLeft} />
        case 'dropdown':
            return <FontAwesomeIcon icon={fa.faCaretDown} />
        case 'calendar':
            return <FontAwesomeIcon icon={fa.faCalendar} />
        case 'calendar-range':
            return <FontAwesomeIcon icon={fa.faCalendarWeek} />
        case 'time':
            return <FontAwesomeIcon icon={fa.faClock} />
        case 'button':
            return <FontAwesomeIcon icon={fa.faHandPointer} />
        case 'image':
            return <FontAwesomeIcon icon={fa.faImage} />
        case 'app':
            return <FontAwesomeIcon icon={fa.faLaptop} />
        case 'video':
            return <FontAwesomeIcon icon={fa.faPlay} />
        case 'carrousel':
            return <FontAwesomeIcon icon={fa.faArrowRightArrowLeft} />
        case 'dowloand':
            return <FontAwesomeIcon icon={fa.faDownload} />
        case 'settings':
            return <FontAwesomeIcon icon={fa.faGear} />
        case 'accordion':
            return <FontAwesomeIcon icon={fa.faList} />
        case 'styledScrollbar':
            return <FontAwesomeIcon icon={fa.faUpDown} />
        default:
            return <FontAwesomeIcon icon={fa.faQuestion} />
    }
}