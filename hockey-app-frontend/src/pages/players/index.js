import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import PlayersList from '../../components/players-list/PlayersList';
import DataFetcher from '../../components/DataFetcher';
import { GET_PLAYERS_QUERY } from '../../queries/player-queries';
import Alert from '../../components/alert/Alert';
import CreatePlayer from './components/CreatePlayer';

const PlayersPage = () => {
    const { loading, error, data } = useQuery(GET_PLAYERS_QUERY);
    const [ showCreatePlayerPopup, setShowCreatePlayerPopup ] = useState(false);
    const [ createPlayerSuccess, setCreatePlayerSuccess ] = useState(undefined);

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setShowCreatePlayerPopup(true)}>
                <AddIcon /> Add player
            </Button>
            <br />
            { createPlayerSuccess && <Alert type='success'>{ createPlayerSuccess }</Alert> }
            <br />
            <DataFetcher loading={loading} error={error}>
                { data &&
                    <PlayersList players={data.players} />
                }
            </DataFetcher>

            { showCreatePlayerPopup &&
                <CreatePlayer
                    onClose={msg => {
                        setShowCreatePlayerPopup(false)
                        if (msg && typeof msg === 'string') {
                            setCreatePlayerSuccess(msg);
                        }
                    }}
                />
            }
        </>
    );
};

export default PlayersPage;