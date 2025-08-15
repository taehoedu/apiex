import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../css/member/signup.css';

const COMPONENT_NAME = "[Signup] ";

const Modify = () => {

    // hooks
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    useEffect(() => {
        console.log(`${COMPONENT_NAME}useEffect()`);

        let signinedId = sessionStorage.getItem('signinedId');
        if (signinedId === null || signinedId === '') {
            alert('Please sign in!');
            navigator('/member/signin');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users'));
        let signinedUser = users[signinedId];

        setUId(signinedUser.uId);
        setUPw(signinedUser.uPw);
        setUMail(signinedUser.uMail);
        setUPhone(signinedUser.uPhone);

    }, []);

    const navigator = useNavigate();

    // handler
    const onChangeHandler = (e) => {
        console.log(`${COMPONENT_NAME}onChangeHandler()`);

        switch(e.target.name) {
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
                <h4>Modify</h4>
                <input value={uId} disabled readOnly type="text"/><br />
                <input value={uPw} onChange={onChangeHandler} type="password" name="uPw" placeholder="Input new user PW"/><br />
                <input value={uMail} onChange={onChangeHandler} type="email" name="uMail" placeholder="Input new user MAIL"/><br />
                <input value={uPhone} onChange={onChangeHandler} type="text" name="uPhone" placeholder="Input new user PHONE"/><br />
                <button onClick={() => {
                    console.log(`${COMPONENT_NAME} MODIFY BUTTON CLICKED!!`);

                    let users = JSON.parse(localStorage.getItem('users'));
                    users[uId] = {
                        uId, uPw, uMail, uPhone
                    }
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('MODIFY SUCCESS!!');

                    navigator('/');

                }}>MODIFY</button>
            </div>
        </div>
    );
}

export default Modify;