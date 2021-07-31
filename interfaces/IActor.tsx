
interface IActor{
        "birthday": string | null,
        "known_for_department": "Acting",
        "deathday": string | null,
        "id": number,
        "name": string,
        "also_known_as": string[],
        "gender": number,
        "biography": string,
        "popularity": number,
        "place_of_birth": string,
        "profile_path": string,
        "adult": false,
        "imdb_id": string,
        "homepage": string | null
};

export default IActor;

