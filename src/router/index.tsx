import DashboardScreen from '../screens/Dashboard';
import SigninScreen from '../screens/Signin';
import Main from '../Layout/main';
import {
    Routes,
    Route,
} from "react-router-dom";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route index element={<DashboardScreen />} />
                <Route element={<SigninScreen />} path="signin" />
            </Route>
        </Routes>
    )
}
export default MainRouter;