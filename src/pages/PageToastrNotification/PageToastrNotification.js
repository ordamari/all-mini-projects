import { useState } from "react"
import { Icons } from "../../components/Icons"
import { Input } from "../../components/Input"
import { baseVariable } from "../../services/baseVariable"
import { toastrService } from "../../services/toastrService"

export function PageToastrNotification() {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const sendNotification = (type) => {
        toastrService.updateNotification({
            title: title,
            text: text,
            type: type,
        })
        setTitle('');
        setText('');
    }

    return (
        <div
            className="toastr-notifications-page page flex column gap-1"
        >
            <div className="container-box flex column gap-1" >
                <div className="flex gap-1" >
                    <Input
                        value={title}
                        onChange={(newValue) => setTitle(newValue)}
                        placeholder="Title"
                    />
                    <Input
                        value={text}
                        onChange={(newValue) => setText(newValue)}
                        placeholder="Text"
                    />
                </div>
                <div className="flex gap-1" >

                    {
                        Array.from(Array(4).keys()).map(number => (
                            <button
                                className={`button ${baseVariable.notificationTypes[number + 1]}`}
                                key={number + 1}
                                onClick={() => { sendNotification(number + 1) }}
                            >
                                <Icons icon={baseVariable.notificationTypes[number + 1]} />
                                <span>Send at {baseVariable.notificationTypes[number + 1]}</span>
                            </button>
                        ))
                    }
                </div>
            </div>

        </div >
    )
}