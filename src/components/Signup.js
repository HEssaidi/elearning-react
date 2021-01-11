import React, { useState, useEffect } from "react";
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp({ login, history }) {
    const classes = useStyles();

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(false);
    const [user, setUser] = useState(
        JSON.parse(localStorage["authStorage"]).user
    );
    const [isLoggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage["authStorage"]).isLoggedIn
    );

    const handleRegister = e => {
        e.preventDefault();
        setError("");
        setProgress(true);
        const postData = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password
        };
        registerUser(postData);
    };

    function registerUser(postData) {
        axios
            .post("http://localhost:3000/api/user/register/", postData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data == 1) {
                    setProgress(false);
                    history.push("/login");
                } else {
                    setProgress(false);
                    setError(
                        "Error !"
                    );
                }
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    }

    if (JSON.parse(localStorage["authStorage"]).isLoggedIn) {
        history.push("/");
        return <></>;
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
        </Typography>
                    <form className={classes.form} onSubmit={handleRegister} >
                        <h6
                            style={{ color: "red" }}
                            className="text-center"
                        >
                            {error}
                        </h6>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={event =>
                                        setPrenom(event.target.value)
                                    }
                                    value={prenom}
                                    autoComplete="off"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onChange={event =>
                                        setNom(event.target.value)
                                    }
                                    value={nom}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    value={email}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                    value={password}
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
          </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}