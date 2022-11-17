import { useId } from "react"
import styles from "../assets/style/modules/checkbox.module.scss"

export function Checkbox({
    isCheck,
    toggleIsCheck,
    children,
    isDisabled = false,
    style = 1
}) {

    const id = useId()

    return (
        <div className={`${styles['checkbox-container' + style]} `}>
            <input
                type="checkbox"
                id={id}
                checked={isCheck}
                onChange={() => toggleIsCheck()}
                disabled={isDisabled}
            />
            <label for={id}>{children}</label>
        </div>
    )
}