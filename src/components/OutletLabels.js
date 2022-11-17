import { NavLink, Outlet } from 'react-router-dom'
import { Icons } from './Icons'

export function OutletLabels({
    labels,
    isHorizental = true,
}) {
    return (
        <div className={`flex ${isHorizental ? 'column' : ''}`} >
            <div className={`labels ${isHorizental ? '' : 'vertical'}`}>
                {
                    labels.map(label => (
                        <NavLink
                            to={label.to}
                            key={label.to}
                        // onClick={() => setCurrLabel(label)}
                        >
                            {
                                label.icon &&
                                <Icons icon={label.icon} />
                            }
                            {label.text}
                        </NavLink>
                    ))
                }
            </div>
            <Outlet />
        </div>
    )
}