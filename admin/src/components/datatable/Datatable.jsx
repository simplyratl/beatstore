import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Datatable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8800/user?new=true', {
                    headers: {
                        token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                    },
                });

                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter((item) => item._id !== id));
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Link to='/users/test' style={{ textDecoration: 'none' }}>
                            <div className='viewButton'>View</div>
                        </Link>
                        <div className='deleteButton' onClick={() => handleDelete(params.row.id)}>
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className='datatable'>
            <div className='datatableTitle'>
                Add New User
                <Link to='/users/new' className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                className='datagrid'
                rows={users}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
            />
        </div>
    );
};

export default Datatable;
