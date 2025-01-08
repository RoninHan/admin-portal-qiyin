import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { get } from '../../http';
import { useEffect, useState } from 'react';
import moment from 'moment';


const UserPage = () => {
    const [users, setUsers] = useState([]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'User name', width: 130 },
        { field: 'sex', headerName: 'Sex', width: 130 },
        {
            field: 'phone',
            headerName: 'Phone',
            type: 'number',
            width: 90,
        },
        {
            field: 'birthday',
            headerName: 'Birthday',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => {
                return moment(value).format('YYYY/MM/DD');
            },
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };


    const getUsers = async () => {
        const users: any = await get('/api/user');
        console.log(users);
        setUsers(users.data);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <h1>User Page</h1>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default UserPage;