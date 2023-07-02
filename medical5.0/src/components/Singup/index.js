import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore';
import {app} from '../../config/firebase';
import {Link, useNavigate} from 'react-router-dom';
import styles from "./style.module.css";
import {Avatar, Button, Grid, TextField, Typography, Container, Box} from "@mui/material";
import background from "../../assets/img/backgroundLogReg.png";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();
    const setUserRole = async (uid, role) => {
        try {
            const userRef = doc(collection(db, 'users'), uid);
            await setDoc(userRef, {role: role, email: email, userId: uid});
        } catch (error) {
            console.error('Error setting user role:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            await setUserRole(uid, 'user', email);
            setEmail('');
            setPassword('');
            setError('');
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }} className={styles.main}>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '60px'
                    }}
                >
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                    </Avatar>
                    <Typography sx={{marginBottom: '20px'}} component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Зарегистрироватся
                        </Button>
                        <div className={styles.linkPos}>
                            <div>
                                <span>У вас уже есть аккаун <Link to={'/login'}>вход</Link></span>
                                <Link to="/">
                                    На главную
                                </Link>
                            </div>
                        </div>
                    </form>
                    {error && <p>Ошибка: данная почта уже используется</p>}
                </Box>
            </Container>
        </div>
    );
};

export default Registration;
