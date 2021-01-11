import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles, styled } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ObjectsList from "./ObjectsList";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Fab from "@material-ui/core/Fab";
import GetAppIcon from "@material-ui/icons/GetApp";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Footer from "../Footer";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DialogEditCommentaire from "./DialogEditCommentaire";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%"
    },
    container: {
        maxHeight: 550
    },
    paper: {
        backgroundColor: "white"
    }
}));

export default function ObjectDetails(props) {
    const classes = useStyles();

    const [object, setObject] = useState({});
    const [extras, setExtras] = useState([]);
    const [auteur, setAuteur] = useState({ nom: "", prenom: "" });
    const [rating, setRating] = useState(0);
    const [taille, setTaille] = useState("");
    const [commentaire, setCommentaire] = useState("");
    const [commentaires, setCommentaires] = useState([]);
    const [value, setValue] = React.useState(0);
    const [refresh, setRefresh] = useState(0);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [commentaireToEdit, setCommentaireToEdit] = useState("");

    // const handleSearch = data => {
    //     // e.preventDefault();
    //     setEmpty(false);
    //     setRows([]);
    //     // var data = {};

    //     getObjects(data);
    // };

    // onChange={(event, newValue) => {
    //     setValue(newValue);
    //   }}

    function humanFileSize(bytes, si = true, dp = 1) {
        const thresh = si ? 1000 : 1024;

        if (Math.abs(bytes) < thresh) {
            return bytes + " B";
        }

        const units = si
            ? ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
            : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (
            Math.round(Math.abs(bytes) * r) / r >= thresh &&
            u < units.length - 1
        );

        return bytes.toFixed(dp) + " " + units[u];
    }

    function get_extra_md(metadata) {
        let objectKeys = Object.keys(metadata);
        let standardKeys = [
            "_id",
            "titre",
            "description",
            "auteur",
            "owner",
            "createdAt",
            "extention",
            "taille",
            "rating",
            "updatedAt",
            "url",
            "__v",
            "__proptp__",
            "discussion",
            "date",
            "reviews",
        ];

        let extraMetadataKeys = objectKeys.filter(x => !standardKeys.includes(x));

        let extraMetadataObjects = [];

        for (let n = 0; n < extraMetadataKeys.length; n++) {
            let obj = {
                cle: extraMetadataKeys[n],
                valeur: metadata[extraMetadataKeys[n]]
            };

            extraMetadataObjects.push(obj);
        }

        // console.log("Extraaa == ", extraMetadataObjects);

        return extraMetadataObjects;
    }


    async function getObjectById(id) {
        // console.log("ID == ", id);
        axios
            .get("http://localhost:3000/api/objet/" + id)
            .then(response => {
                console.log("get objet by id ==> ", response.data.data);
                let extra = get_extra_md(response.data.data);
                console.log("EXTRA == ", extra);
                let mTaille = humanFileSize(response.data.data.taille);
                setExtras(extra);
                setTaille(mTaille);
                setObject(response.data.data);
                setAuteur(response.data.data.owner);
                setRating(response.data.data.rating);
                console.log("commentaires =====> ", response.data.data.discussion);
                setCommentaires(response.data.data.discussion.reverse());
                // console.log("nom ==> ", response.data.data.auteur.nom);
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    }

    const handleRemoveComment = (objet_id, comment_id) => {
        const postData = {
            objet_id: objet_id,
            commentaire_id: comment_id,
        };
        console.log(
            "objet == " + postData.objet_id + " comment == " + postData.commentaire_id
        );
        axios
            .delete(
                "http://localhost:3000/api/discussion/supprimer/" +
                postData.objet_id +
                "/" +
                postData.commentaire_id
            )
            .then((response) => {
                console.log(response.data.success);
                if (response.data.success == 1) {
                    if (refresh == 1) {
                        setRefresh(0);
                    } else {
                        setRefresh(1);
                    }
                }
            })
            .catch((error) => {
                console.log(error.response.data.errors);
            });
    };

    const handleEditDialogOpen = (commentaire_id) => {
        setCommentaireToEdit(commentaire_id);
        setEditDialogOpen(true);
    };
    const handleClose = () => {
        setEditDialogOpen(false);
    };
    const handleCommentChange = event => {
        setCommentaire(event.target.value);
        // fetchConcepts(event.target.value, matiere, filiere);
    };

    const handleRatingChange = newVal => {
        let mRating = 0;
        if (newVal == null) {
            mRating = rating;
            console.log("new val = ", rating);
        } else {
            mRating = newVal;
            console.log("new val = ", newVal);
        }

        let id_user = JSON.parse(localStorage["authStorage"]).user.id;
        let data = {
            idUser: id_user,
            valueRat: mRating
        }
        sendRating(data)
        // fetchConcepts(event.target.value, matiere, filiere);
    };

    const sendRating = postData => {
        let object_id = props.match.params.object_id;
        axios
            .put("http://localhost:3000/api/rating/" + object_id, postData)
            .then(response => {
                console.log("SUCCESS !!")
                getObjectById(props.match.params.object_id);
            })
            .catch(error => {
                console.log(error.response.data.errors);
            });
    };

    const handleEnvoyer = e => {
        e.preventDefault();
        console.log("Comment == ", commentaire);
        if (JSON.parse(localStorage["authStorage"]).isLoggedIn) {
            const postData = {
                objet_id: props.match.params.object_id,
                user_id: JSON.parse(localStorage["authStorage"]).user.id,
                message: commentaire
            }
            envoyer(postData);
        } else {
            props.history.push('/login');
        }

    }

    const envoyer = postData => {
        axios
            .post("http://localhost:3000/api/discussion/commenter", postData)
            .then(response => {
                setCommentaire("");
                getObjectById(props.match.params.object_id);
            })
            .catch(error => {
                console.log(error.response.data.errors);
            });
    };

    useEffect(() => {
        getObjectById(props.match.params.object_id);
    }, [refresh, editDialogOpen]);

    const myStyle = {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20
    };

    return (
        <div className={classes.paper}>
            <Container style={{ paddingTop: 46 }} component="main" maxWidth="md">
                <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                    {object.titre}
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    {object.description}
                </Typography>
                <Grid container>

                    <Grid item md={6} xs={12}>
                        <Grid container>
                            <Grid align="right" item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" m={1}>
                                        Date de création :
                                </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" m={1}>
                                        {object.createdAt}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid align="right" item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" m={1}>
                                        Type de fichier :
                                </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" m={1}>
                                        {object.extention}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid align="right" item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" m={1}>
                                        Taille :
                                </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" m={1}>
                                        {taille}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid align="right" item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" m={1}>
                                        Proprietaire :
                                </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" m={1}>
                                        {auteur.prenom}{" "}{auteur.nom}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid align="right" item xs={6}>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" m={1}>
                                        Rating :
                                </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component="div">
                                    <Box
                                        fontWeight="fontWeightRegular"
                                        m={1}
                                    >
                                        <Rating
                                            name="simple-controlled"
                                            value={rating}
                                            precision={0.5}
                                            onChange={(event, newValue) => {
                                                handleRatingChange(newValue)
                                            }}
                                            name="degre"
                                        />
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid item md={6} xs={12}>
                        {extras.map((x, i) => {
                            return (
                                <Grid key={i} container>
                                    <Grid align="right" item xs={4}>
                                        <Typography component="div">
                                            <Box
                                                fontWeight="fontWeightRegular"
                                                m={1}
                                            >
                                                {x.cle} :
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography component="div">
                                            <Box
                                                fontWeight="fontWeightMedium"
                                                m={1}
                                            >
                                                {x.valeur}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid style={{ margin: 20 }} item align="center" xs={12}>
                    <Fab
                        // style={{ margin: 7 }}
                        variant="extended"
                        aria-label="download"
                        component="a"
                        href={object.url}
                        download
                        target="_blank"
                    >
                        <GetAppIcon />
                        Télécharger
                    </Fab>
                </Grid>
                <Divider />
                {/* </Container> */}
                {/* <Container component="main" maxWidth="md"> */}
                <Grid styl className={classes.root} container spacing={2}>

                    <Grid item xs={1}>
                        <Avatar src="/broken-image.jpg" />
                    </Grid>
                    <Grid style={{ marginLeft: -10 }} item xs={11}>
                        <TextField
                            id="standard-textarea"
                            fullWidth
                            rows={3}
                            label="Ajouter un commentaire ..."
                            value={commentaire}
                            onChange={handleCommentChange}
                            // placeholder="Placeholder"
                            multiline
                        />
                    </Grid>
                </Grid>
                <Grid style={{ marginTop: 10 }} item align="right" xs={12}>
                    <Button onClick={handleEnvoyer} variant="contained" color="primary">
                        Envoyer
                </Button>
                </Grid>
                {commentaires.map((comment) => (
                    <Grid
                        style={{
                            borderRadius: 15,
                            backgroundColor: "#dadfe3",
                            padding: 20,
                            marginTop: 20,
                            marginBottom: 1,
                        }}
                        className={classes.root}
                        container
                        spacing={2}
                    >
                        {/* <Grid item align="right" xs={12}>
                           
                        </Grid> */}

                        <Grid item xs={2}>
                            <Avatar src="/broken-image.jpg" />
                        </Grid>
                        <Grid style={{ marginLeft: -93 }} item xs={8}>
                            <Grid item xs={12}>
                                <Typography
                                    style={{ fontWeight: "bold" }}
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    {comment.owner.nom} {comment.owner.prenom}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    style={{
                                        color: "gray",
                                        marginTop: -8,
                                        marginBottom: -10,
                                        marginLeft: 5,
                                    }}
                                    gutterBottom
                                >
                                    {comment.date}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid style={{ marginLeft: 90 }} align="right" item xs={2}>
                            <IconButton
                                color="default"
                                disabled={
                                    comment.owner.id !==
                                    JSON.parse(localStorage["authStorage"]).user.id
                                }
                                // style={{ color: "red" }}
                                size="small"
                                aria-label="delete filiere"
                                component="span"
                            >
                                <DeleteIcon
                                    onClick={() => {
                                        handleRemoveComment(object._id, comment._id);
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                color="default"
                                disabled={
                                    comment.owner.id !==
                                    JSON.parse(localStorage["authStorage"]).user.id
                                }
                                size="small"
                                aria-label="edit filiere"
                                component="span"
                            >
                                <EditIcon
                                    onClick={() => {
                                        handleEditDialogOpen(comment);
                                    }}
                                />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                {comment.message}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
                <DialogEditCommentaire
                    open={editDialogOpen}
                    handleClose={handleClose}
                    objet={object}
                    commentaire={commentaireToEdit}
                ></DialogEditCommentaire>
            </Container>

            <Footer />
        </div >
    );
}
