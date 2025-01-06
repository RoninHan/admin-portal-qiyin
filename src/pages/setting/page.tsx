import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

const SettingPage = () => {
    return (
        <div>
            <h1>Setting Page</h1>
            <div className='flex flex-row gap-4 mt-4'>
                <TextField id="outlined-basic" size='small' label="Device id" variant="outlined" />
                <Button variant="outlined">保存</Button>
            </div>
        </div>
    );
}
export default SettingPage;