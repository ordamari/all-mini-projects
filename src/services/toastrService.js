import { BehaviorSubject } from "rxjs"
import { utilService } from "./utilService";



const notifications$ = new BehaviorSubject([]);

function removeNotification(id) {
    const notifications = notifications$.value;
    notifications$.next(notifications.filter(notification => notification.id !== id))
}

function updateNotification(notification) {
    notification.id = utilService.genId();
    const notifications = notifications$.value;
    notifications$.next([...notifications, notification])
    const timeOut = setTimeout(() => {
        removeNotification(notification.id);
    }, 5000)
}



export const toastrService = {
    notifications$,
    updateNotification
}