import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FormDialogProps {
    mode: boolean;
    onClose?: () => void;
}

export default function FormDialog(props: FormDialogProps) {
    const { mode, onClose } = props;
    const [open, setOpen] = React.useState(mode);
    const [age, setAge] = React.useState('');
    React.useEffect(() => {
        setOpen(mode);
    }, [mode]);

    const handleClose = () => {
        onClose && onClose();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
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
                <DialogTitle>Song form</DialogTitle>
                <DialogContent>
                    <div className='w-[480px]'>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Song name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="author"
                            name="author"
                            label="Author"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl variant="standard" required fullWidth sx={{ mt: 1 }}>
                            <InputLabel id="song-type-label">Song Type</InputLabel>
                            <Select
                                labelId="song-type-label"
                                id="song-type"
                                value={age}
                                onChange={handleChange}
                                label="Song Type"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="singer"
                            name="singer"
                            label="Singer"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            fullWidth
                            required
                            id="lyric"
                            label="Lyric"
                            multiline
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