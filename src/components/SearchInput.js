import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useToggle } from "../hooks/useToggle"

export function SearchInput({
    onChange
}) {

    const [isOpen, toggleIsOpen] = useToggle();
    const [text, setText] = useState('');

    const updateValue = () => {
        onChange(text);
    }

    const onClear = () => {
        if (text) setText('')
        else toggleIsOpen(false)
    }

    const isDebaunce = useDebounce(updateValue, text)


    return (
        <div className={`search-input ${isOpen ? 'active' : ''}`}>
            <div onClick={() => toggleIsOpen()} className="icon" ></div>
            <div className="input-container" >
                <input
                    value={text}
                    onChange={({ target }) => setText(target.value)}
                    type="text"
                    placeholder="Search"
                />
            </div>
            {
                isOpen && !isDebaunce &&
                <span onClick={onClear} className="clear"></span>
            }
            {
                isOpen && isDebaunce &&
                <div className={`loader`}><div></div><div></div><div></div><div></div></div>
            }
        </div>
    )
}