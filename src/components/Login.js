import React, { useState, useEffect } from "react";
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UploadProgress from "./UploadProgress";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                E-learning
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url( https://source.unsplash.com/2JIvboGLeho)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SignInSide({ login, history }) {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(false);
    const [connectedUser, setConnectedUser] = useState({});
    const [user, setUser] = useState(
        JSON.parse(localStorage["authStorage"]).user
    );
    const [isLoggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage["authStorage"]).isLoggedIn
    );


    const handleLogin = e => {
        e.preventDefault();
        // if (
        //     validator.isLength(email, { min: 6, max: undefined }) &&
        //     validator.isLength(password, { min: 6, max: undefined })
        // ) {
        setError("");
        setProgress(true);
        const postData = { email: email, password: password };
        loginUser(postData);
        // } else {
        // setProgress(false);
        // setError("L'identifiant ou le mot de passe est incorrecte !");
        // }
    };

    function loginUser(postData) {

        console.log("postdata == ", postData)
        axios
            .post("http://localhost:3000/api/user/login/", postData)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.data.success == 1) {
                    //     // alert("Login Successful!");
                    //     // this.props.history.push("/");
                    const {
                        nom,
                        prenom,
                        _id,
                        email
                    } = json.data.user;

                    //     console.log("Bonjour ", nom, prenom);

                    let userData = {
                        nom: nom,
                        prenom: prenom,
                        id: _id,
                        email: email,
                        // role_id: role_id,
                        // ecole_id: ecole_id,
                        // active: active
                    };

                    setConnectedUser(userData);

                    //     if (active == 0 || active == 2) {
                    setProgress(false);
                    //         setOpen(true);
                    //     } else {
                    let authStorage = {
                        isLoggedIn: true,
                        user: userData
                    };
                    //         // save app state with user data in local storage
                    localStorage["authStorage"] = JSON.stringify(authStorage);
                    setUser(JSON.parse(localStorage["authStorage"]).user);
                    setLoggedIn(
                        JSON.parse(localStorage["authStorage"]).isLoggedIn
                    );

                    //         if (role_id == 1) {
                    //             console.log("vous etes super admin");
                    //             history.push("/dashboard/super_admin");
                    //         } else if (role_id == 2) {
                    //             console.log("vous etes admin");
                    //             history.push("/dashboard/admin");
                    //         } else if (role_id == 3) {
                    //             console.log("vous etes inspecteur");
                    //             history.push("/dashboard/inspecteur");
                    //         } else if (role_id == 4) {
                    //             console.log("vous etes enseignant");
                    //             history.push("/dashboard/enseignant");
                    //         } else if (role_id == 5) {
                    //             console.log("vous etes eleve");
                    //             history.push("/dashboard/eleve");
                    //         } else {
                    //             console.log("vous etes une erreur !");
                    //             history.push("/");
                    //         }

                    //         // switch (role_id) {
                    //         //     case 1:
                    //         //         console.log("vous etes super admin");
                    //         //         history.push("/dashboard/super_admin");
                    //         //         break;
                    //         //     case 2:
                    //         //         console.log("vous etes admin");
                    //         //         history.push("/dashboard/admin");
                    //         //         break;
                    //         //     case 3:
                    //         //         console.log("vous etes inspecteur");
                    //         //         history.push("/dashboard/inspecteur");
                    //         //         break;
                    //         //     case 4:
                    //         //         console.log("vous etes enseignant");
                    //         //         history.push("/dashboard/enseignant");
                    //         //         break;
                    //         //     case 5:
                    //         //         console.log("vous etes eleve");
                    //         //         history.push("/dashboard/eleve");
                    //         //         break;
                    //         //     default:
                    //         //         console.log("vous etes une erreur !");
                    //         //         history.push("/");
                    //         //         break;
                    //         // }
                    // history.push("/recherche");
                    window.location.reload();
                    //     }
                } else {
                    setProgress(false);
                    setError(
                        "L'identifiant ou le mot de passe est incorrecte !"
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
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
          </Typography>

                        <form className={classes.form} onSubmit={handleLogin} noValidate>
                            <h6
                                style={{ color: "red" }}
                                className="text-center"
                            >
                                {error}
                            </h6>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={event =>
                                    setEmail(event.target.value)
                                }
                                value={email}
                                autoComplete="off"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>

                    </div>
                    <UploadProgress
                        progress={progress}
                    ></UploadProgress>
                </Grid>

            </Grid>
        );
    }
}