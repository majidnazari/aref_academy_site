import { useContext, useEffect, useState } from 'react';
import DashboardScreen from '../screens/Dashboard';

import UsersScreen from '../screens/Users';
import UsersEditScreen from '../screens/Users/edit';
import UsersCreateScreen from '../screens/Users/create';

import YearsScreen from '../screens/Years';
import YearsEditScreen from '../screens/Years/edit';
import YearsCreateScreen from '../screens/Years/create';

import CoursesScreen from '../screens/Courses';
import CoursesEditScreen from '../screens/Courses/edit';
import CoursesCreateScreen from '../screens/Courses/create';
import CourseSessionsScreen from '../screens/Courses/sessions';
import CourseSessionsEditScreen from '../screens/Courses/editSession';

import FaultsScreen from '../screens/Faults';
import FaultsEditScreen from '../screens/Faults/edit';
import FaultsCreateScreen from '../screens/Faults/create';

import BranchesScreen from '../screens/Branches';
import BranchesEditScreen from '../screens/Branches/edit';
import BranchesCreateScreen from '../screens/Branches/create';
import BranchesClassRoomsScreen from '../screens/Branches/ClassRooms';
import BranchesClassRoomEditScreen from '../screens/Branches/ClassRooms/edit';
import BranchesClassRoomCreateScreen from '../screens/Branches/ClassRooms/create';

import StudentsScreen from '../screens/Students';
import StudentEditScreen from '../screens/Students/edit';
import StudentCreateScreen from '../screens/Students/create';
import StudentCourses from '../screens/Students/StudentCourses';

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
                        <Route path="years" >
                            <Route path="" element={<YearsScreen />} />
                            <Route path="edit/:yearId" element={<YearsEditScreen />} />
                            <Route path="create" element={<YearsCreateScreen />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                        <Route path="courses" >
                            <Route path="" element={<CoursesScreen />} />
                            <Route path="edit/:courseId" element={<CoursesEditScreen />} />
                            <Route path="create" element={<CoursesCreateScreen />} />
                            <Route path=":courseId/sessions" element={<CourseSessionsScreen />} />
                            <Route path=":courseId/sessions/:sessionId" element={<CourseSessionsEditScreen />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                        <Route path="faults" >
                            <Route path="" element={<FaultsScreen />} />
                            <Route path="edit/:faultId" element={<FaultsEditScreen />} />
                            <Route path="create" element={<FaultsCreateScreen />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                        <Route path="branches" >
                            <Route path="" element={<BranchesScreen />} />
                            <Route path="edit/:branchId" element={<BranchesEditScreen />} />
                            <Route path="create" element={<BranchesCreateScreen />} />
                            <Route path=":branchId/class-rooms" element={<BranchesClassRoomsScreen />} />
                            <Route path=":branchId/class-rooms/:classRoomsId" element={<BranchesClassRoomEditScreen />} />
                            <Route path=":branchId/class-rooms/create" element={<BranchesClassRoomCreateScreen />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                        <Route path="students" >
                            <Route path="" element={<StudentsScreen />} />
                            <Route path="edit/:studentId" element={<StudentEditScreen />} />
                            <Route path="create" element={<StudentCreateScreen />} />
                            <Route path=":studentId/courses" element={<StudentCourses />} />
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