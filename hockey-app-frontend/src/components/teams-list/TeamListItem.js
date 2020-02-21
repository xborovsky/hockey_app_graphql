import React from 'react';
import { TableRow, TableCell, Avatar, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    row : {
        cursor : 'pointer'
    }
}));

const TeamListItem = ({ rowNo, id, name, photoBase64Src }) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <TableRow hover onClick={() => history.push(`/teams/${id}`)} className={classes.row}>
            <TableCell>{ rowNo }</TableCell>
            <TableCell><Avatar src={photoBase64Src} /></TableCell>
            <TableCell>{name}</TableCell>
        </TableRow>
    );
};

TeamListItem.propTypes = {
    rowNo : PropTypes.number.isRequired,
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    photoBase64Src : PropTypes.string
};

export default TeamListItem;