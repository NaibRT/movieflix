import IGenre from './IGenre';

export default interface Props {
    url : string,
    header: string,
    genres : IGenre[],
    style : object
}