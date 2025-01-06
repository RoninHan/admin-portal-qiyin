import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import FormDialog from './formDialogs';
import { useEffect, useState } from 'react';
import { get } from '../../http';



const paginationModel = { page: 0, pageSize: 5 };

const SongPsinger = () => {
    const [open, setOpen] = useState(false);
    const [songPsingers, setSongPsingers] = useState([]);
    const [songPsinger, setSongPsinger] = useState({});

    const getSongPsingers = async () => {
        const songPsingers: any = await get('/song');
        setSongPsingers(songPsingers.data);
    }

    const deleteSongPsinger = async (id: number) => {
        const res = await get('/song/delete/' + id);
        const reslyrics = await get('/lyrics/delete/' + id);
        console.log(res);
        console.log(reslyrics);
        getSongPsingers();
    }

    useEffect(() => {
        getSongPsingers();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

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
            getActions: ({ id, row, columns }) => {
                return [<Button variant="outlined" size='small' onClick={() => {
                    setOpen(true);
                    setSongPsinger(row);
                }} >Update</Button>, <Button variant="outlined" color="error" size='small' onClick={() => {
                    deleteSongPsinger(row.id);
                }}>Delete</Button>]
            }
        },
    ];

    return (
        <div>
            <h1>Song Psinger</h1>
            <div className='mt-4'>
                <Button variant="outlined" size='small' onClick={handleClickOpen} >New song</Button>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={songPsingers}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
            <FormDialog mode={open} onClose={handleClose} formData={songPsinger} />
        </div>
    );
}

export default SongPsinger