import { useState } from "react";
import { Icons } from "./Icons";

export function Accordion({
    items = []
}) {

    const [selectedIdx, setSelectedIdx] = useState(-1);

    const onSelectIdx = (idx) => {
        setSelectedIdx(prev => prev === idx ? -1 : idx);
    }

    if (items.length > 0) return (
        <div className="accordion">
            {
                items.map((item, idx) => (
                    <div
                        className={`accordion-item ${idx === selectedIdx ? 'open' : ''}`}
                        key={idx}
                    >
                        <div
                            onClick={() => onSelectIdx(idx)}
                            className="title"
                        >
                            <span>{item.title}</span>
                            <Icons icon="add" />
                        </div>
                        <div className="content">{item.content}</div>
                    </div>
                ))
            }
        </div>
    )
}