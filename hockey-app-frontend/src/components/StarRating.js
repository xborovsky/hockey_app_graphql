import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    star : {
        color : '#F0E68C',
        '&.editable' : {
            cursor : 'pointer'
        }
    }
}));

const StarRating = ({
    editable = false,
    initialValue = 5,
    onChange
}) => {
    const classes = useStyles();
    const [ value, setValue ] = useState(initialValue);
    const starClass = editable ? [classes.star, 'editable'].join(' ') : classes.star;

    return (
        [...Array(5).keys()].map(key => {
            const starVal = key + 1;
            const props = {
                className : starClass,
                ...(editable && {
                    onMouseOver : ()=> setValue(starVal),
                    onMouseLeave : () => setValue(initialValue),
                    onClick : () => onChange(starVal)
                })
            };

            return (
                starVal <= value ?
                    <StarIcon {...props} key={key} /> :
                    <StarBorderIcon {...props} key={key} />
            );
        })
    );
};

StarRating.propTypes = {
    editable : PropTypes.bool,
    initialValue : PropTypes.number,
    onChange : PropTypes.func
};

export default StarRating;