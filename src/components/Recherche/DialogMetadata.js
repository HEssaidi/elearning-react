import React, { useState, useEffect } from "react";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Fab from "@material-ui/core/Fab";
import GetAppIcon from "@material-ui/icons/GetApp";

export default function DialogMetadata(props) {
    const [inputList, setInputList] = useState([]);
    const [concepts, setConcepts] = useState([]);

    async function fetchConcepts(
        chapitre_id,
        matiere_id,
        filiere_id,
        enseignant_id
    ) {
        try {
            const response = await fetch(
                "/api/concepts_by_chapitre_matiere_filiere_enseignant/" +
                chapitre_id +
                "/" +
                matiere_id +
                "/" +
                filiere_id +
                "/" +
                enseignant_id
            );
            const result = await response.json();
            if (result.length > 0) {
                setConcepts(result);
            } else {
                setConcepts([]);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleClose = () => {
        props.handleClose();
    };

    useEffect(() => {
        console.log("inner index is === ", props.index);
        fetchConcepts(
            props.objet.chapitre,
            props.objet.matiere_id,
            props.objet.filiere_id,
            props.objet.user_id
        );

        axios
            .get("/api/get_concept_inputlist/" + props.objet.concepts)
            .then(result => {
                setInputList(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.open]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Méta-données</DialogTitle>
                {/* <Grid container> */}
                <Grid align="center" item xs={12}>
                    <Fab
                        // style={{ margin: 7 }}
                        variant="extended"
                        aria-label="download"
                        component="a"
                        href={props.objet.mediaLink}
                        target="_blank"
                    >
                        <GetAppIcon />
                        Télécharger
                    </Fab>{" "}
                    {/* <Fab style={{ margin: 7 }} aria-label="like">
                                <FavoriteIcon />
                                
                            </Fab> */}
                </Grid>
                {/* </Grid> */}
                <br />
                <DialogContent>
                    <DialogContentText style={{ paddingTop: 20 }}>
                        Informations sur le fichier :
                    </DialogContentText>
                    <Grid container>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Date de création :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.date}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Type de fichier :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.type}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Taille :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.taille}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Proprietaire :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.fullname}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <DialogContentText style={{ paddingTop: 20 }}>
                        Méta-données de l'objet :
                    </DialogContentText>
                    <Grid container>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Titre :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.titre}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Description :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.description}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Langue :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.langue_text}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Mots-clé :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.keywords}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Type d'objet :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.type_text}
                                </Box>
                            </Typography>
                        </Grid>

                        {props.objet.extra.map((x, i) => {
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
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Cycle :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.mCycle}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Filière :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.filiere}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Matière :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.matiere}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <DialogContentText style={{ paddingTop: 20 }}>
                        Les concepts traités par l'objet :
                    </DialogContentText>
                    <Grid container>
                        <Grid align="right" item xs={4}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Chapitre :
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" m={1}>
                                    {props.objet.chapitre_nom}
                                </Box>
                            </Typography>
                        </Grid>

                        {/* </React.Fragment> */}
                        {inputList.length !== 0 &&
                            inputList.map((x, i) => {
                                return (
                                    <Grid
                                        // style={{ marginTop: 20 }}
                                        key={i}
                                        container
                                    // spacing={2}
                                    >
                                        <Grid align="right" item xs={4}>
                                            <Typography component="div">
                                                <Box
                                                    fontWeight="fontWeightRegular"
                                                    m={1}
                                                >
                                                    {x.concept} :
                                                </Box>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <div style={{ marginTop: 7 }}>
                                                <Typography component="div">
                                                    <Box
                                                        fontWeight="fontWeightRegular"
                                                        m={1}
                                                    >
                                                        <Rating
                                                            name="simple-controlled"
                                                            value={x.degre}
                                                            readOnly
                                                            name="degre"
                                                        />
                                                    </Box>
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
