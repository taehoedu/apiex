import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../css/member/signup.css';

const COMPONENT_NAME = "[Signup] ";

const SignUp = () => {

    // hooks
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

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

            case 'uMail':
                setUMail(e.target.value);
                break;

            case 'uPhone':
                setUPhone(e.target.value);
                break;
            
            default:
                break;
        }

    }

    return(
        <div className="signup_wrap">
            <div className="content">
                <h4>SIGN UP</h4>
                <input ref={uIdRef} value={uId} onChange={onChangeHandler} type="text" name="uId" placeholder="Input new user ID"/><br />
                <input value={uPw} onChange={onChangeHandler} type="password" name="uPw" placeholder="Input new user PW"/><br />
                <input value={uMail} onChange={onChangeHandler} type="email" name="uMail" placeholder="Input new user MAIL"/><br />
                <input value={uPhone} onChange={onChangeHandler} type="text" name="uPhone" placeholder="Input new user PHONE"/><br />
                <button onClick={() => {
                    console.log(`${COMPONENT_NAME} SIGN UP BUTTON CLICKED!!`);

                    let users = localStorage.getItem('users');
                    if (users === null) {
                        let newUser = {
                            [uId]: {
                                uId, uPw, uMail, uPhone,
                            }
                        }
                        localStorage.setItem('users', JSON.stringify(newUser));
                        alert('SIGN UP SUCCESS!!');

                    } else {
                        users = JSON.parse(users);
                        users[uId] = {
                            uId, uPw, uMail, uPhone,
                        }
                        localStorage.setItem('users', JSON.stringify(users));
                        alert('SIGN UP SUCCESS!!');

                    }

                    navigator('/member/signin');

                }}>SIGN UP</button>
            </div>
        </div>
    );
}

export default SignUp;