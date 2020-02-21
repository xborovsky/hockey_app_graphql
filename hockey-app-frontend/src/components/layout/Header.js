import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import { GET_PLAYERS_QUERY } from '../../queries/player-queries';
import { GET_TEAMS_QUERY } from '../../queries/team-queries';

const useStyles = makeStyles(theme => ({
    root: {
      marginBottom : '3vh'
    },
    title: {
      flexGrow: 1,
    },
    link : {
        textDecoration : 'none',
        color : 'inherit'
    }
}));

export default () => {
    const classes = useStyles();
    const client = useApolloClient();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>GraphQL hockey app</Link>
                    </Typography>
                    <Button color="inherit">
                        <Link to="/players" className={classes.link} onMouseOver={() => client.query({ query : GET_PLAYERS_QUERY })}>Players</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/teams" className={classes.link} onMouseOver={() => client.query({ query : GET_TEAMS_QUERY })}>Teams</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};