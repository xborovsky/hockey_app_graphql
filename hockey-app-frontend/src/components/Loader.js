import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    loader : {
        textAlign : 'center'
    }
}));

export default () => {
    const classes = useStyles();
        return (
        <div className={classes.loader}>
            <CircularProgress />
        </div>
    );
};