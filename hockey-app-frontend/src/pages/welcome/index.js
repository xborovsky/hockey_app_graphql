import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root : {
        textAlign : 'center',
        marginTop : '10vh'
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3">Welcome to the GraphQL hockey app!</Typography>
            <Typography variant="h5">Use the menu on the top right corner to navigate somewhere...</Typography>
        </div>
    );
};