import React from 'react';
import { TableRow, TableCell, makeStyles, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    row : {
        cursor : 'pointer'
    }
}));

const PlayerListItem = ({ rowNo, id, name, number, teamName, photoBase64Src }) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <TableRow hover onClick={() => history.push(`/players/${id}`)} className={classes.row}>
            <TableCell>{ rowNo }</TableCell>
            <TableCell><Avatar src={photoBase64Src} /></TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{number}</TableCell>
            <TableCell>{teamName}</TableCell>
        </TableRow>
    );
};

PlayerListItem.propTypes = {
    rowNo : PropTypes.number.isRequired,
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    number : PropTypes.number,
    teamName : PropTypes.string,
    photoBase64Src : PropTypes.string
};

export default PlayerListItem;