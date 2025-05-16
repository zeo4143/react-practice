import { Box, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';

interface LoaderProps {
    width?: string;
    height?: string;
    title?: string
}

const Loader: FC<LoaderProps> = ({title = 'Loading...', width = "100%", height = "100%"}) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1, width, height }}>
        <CircularProgress/>
        <Typography>{title}</Typography>
    </Box>
)

export default Loader;