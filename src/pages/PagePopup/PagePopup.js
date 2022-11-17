import { useEffect, useState } from "react";
import { useArray } from "../../hooks/useArray";
import { peopleService } from "../../services/peopleService";
import { PeopleView } from "./components/PeopleView";
import { PopupEditPeople } from "./popups/PopupEditPeople";
import { PopupRemovePeople } from "./popups/PopupRemovePeople";

export function PagePopup() {


    const [peoples, peoplesActions] = useArray();
    const [selectedEditPeopleIdx, setSelectedEditPeopleIdx] = useState(-1);
    const [selectedRemovePeopleIdx, setSelectedRemovePeopleIdx] = useState(-1);

    useEffect(() => {
        updatePeoples();
    }, [])

    const updatePeoples = async () => {
        const res = await peopleService.get();
        if (res) peoplesActions.set(res)
    }

    const addMorePeoples = async () => {
        const res = await peopleService.get();
        if (res) peoplesActions.addArray(res);
    }

    const updatePeople = (updatedPeople) => {
        peoplesActions.updateByIdx(selectedEditPeopleIdx, updatedPeople);
        setSelectedEditPeopleIdx(-1);
    }

    const removePeople = () => {
        peoplesActions.filterByIdx(selectedRemovePeopleIdx);
        setSelectedRemovePeopleIdx(-1);
    }


    return (
        <div
            className="popup-page page flex column gap-1"
        >
            <div className="flex">
                <button
                    className="button primary"
                    onClick={() => addMorePeoples()}
                >
                    Add 10 random peoples
                </button>
            </div>
            <div className="people-list">
                {
                    peoples.map((people, idx) => (
                        <PeopleView
                            key={idx}
                            people={people}
                            onUpdate={() => setSelectedEditPeopleIdx(idx)}
                            onRemove={() => setSelectedRemovePeopleIdx(idx)}
                        />
                    ))
                }

                <PopupEditPeople
                    peoples={peoples}
                    selectedIdx={selectedEditPeopleIdx}
                    setSelectedIdx={setSelectedEditPeopleIdx}
                    update={updatePeople}
                />

                <PopupRemovePeople
                    peoples={peoples}
                    selectedIdx={selectedRemovePeopleIdx}
                    setSelectedIdx={setSelectedRemovePeopleIdx}
                    remove={removePeople}
                />




            </div>
        </div>
    )
}