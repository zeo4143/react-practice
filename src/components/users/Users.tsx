import React, { JSX, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { deletePost, fetchPosts } from '../../app/post/postSlice';
import ListViewTable from '../table/ListViewTable';
import { Add } from '@mui/icons-material';
import AddPostDialog from './AddUser';
import { deleteUser, fetchUsers } from '../../app/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Users: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'username', label: 'UserName' },
        { key: 'email', label: 'Email Address' },
        // { key: 'address', label: 'Address' },
        { key: 'phone', label: 'Phone Number' },
        { key: 'website', label: 'Website' },
        // { key: 'company', label: 'Company' },
    ];

    let component: JSX.Element = <></>;

    if (loading) {
        component = (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        component = (
            <Typography color="error" align="center" mt={4}>
                {error}
            </Typography>
        );
    }

    if (users) {
        component = (
            <>
                <ListViewTable
                    title="List Of Users"
                    columns={columns}
                    rows={users}
                    renderActions={(row) => ({
                        onView: () => {navigate('/users/' + row.id)},
                        onEdit: () => {},
                        onDelete: () => {dispatch(deleteUser(row.id))},
                    })}>
                    <Tooltip title="Add User">
                        <Button startIcon={<Add/>} variant="contained" color="primary" onClick={() => setOpen(true)}>
                            ADD USER
                        </Button>
                    </Tooltip>
                </ListViewTable>
            </>
        );

    }

    return component;
};

export default Users;
