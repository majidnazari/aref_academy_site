import { useContext } from 'react';
import { AuthContext } from '../../components/AppContext';
import Button from '@mui/material/Button';
import {setToken} from '../../utils/auth';

const SigninScreen = () => {
    const authContext = useContext(AuthContext);
    const loginHandler = () => {
        authContext.login(true);
        setToken("asdasdasdasdasdasdasd32132");
    }
    return (
        <div>
            <h3>
                Sigin
            </h3>
            <Button variant="contained" color="primary" onClick={loginHandler} >
                Hello World
            </Button>
        </div>
    )
}

export default SigninScreen;