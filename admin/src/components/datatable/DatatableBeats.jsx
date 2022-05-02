import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { beatColumns, userColumns, userRows } from '../../datatablesource';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BeatContext } from '../../context/beatContext/BeatContext';
import { deleteBeats, getBeats } from '../../context/beatContext/apiCalls';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import storage from '../../firebase';

const Datatable = () => {
    const { beats, dispatch } = useContext(BeatContext);

    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        getBeats(dispatch);
    }, [dispatch]);

    const handleDelete = (id, row) => {
        const index = beats.findIndex((object) => {
            return object._id === row._id;
        });

        if (beats[index].mp3_tagged) {
            const storageRef = ref(storage, beats[index].mp3_tagged);

            deleteObject(storageRef)
                .then(() => {
                    console.log('deleted');
                })
                .catch((err) => console.log(err));
        }

        if (beats[index].waw_untagged) {
            const storageRef = ref(storage, beats[index].waw_untagged);

            deleteObject(storageRef)
                .then(() => {
                    console.log('deleted');
                })
                .catch((err) => console.log(err));
        }

        if (beats[index].stems) {
            const storageRef = ref(storage, beats[index].stems);

            deleteObject(storageRef)
                .then(() => {
                    console.log('deleted');
                })
                .catch((err) => console.log(err));
        }

        if (beats[index].img) {
            const storageRef = ref(storage, beats[index].img);

            deleteObject(storageRef)
                .then(() => {
                    console.log('deleted');
                })
                .catch((err) => console.log(err));
        }
        deleteBeats(id, dispatch, setDeleteSuccess);
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Link
                            to={{ pathname: '/products/' + params.row._id }}
                            state={{ beat: params.row }}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className='viewButton'>View</div>
                        </Link>
                        <div
                            className='deleteButton'
                            onClick={() => handleDelete(params.row._id, params.row)}
                        >
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
                <Link to='/add' className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                className='datagrid'
                rows={beats}
                columns={beatColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
            />
        </div>
    );
};

export default Datatable;
