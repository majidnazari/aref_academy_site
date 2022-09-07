class StudentData {
    id?: string;
    first_name!: string;
    last_name!: string;
    phone!: string;
    mother_phone!: string;
    father_phone!: string;
    home_phone!: string;
    major!: string;
    egucation_level!: string;
    description?: string;
    parents_job_title!: string;
    nationality_code!: string;
    concours_year?:string;
}

export default StudentData;