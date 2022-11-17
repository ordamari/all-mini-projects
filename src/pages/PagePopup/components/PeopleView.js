export function PeopleView({
    people,
    onRemove,
    onUpdate
}) {
    return (
        <div
            className="people-view container-box"
        >
            <img src={people.picture.large} />
            <div className="data" >
                <div className="details" >
                    <span>{people.name.title}. {people.name.first} {people.name.last}</span>
                    <span>{people.location.city}, {people.location.country}</span>
                </div>
                <div className="contact" >
                    <button onClick={onRemove} className="button primary">Remove</button>
                    <button onClick={onUpdate} className="button secondary">Update</button>
                </div>
            </div>

        </div>
    )
}