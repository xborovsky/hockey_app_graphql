import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import Comment from './Comment';

const useStyles = makeStyles(theme => ({
    btn : {
        marginTop : '1rem',
        marginBottom : '1rem'
    }
}));

const CommentSection = ({
    onAddCommentClicked,
    comments
}) => {
    const classes = useStyles();

    return (
        <>
            <Button onClick={onAddCommentClicked} variant="contained" color="primary" className={classes.btn}>
                Add comment
            </Button>

            {
                comments.map(comment => (
                    <Comment
                        key={comment.id}
                        created={comment.created}
                        stars={comment.stars}
                        comment={comment.comment}
                        userName={comment.userName}
                    />
                ))
            }
        </>
    );

};

CommentSection.propTypes = {
    onAddCommentClicked : PropTypes.func.isRequired,
    comments : PropTypes.arrayOf(
        PropTypes.shape({
            created : PropTypes.string.isRequired,
            stars : PropTypes.number.isRequired,
            comment : PropTypes.string.isRequired,
            userName : PropTypes.string.isRequired
        })
    )
};

export default CommentSection;