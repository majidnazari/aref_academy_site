interface ConsultantFinancialType {
    id: number;
    student_id: number;
    year_id:number;
    student?: {
        id: number;
        first_name: string;
        last_name: string;
        phone: string
    };
    financial_status: string;
    manager_status: string;
    status: string;
    student_status: string;
    created_at: string;
    financial_status_updated_at?: string;
    description: string;
    user_id_manager:number;
    manager: {
        first_name: string;
        last_name: string;
    } | null;
    user: {
        first_name: string;
        last_name: string;
    } | null;
    user_id_financial:number;
    financial: {
        first_name: string;
        last_name: string;
    } | null;
    user_id_student_status:number;
    userStudentStatus: {
        first_name: string;
        last_name: string;
    } | null;
    consultant: {
        id: string;
        first_name: string;
        last_name: string;        
    }    
   
    financial_refused_status: string | null;
    
}
export default ConsultantFinancialType;