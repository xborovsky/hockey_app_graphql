import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import TeamsList from '../../components/teams-list/TeamsList';
import DataFetcher from '../../components/DataFetcher';
import { GET_TEAMS_QUERY } from '../../queries/team-queries';
import Alert from '../../components/alert/Alert';
import CreateTeam from './components/CreateTeam';

const TeamsPage = () => {
    const { loading, error, data } = useQuery(GET_TEAMS_QUERY);
    const [ showCreateTeamPopup, setShowCreateTeamPopup ] = useState(false);
    const [ createTeamSuccess, setCreateTeamSuccess ] = useState(undefined);

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setShowCreateTeamPopup(true)}>
                <AddIcon /> Add team
            </Button>
            <br />
            { createTeamSuccess && <Alert type='success'>{ createTeamSuccess }</Alert> }
            <br />
            <DataFetcher loading={loading} error={error}>
                { data &&
                    <TeamsList teams={data.teams} />
                }
            </DataFetcher>

            { showCreateTeamPopup &&
                <CreateTeam
                    onClose={msg => {
                        setShowCreateTeamPopup(false)
                        if (msg && typeof msg === 'string') {
                            setCreateTeamSuccess(msg);
                        }
                    }}
                />
            }
        </>
    );
};

export default TeamsPage;