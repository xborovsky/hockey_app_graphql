import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation, useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Alert from '../../../components/alert/Alert';
import { CREATE_PLAYER_MUTATION, GET_PLAYERS_QUERY } from '../../../queries/player-queries';
import { GET_TEAMS_QUERY } from '../../../queries/team-queries';
import Loader from '../../../components/Loader';

const CreatePlayer = ({ onClose }) => {
    const [ name, setName ] = useState('');
    const [ number, setNumber ] = useState('');
    const [ teamId, setTeamId ] = useState('');
    const [ error, setError ] = useState(undefined);
    const [ createPlayer, { loading:showLoading, error:mutationError } ] = useMutation(
        CREATE_PLAYER_MUTATION,
        {
            onCompleted : () => onClose('Player successfully created')
        }
    );
    const { loading:fetchPageDataLoading, error:fetchPageDataError, data:teamsData } = useQuery(GET_TEAMS_QUERY);

    const handleSubmit = e => {
        e.preventDefault();

        if (!name || !name.trim().length) {
            setError('Name is required!');
            return false;
        } else if (+number < 1 || +number > 99) {
            setError('Number should be between 1 and 99!');
            return false;
        }

        createPlayer({ variables : { name, number, teamId }, refetchQueries : [{ query : GET_PLAYERS_QUERY }] });
    };

    return (
        <Dialog open={true} onClose={onClose}>
            { fetchPageDataLoading ? <Loader /> :
                fetchPageDataError ? <Alert type='error' fullWidth>{ fetchPageDataError }</Alert> :
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Create new player</DialogTitle>

                        { error && <Alert type='error' fullWidth>{ error }</Alert> }
                        { mutationError && <Alert type='error'>Oooops, something went wrong...</Alert> }

                        <DialogContent>
                            <DialogContentText>
                                Please fill in the required fields and submit the form.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Player name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.currentTarget.value)}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="number"
                                label="Player number"
                                type="number"
                                value={number}
                                onChange={e => setNumber(e.currentTarget.value)}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel id="team">Team</InputLabel>
                                <Select
                                    labelId='team'
                                    value={teamId}
                                    onChange={e => setTeamId(e.target.value)}
                                >
                                    {
                                        teamsData.teams.map(team => (
                                            <MenuItem value={team.id} key={team.id}>{ team.name }</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} color="default">
                                Cancel
                            </Button>
                            { showLoading ?
                                <Button disabled color="primary">
                                    <CircularProgress />
                                </Button> :
                                <Button type="submit" onClick={handleSubmit} color="primary">
                                    Submit
                                </Button>
                            }
                        </DialogActions>
                    </form>
            }
        </Dialog>
    );
};

CreatePlayer.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default CreatePlayer;