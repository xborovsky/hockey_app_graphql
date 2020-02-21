import React from 'react';
import { makeStyles } from '@material-ui/core';

import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
    contentRoot : {
        flex : '1 0 auto',
        width : '90%',
        margin : '0 5%'
    }
}));

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <div className={classes.contentRoot}>
                { children }
            </div>
            <Footer />
        </>
    );
};

export default Layout;