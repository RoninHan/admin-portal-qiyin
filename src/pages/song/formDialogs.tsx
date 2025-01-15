import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { get, post } from '../../http';

interface FormDialogProps {
    mode: boolean;
    onClose?: () => void;
    formData?: any;
}

export default function FormDialog(props: FormDialogProps) {
    const { mode, onClose, formData } = props;
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [form, setForm] = React.useState<any>({});
    const [songTypes, setSongTypes] = React.useState([]);

    React.useEffect(() => {
        setOpen(mode);
        setForm(formData);
        if (mode) {
            getSongTypes();
        }
    }, [mode]);

    const handleClose = () => {
        onClose && onClose();
    };

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setForm({
            ...form,
            song_type_id: value
        });
    };

    const handleSave = async (formData: any) => {
        console.log(formData);
        if (form.id) {
            let res: any = await post('/api/song/update/' + form.id, formData);
            console.log(res);
            if (res.status === "success") {
                handleClose();
            }
            
        } else {
            let res: any = await post('/api/song/new', formData);
            if (res.status === 'Success') {
                handleClose();
            }
        }
        
    }

    const getSongTypes = async () => {
        const songTypes: any = await get('/api/song_type');
        setSongTypes(songTypes.data);
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
                        formJson.song_type_id = Number(formJson.song_type_id);
                        console.log(formJson);
                        handleSave(formJson);
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
                            defaultValue={form?.name}
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
                            defaultValue={form?.author}
                        />
                        <FormControl variant="standard" required fullWidth sx={{ mt: 1 }}>
                            <InputLabel id="song-type-label">Song Type</InputLabel>
                            <Select
                                labelId="song-type-label"
                                id="song_type_id"
                                name='song_type_id'
                                value={form?.song_type_id}
                                onChange={handleChange}
                                label="Song Type"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    songTypes.map((songType: any) => {
                                        return <MenuItem key={songType.id} value={songType.id}>{songType.name}</MenuItem>
                                    })
                                }
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
                            defaultValue={form?.singer}
                        />
                        <TextField
                            fullWidth
                            required
                            margin="dense"
                            type="text"
                            id="lyric"
                            label="Lyric"
                            name="lyric"
                            multiline
                            variant="standard"
                            defaultValue={form?.lyric}
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