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
    from_date?: string | Date;
    to_date?: string | Date;
}

export class SearchConsultantProps {
    student_id?: number;
    consultant_id?: number;
    total_present?:number;
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
    date_from?: string | Date;
    date_to?: string | Date;
    description?:string;
    financial_refused_status?: "noMoney"  |  "returned" | "not_returned";
}