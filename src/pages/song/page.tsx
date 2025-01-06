import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import FormDialog from './formDialogs';
import { useState } from 'react';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'author', headerName: 'Author', width: 130 },
    {
        field: 'song_type_id',
        headerName: 'Song type',
        width: 100,
    },
    {
        field: 'singer',
        headerName: 'Singer',
        sortable: false,
        width: 160,
    },
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
    { id: 1, name: 'Snow', author: 'Jon', singer: 35 },
    { id: 2, name: 'Lannister', author: 'Cersei', singer: 42 },
    { id: 3, name: 'Lannister', author: 'Jaime', singer: 45 },
    { id: 4, name: 'Stark', author: 'Arya', singer: 16 },
    { id: 5, name: 'Targaryen', author: 'Daenerys', singer: null },
    { id: 6, name: 'Melisandre', author: null, singer: 150 },
    { id: 7, name: 'Clifford', author: 'Ferrara', singer: 44 },
    { id: 8, name: 'Frances', author: 'Rossini', singer: 36 },
    { id: 9, name: 'Roxie', author: 'Harvey', singer: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

const SongPsinger = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <h1>Song Psinger</h1>
            <div className='mt-4'>
                <Button variant="outlined" size='small' onClick={handleClickOpen} >New song</Button>
                <Paper sx={{ height: 400, width: '100%' }}>
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

export default SongPsinger