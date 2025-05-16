import React, { JSX, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { addPost, deletePost, fetchPosts, Post } from '../../app/post/postSlice';
import ListViewTable from '../table/ListViewTable';
import { Add } from '@mui/icons-material';
import AddPostDialog from './AddPost';
import Loader from '../common/Loader';
import Actions from '../common/Actions';

interface PostProps {
    userId?:number;
}

const Posts: React.FC<PostProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.posts);

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
        { key: 'title', label: 'Title' },
        { key: 'body', label: 'Body' },
    ];

    const slicedPosts = posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    let component: JSX.Element = <></>;

    if (loading) {
        component = (
            <Loader height="500px" />
        );
    }

    if (error) {
        component = (
            <Typography color="error" align="center" mt={4}>
                {error}
            </Typography>
        );
    }

    if (posts && !error && !loading) {
        component = (
            <>
                <ListViewTable
                    title="Posts"
                    columns={columns}
                    rows={slicedPosts}
                    renderActions={(row) => ({
                        onDelete: () => {dispatch(deletePost(row.id));},
                        onEdit: () => {},
                    })}
                    paginationProps={{
                        showPagination: true,
                        rowsPerPageOptions: [5, 10, 20],
                        count: posts.length,
                        page: page,
                        rowsPerPage: rowsPerPage,
                        onPageChange: handleChangePage,
                        onRowsPerPageChange: handleChangeRowsPerPage,
                    }}
                >
                    <Actions
                    onRefresh={() => {dispatch(fetchPosts({queryParams: { userId}}))}}
                    onAdd={() => setOpen(true)}/>
                </ListViewTable>

                <AddPostDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onSubmit={() => dispatch(addPost({ title: '', body: '', id: 1 } as Post))}
                />
            </>
        );

    }

    return component;
};

export default Posts;
