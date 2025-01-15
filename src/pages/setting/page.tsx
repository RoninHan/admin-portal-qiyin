import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { get, post } from '../../http';
import { useEffect, useState } from 'react';

const SettingPage = () => {
    const [form, setForm] = useState<any>({
        device_id: ''
    });

    const getSetting = async () => {
        const res: any = await get('/api/setting');
        setForm(res.data);
    };

    const handleSave = async () => {
        await post('/api/setting/update/' + form.id, form);
        await getSetting();
    }

    useEffect(() => {
        getSetting();
    }, [])

    return (
        <div>
            <h1>Setting Page</h1>
            <div className='flex flex-row gap-4 mt-4'>
                <TextField autoFocus id="outlined-basic" size='small' label="Device id" variant="outlined" value={form.device_id} onChange={(e) => {
                    setForm({ ...form, device_id: e.target.value });
                }} />
                <Button variant="outlined" onClick={handleSave}>保存</Button>
            </div>
        </div>
    );
}
export default SettingPage;