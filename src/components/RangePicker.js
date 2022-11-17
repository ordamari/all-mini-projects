export function RangePicker({
    value = 0,
    min = 0,
    max = 1,
    step = "any",
    onChange = () => { }
}) {
    return (
        <input
            className="range-picker"
            type="range"
            min={min}
            max={max}
            step={step}
            onChange={({ target }) => onChange(target.value)}
            value={value}
        />
    )
}