export function RadioButton({
    label = '',
    isChecked = false,
    onChange = () => { }
}) {
    return (
        <label className="radio-button" >
            <input onChange={onChange} checked={isChecked} type="radio" />
            <span>{label}</span>
        </label>
    )
}