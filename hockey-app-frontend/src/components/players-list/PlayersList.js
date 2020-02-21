import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

import PlayerListItem from './PlayerListItem';
import EmptyTableRow from '../EmptyTableRow';
import { getBase64Format } from '../../utils/base64-util';

const PlayersList = ({
    players
}) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>No.</TableCell>
                    <TableCell>Team</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { players && players.length ?
                    players.map((player, cnt) => (
                        <PlayerListItem
                            key={player.id}
                            rowNo={cnt + 1}
                            id={+player.id}
                            name={player.name}
                            number={player.number}
                            teamName={player.team?.name}
                            photoBase64Src={player.playerPhoto ? getBase64Format(player.playerPhoto.mimeType, player.playerPhoto.photoBase64) : undefined}
                        />
                    )) :
                    <EmptyTableRow colSpan={4} />
                }
            </TableBody>
        </Table>
    </TableContainer>
);

PlayersList.propTypes = {
    players : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            name : PropTypes.string.isRequired,
            number : PropTypes.number,
            team : PropTypes.shape({
                name : PropTypes.string
            })
        })
    ).isRequired
};

export default PlayersList;