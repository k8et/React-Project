import React, { useState } from "react";
import {Link} from "react-router-dom";
import {Button, FormContainer, FormPos, Input} from "./style";


const RegisterForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password, setErr);
    };

    return (
        <FormContainer>
            Register
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
                {err && <p style={{ color: "red" }}>{err}</p>}
                <Button type="submit">Register</Button>
            </FormPos>
            <Link to={"/login"}>
                <p>redirect to login</p>
            </Link>
        </FormContainer>
    );
};

export default RegisterForm;
