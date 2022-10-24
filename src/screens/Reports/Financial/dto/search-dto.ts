export class SearchProps {
    student_id?: number;
    course_id?: number;
    financial_status?: "approved" | "pending" | "semi_approved";
    manager_status?: "approved" | "pending";
    student_status?:
        | "ok"
        | "refused"
        | "fired"
        | "financial_pending"
        | "forbidden"
        | "fired_pending"
        | "refused_pending";
}