import { getUserData } from 'utils/user';
import AdminInputs from 'screens/Students/StudentCourses/components/AdminInputs';
import ManagerInputs from 'screens/Students/StudentCourses/components/ManagerInputs';
import FinancialInputs from 'screens/Students/StudentCourses/components/FinancialInputs';
import AcceptorInputs from 'screens/Students/StudentCourses/components/AcceptorInputs';
import { UserData } from 'utils/dto/user-data.dto';

interface EditProps {
    setFormData: Function;
    studentCourse: StudentCourseFormData;
}
interface StudentCourseFormData {
    student_status: string;
    financial_status: string;
    manager_status: string;
}
const GetEditBox = ({ setFormData, studentCourse }: EditProps) => {
    switch ((getUserData() as UserData).group.name) {
        case 'admin':
            return <AdminInputs setFormData={setFormData} studentCourse={studentCourse} />;
        case 'manager':
            return <ManagerInputs setFormData={setFormData} studentCourse={studentCourse} />;
        case 'financial':
            return <FinancialInputs setFormData={setFormData} studentCourse={studentCourse} />;
        case 'acceptor':
            return <AcceptorInputs setFormData={setFormData} studentCourse={studentCourse} />;
        default:
            return <></>;
    }
}
export default GetEditBox;