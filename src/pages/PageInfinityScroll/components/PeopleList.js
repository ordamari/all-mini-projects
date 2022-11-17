import { People } from "./People";

export function PeopleList({
    peoples
}) {
    return (
        <div className="people-list" >
            {
                peoples.map((people, idx) =>
                    <People
                        key={people.id.name + people.id.value + idx}
                        people={people}
                    />
                )
            }
        </div>
    )
}