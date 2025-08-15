import { useEffect, useState } from 'react';
import '../../css/movie/search.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';

const COMPONENT_NAME = "[Search] ";

const Search = () => {

    // hook
    const [searchTxt, setSearchTxt] = useState('');
    const [movieList, setMovieList] = useState([]); // 응답 데이터 저장용
    const [isModal, setIsModal] = useState(false);
    const [movieDetail, setMovieDetail] = useState(null);
    const [isRender, setIsRender] = useState(false);

    useEffect(() => {
        console.log(`${COMPONENT_NAME}useEffect()`);

        let signinedId = sessionStorage.getItem('signinedId');
        
        if (signinedId === null) {
            alert('Please SIGN-IN!!');
            navigator('/member/signin');

        } else {
            setIsRender(true);

        }
        

    }, []);

    const navigator = useNavigate();

    // handler
    const searchChangeHandler = (e) => {
        console.log(`${COMPONENT_NAME}searchChangeHandler()`);

        setSearchTxt(e.target.value);

    }

    const searchBtnClickHandler = async () => {
        console.log(`${COMPONENT_NAME}searchBtnClickHandler()`);

        if (!searchTxt.trim()) {
            alert('INPUT MOVIE NAME FOR SEARCH!!');
            return;
        }

        const apiKey = process.env.REACT_APP_APIKEY;
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTxt)}`;
        try {
            const response = await axios.get(url);
            console.log("영화 정보:", response.data);

            if (response.data.Response === "True") {
                setMovieList(response.data.Search);

            } else {
                alert("영화를 찾을 수 없습니다.");
                setMovieList([]);
            }

        } catch (error) {

            console.error("API 호출 오류:", error);
            alert("영화 정보를 불러오는 데 실패했습니다.");
        }

    }

    const detailBtnClickHandler = async (imdbID) => {
        console.log(`${COMPONENT_NAME}detailBtnClickHandler()`);
        
        const apiKey = process.env.REACT_APP_APIKEY;
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

        try {
            const response = await axios.get(url);
            console.log("상세 정보:", response.data);
            // alert(`Title: ${response.data.Title}\nYear: ${response.data.Year}`);
            setMovieDetail(response.data);
            setIsModal(true);

        } catch (error) {
            console.error("상세 정보 불러오기 실패:", error);
            alert("상세 정보를 불러오는 데 실패했습니다.");
        }

    }

    return(
        <div className="search_wrap">
            {
                isRender
                ?
                <div className="content">
                    <div className='search'>
                        <input type="text" value={searchTxt} onChange={searchChangeHandler} placeholder='INPUT MOVIE NAME!'/>
                        <button onClick={searchBtnClickHandler}>search</button>
                    </div>
                    <div className='total'>
                        Total: {movieList.length}
                    </div>
                    <div className='list'>
                        <table>
                            <tbody>
                                {movieList.map((movie, index) => (
                                    <tr key={index}>
                                        <td className='thum'>
                                            <Link onClick={() => {
                                                detailBtnClickHandler(movie.imdbID); 
                                            }}>
                                                <img
                                                    src={movie.Poster !== "N/A" ? movie.Poster : "/res/img/noimg.png"} 
                                                    alt={movie.Title} 
                                                    onError={(e) => {
                                                        e.target.onerror = null; // 무한 루프 방지
                                                        e.target.src = "/res/img/noimg.png";
                                                    }}
                                                />
                                            </Link>
                                            
                                        </td>
                                        <td className='summary'>
                                            <ul>
                                                <li>Title: {movie.Title}</li>
                                                <li>Year: {movie.Year}</li>
                                                <li>imdbID: {movie.imdbID}</li>
                                                <li>Type: {movie.Type}</li>
                                                <li><button onClick={() => {
                                                    detailBtnClickHandler(movie.imdbID); 
                                                }}>detail</button></li>
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                    {
                        isModal
                        ?
                        <Modal setIsModal={setIsModal} movieDetail={movieDetail}/>
                        :
                        <></>
                    }
                </div>
                :
                <></>
            }
            
        </div>
    )
}

export default Search;