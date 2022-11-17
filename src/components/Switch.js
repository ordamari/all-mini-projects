import { useId } from "react"
import styles from "../assets/style/modules/switch.module.scss"

export function Switch({
    isCheck,
    toggleIsCheck,
    children,
    isDisabled = false,
    style = 1
}) {

    const id = useId();

    return (
        <div className={styles['switch' + style]}>
            <input
                disabled={isDisabled}
                type="checkbox"
                id={id}
                checked={isCheck}
                onChange={() => toggleIsCheck()}
            />
            <label htmlFor={id} >
                {children}
            </label>
        </div>
    )

}