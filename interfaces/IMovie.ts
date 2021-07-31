import IGenre from './IGenre';


interface IMovie{
    adult:boolean,
    poster_path:string,
    id:number,
    imdb_id:string,
    title:string,
    name:string,
    genres:IGenre[]
  }

  export default IMovie