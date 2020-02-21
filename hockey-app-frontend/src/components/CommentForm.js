import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress, Button, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Alert from './alert/Alert';
import StarRating from './StarRating';

const useStyles = makeStyles(theme => ({
    ratingLabel : {
        marginLeft : 0,
        marginTop : 5,
        color : 'rgba(0, 0, 0, 0.54)',
        '&>span' : {
            marginRight : 10
        }
    }
}));

const CommentForm = ({
    onClose,
    onSubmit,
    showLoading,
    mutationError
}) => {
    const [ error, setError ] = useState(undefined);
    const [ userName, setUserName ] = useState('');
    const [ stars, setStars ] = useState(5);
    const [ comment, setComment ] = useState('');
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();

        if (!userName || !userName.length) {
            setError('Username is required!');
            return false;
        }

        onSubmit({userName, stars, comment});
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Leave a comment here</DialogTitle>

                {error && <Alert type='error' fullWidth>{error}</Alert>}
                {mutationError && <Alert type='error'>Oooops, something went wrong...</Alert>}

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="userName"
                        label="Your name"
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.currentTarget.value)}
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <div>
                                <StarRating
                                    editable={!showLoading}
                                    onChange={val => setStars(val)}
                                    initialValue={stars} />
                            </div>
                        }
                        label="Rating:"
                        labelPlacement="start"
                        className={classes.ratingLabel}
                    />
                    <TextField
                        margin="dense"
                        id="comment"
                        label="Comment"
                        type="text"
                        multiline
                        rows={5}
                        value={comment}
                        onChange={e => setComment(e.currentTarget.value)}
                        fullWidth
                        variant="outlined"
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

CommentForm.propTypes = {
    onClose : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
    showLoading : PropTypes.bool,
    mutationError : PropTypes.bool
};

export default CommentForm;