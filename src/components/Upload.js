import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { MDBCard, MDBCardBody } from "mdbreact";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DropzoneDialog } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import UploadProgress from "./UploadProgress";
// import AlertMessage from "../../AlertMessage";
// import AlertError from "../../AlertError";
// import Breadcrumbs from "../../Breadcrumbs";
// import EnseignantMenu from "./../EnseignantMenu";
import AddIcon from "@material-ui/icons/Add";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { values } from "lodash";

const langues = [
    {
        id: "العربية",
        nom: "العربية"
    },
    {
        id: "English",
        nom: "English"
    },
    {
        id: "Français",
        nom: "Français"
    },
    {
        id: "Español",
        nom: "Español"
    },
    {
        id: "Deutsch",
        nom: "Deutsch"
    },
    {
        id: "русский",
        nom: "русский"
    },
    {
        id: "日本人",
        nom: "日本人"
    },

];

const objetTypes = [
    {
        id: "Cours",
        nom: "Cours"
    },
    {
        id: "Exercice",
        nom: "Exercice"
    },
    {
        id: "Corrigé",
        nom: "Corrigé"
    },
    {
        id: "Serie",
        nom: "Serie"
    },
    {
        id: "Atelier",
        nom: "Atelier"
    },
    {
        id: "Rapport",
        nom: "Rapport"
    },
    {
        id: "Présentation",
        nom: "Présentation"
    },

];

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function Upload(props) {
    const classes = useStyles();
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");

    const [keywords, setKeywords] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState("");

    const [progress, setProgress] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertError, setAlertError] = useState(false);

    const [langue, setLangue] = useState(0);
    const [TypeObjet, setTypeObjet] = useState(0);

    // const [langues, setLangues] = useState([]);
    // const [objetTypes, setObjetTypes] = useState([]);

    const [inputList, setInputList] = useState([{ concept: "", degre: 1 }]);
    const [metadataList, setMetadataList] = useState([]);

    const errorFile = useRef(null);
    const errorTitre = useRef(null);
    const errorDescription = useRef(null);
    const errorLangue = useRef(null);
    const errorType = useRef(null);

    const fetchLangues = () => {
        // axios
        //     .get(`/api/langues`)
        //     .then(result => {
        //         // console.log(result);
        //         setLangues(result.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };
    const fetchTypes = () => {
        // axios
        //     .get(`/api/types`)
        //     .then(result => {
        //         // console.log(result);
        //         setObjetTypes(result.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };

    const handleTitreChange = event => {
        // console.log("in titre change");
        setTitre(event.target.value);
        errorTitre.current.style.display = "none";
    };
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
        errorDescription.current.style.display = "none";
    };
    const handleKeywordsChange = event => {
        setKeywords(event.target.value);
        // errorKeywords.current.style.display = "none";
    };

    const handleLangueChange = event => {
        setLangue(event.target.value);
        // errorLangue.current.style.display = "none";
    };
    const handleTypeObjetChange = event => {
        setTypeObjet(event.target.value);
        // errorType.current.style.display = "none";
    };

    const myStyle = {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20
    };

    const handleInputMetaChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...metadataList];
        list[index][name] = value;
        setMetadataList(list);
    };

    const handleSliderChange = (e, v, index) => {
        // const list = [...inputList];
        // list[index]["degre"] = v;
        // setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        // const list = [...inputList];
        // list.splice(index, 1);
        // setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        // setInputList([...inputList, { concept: "", degre: 1 }]);
    };

    const handleRemoveMetaClick = index => {
        const list = [...metadataList];
        list.splice(index, 1);
        setMetadataList(list);
    };

    // handle click event of the Add button
    const handleAddMetaClick = () => {
        setMetadataList([...metadataList, { cle: "", valeur: "" }]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = files => {
        setFiles(files);
        setFileName(files[0].name);
        setOpen(false);
        errorFile.current.style.display = "none";
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const validateForm = () => {
        if (files.length < 1) {
            errorFile.current.style.display = "block";
            return false;
        } else if (titre == "") {
            errorTitre.current.style.display = "block";
            return false;
        } else if (description == "") {
            errorDescription.current.style.display = "block";
            return false;
        } else {
            return true;
        }

    };

    const handleUpload = e => {
        e.preventDefault();
        // console.log("la validata == " + validateForm());
        console.log("hello");
        if (validateForm()) {
            setProgress(true);

            // let ext = fileName.split(".").slice(-1)[0];

            console.log("titre == ", titre);
            const data = new FormData();
            data.append("file", files[0]);
            data.append("auteur", JSON.parse(localStorage["authStorage"]).user.id);
            data.append("titre", titre);
            data.append("description", description);
            if (langue != 0) {
                data.append("langue", langue);
            }
            if (TypeObjet != 0) {
                data.append("type", TypeObjet);
            }
            data.append("keywords", keywords);
            data.append("extention", fileName.split(".").slice(-1)[0]);
            // data.append("metadata", JSON.stringify(metadataList));

            // console.log("ha chno ghadi nsifat == ", data.titre);
            // console.log("Ext == ", ext);

            // const mData = { titre: titre, description: description }
            terminer(data);
        }
    };

    const terminer = postData => {
        // for (var [key, value] of postData.entries()) {
        //     console.log("data ===", key, value);
        // }
        axios
            .post("http://localhost:3000/api/upload", postData)
            .then(response => {
                console.log("LA POSTA :" + postData);
                console.log("LA RESPONSA :" + response);
                // if (response.success) {
                setFiles([]);
                setTitre("");
                setDescription("");

                setProgress(false);
                //             setAlert(true);
                const timer = setTimeout(() => {
                    // setAlert(false);
                }, 3000);
                props.history.push("/recherche");
                // } else {
                //     setProgress(false);
                //         console.log("MOCHKILA MN BACKEND");
                // }
            })
            .catch(error => {
                console.log(error.response.data.errors);
                setProgress(false);
                setAlertError(true);
                const timer = setTimeout(() => {
                    // setAlertError(false);
                }, 7000);
            });
    };
    useEffect(() => {
    }, [alert]);

    if (!JSON.parse(localStorage["authStorage"]).isLoggedIn) {
        console.log("Ma mconnectich");
        props.history.push('/login');
        return <></>;
    } else {
        console.log("mconnecté");
        return (
            <div>
                {/* <Breadcrumbs />
            <EnseignantMenu /> */}
                <Container component="main" maxWidth="sm">
                    {/* <CssBaseline /> */}
                    <MDBCard>
                        <MDBCardBody>
                            <div style={myStyle} className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    Stockage des objets
                                </Typography>
                                <form
                                    className={classes.form}
                                    onSubmit={handleUpload}
                                    autoComplete="off"
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div>
                                                <p>{fileName}</p>
                                                <Button
                                                    variant="outlined"
                                                    color="default"
                                                    style={{ height: 53 }}
                                                    fullWidth
                                                    startIcon={
                                                        <AttachFileIcon />
                                                    }
                                                    onClick={handleOpen}
                                                >
                                                    Attacher un fichier
                                                </Button>

                                                <DropzoneDialog
                                                    // required
                                                    open={isOpen}
                                                    ref={errorFile}
                                                    filesLimit={1}
                                                    name="mFile"
                                                    onSave={handleSave}
                                                    acceptedFiles={[
                                                        "application/pdf", //Les documents .PDF
                                                        "application/msword", //Microsoft Word .DOC
                                                        "application/vnd.ms-excel", //Excel .XLS
                                                        "application/vnd.ms-powerpoint", //Power Point .PPT
                                                        "application/vnd.ms-access", //Access .MDB
                                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //Microsoft Word .DOCX
                                                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", //Excel .XLSX
                                                        "application/vnd.openxmlformats-officedocument.presentationml.presentation", //Power Point .PPTX
                                                        "application/x-rar-compressed", //Compressé .RAR
                                                        "application/octet-stream", //Compressé .RAR
                                                        "application/zip", //Compressé .ZIP
                                                        "application/x-zip-compressed", //Compressé .ZIP
                                                        "multipart/x-zip", //Compressé .ZIP
                                                        "image/*", //Les images
                                                        "video/mp4", //Les vidéos .MP4
                                                        "video/x-flv", //Les vidéos .FLV
                                                        "audio/mpeg" //Audio
                                                    ]}
                                                    showPreviews={true}
                                                    maxFileSize={1000000000}
                                                    onClose={handleClose}
                                                />

                                                <p
                                                    style={{
                                                        color: "red",
                                                        display: "none"
                                                    }}
                                                    ref={errorFile}
                                                >
                                                    Vous devez choisir un
                                                    fichier
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                // required
                                                fullWidth
                                                id="titre"
                                                label="Titre"
                                                name="titre"
                                                autoComplete="off"
                                                value={titre}
                                                onChange={handleTitreChange}
                                            />
                                            <p
                                                style={{
                                                    color: "red",
                                                    display: "none"
                                                }}
                                                ref={errorTitre}
                                            >
                                                Vous devez donner un titre
                                            </p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="description"
                                                label="Description"
                                                multiline
                                                // required
                                                fullWidth
                                                rows={3}
                                                variant="outlined"
                                                value={description}
                                                onChange={
                                                    handleDescriptionChange
                                                }
                                            />
                                            <p
                                                style={{
                                                    color: "red",
                                                    display: "none"
                                                }}
                                                ref={errorDescription}
                                            >
                                                Vous devez donner une
                                                description
                                            </p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="langue"
                                                select
                                                label="Langue"
                                                fullWidth
                                                // required
                                                value={langue}
                                                onChange={handleLangueChange}
                                                SelectProps={{
                                                    native: true
                                                }}
                                                // helperText="Merci de choisir la langue"
                                                variant="outlined"
                                            >
                                                <option
                                                    hidden
                                                    key={0}
                                                    value={0}
                                                >
                                                    Langue
                                                </option>
                                                {langues.map(option => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                    >
                                                        {option.nom}
                                                    </option>
                                                ))}
                                            </TextField>
                                            <p
                                                style={{
                                                    color: "red",
                                                    display: "none"
                                                }}
                                                ref={errorLangue}
                                            >
                                                Vous devez choisir la langue
                                            </p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="keywords"
                                                label="Mots clé"
                                                multiline
                                                // required
                                                fullWidth
                                                helperText="Utilisez la virgule pour la séparation, ex: maths, fonctions, ..."
                                                rows={2}
                                                variant="outlined"
                                                value={keywords}
                                                onChange={handleKeywordsChange}
                                            />
                                            {/* <p
                                            style={{
                                                color: "red",
                                                display: "none"
                                            }}
                                            ref={errorKeywords}
                                        >
                                            Vous devez donner au moins un
                                            mot clé
                                            </p> */}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="type"
                                                select
                                                label="Type"
                                                fullWidth
                                                style={{ paddingBottom: 20 }}
                                                // required
                                                value={TypeObjet}
                                                onChange={handleTypeObjetChange}
                                                SelectProps={{
                                                    native: true
                                                }}
                                                // helperText="Merci de choisir le type"
                                                variant="outlined"
                                            >
                                                <option
                                                    hidden
                                                    key={0}
                                                    value={0}
                                                >
                                                    Type
                                                </option>
                                                {objetTypes.map(option => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                    >
                                                        {option.nom}
                                                    </option>
                                                ))}
                                            </TextField>
                                            <p
                                                style={{
                                                    color: "red",
                                                    display: "none"
                                                }}
                                                ref={errorType}
                                            >
                                                Vous devez choisir un type
                                            </p>
                                        </Grid>
                                    </Grid>
                                    {metadataList.map((x, i) => {
                                        return (
                                            <Grid key={i} container spacing={2}>
                                                <Grid item xs={12} sm={5}>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        label="La clé"
                                                        name="cle"
                                                        required
                                                        autoComplete="off"
                                                        onChange={e =>
                                                            handleInputMetaChange(
                                                                e,
                                                                i
                                                            )
                                                        }
                                                        value={x.cle}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={5}>
                                                    <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                        size="small"
                                                        label="La valeur"
                                                        name="valeur"
                                                        autoComplete="off"
                                                        value={x.valeur}
                                                        onChange={e =>
                                                            handleInputMetaChange(
                                                                e,
                                                                i
                                                            )
                                                        }
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={2}>
                                                    <IconButton
                                                        color="default"
                                                        aria-label="delete matiere"
                                                        component="span"
                                                    >
                                                        <DeleteIcon
                                                            onClick={() =>
                                                                handleRemoveMetaClick(
                                                                    i
                                                                )
                                                            }
                                                        />
                                                    </IconButton>
                                                    {/* <IconButton
                                                        color="secondary"
                                                        aria-label="add concept"
                                                        onClick={() =>
                                                            handleRemoveMetaClick(
                                                                i
                                                            )
                                                        }
                                                    >
                                                        <RemoveCircleIcon />
                                                    </IconButton> */}
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                    <Grid item xs={12} sm={12}>
                                        <Button
                                            style={{
                                                marginTop: 16
                                            }}
                                            onClick={handleAddMetaClick}
                                            fullWidth
                                            variant="contained"
                                        >
                                            Ajouter des méta-données
                                        </Button>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Terminer
                                    </Button>
                                    <Grid item xs={12}></Grid>
                                    <Grid item xs={12}>
                                        <UploadProgress
                                            progress={progress}
                                        ></UploadProgress>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* <AlertMessage
                                        alert={alert}
                                        message="Votre objet a été stocké avec succès"
                                    ></AlertMessage>
                                    <AlertError
                                        alert={alertError}
                                        message="Désolé, il y a un problème avec ce fichier"
                                    ></AlertError> */}
                                    </Grid>
                                </form>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </Container>
            </div>
        );
    }
}

export default Upload;
