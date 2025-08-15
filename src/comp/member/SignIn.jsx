import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/member/signin.css';

const COMPONENT_NAME = "[Signin] ";

const SignIn = ({ setIsSignined }) => {

    // hooks
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    useEffect(() => {
        console.log(`${COMPONENT_NAME}useEffect()`);

        uIdRef.current.focus();

    }, []);

    const navigator = useNavigate();
    const uIdRef = useRef(null);

    // handler
    const onChangeHandler = (e) => {
        console.log(`${COMPONENT_NAME}onChangeHandler()`);

        switch(e.target.name) {
            case 'uId':
                setUId(e.target.value);
                break;

            case 'uPw':
                setUPw(e.target.value);
                break;
            
            default:
                break;
        }

    }

    return(
        <div className="signin_wrap">
            <div className="content">
                <h4>SIGN IN</h4>
                <input ref={uIdRef} value={uId} onChange={onChangeHandler} type="text" name="uId" placeholder="Input user ID"/><br />
                <input value={uPw} onChange={onChangeHandler} type="password" name="uPw" placeholder="Input user PW"/><br />
                <button onClick={() => {
                    console.log(`${COMPONENT_NAME}SIGN IN BUTTON CLICKED!!`);
                    
                    let users = localStorage.getItem('users');
                    if (users === null) {
                        alert('SIGN IN FAIL!!');
                        setIsSignined(false);

                    } else {
                        users = JSON.parse(users);
                        if (users[uId] !== undefined && 
                            users[uId].uPw === uPw) {
                                sessionStorage.setItem('signinedId', uId);
                                alert('SIGN IN SUCCESS!!');
                                setIsSignined(true);
                            }

                    }

                    navigator('/');

                }}>SIGN IN</button>
            </div>
        </div>
    );
}

export default SignIn;