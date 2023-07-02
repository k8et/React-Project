import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RegisterForm from "../components/registerForm";



const Register = () => {
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (isLoggedIn) {
            console.log('loggedIn', isLoggedIn);
            auth.onAuthStateChanged((user) => {
                if (user) {
                    setLoggedIn(true);
                    console.log("Пользователь вошел");
                } else {
                    localStorage.removeItem("isLoggedIn");
                    console.log("Пользователь не вошел");
                }
            });
        }
    }, []);
    const handleRegister = (email, password, setError) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoggedIn(true);
                localStorage.setItem("isLoggedIn", true);
            })
            .catch((error) => {
                setError(error.code);
            });
    };

    if (loggedIn) {
        navigate('/profile');
    }

    return (
        <div>
            <RegisterForm onSubmit={handleRegister} />
        </div>
    );
};

export default Register;
