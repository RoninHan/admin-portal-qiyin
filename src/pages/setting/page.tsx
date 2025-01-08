import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { get, post } from '../../http';
import { useEffect, useState } from 'react';

const SettingPage = () => {
    const [setting, setSetting] = useState<any>({});

    const getSetting = async () => {
        const setting: any = await get('/api/setting');
        setSetting(setting.data);
    };

    const handleSave = async () => {
        let res = await post('/api/setting/update/' + setting.id, setting);
        console.log(res);
    }

    useEffect(() => {
        getSetting();
    }, [])

    return (
        <div>
            <h1>Setting Page</h1>
            <div className='flex flex-row gap-4 mt-4'>
                <TextField id="outlined-basic" size='small' label="Device id" variant="outlined" value={setting.device_id} onChange={(e) => {
                    setSetting({ ...setting, device_id: e.target.value });
                }} />
                <Button variant="outlined" onClick={handleSave}>保存</Button>
            </div>
        </div>
    );
}
export default SettingPage;