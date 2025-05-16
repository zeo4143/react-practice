import { useParams } from 'react-router-dom';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../app/post/postSlice';
import Posts from '../../components/posts/Posts';
import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { fetchTodos } from '../../app/todo/todoSlice';
import EditIcon from '@mui/icons-material/Edit';
import { RootState } from '../../app/store';
import { fetchUserById, User } from '../../app/user/userSlice';
import Todos from '../../components/todos/Todos';
import Loader from '../../components/common/Loader';

const UserDetails: FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { users } = useSelector((state: RootState) => state.users);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUserById({ id: id as string }))
        }

        dispatch(fetchTodos({ queryParams: { userId: id } }));
        dispatch(fetchPosts({ queryParams: { userId: id } }));
    }, [dispatch, id, users]);

    useEffect(() => {
        if (users && users.length > 0) {
            const foundUser = users.find(user => user.id === Number(id));
            setUser(foundUser || null);
        }
    }, [users, id]);




    return (
        <Grid>
            <Box height={400} display="flex" flex={5} justifyContent="space-between" gap={2} mb={1}>
                <PaperWrapper>
                    <Box width={400}>
                        <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" align="left">
                                User Details
                            </Typography>
                            <Tooltip title="Edit Details">
                                <span>
                                    <IconButton>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>

                        {user ? (
                            <Box mt={2} display="flex" flexDirection="column" gap={2} key={user.id} width="100%">
                                {/*name*/}
                                <Box display="flex" gap={1} sx={{ fontSize: 16 }}>
                                    <Box sx={{ flex: 4, fontWeight: 600 }}>Name</Box>
                                    <Box sx={{ flex: 6 }}>{user.name}</Box>
                                </Box>

                                {/*username*/}
                                <Box display="flex" gap={1} sx={{ fontSize: 16 }}>
                                    <Box sx={{ flex: 4, fontWeight: 600 }}>UserName</Box>
                                    <Box sx={{ flex: 6 }}>{user.username}</Box>
                                </Box>

                                {/*email*/}
                                <Box display="flex" gap={1} sx={{ fontSize: 16 }}>
                                    <Box sx={{ flex: 4, fontWeight: 600 }}>Email</Box>
                                    <Box sx={{ flex: 6 }}>{user.email}</Box>
                                </Box>

                                {/*phone*/}
                                <Box display="flex" gap={1} sx={{ fontSize: 16 }}>
                                    <Box sx={{ flex: 4, fontWeight: 600 }}>Mobile Number</Box>
                                    <Box sx={{ flex: 6 }}>{user.phone}</Box>
                                </Box>

                                {/*address*/}
                                <Box display="flex" gap={1} sx={{ fontSize: 16 }}>
                                    <Box sx={{ flex: 4, fontWeight: 600 }}>Address</Box>
                                    <Box
                                        sx={{ flex: 6 }}>{user.address.suite}, {user.address.street}, {user.address.city} - {user.address.zipcode}</Box>
                                </Box>


                                {/*company*/}
                                <Box key={user.id} display="flex" gap={1} sx={{ fontSize: 16 }}>
                                    <Box sx={{ flex: 4, fontWeight: 600 }}>Company</Box>
                                    <Box sx={{ flex: 6 }}>{user.company.name}</Box>
                                </Box>
                            </Box>
                        ) : (
                            <Loader width="350px" height="300px"/>
                        )}
                    </Box>
                </PaperWrapper>
                <PaperWrapper>
                    <Todos userId={Number(id)}/>
                </PaperWrapper>
            </Box>
            <PaperWrapper>
                <Posts/>
            </PaperWrapper>
        </Grid>
    );
};

interface PaperWrapperProps {
    children: ReactNode;
}

const PaperWrapper: FC<PaperWrapperProps> = ({ children }) => (
    <Paper elevation={3} sx={{ padding: 2, marginBlock: 2, borderRadius: 4 }}>
        {children}
    </Paper>
);

export default UserDetails;
