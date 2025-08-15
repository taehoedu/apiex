import { useEffect, useRef } from 'react';
import '../../css/movie/modal.css';

const COMPONENT_NAME = "[Modal] ";

const Modal = ({ setIsModal, movieDetail }) => {

    // hook
    const modalBgRef = useRef(null);

    useEffect(() => {
        console.log(`${COMPONENT_NAME}useEffect()`);

        if (modalBgRef.current) {
            modalBgRef.current.style.height = `${window.innerHeight}px`;
            // modalBgRef.current.style.height = `${document.body.offsetHeight}px`;

        }

    });

    return(
        <div 
        ref={modalBgRef}
        className="modal_bg" 
        onClick={() => {
            setIsModal(false);
        }}>
            <div className='modal_content'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src={movieDetail.Poster} alt={movieDetail.Title}/>
                            </td>
                            <td>
                                <ul>
                                    <li>Actors: {movieDetail.Actors}</li>
                                    <li>Awards: {movieDetail.Awards}</li>
                                    <li>BoxOffice: {movieDetail.BoxOffice}</li>
                                    <li>Country: {movieDetail.Country}</li>
                                    <li>DVD: {movieDetail.DVD}</li>
                                    <li>Director: {movieDetail.Director}</li>
                                    <li>Genre: {movieDetail.Genre}</li>
                                    <li>Language: {movieDetail.Language}</li>
                                    <li>Metascore: {movieDetail.Metascore}</li>
                                    <li>Plot: {movieDetail.Plot}</li>
                                    <li>Production: {movieDetail.Production}</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>Rated: {movieDetail.Rated}</li>
                                    <li>Released: {movieDetail.Released}</li>
                                    <li>Runtime: {movieDetail.Runtime}</li>
                                    <li>Title: {movieDetail.Title}</li>
                                    <li>Type: {movieDetail.Type}</li>
                                    <li>Website: {movieDetail.Website}</li>
                                    <li>Writer: {movieDetail.Writer}</li>
                                    <li>Year: {movieDetail.Year}</li>
                                    <li>imdbID: {movieDetail.imdbID}</li>
                                    <li>imdbRating: {movieDetail.imdbRating}</li>
                                    <li>imdbVotes: {movieDetail.imdbVotes}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Modal;