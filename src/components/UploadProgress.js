import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2)
        }
    }
}));

export default function LinearIndeterminate(props) {
    const classes = useStyles();

    useEffect(() => { }, [props.progress]);
    if (props.progress === true) {
        return (
            <div className={classes.root}>
                <LinearProgress />
                <LinearProgress color="secondary" />
            </div>
        );
    } else {
        return <div></div>;
    }
}
