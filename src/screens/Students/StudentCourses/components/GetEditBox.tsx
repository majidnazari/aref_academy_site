import { getUserData } from 'utils/user';
import AdminInputs from './AdminInputs';
import ManagerInputs from './ManagerInputs';
import FinancialInputs from './FinancialInputs';
import AcceptorInputs from './AcceptorInputs';

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
    const userGroup = (getUserData()).group.name;
    switch (userGroup) {
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