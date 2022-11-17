import { Accordion } from "../../components/Accordion"

export function PageAccordion() {

    const data = [
        {
            title: "Pikachu",
            content: "Pikachu is a fictional species in the Pokémon media franchise. Designed by Atsuko Nishida and Ken Sugimori, Pikachu first appeared in the 1996 Japanese video games Pokémon Red and Green created by Game Freak and Nintendo, which were released outside of Japan in 1998 as Pokémon Red and Blue. Pikachu is a yellow, mouse-like creature with electrical abilities. It is a major character in the Pokémon franchise, serving as its mascot and as a major mascot for Nintendo."

        },
        {
            title: "Charmander",
            content: "Charmander , known as Hitokage in Japan, is a Pokémon species in Nintendo's and Game Freak's Pokémon franchise. Created by Atsuko Nishida, Charmander first appeared in the video games Pokémon Red and Blue and subsequent sequels, later appearing in various merchandise, spinoff titles, and various movies, animated and printed adaptations of the franchise. The end of a Charmander's tail is alight with a flame, and the flame's size reflects both the physical health and the emotions of the individual. It is known as the Lizard Pokemon."
        },
        {
            title: "Squirtle",
            content: "Squirtle, known as Zenigame in Japan, is a Pokémon species in Nintendo and Game Freak's Pokémon franchise. It was designed by Atsuko Nishida. Its name was changed from Zenigame to Squirtle during the English localization of the series in order to give it a \"clever and descriptive name.\" Its name is composed of squir- from squirt and -tle from Turtle. In animated appearances, Squirtle is voiced in Japanese by Rikako Aikawa and in English localizations by Eric Stuart, and later Michele Knotz. Squirtle, in the anime, never evolved for reasons which are never truly explained by the creators."
        },
        {
            title: "Bulbasaur",
            content: "Bulbasaur is a Grass/Poison-type Pokémon species in Nintendo and Game Freak's Pokémon franchise. It is the first in the franchise's monster index, called a Pokédex. Designed by Atsuko Nishida, Bulbasaur debuted in Pocket Monsters: Red and Green (Pokémon Red and Blue outside Japan) as a starter Pokémon. Since then, it has reappeared in subsequent sequels, spin-off games, related merchandise, and animated and printed adaptations of the franchise."
        },
    ]

    return (
        <div className="page-accordion page flex column gap-1">
            <Accordion items={data} />
        </div>
    )
}