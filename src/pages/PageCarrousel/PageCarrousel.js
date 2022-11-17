import { useEffect, useState } from "react";
import { Carrousel } from "../../components/Carrousel";
import { imdbService } from "../../services/imdbService";
import { peopleService } from "../../services/peopleService";
import { MovieView } from "./components/MovieView";
import { PeopleView } from "./components/PeopleView";

export function PageCarrousel() {

    const [movies, setMovies] = useState([])
    const [peoples, setPeoples] = useState([])

    useEffect(() => {
        updateMovies()
        updatePeoples()
    }, [])

    const updateMovies = async () => {
        const res = await imdbService.get250Moviews();
        if (res) setMovies(res.data.items)
    }

    const updatePeoples = async () => {
        const res = await peopleService.get();
        if (res) setPeoples(res)
    }



    return (
        <div className="carrousel-page page flex column gap-1">
            {
                movies.length > 0 &&
                <Carrousel
                    elementsLength={movies.length}
                    rowLength={7}
                    aspectRatio={[2, 3]}
                >
                    {
                        movies.map(movie => (
                            <MovieView
                                key={movie.id}
                                movieData={movie}
                            />
                        ))
                    }
                </Carrousel>
            }
            {
                peoples.length > 0 &&
                <Carrousel
                    elementsLength={peoples.length}
                    rowLength={3}
                    aspectRatio={[4, 1]}
                >
                    {
                        peoples.map((people, idx) => (
                            <PeopleView
                                key={idx}
                                people={people}
                            />
                        ))
                    }
                </Carrousel>
            }
        </div>
    )
}