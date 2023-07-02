import React, { FC, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { db, register } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import {formBoxStyles, theme} from "./style";
import {AuthListener} from "../../utils/AuthListener";


const RegisterScreen: FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  AuthListener()

  const registerHandler = async (
      email: string,
      password: string,
      name: string,
      lastName: string,
      phone: string
  ) => {
    try {
      const { user } = await register(email, password);
      await addDoc(collection(db, "users"), {
        userId: user.uid,
        name,
        lastName,
        phone,
      });
    } catch (error) {
      console.log("Error reg", error);
    } finally {
      console.log("fine");
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerHandler(email, password, name, lastName, phone);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={formBoxStyles}
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="displayName"
                required
                fullWidth
                id="displayName"
                label="First Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="fname"
                  required
                  fullWidth
                  label="Last Name"
                  autoFocus
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                required
                fullWidth
                label="Number"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signIn">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterScreen;
