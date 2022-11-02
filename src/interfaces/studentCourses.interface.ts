interface StudentCoursesType {
    id: number;
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
    user_manager: {
        first_name: string;
        last_name: string;
    } | null;
    user_creator: {
        first_name: string;
        last_name: string;
    } | null;
    user_financial: {
        first_name: string;
        last_name: string;
    } | null;
    user_student_status: {
        first_name: string;
        last_name: string;
    } | null;
    course: {
        name: string;
        lesson: string;
        type: string;
        teacher: {
            first_name: string;
            last_name: string;
        }
        education_level: string;
    }
    total_dellay15?:number;
    total_dellay30?:number;
    total_dellay45?:number;
    total_dellay60?:number;
    total_noAction?:number;
    total_not_registered?:number;
    total_present?:number;
}
export default StudentCoursesType;