import { useContext, useEffect } from 'react';
import { AuthContext } from '../../components/AppContext';
import { logout } from '../../utils/user';
import {
    useNavigate
} from "react-router-dom"

const SignoutScreen = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const loginHandler = () => {
        authContext.login(false);
        logout();
        navigate("/");
    }
    useEffect(() => {
        loginHandler();
    }, []);
    return (
        <div>
            <h3>
                Sigout
            </h3>
        </div>
    )
}

export default SignoutScreen;