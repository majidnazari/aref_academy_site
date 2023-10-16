import { getUserData } from 'utils/user';
import AdminInputs from 'screens/Students/StudentCourses/components/AdminInputs';
import ManagerInputs from 'screens/Students/StudentCourses/components/ManagerInputs';
import FinancialInputs from 'screens/Students/StudentCourses/components/FinancialInputs';
import AcceptorInputs from 'screens/Students/StudentCourses/components/AcceptorInputs';
import { UserData } from 'utils/dto/user-data.dto';
import ConsultantAdminInputs from './ConsultantAdminInputs';
import ConsultantFinancialInputs from './ConsultantFinancialInputs';
import ConsultantManagerInputs from './ConsultantManagerInputs';

interface EditProps {
    setFormData: Function;
    consultantFinancial: ConsultantFinancialFormData;
}
interface ConsultantFinancialFormData {
    student_status: string;
    financial_status: string;
    manager_status: string;
}
const ConsultantGetEditBox = ({ setFormData, consultantFinancial }: EditProps) => {
    switch ((getUserData() as UserData).group.name) {
        case 'admin':
            return <ConsultantAdminInputs setFormData={setFormData} consultantFinancial={consultantFinancial} />;
        case 'manager':
            return <ConsultantManagerInputs setFormData={setFormData} consultantFinancial={consultantFinancial} />;
        case 'financial':
            return <ConsultantFinancialInputs setFormData={setFormData} consultantFinancial={consultantFinancial} />;
       
        default:
            return <></>;
    }
}
export default ConsultantGetEditBox;