import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    footer : {
        marginTop : '3vh',
        padding : 32,
        backgroundColor : '#333',
        color : '#fff',
        textAlign : 'center'
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="h6">
                End of page...
            </Typography>
        </footer>
    );
};