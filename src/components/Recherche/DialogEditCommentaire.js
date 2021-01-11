import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export default function DialogCommentaireEdit(props) {
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");

    const errorCycle = useRef(null);

    const handleCommentaireChange = (event) => {
        setMessage(event.target.value);
        // errorFiliere.current.style.display = "none";
    };

    const handleCommentaireEdit = (e) => {
        e.preventDefault();
        //   if (validateForm()) {

        const postData = {
            objet_id: props.objet._id,
            commentaire_id: id,
            message: message,
        };

        console.log(
            "objetId = " +
            postData.objet_id +
            " commentaire_id = " +
            postData.commentaire_id +
            " message = " +
            postData.message
        );
        updateCommentaire(postData);
        //   }
    };
    const updateCommentaire = (postData) => {
        axios
            .put("http://localhost:3000/api/discussion/modifier", postData)
            .then((response) => {
                if (response.data.success == 1) {
                    props.handleClose();
                }
            })
            .catch((error) => {
                console.log(error.response.data.errors);
            });
    };

    useEffect(() => {
        setId(props.commentaire._id);

        setMessage(props.commentaire.message);
    }, [props.open]);

    return (
        <div>
            {/* <AlertMessage alert={alert} message={alertMessage}></AlertMessage> */}
            <Dialog
                open={props.open}
                // onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Modifier un commentaire
        </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* <h5 className="text-center">HOLA</h5> */}
                    </DialogContentText>
                    <TextField
                        style={{
                            marginTop: "7px",
                        }}
                        variant="outlined"
                        required
                        fullWidth
                        id="commentaire"
                        label="commentaire"
                        name="commentaire"
                        autoComplete="commentaire"
                        onChange={handleCommentaireChange}
                        value={message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            props.handleClose();
                        }}
                        color="primary"
                    >
                        Annuler
          </Button>
                    <Button color="primary" onClick={handleCommentaireEdit}>
                        Modifier
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
