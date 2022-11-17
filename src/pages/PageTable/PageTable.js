import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { peopleService } from "../../services/peopleService";

export function PageTable() {

    const [peoples, setPeoples] = useState([]);
    const [tablePeople, setTablePeople] = useState([]);

    useEffect(() => {
        const resPeoples = peopleService.getSync();
        setPeoples(resPeoples)
    }, [])

    useEffect(() => {
        setTablePeople(peoples.map(people => {

            return {
                firstName: people.name.first,
                lastName: people.name.last,
                country: people.location.country
            }
        }))
    }, [peoples])





    return (
        <div
            className="table-page page flex column gap-1"
        >
            <Table
                columnMap={{
                    firstName: 'First Name',
                    lastName: 'Last Name',
                    country: 'Country',
                }}
                isHavePaginator={true}
                isLoad={false}
                tableData={tablePeople}
                reorderColumns={['firstName', 'lastName', 'country']}

            />
        </div>
    )
}