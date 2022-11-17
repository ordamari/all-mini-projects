import { useEffect, useRef, useState } from "react"
import { useToggle } from "../hooks/useToggle";

export function Select({
    value,
    onChange,
    placeholder,
    isMultiSelect = false,
    options = [],
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const selectRef = useRef(null);
    const inputRef = useRef(null);
    const optionsRef = useRef(null);
    const [filterOptions, setFilterOptions] = useState([]);
    const [isInputFocus, setIsInputFocus] = useState(false);
    // const [isPlacehoderTop, setIsPlaceholderTop] = useToggle();
    const [style, setStyle] = useState({
        top: 'calc(100% + 0.25rem)',
        bottom: 'unset',
    })


    function clearOptions() {
        isMultiSelect ? onChange([]) : onChange(null)
        clearInput()
    }

    function updateFilterOptions(query) {
        setFilterOptions(
            options.filter(option => option.label.includes(query))
        )
        setHighlightedIndex(0);
    }

    function clearInput() {
        if (inputRef) inputRef.current.innerHTML = '';
        updateFilterOptions('');
    }

    function selectOption(option) {
        if (isMultiSelect) {
            if (value.some(item => item.id === option.id)) {
                onChange(value.filter(item => item.id !== option.id))
            } else {
                onChange([...value, option])
            }
            focusInput();
        } else {
            if (option?.id !== value?.id) onChange(option)
            inputRef.current.blur();
        }
        clearInput();

    }

    function isOptionSelected(option) {
        return isMultiSelect ? value.some(item => item.id === option.id) : value?.id === option?.id
    }

    function focusInput() {
        if (inputRef) inputRef.current.focus();
        setIsOpen(true)
    }

    function focusSelect() {
        if (selectRef.current && !selectRef.current.focus) selectRef.current.focus();
    }

    function multiSelectRemoveLastValueItem() {
        if (!isMultiSelect) return;
        selectOption(value[value.length - 1]);
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        const handler = (e) => {
            if (e.target != selectRef.current && e.target != inputRef.current) return
            switch (e.code) {
                case "Enter":
                    if (isOpen) selectOption(filterOptions[highlightedIndex])
                    break
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true)
                        break
                    }

                    const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                    if (newValue >= 0 && newValue < filterOptions.length) {
                        setHighlightedIndex(newValue)
                    }
                    break
                }
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }
        selectRef.current?.addEventListener("keydown", handler)

        return () => {
            selectRef.current?.removeEventListener("keydown", handler)
        }
    }, [isOpen, highlightedIndex, filterOptions])

    const updateStyle = () => {
        if (optionsRef.current) {
            const rect = optionsRef.current.getBoundingClientRect();
            const height = optionsRef.current.offsetHeight
            if (rect.y + height > window.innerHeight) {
                setStyle(prev => ({ ...prev, top: 'unset', bottom: 'calc(100% + 0.25rem)' }))
            } else {
                setStyle(prev => ({ ...prev, bottom: 'unset', top: 'calc(100% + 0.25rem)' }))
            }
        }
    }

    useEffect(() => {
        updateFilterOptions(inputRef ? inputRef.current.textContent : '');
    }, [options])

    useEffect(() => {
        updateStyle();
    }, [isOpen, optionsRef])



    return (
        <div
            className="select"
            ref={selectRef}
            tabIndex={0}
            onFocus={() => focusInput()}
        >

            <span className="value">
                {
                    isMultiSelect
                        ? value.map(v => (
                            <button
                                key={v.id}
                                onClick={e => {
                                    e.stopPropagation()
                                    selectOption(v)
                                }}
                                className="selected-option"
                            >
                                {v.label}
                                <span className="remove-selected">&times;</span>
                            </button>
                        ))
                        : (
                            !isOpen && value?.label
                        )
                }


                <span
                    className={`placeholder ${(
                        placeholder &&
                        !isOpen &&
                        (
                            (isMultiSelect && !value.length) ||
                            (!isMultiSelect && !value)
                        )) ? 'bottom' : 'top'
                        }`}
                >
                    {placeholder}
                </span>


                < span
                    className="filter-input"
                    contentEditable
                    ref={inputRef}
                    onInput={(e) => updateFilterOptions(e.currentTarget.textContent)}
                    onFocus={() => {
                        focusSelect()
                        setIsInputFocus(true);
                    }}
                    onBlur={() => {
                        setIsOpen(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.currentTarget.textContent === '' && e.code === 'Backspace') multiSelectRemoveLastValueItem();
                        if (e.code === 'Enter') e.preventDefault();
                    }}
                />
            </span>

            <button
                onClick={e => {
                    e.stopPropagation()
                    clearOptions()
                }}
                className="clear-btn"
            >
                &times;
            </button>

            <div className="divider"></div>
            <div className="caret"></div>
            <ul
                className={`options ${(isOpen && filterOptions.length) ? "show" : ""}`}
                style={style}
                ref={optionsRef}

            >
                {filterOptions.map((option, index) => (
                    <li
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            // setIsOpen(false).
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.id}
                        className={`option ${isOptionSelected(option) ? "selected" : ""
                            } ${index === highlightedIndex ? "highlighted" : ""}`}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div >
    )
}