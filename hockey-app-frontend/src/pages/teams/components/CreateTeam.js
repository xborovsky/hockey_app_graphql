import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation } from '@apollo/react-hooks';

import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { CREATE_TEAM_MUTATION, GET_TEAMS_QUERY } from '../../../queries/team-queries';
import Alert from '../../../components/alert/Alert';

const CreateTeam = ({ onClose }) => {
    const [ name, setName ] = useState('');
    const [ error, setError ] = useState(undefined);
    const [ createTeam, { loading:showLoading, error:mutationError } ] = useMutation(
        CREATE_TEAM_MUTATION,
        {
            onCompleted : () => onClose('Team successfully created')
        }
    );

    const handleSubmit = e => {
        e.preventDefault();

        if (!name || !name.trim().length) {
            setError('Name is required!');
            return false;
        }
        createTeam({ variables : { name }, refetchQueries : [{ query : GET_TEAMS_QUERY }] });
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Create new team</DialogTitle>

                { error && <Alert type='error'>{ error }</Alert> }
                { mutationError && <Alert type='error'>Oooops, something went wrong...</Alert> }

                <DialogContent>
                    <DialogContentText>
                        Please fill in the required fields and submit the form.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Team name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.currentTarget.value)}
                        fullWidth
                    />
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
        </Dialog>
    );
};

CreateTeam.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default CreateTeam;