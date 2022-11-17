import { useEffect, useRef, useState } from "react";
import { baseVariable } from "../services/baseVariable";
import { toastrService } from "../services/toastrService";
import { Icons } from "./Icons";




export function ToastrNotification({ }) {
    const [notifications, setNotifications] = useState([]);
    const subscriber = useRef();

    useEffect(() => {
        subscriber.current = toastrService.notifications$.subscribe(notifications => {
            setNotifications(notifications);
        })

        return () => {
            subscriber.current.unsubscribe();
        }
    }, [])


    return (
        <div className="notifications-container">
            {
                notifications.map((notification, idx) => (
                    <div
                        className={`notification ${baseVariable.notificationTypes[notification.type]}`}
                        key={idx}
                    >
                        <Icons icon={baseVariable.notificationTypes[notification.type]} />
                        <div className="content" >
                            <span className="title" >
                                {notification.title}


                            </span>
                            <span className="text" >
                                {notification.text}
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}