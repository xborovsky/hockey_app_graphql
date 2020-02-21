import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

import TeamListItem from './TeamListItem';
import EmptyTableRow from '../EmptyTableRow';
import { getBase64Format } from '../../utils/base64-util';

const TeamsList = ({
    teams
}) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { teams && teams.length ?
                    teams.map((team, cnt) => (
                        <TeamListItem
                            key={team.id}
                            rowNo={cnt + 1}
                            id={+team.id}
                            name={team.name}
                            photoBase64Src={team.teamPhoto ? getBase64Format(team.teamPhoto.mimeType, team.teamPhoto.photoBase64) : undefined}
                        />
                    )) :
                    <EmptyTableRow colSpan={2} />
                }
            </TableBody>
        </Table>
    </TableContainer>
);

TeamsList.propTypes = {
    teams : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            name : PropTypes.string.isRequired,
        })
    ).isRequired
};

export default TeamsList;