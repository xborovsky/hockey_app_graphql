import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    alert : {
        width : '40%',
        margin : '0 auto'
    },
    alertFullWidth : {
        width : '80%',
        margin : '0 auto'
    }
}));

const Alert = ({
    type,
    fullWidth = false,
    children
}) => {
    const classes = useStyles();

    return (
        <MuiAlert
            elevation={6}
            variant="filled"
            severity={type}
            className={fullWidth ? classes.alertFullWidth : classes.alert}>
                { children }
        </MuiAlert>
    );
};

Alert.propTypes = {
    type : PropTypes.oneOf(['error', 'success', 'warning', 'info']).isRequired,
    fullWidth : PropTypes.bool
};

export default Alert;