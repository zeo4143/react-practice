import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';

interface AddPostDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (post: { title: string; body: string; userId: number }) => void;
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({ open, onClose, onSubmit }) => {
    const [post, setPost] = useState({ title: '', body: '', userId: 1 });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
        onSubmit({ ...post });
        setPost({ title: '', body: '', userId: 1 });
    };

    return (
        <Dialog
            fullWidth
            sx={{borderRadius: 4, padding: 2}}
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Add New Post</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Title"
                    value={post.title}
                    onChange={handleChange('title')}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Body"
                    value={post.body}
                    onChange={handleChange('body')}
                    fullWidth
                    multiline
                    rows={5}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button sx={{paddingInline: 4 }} onClick={handleSubmit} variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPostDialog;
