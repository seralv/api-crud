import { TableRow, TableCell, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';

const Person = ( { person, removePerson, updatePerson } ) => {
    return(
        <TableRow>
            <TableCell>{ person.id }</TableCell>
            <TableCell>{ person.name }</TableCell>
            <TableCell>{ person.last_name }</TableCell>
            <TableCell>
                <Button onClick = { updatePerson }><Edit color = "primary" /></Button>
                <Button onClick = { removePerson }><Delete color = "secondary" /></Button>
            </TableCell>
        </TableRow>
    )
}

export default Person