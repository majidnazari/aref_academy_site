import { useContext, useEffect, useState } from "react";
import DashboardScreen from "../screens/Dashboard";

import UsersScreen from "../screens/Users";
import UsersEditScreen from "../screens/Users/edit";
import UsersCreateScreen from "../screens/Users/create";

import YearsScreen from "../screens/Years";
import YearsEditScreen from "../screens/Years/edit";
import YearsCreateScreen from "../screens/Years/create";

import CoursesScreen from "../screens/Courses";
import CoursesEditScreen from "../screens/Courses/edit";
import CoursesCreateScreen from "../screens/Courses/create";
import CourseSessionsScreen from "../screens/Courses/sessions";
import CourseSessionsEditScreen from "../screens/Courses/editSession";

import FaultsScreen from "../screens/Faults";
import FaultsEditScreen from "../screens/Faults/edit";
import FaultsCreateScreen from "../screens/Faults/create";

import ConsultantScreen from "../screens/Consultant";
import AddConsultantStudent from "screens/Consultant/addStudent";

import BranchesScreen from "../screens/Branches";
import BranchesEditScreen from "../screens/Branches/edit";
import BranchesCreateScreen from "../screens/Branches/create";
import BranchesClassRoomsScreen from "../screens/Branches/ClassRooms";
import BranchesClassRoomEditScreen from "../screens/Branches/ClassRooms/edit";
import BranchesClassRoomCreateScreen from "../screens/Branches/ClassRooms/create";

import StudentsScreen from "../screens/Students";
import StudentEditScreen from "../screens/Students/edit";
import StudentCreateScreen from "../screens/Students/create";
import StudentCourses from "../screens/Students/StudentCourses";
import StudentWarnings from "../screens/Students/StudentWarnings";
import StudentCosultants from "../screens/Students/StudentCosultants";

import SigninScreen from "../screens/Signin";
import SignoutScreen from "../screens/Signout";

import LessonsScreen from "../screens/Lessons";
import LessonsEditScreen from "../screens/Lessons/edit";
import LessonsCreateScreen from "../screens/Lessons/create";

import ReportsCoursesScreen from "../screens/Reports/Courses";
import ReportsAbsencePresencesScreen from "../screens/Reports/AbsencePresences";
import ReportsCourseSessionsScreen from "../screens/Reports/AbsencePresences/sessions";
import ReportsAbsencePresenceListstudents from "../screens/Reports/AbsencePresences/listStudentsScreen";
import ReporstJuryScreen from "../screens/Reports/AbsencePresences/jury";
import ReporstFinancialScreen from "../screens/Reports/Financial";

import StudentCoursesAlarmsScreen from "../screens/Alarms/studentCoursesAlarms";

import ListTodayCourses from "screens/AbsencePresences/listTodayCourses";
import ListStudentsScreen from "screens/AbsencePresences/listStudentsScreen";

import Main from "../Layout/main";
import NoMatch from "../Layout/404";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../components/AppContext";
import ConsultantTimeTable from "screens/Consultant/Components/ConsultantTimeTable";
import ComponentStudentDialog from "screens/Consultant/Components/ComponentStudentDialog";
import ShowAllConsultantsTimes from "screens/Consultant/Components/ShowAllConsultantsTimes";
import { getUserData } from "utils/user";
import { group } from "console";
import ConsultantStudentManager from "screens/Dashboard/ConsultantStudentManager";
import StudentsConsultantManagerScreen from "screens/Students/consultant_manager/index_consultant_manager";
import ConsultantFinancials from "screens/Consultant/Components/ConsultantFinancials";

const MainRouter = () => {
  const appContext = useContext(AuthContext);
  const [isLogged, setisLogged] = useState(false);
  const [dashboardName, setDashboardName] = useState<string>("");
  useEffect(() => {
    const getRoute= getUserData();
    setDashboardName(getRoute.group.name);
    setisLogged(appContext.isLoggedIn);
  }, [appContext.isLoggedIn]);

  const convertNameComponent = (dashboardName:string) => {

    switch(dashboardName){
      case "consultant_manager":
        return <ShowAllConsultantsTimes />
       // return <ConsultantStudentManager />
      default:
        return <DashboardScreen />
    }
   
  }
  return (
    <Routes>
      {isLogged ? (
        <Route element={<Main />}>

          <Route index element={convertNameComponent(dashboardName)  } /> 

          {/* <Route index element={<DashboardScreen />} /> */}
          

          <Route path="users">
            <Route path="" element={<UsersScreen />} />
            <Route path="edit/:userId" element={<UsersEditScreen />} />
            <Route path="create" element={<UsersCreateScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="years">
            <Route path="" element={<YearsScreen />} />
            <Route path="edit/:yearId" element={<YearsEditScreen />} />
            <Route path="create" element={<YearsCreateScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="courses">
            <Route path="" element={<CoursesScreen />} />
            <Route path="edit/:courseId" element={<CoursesEditScreen />} />
            <Route path="create" element={<CoursesCreateScreen />} />
            <Route
              path=":courseId/sessions"
              element={<CourseSessionsScreen />}
            />
            <Route
              path=":courseId/sessions/:sessionId"
              element={<CourseSessionsEditScreen />}
            />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="faults">
            <Route path="" element={<FaultsScreen />} />
            <Route path="edit/:faultId" element={<FaultsEditScreen />} />
            <Route path="create" element={<FaultsCreateScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="consultant_manager">
            <Route path="" element={<ShowAllConsultantsTimes />} />
            <Route path="edit/:userId" element={<UsersEditScreen />} />
            <Route path="create" element={<UsersCreateScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="consultant-financial">
            <Route path="" element={<ConsultantFinancials />} />
            <Route path="edit/:userId" element={<UsersEditScreen />} />
            <Route path="create" element={<UsersCreateScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="consultant">
            <Route path="" element={<ConsultantScreen />} />
            <Route
              path=":consultantId/timetable"
              element={<ConsultantTimeTable />}
            />
            {/* <Route
              path=":consultantId/timetable"
              element={<ConsultantTimeTable />}
            /> */}
            <Route path="show-all" element={<ShowAllConsultantsTimes />} />
            {/* <Route path=":consultantTimeTableId/setStudent" element={<ComponentStudentDialog  />} /> */}

            <Route
              path=":userId/add-user-consultant"
              element={
                <AddConsultantStudent title="افزودن دانش آموز به مشاور" />
              }
            />         
            
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="branches">
            <Route path="" element={<BranchesScreen />} />
            <Route path="edit/:branchId" element={<BranchesEditScreen />} />
            <Route path="create" element={<BranchesCreateScreen />} />
            <Route
              path=":branchId/class-rooms"
              element={<BranchesClassRoomsScreen />}
            />
            <Route
              path=":branchId/class-rooms/:classRoomsId"
              element={<BranchesClassRoomEditScreen />}
            />
            <Route
              path=":branchId/class-rooms/create"
              element={<BranchesClassRoomCreateScreen />}
            />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="students">
            <Route path="" element={<StudentsScreen />} />
            <Route path="consultant_manager" element={<StudentsConsultantManagerScreen />} />
            
            <Route path="edit/:studentId" element={<StudentEditScreen />} />
            <Route path="create" element={<StudentCreateScreen />} />
            <Route path=":studentId/courses" element={<StudentCourses />} />
            <Route
              path=":studentId/cosultants"
              element={<StudentCosultants />}
            />
            <Route path=":studentId/warnings" element={<StudentWarnings />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="lessons">
            <Route path="" element={<LessonsScreen />} />
            <Route path="edit/:lessonId" element={<LessonsEditScreen />} />
            <Route path="create" element={<LessonsCreateScreen />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="reports">
            <Route path="courses" element={<ReportsCoursesScreen />} />
            <Route
              path="absence-presences"
              element={<ReportsAbsencePresencesScreen />}
            />
            <Route
              path="absence-presences/:courseId/sessions"
              element={<ReportsCourseSessionsScreen />}
            />
            <Route
              path="absence-presences/details/:courseId/:courseSessionId"
              element={<ReportsAbsencePresenceListstudents />}
            />

            <Route
              path="absence-presences/jury/:courseId"
              element={<ReporstJuryScreen />}
            />

            <Route path="financial" element={<ReporstFinancialScreen />} />

            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="alarms">
            <Route
              path="student-courses"
              element={<StudentCoursesAlarmsScreen />}
            />
             <Route
              path="consultant-financial"
              element={<ConsultantFinancials />}
            />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="absence-presences">
            <Route path="" element={<ListTodayCourses />} />
            <Route
              path="list-students/:courseId/:courseSessionId"
              element={<ListStudentsScreen />}
            />
            <Route path="*" element={<NoMatch />} />
          </Route>

          <Route path="/signout" element={<SignoutScreen />} />
          <Route path="*" element={<DashboardScreen />} />
        </Route>
      ) : (
        <Route path="*" element={<SigninScreen />} />
      )}
    </Routes>
  );
};
export default MainRouter;
