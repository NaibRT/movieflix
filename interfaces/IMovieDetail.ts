import IGenre from "./IGenre";
import ILang from "./ILang";
import IProductCompany from "./IProductCompany";

export default interface IMovieDetail{
    "adult": boolean,
    "backdrop_path": string | null,
    "belongs_to_collection": null | {},
    "budget": number,
    "genres": IGenre[],
    "homepage": string | null,
    "id": number,
    "imdb_id": string | null,
    "original_language": string,
    "original_title": string,
    "overview":string | null,
    "popularity": number,
    "poster_path": string | null,
    "production_companies": IProductCompany[],

    "release_date": string,
    "revenue": number,
    "runtime": number,
    "spoken_languages": ILang[],
    "status": string,
    "tagline": string | null,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}