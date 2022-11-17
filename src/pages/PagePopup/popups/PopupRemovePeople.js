import { useEffect, useState } from "react";
import { Popup } from "../../../components/Popup";
import { useToggle } from "../../../hooks/useToggle";

export function PopupRemovePeople({
    selectedIdx,
    setSelectedIdx,
    remove,
    peoples
}) {

    const [isOpen, toggleIsOpen] = useToggle(true);
    const [people, setPeople] = useState(null);

    useEffect(() => {
        if (selectedIdx > -1) {
            toggleIsOpen(true);
            const selectedPeople = peoples[selectedIdx]
            if (selectedPeople) setPeople({ ...selectedPeople })
            else toggleIsOpen(false);
        } else {
            toggleIsOpen(false);
            setPeople(null);
        }
    }, [selectedIdx])


    const onClose = () => {
        setSelectedIdx(-1);
    }

    const onConfirm = () => {
        remove();
        onClose();
    }


    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
        >
            <Popup.Header onClose={onClose} >
                <span>Remove People</span>
            </Popup.Header>
            <Popup.Body>
                {
                    people &&
                    <span>Are you sure you want remove {people.name.first} {people.name.last}?</span>
                }
            </Popup.Body>
            <Popup.Footer>
                <button onClick={onConfirm} className="button primary" >Remove</button>
                <button onClick={onClose} className="button secondary" >Cancel</button>
            </Popup.Footer>
        </Popup>
    )
}