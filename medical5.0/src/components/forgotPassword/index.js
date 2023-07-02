import React, {useState} from 'react';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import {Link} from 'react-router-dom';
import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import styles from './style.module.css'
import background from "../../assets/img/backgroundLogReg.png";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('На почту отправлено письмо с ссылкой.');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
        }} className={styles.main}>
            <Container component="main" maxWidth="xs">
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px'}}>
                    <Avatar sx={{bgcolor: 'secondary.main'}}></Avatar>
                    <Typography component="h1" variant="h5">
                        Восстановление
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                           Отправить
                        </Button>
                        <div className={styles.linkPos}>
                            <Link to={'/login'}>
                               Назад
                            </Link>
                        </div>
                    </Box>
                    {message && <p>{message}</p>}
                    {error && <p>Error: {error}</p>}
                </Box>
            </Container>
        </div>
    );
};

export default ForgotPassword;
