import React, {useEffect, useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {app} from "../../config/firebase";
import {getFirestore, collection, doc, getDoc} from 'firebase/firestore';
import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import styles from './style.module.css'
import background from '../../assets/img/backgroundLogReg.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    console.log('rendering')
    const auth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const role = await getUserRole(user.uid);
                if (role === 'user') {
                    navigate('/profile');
                } else if (role === 'admin') {
                    navigate('/adminPanel');
                }
            }
        });
        return unsubscribe;
    }, [auth, navigate]);
    const getUserRole = async (uid) => {
        try {
            const userRef = doc(collection(db, 'users'), uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                return userSnap.data().role;
            } else {
                console.error('User not found in the database');
                return null;
            }
        } catch (error) {
            console.error('Error getting user role:', error);
            return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const role = await getUserRole(uid);

            if (role === 'user') {
                setEmail('');
                setPassword('');
                setError('');
                navigate('/profile');
            } else if (role === 'admin') {
                setEmail('');
                setPassword('');
                setError('');
                navigate('/adminPanel');
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('Пользователь с такой почтой не найден');
            } else if (error.code === 'auth/wrong-password') {
                setError('Неправильный пароль');
            } else {
                setError(error.message);
            }
        }
    };


    return (<div style={{
            backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
        }} className={styles.main}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px'
                    }}
                >
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined" required fullWidth id="email"
                                    label="Email" name="email" autoComplete="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined" required fullWidth
                                    name="password" label="Password"
                                    type="password" id="password" autoComplete="current-password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </Button>
                        <div className={styles.linkPos}>
                            <div style={{marginBottom:'10px'}}>
                                <Link to={'/singUp'}>
                                    Зарегистрироваться
                                </Link>
                                <Link to="/forgotPassword">
                                    Забыли пароль?
                                </Link>
                            </div>
                            <Link to="/">
                                На главную
                            </Link>
                        </div>
                    </Box>
                    {error && <p>{error}</p>}
                </Box>
            </Container>
        </div>);
};
export default Login;
