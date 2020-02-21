import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CircularProgress, makeStyles } from '@material-ui/core';

import Layout from './components/layout/Layout';
import WelcomePage from './pages/welcome';

const PlayersPage = React.lazy(() => import('./pages/players'));
const PlayerDetailPage = React.lazy(() => import('./pages/player-detail'));
const TeamsPage = React.lazy(() => import('./pages/teams'));
const TeamDetailPage = React.lazy(() => import('./pages/team-detail'));

const useStyles = makeStyles(theme => ({
  loader : {
    marginTop : '2rem',
    display : 'flex',
    justifyContent : 'center'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        }>
          <Switch>
            <Route path="/" exact>
              <WelcomePage />
            </Route>
            <Route path="/players" exact>
              <PlayersPage />
            </Route>
            <Route path="/players/:id">
              <PlayerDetailPage />
            </Route>
            <Route path="/teams" exact>
              <TeamsPage />
            </Route>
            <Route path="/teams/:id">
              <TeamDetailPage />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
