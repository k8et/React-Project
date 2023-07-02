import React, { useState } from "react";
import {Button, ErrorMessage, FormContainer, FormPos, Input} from "./style";
import {Link} from "react-router-dom";
const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const {onSubmit} = props
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password, setErr);
    };

    return (
        <FormContainer>
            Login
            <FormPos onSubmit={handleSubmit}>
                <Input
                    value={email}
                    type={"text"}
                    placeholder={"Email"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    value={password}
                    type={"password"}
                    placeholder={"Password"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {err && <ErrorMessage>{err}</ErrorMessage>}
                <Button type="submit">Login</Button>
            </FormPos>
            <Link to={"/Register"}>
                <p>redirect to register</p>
            </Link>
        </FormContainer>
    );
};

export default LoginForm;
