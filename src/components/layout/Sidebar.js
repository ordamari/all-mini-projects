import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import useTranslation from '../../hooks/useTranslation'
import { Icons } from '../Icons'

export function Sidebar({
    isSidebarOpen
}) {
    const { t } = useTranslation()

    const middleSidebarList = [
        {
            label: 'Home',
            icon: 'menu',
            to: '/home'
        },
        {
            label: 'Controls',
            icon: 'controls',
            to: '/controls'
        },
        {
            icon: 'scroll',
            to: '/infinityScroll',
            label: 'Infinity Scroll'
        },
        {
            icon: 'computer-mouse',
            to: '/contextMenu',
            label: 'Context Menu'
        },
        {
            icon: 'dropdown',
            to: '/dropdown',
            label: 'Dropdown'
        },
        {
            icon: 'table',
            to: '/table',
            label: 'Table'
        },
        {
            icon: 'bell',
            to: '/toastrNotification',
            label: 'Notification'
        },
        {
            icon: 'fire',
            to: '/popup',
            label: 'Popup'
        },
        {
            icon: 'video',
            to: '/video-player',
            label: 'Video Player'
        },
        {
            icon: 'carrousel',
            to: '/carrousel',
            label: 'Carrousel'
        },
        {
            icon: 'accordion',
            to: '/accordion',
            label: 'Accordion'
        },
        {
            icon: 'styledScrollbar',
            to: '/styledScrollbar',
            label: 'Styled scrollbar'
        },
    ]
    const bottomSidebarList = [
        {
            label: 'Settings',
            icon: 'settings',
            to: '/settings'
        },
    ]

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'close'}`}>
            <div className="top" >
                <NavLink to='/'>
                    <img
                        className='logo'
                        src={logo}
                        alt='logo'
                    />
                </NavLink>
                <span className='title' >{t('sidebar.title')}</span>
                <span className='text' >{t('sidebar.text')}</span>
            </div>
            <div className="middle" >
                <ul className='sidebar-list' >
                    {
                        middleSidebarList.map(item => (
                            <li key={item.label} >
                                <NavLink to={item.to} >
                                    <Icons icon={item.icon} />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="bottom" >
                <ul className='sidebar-list' >
                    {
                        bottomSidebarList.map(item => (
                            <li key={item.label} >
                                <NavLink to={item.to} >
                                    <Icons icon={item.icon} />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}