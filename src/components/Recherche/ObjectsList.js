import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentIcon from '@material-ui/icons/Comment';
import Pagination from "@material-ui/lab/Pagination";
import ProgressCercle from "./ProgressCercle";
import DialogMetadata from "./DialogMetadata";
import Divider from "@material-ui/core/Divider";
import searchImage from '../../images/search.jpg'
import pdfAvatar from '../../images/extentions/pdf.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    }
}));

export default function ObjectsList(props) {
    const classes = useStyles();

    const [selectedObjet, setSelectedObjet] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [metadataDialogOpen, setMetadataDialogOpen] = useState(false);

    const handleConsult = (row, index) => {
        // setSelectedObjet(row);
        // setSelectedIndex(index);
        // console.log("index == ", index);
        setMetadataDialogOpen(true);
    };

    const handleClose = () => {
        setMetadataDialogOpen(false);
        // getObjects();
    };

    // const handleCloseAndRefresh = index => {
    //     setMetadataDialogOpen(false);

    //     const mObjects = [...props.rows];
    //     mObjects.splice(index, 1);
    //     if (mObjects.length == 0) {
    //         console.log("empty !!!!");
    //         setEmpty(true);
    //     }
    //     setRows(mObjects);

    //     // getObjects();
    // };

    return (
        <div className={classes.root}>
            {/* {metadataDialogOpen ? (
                <DialogMetadata
                    open={metadataDialogOpen}
                    handleClose={handleClose}
                    // refresh={handleCloseAndRefresh}
                    objet={selectedObjet}
                    index={selectedIndex}
                ></DialogMetadata>
            ) : null} */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div
                        style={{ overflow: "scroll", height: 550 }}
                        className={classes.demo}
                    >
                        <List>
                            {props.rows.map((object, i) => (
                                <div>
                                    <ListItem
                                        button
                                        onClick={() => {
                                            handleConsult(object, i);
                                        }}
                                    // style={{
                                    //     // textDecoration: "none",
                                    //     color: "black"
                                    // }}
                                    // component="a"
                                    // href={
                                    //     "https://storage.googleapis.com/mondepot2/" +
                                    //     object.object_name
                                    // }
                                    // target="_blank"
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={object.extention}
                                                src={pdfAvatar}
                                            />
                                        </ListItemAvatar>

                                        <ListItemText primary={object.titre} />
                                        <ListItemSecondaryAction>
                                            <Link style={{ textDecoration: "none", color: "Gray" }}
                                                to={"/object_details/" + object._id}>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="view"
                                                // onClick={() => {
                                                //     handleConsult(object, i);
                                                // }}
                                                >
                                                    <CommentIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                edge="end"
                                                aria-label="view"
                                                onClick={() => {
                                                    handleConsult(object, i);
                                                }}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="download"
                                                component="a"
                                                href={object.mediaLink}
                                                target="_blank"
                                            >
                                                <GetAppIcon />
                                            </IconButton>
                                            <IconButton
                                                // color="secondary"
                                                edge="end"
                                                aria-label="download"
                                            >
                                                <FavoriteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                        </List>
                        {props.rows.length === 0 && !props.empty && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "50vh"
                                }}
                            >
                                <ProgressCercle></ProgressCercle>
                            </div>
                        )}
                        {props.rows.length === 0 && props.empty && (
                            <div
                                className="row text-center"
                                style={{
                                    width: "99%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "50vh"
                                }}
                            >
                                <div className="col-10">
                                    <img
                                        src={searchImage}
                                        className="img-responsive"
                                        width="280"
                                        height="290"
                                        alt=""
                                    />
                                </div>
                                <div className="col-10">
                                    <p>
                                        Aucun objet trouvé
                                        <br /> dans cette categorie !
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div >
    );
}
