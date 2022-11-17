import { useId } from "react"
import styles from "../assets/style/modules/input.module.scss"

export function Input({
    value,
    onChange,
    placeholder = 'placeholder',
    type = 'text',
    style = 1,
}) {

    const id = useId();

    const onChangeByTypes = (ev) => {
        const value = ev.target.value
        if (type === 'number') onChange(+value)
        onChange(value)
    }

    return (
        <div className={styles['input-container' + style]}>
            <input
                name={id}
                id={id}
                type={type}
                required
                value={value}
                onChange={onChangeByTypes}
            />
            <label htmlFor={id} >{placeholder}</label>
        </div>
    )
}