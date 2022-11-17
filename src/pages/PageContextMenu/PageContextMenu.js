import { useEffect, useState } from "react"
import { ContextMenu } from "../../components/ContextMenu";
import { useArray } from "../../hooks/useArray";
import { useContextMenu } from "../../hooks/useContextMenu";
import { peopleService } from "../../services/peopleService";
import { PeopleView } from "./components/PeopleView";

export function PageContextMenu() {

    const [peoples, peoplesActions] = useArray();
    const contextMenuData = useContextMenu();
    const [selectedPeopleIdx, setSelectedPeopleIdx] = useState(-1);

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

    const updatePeople = () => {
        const selectedPeople = peoples[selectedPeopleIdx]
        const updatePeople = {
            ...selectedPeople,
            name: {
                ...selectedPeople.name,
                first: 'Or',
                last: 'Damari'
            },
            location: {
                ...selectedPeople.location,
                city: 'Tel Aviv',
                country: 'Israel'
            }
        }
        peoplesActions.updateByIdx(selectedPeopleIdx, updatePeople);
    }


    return (
        <div className="context-menu-page page flex column gap-1" >
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
                            onContextMenu={
                                (e) => {
                                    setSelectedPeopleIdx(idx)
                                    contextMenuData.contextMenuHandler(e)
                                }
                            }
                        />
                    ))
                }
            </div>

            <ContextMenu
                position={contextMenuData.contextMenuPosition}
                isShowContextMenu={contextMenuData.isShowContextMenu}
            >
                <button
                    className="menu-item"
                    onClick={() => peoplesActions.filterByIdx(selectedPeopleIdx)}
                >
                    Remove people
                </button>
                <button
                    className="menu-item"
                    onClick={() => updatePeople()}
                >
                    Set Or Damari
                </button>
            </ContextMenu>

        </div>
    )
}