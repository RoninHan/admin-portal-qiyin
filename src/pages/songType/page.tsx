import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import FormDialog from './formDialogs';
import { useState } from 'react';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'name' },
    {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 180,
        cellClassName: 'actions',
        getActions: ({ id }) => {
            return [<Button variant="outlined" size='small' >Update</Button>, <Button variant="outlined" color="error" size='small'>Delete</Button>]
        }
    },
];

const rows = [
    { id: 1, lastName: 'Snow', name: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', name: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', name: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', name: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', name: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', name: null, age: 150 },
    { id: 7, lastName: 'Clifford', name: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', name: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', name: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

const SongTypePage = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <h1>Song Type Page</h1>
            <div className='mt-4'>
                <Button variant="outlined" size='small' onClick={handleClickOpen} >New song type</Button>
                <Paper sx={{ height: 600, width: '100%', marginTop: '10px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
            <FormDialog mode={open} onClose={handleClose} />
        </div>
    );
}

export default SongTypePage