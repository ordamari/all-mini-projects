export function PeopleView({
    people,
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
                    <a className="button primary" href={`tel:${people.phone}`}>Phone</a>
                    <a className="button secondary" href={`mailto:${people.email}`}>Email</a>
                </div>
            </div>

        </div>
    )
}