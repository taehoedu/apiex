import { Link, useNavigate } from 'react-router-dom';
import '../css/nav.css';

const COMPONENT_NAME = "[Nav] ";

const Nav = ({ isSignined, setIsSignined }) => {

    // hooks
    const navigator = useNavigate();

    return(
        <div className="nav_wrap">
            <div className="content">
                <Link to='/'>home</Link>
                {
                    !isSignined
                    ?
                    <>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/member/signup'>signup</Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/member/signin'>signin</Link>
                    </>
                    :
                    <>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/member/modify'>modify</Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/' onClick={() => {
                            console.log(`${COMPONENT_NAME} SIGNOUT BUTTON CLICKED!!`);
                            
                            sessionStorage.removeItem('signinedId');
                            setIsSignined(false);
                            alert('SIGN OUT SUCCESS!!');
                            navigator('/');

                        }}>signout</Link>
                    </>
                }
            </div>
            <div className='service'>
                <Link to="/movie/search">movie search</Link>
            </div>
        </div>
    )
}

export default Nav;