import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Main from "./Main";
import SignUp from "./member/SignUp";
import SignIn from "./member/SignIn";
import Modify from "./member/Modify";
import { useEffect, useState } from "react";
import Search from "./movie/Search";

const COMPONENT_NAME = "[Wrap] ";

const Wrap = () => {

    // hooks
    const [isSignined, setIsSignined] = useState(false);

    useEffect(() => {
        console.log(`${COMPONENT_NAME}useEffect()`);

        let signinedId = sessionStorage.getItem('signinedId');
        if (signinedId !== null && signinedId !== '') {
            setIsSignined(true);
        }

        console.log("REACT_APP_COMMON -----> ", process.env.REACT_APP_COMMON);
        console.log("REACT_APP_FILENAME -----> ", process.env.REACT_APP_FILENAME);

    });

    return(
        <BrowserRouter>
            <Header />
            <Nav isSignined={isSignined}
                 setIsSignined={setIsSignined}/>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/member/signup" element={<SignUp />} />
                <Route path="/member/signin" element={<SignIn setIsSignined={setIsSignined} />} />
                <Route path="/member/modify" element={<Modify />} />
                <Route path="/movie/search" element={<Search />} />
            </Routes>
            <Footer/ >
        </BrowserRouter>
    );
}

export default Wrap;