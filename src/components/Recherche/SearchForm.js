import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { MDBCard, MDBCardBody } from "mdbreact";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

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
    },
    table: {
        minWidth: 700
    },
    margin: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));
function createData(id, nom, description) {
    return { id, nom, description };
}
export default function SearchForm(props) {
    const classes = useStyles();

    const [cycles, setCycles] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [chapitres, setChapitres] = useState([]);
    const [concepts, setConcepts] = useState([]);
    const [typesFichier, setTypesFichier] = useState([]);
    const [typesPed, setTypesPed] = useState([]);

    const [cycle, setCycle] = useState("");
    const [filiere, setFiliere] = useState("");
    const [matiere, setMatiere] = useState("");
    const [chapitre, setChapitre] = useState("");
    const [concept, setConcept] = useState("");
    const [typeFichier, setTypeFichier] = useState("");
    const [typePed, setTypePed] = useState("");
    const [keywords, setKeywords] = useState("");
    const [admin, setAdmin] = useState("");
    const [ecole, setEcole] = useState("");

    async function fetchCycles() {
        // try {
        //     const response = await fetch("/api/cycles");
        //     const result = await response.json();
        //     console.log("CYCLES ========= ", result);
        //     //fetchFilieres(result[0].id);
        //     setCycles(result);
        //     //setCycle(result[0].id);
        // } catch (error) {
        //     console.log("error", error);
        // }
    }
    async function getAdminByEcole() {
        // if (JSON.parse(localStorage["authState"]).user.role_id != 2) {
        //     let ecole_id = JSON.parse(localStorage["authState"]).user.ecole_id;
        //     try {
        //         const response = await fetch(
        //             "/api/get_admin_by_ecole/" + ecole_id
        //         );
        //         const result = await response.json();
        //         console.log("ECOLE ========= ", result);
        //         setAdmin(result.admin_id);
        //         fetchTypes(result.admin_id);
        //     } catch (error) {
        //         console.log("error", error);
        //     }
        // }
    }

    async function getEcole() {
        // if (JSON.parse(localStorage["authState"]).user.role_id == 2) {
        //     fetchTypes(JSON.parse(localStorage["authState"]).user.id);
        //     let admin_id = JSON.parse(localStorage["authState"]).user.id;
        //     try {
        //         const response = await fetch("/api/ecole_by_admin/" + admin_id);
        //         const result = await response.json();
        //         console.log("==== ", result);
        //         setEcole(result.id);
        //     } catch (error) {
        //         console.log("error", error);
        //     }
        // }
    }

    async function fetchFilieres(cycle_id) {
        // var admin_id = 0;
        // if (JSON.parse(localStorage["authState"]).user.role_id == 2) {
        //     admin_id = JSON.parse(localStorage["authState"]).user.id;
        // } else {
        //     admin_id = admin;
        // }
        // // let user_id = JSON.parse(localStorage["authState"]).user.id;
        // try {
        //     const response = await fetch(
        //         "/api/get_filieres/" + cycle_id + "/" + admin_id
        //     );
        //     const result = await response.json();
        //     if (result.length > 0) {
        //         setFilieres(result);
        //         // setFiliere(result[0].id);
        //         // fetchMatieres(result[0].id);
        //     } else {
        //         setFiliere("");
        //         setMatiere("");
        //         setChapitre("");
        //         setConcept("");
        //         setFilieres([]);
        //         setMatieres([]);
        //         setChapitres([]);
        //         setConcepts([]);
        //     }
        // } catch (error) {
        //     console.log("error", error);
        // }
    }

    async function fetchMatieres(filiere_id) {
        // var admin_id = 0;
        // if (JSON.parse(localStorage["authState"]).user.role_id == 2) {
        //     admin_id = JSON.parse(localStorage["authState"]).user.id;
        // } else {
        //     admin_id = admin;
        // }
        // try {
        //     const response = await fetch(
        //         "/api/matieres_by_filiere_ecole/" + filiere_id + "/" + admin_id
        //     );
        //     const result = await response.json();
        //     // fetchChapitres(result[0].mf_id);
        //     if (result.length > 0) {
        //         setMatieres(result);
        //         // setMatiere(result[0].id);
        //         // fetchChapitres(result[0].id, filiere_id);
        //     } else {
        //         setMatiere("");
        //         setChapitre("");
        //         setConcept("");
        //         setMatieres([]);
        //         setChapitres([]);
        //         setConcepts([]);
        //     }
        // } catch (error) {
        //     console.log("error", error);
        // }
    }

    async function fetchChapitres(matiere_id, filiere_id) {
        // let objects = [];
        // let obj = {};
        // var admin_id = 0;
        // if (JSON.parse(localStorage["authState"]).user.role_id == 2) {
        //     admin_id = JSON.parse(localStorage["authState"]).user.id;
        // } else {
        //     admin_id = admin;
        // }
        // try {
        //     const response = await fetch(
        //         "/api/chapitres_by_matiere_filiere_ecole/" +
        //         matiere_id +
        //         "/" +
        //         filiere_id +
        //         "/" +
        //         admin_id
        //     );
        //     const result = await response.json();
        //     if (result.length > 0) {
        //         console.log("RESPONSE = ", result);
        //         result.forEach(o => {
        //             obj = createData(o.id, o.nom, o.description);
        //             objects.push(obj);
        //         });
        //         setChapitres(objects);
        //         // setChapitre(result[0].id);
        //         // fetchConcepts(result[0].id, matiere_id, filiere_id);
        //     } else {
        //         setChapitre("");
        //         setConcept("");
        //         setChapitres([]);
        //         setConcepts([]);
        //     }
        //     //
        // } catch (error) {
        //     console.log("error", error);
        // }
    }

    async function fetchConcepts(chapitre_id, matiere_id, filiere_id) {
        // let objects = [];
        // let obj = {};
        // var admin_id = 0;
        // if (JSON.parse(localStorage["authState"]).user.role_id == 2) {
        //     admin_id = JSON.parse(localStorage["authState"]).user.id;
        // } else {
        //     admin_id = admin;
        // }
        // try {
        //     const response = await fetch(
        //         "/api/concepts_by_chapitre_matiere_filiere_ecole/" +
        //         chapitre_id +
        //         "/" +
        //         matiere_id +
        //         "/" +
        //         filiere_id +
        //         "/" +
        //         admin_id
        //     );
        //     const result = await response.json();
        //     console.log("RESPONSE = ", result);
        //     result.forEach(o => {
        //         obj = createData(o.id, o.nom, o.description);
        //         objects.push(obj);
        //     });
        //     setConcepts(result);
        //     // setConcept(result[0].id);
        // } catch (error) {
        //     console.log("error", error);
        // }
    }

    async function fetchTypes(admin_id) {
        // try {
        //     const response = await fetch("/api/get_types_by_admin/" + admin_id);
        //     const result = await response.json();
        //     if (result.length > 0) {
        //         setTypesPed(result);
        //         // setFiliere(result[0].id);
        //         // fetchMatieres(result[0].id);
        //     } else {
        //         setTypePed("");
        //         setTypesPed([]);
        //     }
        // } catch (error) {
        //     console.log("error", error);
        // }
    }

    // const fetchTypes = () => {
    //     var admin_id = 0;
    //     if (JSON.parse(localStorage["authState"]).user.role_id == 2) {
    //         admin_id = JSON.parse(localStorage["authState"]).user.id;
    //     } else {
    //         admin_id = admin;
    //     }
    //     axios
    //         .get("/api/get_types_by_admin/" + admin_id)
    //         .then(result => {
    //             // console.log(result);
    //             setTypesPed(result.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    const handleSearch = e => {
        e.preventDefault();
        var data = {};
        // var ecole_id = JSON.parse(localStorage["authState"]).user.ecole_id;
        // if (ecole_id == null) {
        //     ecole_id = ecole;
        // }

        // const data = {
        //     ecole_id: ecole_id
        // };

        // if (cycle != "") {
        //     data["cycle_id"] = cycle;
        // }
        // if (filiere != "") {
        //     data["filiere_id"] = filiere;
        // }
        // if (matiere != "") {
        //     data["matiere_id"] = matiere;
        // }
        // if (chapitre != "") {
        //     data["chapitre_id"] = chapitre;
        // }
        // if (concept != "") {
        //     data["concept_id"] = concept;
        // }
        // if (typePed != "") {
        //     data["type_id"] = typePed;
        // }
        // if (keywords != "") {
        //     data["keywords"] = keywords;
        // }
        // console.log("kkkkkk ", data);
        props.handleSearch(data);
    };

    const handleClear = e => {
        setCycle("");
        setFiliere("");
        setMatiere("");
        setChapitre("");
        setConcept("");
        setTypePed("");
        setKeywords("");
        setFilieres([]);
        setMatieres([]);
        setChapitres([]);
        setConcepts([]);
    };

    // const chercher = data => {
    //     // console.log("POST DATA = ", postData);

    //     axios
    //         .post("/api/chercher_objets/", data)
    //         .then(response => {})
    //         .catch(error => {
    //             console.log(error.response.data.errors);
    //             // setProgress(false);
    //             // setAlertError(true);
    //             // const timer = setTimeout(() => {
    //             //     setAlertError(false);
    //             // }, 7000);
    //         });
    // };

    const handleCycleChange = event => {
        // setCycle(event.target.value);
        // fetchFilieres(event.target.value);
    };

    const handleFiliereChange = event => {
        // setFiliere(event.target.value);
        // fetchMatieres(event.target.value);
    };

    const handleMatiereChange = event => {
        // setMatiere(event.target.value);
        // fetchChapitres(event.target.value, filiere);
    };
    const handleChapitreChange = event => {
        // setChapitre(event.target.value);
        // fetchConcepts(event.target.value, matiere, filiere);
    };

    const handleConceptChange = event => {
        // setConcept(event.target.value);
        // fetchConcepts(event.target.value, matiere, filiere);
    };

    const handleTypePedChange = event => {
        // setTypePed(event.target.value);
        // fetchConcepts(event.target.value, matiere, filiere);
    };

    const handleTypeFichierChange = event => {
        // setChapitre(event.target.value);
        // fetchConcepts(event.target.value, matiere, filiere);
    };

    const handleKeywordsChange = event => {
        // setKeywords(event.target.value);
        // fetchConcepts(event.target.value, matiere, filiere);
    };
    const myStyle = {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20
    };

    useEffect(() => {
        // fetchCycles();
        // getAdminByEcole();
        // getEcole();
    }, []);
    // const user = JSON.parse(localStorage["authState"]).user;

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xl">
                <MDBCard>
                    <MDBCardBody>
                        <div style={myStyle} className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid align="center" item xs={12}>
                                    <Typography
                                        style={{ marginBottom: 10 }}
                                        component="h1"
                                        variant="h6"
                                    >
                                        Critères de filtration
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="cycle"
                                        size="small"
                                        select
                                        fullWidth
                                        value={cycle}
                                        onChange={handleCycleChange}
                                        SelectProps={{
                                            native: true
                                        }}
                                        // helperText="Choisissez le cycle"
                                        variant="outlined"
                                    >
                                        <option hidden key={0} value={0}>
                                            Categorie
                                        </option>
                                        {cycles.map(option => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.nom}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                {/* <Grid item xs={12} sm={12}>
                                    <TextField
                                        size="small"
                                        id="filiere"
                                        select
                                        fullWidth
                                        value={filiere}
                                        onChange={handleFiliereChange}
                                        SelectProps={{
                                            native: true
                                        }}
                                        // helperText="Choisissez la filière"
                                        variant="outlined"
                                    >
                                        <option hidden key={0} value={0}>
                                            Filière
                                        </option>
                                        {filieres.map(option => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.libelle}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                {/* <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="matiere"
                                        size="small"
                                        select
                                        fullWidth
                                        value={matiere}
                                        onChange={handleMatiereChange}
                                        SelectProps={{
                                            native: true
                                        }}
                                        // helperText="Choisissez la matière"
                                        variant="outlined"
                                    >
                                        <option hidden key={0} value={0}>
                                            Matière
                                        </option>
                                        {matieres.map(option => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.nom}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                {/* <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="chapitre"
                                        size="small"
                                        select
                                        fullWidth
                                        value={chapitre}
                                        onChange={handleChapitreChange}
                                        SelectProps={{
                                            native: true
                                        }}
                                        // helperText="Choisissez le chapitre"
                                        variant="outlined"
                                    >
                                        <option hidden key={0} value={0}>
                                            Chapitre
                                        </option>
                                        {chapitres.map(option => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.nom}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                {/* <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="concept"
                                        size="small"
                                        select
                                        fullWidth
                                        value={concept}
                                        onChange={handleConceptChange}
                                        SelectProps={{
                                            native: true
                                        }}
                                        // helperText="Choisissez le chapitre"
                                        variant="outlined"
                                    >
                                        <option hidden key={0} value={0}>
                                            Concept
                                        </option>
                                        {concepts.map(option => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.nom}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="typeped"
                                        size="small"
                                        select
                                        fullWidth
                                        value={typePed}
                                        onChange={handleTypePedChange}
                                        SelectProps={{
                                            native: true
                                        }}
                                        variant="outlined"
                                    >
                                        <option hidden key={0} value={0}>
                                            Type
                                        </option>
                                        {typesPed.map(option => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.nom}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // required
                                        fullWidth
                                        id="keywords"
                                        label="Mots-clés.."
                                        name="keywords"
                                        autoComplete="off"
                                        value={keywords}
                                        onChange={handleKeywordsChange}
                                    />
                                    {/* <Button
                                        variant="outlined"
                                        color="default"
                                        style={{ height: 38 }}
                                        fullWidth
                                        // onClick={handleAddClick}
                                        startIcon={<SearchIcon />}
                                    >
                                        Recherche
                                    </Button> */}
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        style={{ height: 38 }}
                                        fullWidth
                                        onClick={handleClear}
                                        startIcon={<ClearIcon />}
                                    >
                                        Vider
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        style={{ height: 38 }}
                                        fullWidth
                                        onClick={handleSearch}
                                        startIcon={<SearchIcon />}
                                    >
                                        Filtrer
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </Container>
        </React.Fragment>
    );
}
