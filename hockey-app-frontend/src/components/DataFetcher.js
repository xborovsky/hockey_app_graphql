import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    alert : {
        width : '40%',
        margin : '0 auto'
    },
    loader : {
        textAlign : 'center'
    }
}));

const DataFetcher = ({ loading, error, children }) => {
    const classes = useStyles();

    if (error) {
        return <MuiAlert elevation={6} variant="filled" severity="error" className={classes.alert}>Could not fetch data!</MuiAlert>;
    } else if (loading) {
        return <div className={classes.loader}><CircularProgress /></div>;
    } else {
        return children;
    }
};

DataFetcher.propTypes = {
    loading : PropTypes.bool,
    error : PropTypes.object
};

export default DataFetcher;