import { useEffect, useState } from "react";
import { Input } from "../../../components/Input";
import { Popup } from "../../../components/Popup";
import { useToggle } from "../../../hooks/useToggle";

export function PopupEditPeople({
    selectedIdx,
    setSelectedIdx,
    update,
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
        update(people);
        onClose();
    }


    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
        >
            <Popup.Header onClose={onClose} >
                <span>Update people</span>
            </Popup.Header>
            <Popup.Body>
                {
                    people &&
                    <div className="flex column gap-1">
                        <Input
                            value={people.name.first}
                            onChange={(newValue) => setPeople(prev => ({
                                ...prev,
                                name: {
                                    ...prev.name,
                                    first: newValue
                                }
                            }))}
                            placeholder="First name"
                        />
                        <Input
                            value={people.name.last}
                            onChange={(newValue) => setPeople(prev => ({
                                ...prev,
                                name: {
                                    ...prev.name,
                                    last: newValue
                                }
                            }))}
                            placeholder="Last name"
                        />
                        <Input
                            value={people.location.city}
                            onChange={(newValue) => setPeople(prev => ({
                                ...prev,
                                location: {
                                    ...prev.location,
                                    city: newValue
                                }
                            }))}
                            placeholder="City"
                        />
                        <Input
                            value={people.location.country}
                            onChange={(newValue) => setPeople(prev => ({
                                ...prev,
                                location: {
                                    ...prev.location,
                                    country: newValue
                                }
                            }))}
                            placeholder="Country"
                        />
                    </div>
                }
            </Popup.Body>
            <Popup.Footer>
                <button onClick={onConfirm} className="button primary" >Update</button>
                <button onClick={onClose} className="button secondary" >Cancel</button>
            </Popup.Footer>
        </Popup>
    )
}