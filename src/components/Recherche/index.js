import React, { useState, useEffect } from "react";
// import Breadcrumbs from "../Breadcrumbs";
import SearchForm from "./SearchForm";
import { withStyles, makeStyles, styled } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// import ObjectCard from "./ObjectCard";
import ObjectsList from "./ObjectsList";
import { Link } from "react-router-dom";
import Footer from "../Footer";
// import EnseignantMenu from "./../Enseignant/EnseignantMenu";
// import InspecteurMenu from "./../Inspecteur/InspecteurMenu";
// import AdminMenu from "./../Admin/AdminMenu";

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

const objects = [
    {
        id: 1,
        titre: "Cours BD Semi-structurées Part 1",
        description: "la premiere partie du cours BD semi-structurées pour IRISI 3",
        langue: "Français",
        keywords: "cours, bd, nosql, mongodb",
        type: "Cours",
        url: "upload/bd1.pdf",
        extention: "pdf",
        date_creation: "12/11/2020 12:46:37",
        taille: 187846,
    },
    {
        id: 2,
        titre: "Cours BD Semi-structurées Part 2",
        description: "la deuxième partie du cours BD semi-structurées pour IRISI 3",
        langue: "Français",
        keywords: "cours, bd, nosql, mongodb",
        type: "Cours",
        url: "upload/bd2.pdf",
        extention: "pdf",
        date_creation: "12/11/2020 12:48:39",
        taille: 189886,
    },


];

// const MyButton = styled(Button)({
//     background: "linear-gradient(45deg, #8360c3 30%, #2ebf91 90%)",
//     border: 0,
//     borderRadius: 5,
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     color: "white",
//     height: 68,
//     padding: "0 30px"
// });

function createData(
    object_name,
    bucket_name,
    titre,
    description,
    keywords,
    matiere,
    matiere_id,
    chapitre_nom,
    chapitre,
    filiere,
    cycle_id,
    filiere_id,
    user_id,
    langue,
    langue_text,
    concepts,
    commentaire,
    mCycle,
    mEtat,
    etat,
    type,
    type_text,
    type_id,
    taille,
    date,
    fullname,
    mediaLink,
    extra
) {
    return {
        object_name,
        bucket_name,
        titre,
        description,
        keywords,
        langue,
        langue_text,
        concepts,
        commentaire,
        matiere,
        matiere_id,
        chapitre_nom,
        chapitre,
        filiere,
        cycle_id,
        filiere_id,
        user_id,
        mCycle,
        mEtat,
        etat,
        type,
        type_text,
        type_id,
        taille,
        date,
        fullname,
        mediaLink,
        extra
    };
}

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
function fileType(type) {
    if (type == "application/pdf") {
        return "Document PDF";
    } else if (type == "application/msword") {
        return "Document Word";
    } else if (type == "application/vnd.ms-excel") {
        return "Fichier Excel";
    } else if (type == "application/vnd.ms-powerpoint") {
        return "Fichier PowerPoint";
    } else if (type == "application/vnd.ms-access") {
        return "Fichier Access";
    } else if (
        type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        return "Fichier Excel";
    } else if (
        type ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
        return "Fichier PowerPoint";
    } else if (
        type == "application/x-rar-compressed" ||
        type == "application/octet-stream"
    ) {
        return "Fichier RAR";
    } else if (
        type == "application/zip" ||
        type == "application/x-zip-compressed" ||
        type == "multipart/x-zip"
    ) {
        return "Fichier ZIP";
    } else if (
        type ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return "Document Word";
    } else if (type.substring(0, 5) == "image") {
        return "Image";
    } else if (type.substring(0, 5) == "video") {
        return "Vidéo";
    } else if (type.substring(0, 5) == "audio") {
        return "Audio";
    } else {
        return "Unknown";
    }
}

function etat_by_id(etat) {
    let mEtat = "";
    if (etat == 1) {
        return "En attente..";
    } else if (etat == 2) {
        return "A revoir ";
    } else if (etat == 3) {
        return "Validé";
    }
}

function readable_date(timeCreated) {
    const dateTimeFormat = new Intl.DateTimeFormat("fr", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        weekday: "short"
    });

    let date = new Date(timeCreated.substring(0, 10));

    let [
        { value: weekday },
        ,
        { value: day },
        ,
        { value: month },
        ,
        { value: year }
    ] = dateTimeFormat.formatToParts(date);

    return `${weekday} ${day} ${month} ${year}`;
}

function cycle_by_id(cycle_id) {
    if (cycle_id == 1) {
        return "Primaire";
    } else if (cycle_id == 2) {
        return "Secondaire Collégiale";
    } else if (cycle_id == 3) {
        return "Secondaire Qualifiant";
    }
}

function get_extra_md(metadata) {
    let objectKeys = Object.keys(metadata);
    let standardKeys = [
        "filiere_id",
        "object_name",
        "langue",
        "concepts",
        "matiere_nom",
        "etat",
        "chapitre",
        "keywords",
        "titre",
        "matiere_id",
        "user_id",
        "user_nom",
        "user_prenom",
        "filiere_nom",
        "type",
        "description",
        "cycle_id",
        "matiere",
        "chapitre_nom",
        "filiere",
        "mCycle",
        "mEtat",
        "type_text",
        "taille",
        "date",
        "fullname",
        "mediaLink",
        "ecole_id",
        "langue_text",
        "commentaire"
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

export default function Recherche() {
    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const [empty, setEmpty] = useState(false);

    const handleSearch = data => {
        // e.preventDefault();
        setEmpty(false);
        setRows([]);
        // var data = {};

        getObjects(data);
    };

    const getObjects = data => {
        // console.log("POST DATA = ", postData);
        console.log("DATA frontend === ", data);
        let objects = [];
        let obj = {};
        // axios
        //     .post("/api/chercher_objets/", data)
        //     .then(result => {
        //         console.log("RESPONSE = ", result.data);
        //         if (result.data.success) {
        //             result.data.data.forEach(o => {
        //                 let extra = get_extra_md(o.metadata);
        //                 let mDate = readable_date(o.timeCreated);
        //                 let mSize = humanFileSize(o.size);
        //                 let mType = fileType(o.contentType);
        //                 let mEtat = etat_by_id(o.metadata.etat);
        //                 let mCycle = cycle_by_id(o.metadata.cycle_id);
        //                 let fullname =
        //                     o.metadata.user_prenom + " " + o.metadata.user_nom;
        //                 obj = createData(
        //                     o.name,
        //                     o.bucket,
        //                     o.metadata.titre,
        //                     o.metadata.description,
        //                     o.metadata.keywords,
        //                     o.metadata.matiere_nom,
        //                     o.metadata.matiere_id,
        //                     o.metadata.chapitre_nom,
        //                     o.metadata.chapitre,
        //                     o.metadata.filiere_nom,
        //                     o.metadata.cycle_id,
        //                     o.metadata.filiere_id,
        //                     o.metadata.user_id,
        //                     o.metadata.langue,
        //                     o.metadata.langue_text,
        //                     o.metadata.concepts,
        //                     o.metadata.commentaire,
        //                     mCycle,
        //                     mEtat,
        //                     o.metadata.etat,
        //                     mType,
        //                     o.metadata.type_text,
        //                     o.metadata.type,
        //                     mSize,
        //                     mDate,
        //                     fullname,
        //                     o.mediaLink,
        //                     extra
        //                 );
        //                 setEmpty(true);
        //                 // setEmptyRevoir(true);
        //                 if (1 == 1 /*o.metadata.etat == 3*/) {
        //                     setEmpty(false);
        //                     objects.push(obj);
        //                 }
        //                 //  else if (o.metadata.etat == 2) {
        //                 //     setEmptyRevoir(false);
        //                 //     objectsRevoir.push(obj);
        //                 // }
        //             });
        //             setRows(objects);
        //             // setRowsRevoir(objectsRevoir);
        //         } else {
        //             setEmpty(true);
        //             // setEmptyRevoir(true);
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.response.data.errors);
        //         // setProgress(false);
        //         // setAlertError(true);
        //         // const timer = setTimeout(() => {
        //         //     setAlertError(false);
        //         // }, 7000);
        //     });
    };

    // async function getObjects(data) {
    //     // let user_id = 33;
    //     // let user_id = JSON.parse(localStorage["authState"]).user.id;
    //     let objects = [];
    //     // let objectsRevoir = [];
    //     let obj = {};
    //     try {
    //         console.log("DATA frontend === ", data);
    //         const response = await fetch("/api/chercher_objets/", data);
    //         const result = await response.json();
    //         console.log("RESPONSE = ", result);
    // if (result.success) {
    //     result.data.forEach(o => {
    //         let extra = get_extra_md(o.metadata);
    //         let mDate = readable_date(o.timeCreated);
    //         let mSize = humanFileSize(o.size);
    //         let mType = fileType(o.contentType);
    //         let mEtat = etat_by_id(o.metadata.etat);
    //         let mCycle = cycle_by_id(o.metadata.cycle_id);
    //         let fullname =
    //             o.metadata.user_prenom + " " + o.metadata.user_nom;
    //         obj = createData(
    //             o.name,
    //             o.bucket,
    //             o.metadata.titre,
    //             o.metadata.description,
    //             o.metadata.keywords,
    //             o.metadata.matiere_nom,
    //             o.metadata.matiere_id,
    //             o.metadata.chapitre_nom,
    //             o.metadata.chapitre,
    //             o.metadata.filiere_nom,
    //             o.metadata.cycle_id,
    //             o.metadata.filiere_id,
    //             o.metadata.user_id,
    //             o.metadata.langue,
    //             o.metadata.langue_text,
    //             o.metadata.concepts,
    //             o.metadata.commentaire,
    //             mCycle,
    //             mEtat,
    //             o.metadata.etat,
    //             mType,
    //             o.metadata.type_text,
    //             o.metadata.type,
    //             mSize,
    //             mDate,
    //             fullname,
    //             o.mediaLink,
    //             extra
    //         );
    //         setEmpty(true);
    //         // setEmptyRevoir(true);
    //         if (1 == 1 /*o.metadata.etat == 3*/) {
    //             setEmpty(false);
    //             objects.push(obj);
    //         }
    //         //  else if (o.metadata.etat == 2) {
    //         //     setEmptyRevoir(false);
    //         //     objectsRevoir.push(obj);
    //         // }
    //     });
    //     setRows(objects);
    //     // setRowsRevoir(objectsRevoir);
    // } else {
    //     setEmpty(true);
    //     // setEmptyRevoir(true);
    // }
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }

    async function loadObjects() {
        setEmpty(true);
        const response = await fetch("http://localhost:3000/api/objets/");
        const result = await response.json();
        console.log("RESPONSE = ", result);
        if (result.success) {
            setEmpty(false);
            setRows(result.data);
        } else {
            console.log("MAKAYN WALOO !!")
        }
        // setEmpty(true);
        // if (objects.length != 0) {
        //     setRows(objects);
        //     setEmpty(false);
        // }
    }


    useEffect(() => {
        // const data = {
        //     ecole_id: JSON.parse(localStorage["authState"]).user.ecole_id
        // };
        // getObjects(data);
        loadObjects();
    }, []);

    const myStyle = {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20
    };

    return (
        <div className={classes.paper}>
            {/* <Breadcrumbs /> */}
            {/* {JSON.parse(localStorage["authState"]).user.role_id == 2 && (
                <AdminMenu />
            )}
            {JSON.parse(localStorage["authState"]).user.role_id == 3 && (
                <InspecteurMenu />
            )}
            {JSON.parse(localStorage["authState"]).user.role_id == 4 && (
                <EnseignantMenu />
            )} */}
            {/* <EnseignantMenu /> */}
            <Container component="main" maxWidth="lg">
                <Grid style={{ paddingTop: 66 }} container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <SearchForm handleSearch={handleSearch} />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ObjectsList empty={empty} rows={rows} />
                    </Grid>
                </Grid>
            </Container>

            <Container component="main" maxWidth="xl">
                <div style={myStyle} className={classes.paper}>
                    {/* <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/dashboard/enseignant/objects"
                            >
                                <MyButton fullWidth variant="contained">
                                    Première année primaire
                                </MyButton>
                            </Link>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/dashboard/enseignant/objects"
                            >
                                <MyButton fullWidth variant="contained">
                                    Deuxième année primaire
                                </MyButton>
                            </Link>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/dashboard/enseignant/objects"
                            >
                                <MyButton fullWidth variant="contained">
                                    Troisième année primaire
                                </MyButton>
                            </Link>
                        </Grid>
                    </Grid> */}
                    {/* <Grid container spacing={2}>
                        {rows.map((row, i) => (
                            <Grid item sm={3} xs={12}>
                                <ObjectCard object={row} />
                            </Grid>
                        ))}
                    </Grid> */}
                    {/* <Grid container spacing={2}>
                        {rows.map((row, i) => (
                            <Grid item sm={3} xs={12}>
                                <TestCard />
                            </Grid>
                        ))}
                    </Grid> */}
                </div>
            </Container>

            <Footer />
        </div>
    );
}
