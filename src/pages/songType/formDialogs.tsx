import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { use } from 'i18next';
import { set } from 'mobx';
import { post } from '../../http';

interface FormDialogProps {
    mode: boolean;
    onClose?: () => void;
    formData?: any;
}

export default function FormDialog(props: FormDialogProps) {
    const { mode, onClose, formData } = props;
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState<any>({});

    React.useEffect(() => {
        setOpen(mode);
        setForm(formData);
    }, [mode]);

    const handleClose = () => {
        onClose && onClose();
    };

    const handleSave = (formData: any) => {
        if (form.id) {
            let res = post('/api/song_type/update/' + form.id, formData);
            console.log(res);
            handleClose();
        } else {
            let res = post('/api/song_type/new', formData);
            console.log(res);
            handleClose();
        }
    }

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
                        handleSave(formJson);
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
                            defaultValue={form?.name}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="en_name"
                            name="en_name"
                            label="Song type english name"
                            type="text"
                            fullWidth
                            variant="standard"
                            defaultValue={form?.en_name}
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