import IPoster from "./IPoster";

export default interface IMovieImage{
    "id": number,
    "backdrops": IPoster[],
    "posters": IPoster[]
}