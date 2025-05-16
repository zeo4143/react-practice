import { FC, JSX } from 'react';
import { Box, Button, CircularProgress, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import ListViewTable from '../table/ListViewTable';
import { Add } from '@mui/icons-material';
import { fetchTodos, Todo, updateTodo } from '../../app/todo/todoSlice';
import Loader from '../common/Loader';
import Actions from '../common/Actions';

interface TodoProps {
    userId?:number;
}

const Todos: FC<TodoProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { todos, loading, error } = useSelector((state: RootState) => state.todos);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title',
            customColumn: (title: string) => (
                <Typography sx={{ width: 300 }}>{title}</Typography>
            )
        },
        {
            key: 'completed', label: 'Completed',
            customColumn: (completed: boolean, rows: Todo[], row: Todo) => (
                <Tooltip title={completed ? 'Mark In Progress' : 'Mark Completed'}>
                    <Button
                        sx={completed ? { px: 3 } : undefined}
                        variant={completed ? 'contained' : 'outlined'}
                        color={completed ? 'success' : 'error'}
                        onClick={() => {
                            dispatch(updateTodo({ ...row, completed: !completed }));
                        }}
                    >
                        {completed ? 'Completed' : 'In Progress'}
                    </Button>
                </Tooltip>
            ),
        },
    ];

    let component: JSX.Element = <></>;

    if (loading) {
        component = (
            <Loader width="570px" />
        );
    }

    if (error) {
        component = (
            <Typography color="error" align="center" mt={4}>
                {error}
            </Typography>
        );
    }

    if (todos && todos.length > 0) {
        component = (
            <Box sx={{ position: 'relative', height: '100%' }}>
                <ListViewTable
                    title="List of Todos"
                    columns={columns}
                    rows={todos}
                >
                <Actions
                    onRefresh={() => {dispatch(fetchTodos({queryParams: { userId }}))}}
                    onAdd={() => {}}
                />
                </ListViewTable>
                {loading && (
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Loader title='Updating...' />
                    </Box>
                )}
            </Box>
        );

    }

    return component;
};

export default Todos;
