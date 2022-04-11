import { useContext, useEffect, useState } from 'react';
import DashboardScreen from '../screens/Dashboard';
import SigninScreen from '../screens/Signin';
import SignoutScreen from '../screens/Signout';
import Main from '../Layout/main';
import {
    Routes,
    Route,
} from "react-router-dom";
import { AuthContext } from '../components/AppContext';

const MainRouter = () => {
    const appContext = useContext(AuthContext);
    const [isLogged, setisLogged] = useState(false);
    useEffect(() => {
        setisLogged(appContext.isLoggedIn);
    }, [appContext.isLoggedIn, isLogged]);
    return (

        <Routes>
            {isLogged ? <Route path="/" element={<Main />}>
                <Route index element={<DashboardScreen />} />
                <Route path="/signout" element={<SignoutScreen />} />
            </Route> : <Route path="/" element={<SigninScreen />} />}
        </Routes>
    )
}
export default MainRouter;