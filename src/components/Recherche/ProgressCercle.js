import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    // root: {
    //     display: "flex",
    //     "& > * + *": {
    //         marginLeft: theme.spacing(2)
    //     }
    // }
}));

export default function CircularIndeterminate() {
    const classes = useStyles();
    // useEffect(() => {
    //     console.log("in use effect progress");
    // }, [props.progress]);

    // if (props.progress === true) {
    return (
        <div>
            <CircularProgress />
            {/* <CircularProgress color="secondary" /> */}
        </div>
    );
    // } else {
    //     return <div></div>;
    // }
}
