import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const EmptyTableRow = ({ colSpan }) => (
    <TableRow>
        <TableCell colSpan={colSpan} style={{ textAlign : 'center' }}>no data yet...</TableCell>
    </TableRow>
);

export default EmptyTableRow;