import { FC, ReactNode } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Colors } from '../../models/types';
import { AddCircle, Download } from '@mui/icons-material';

export interface ActionCellProps {
    onView?: () => void;
    onDownload?: () => void;
    onAdd?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onRefresh?: () => void;
}

const Actions: FC<ActionCellProps> = ({ onView, onDownload, onAdd, onEdit, onDelete, onRefresh }) => (
    <Box display="flex">
        {/* view */}
        {onView && (
            <TooltipIconWrapper title="View" onClick={onView}>
                <VisibilityIcon />
            </TooltipIconWrapper>
        )}

        {/* download */}
        {onDownload && (
            <TooltipIconWrapper title="Download" onClick={onDownload}>
                <Download/>
            </TooltipIconWrapper>
        )}


        {/* add */}
        {onAdd && (
            <TooltipIconWrapper title="Add" onClick={onAdd} color="primary">
                <AddCircle/>
            </TooltipIconWrapper>
        )}


        {/* edit */}
        {onEdit && (
            <TooltipIconWrapper title="Edit" onClick={onEdit}>
                <EditIcon />
            </TooltipIconWrapper>
        )}

        {/* delete */}
        {onDelete && (
            <TooltipIconWrapper title="Delete" onClick={onDelete} color="error">
                <DeleteIcon />
            </TooltipIconWrapper>
        )}

        {/* refresh */}
        {onRefresh && (
            <TooltipIconWrapper title='Refresh' onClick={onRefresh}>
                <RefreshIcon />
            </TooltipIconWrapper>
        )}
    </Box>
);

interface TooltipIconWrapperProps {
    title: string;
    children: ReactNode;
    onClick: () => void;
    color?: Colors
}

const TooltipIconWrapper: FC<TooltipIconWrapperProps> = ({ title, children, onClick, color = 'default' }) => (
    <Tooltip title={title}>
        <IconButton onClick={onClick} size="small" color={color}>
            {children}
        </IconButton>
    </Tooltip>
);

export default Actions;
