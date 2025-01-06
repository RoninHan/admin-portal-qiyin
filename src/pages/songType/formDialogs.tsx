import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { use } from 'i18next';

interface FormDialogProps {
    mode: boolean;
    onClose?: () => void;
}

export default function FormDialog(props: FormDialogProps) {
    const { mode, onClose } = props;
    const [open, setOpen] = React.useState(mode);

    React.useEffect(() => {
        setOpen(mode);
    }, [mode]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        onClose && onClose();
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Song type form</DialogTitle>
                <DialogContent>
                    <div className='w-64'>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Song type name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}