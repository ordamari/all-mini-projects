export function MovieView({
    movieData
}) {
    return (
        <div className="movie-view">
            <img
                src={movieData.image}
                alt={movieData.title}
            />
            <span className="title" >{movieData.title}</span>
        </div>
    )
}