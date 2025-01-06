import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import FormDialog from './formDialogs';
import { useEffect, useState } from 'react';
import { get } from '../../http';

const paginationModel = { page: 0, pageSize: 5 };

const SongTypePage = () => {
    const [open, setOpen] = useState(false);
    const [songTypes, setSongTypes] = useState([]);
    const [songType, setSongType] = useState({});



    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getSongTypes = async () => {
        const songTypes: any = await get('/song_type');
        setSongTypes(songTypes.data);
    }

    const deleteSongType = async (id: number) => {
        const res = await get('/song_type/delete/' + id);
        console.log(res);
        getSongTypes();
    }

    useEffect(() => {
        getSongTypes();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'name' },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 180,
            cellClassName: 'actions',
            getActions: ({ id, row, columns }) => {
                return [<Button variant="outlined" size='small' onClick={() => {
                    setSongType(row);
                    setOpen(true);
                }} >Update</Button>, <Button variant="outlined" color="error" size='small' onClick={() => {
                    deleteSongType(row.id);
                }}>Delete</Button>]
            }
        },
    ];

    return (
        <div>
            <h1>Song Type Page</h1>
            <div className='mt-4'>
                <Button variant="outlined" size='small' onClick={handleClickOpen} >New song type</Button>
                <Paper sx={{ height: 600, width: '100%', marginTop: '10px' }}>
                    <DataGrid
                        rows={songTypes}
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