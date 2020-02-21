import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import StarRating from './StarRating';

const useStyles = makeStyles(theme => ({
    card : {
        marginBottom : '1rem'
    },
    table : {
        width : '100%'
    },
    th : {
        textAlign : 'left',
        width : '10%'
    }
}));

const Comment = ({
    created,
    stars,
    comment,
    userName
}) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <table cellPadding={0} cellSpacing={0} border={0} className={classes.table}>
                    <tbody>
                        <tr>
                            <th className={classes.th}><Typography component="span">Comment by:</Typography></th>
                            <td><Typography component="span">{userName} ({created})</Typography></td>
                        </tr>
                        <tr>
                            <th className={classes.th}><Typography component="span">Rating:</Typography></th>
                            <td><StarRating initialValue={stars} /></td>
                        </tr>
                        <tr>
                            <th className={classes.th}><Typography component="span">Comment:</Typography></th>
                            <td><Typography component="span">{comment}</Typography></td>
                        </tr>
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};

Comment.propTypes = {
    created : PropTypes.string.isRequired,
    stars : PropTypes.number.isRequired,
    comment : PropTypes.string.isRequired,
    userName : PropTypes.string.isRequired
};

export default Comment;