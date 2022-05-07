import { useContext, useEffect, useState } from 'react';
import DashboardScreen from '../screens/Dashboard';
import UsersScreen from '../screens/Users';
import UsersEditScreen from '../screens/Users/edit';
import UsersCreateScreen from '../screens/Users/create';
import SigninScreen from '../screens/Signin';
import SignoutScreen from '../screens/Signout';
import Main from '../Layout/main';
import NoMatch from '../Layout/404';
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
            {
                isLogged ?
                    <Route element={<Main />}>
                        <Route index element={<DashboardScreen />} />
                        <Route path="users" >
                            <Route path="" element={<UsersScreen />} />
                            <Route path="edit/:userId" element={<UsersEditScreen />} />
                            <Route path="create" element={<UsersCreateScreen />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                        <Route path="/signout" element={<SignoutScreen />} />
                        <Route path="*" element={<DashboardScreen />} />
                    </Route>
                    :
                    <Route path="*" element={<SigninScreen />} />
            }
        </Routes>
    )
}
export default MainRouter;