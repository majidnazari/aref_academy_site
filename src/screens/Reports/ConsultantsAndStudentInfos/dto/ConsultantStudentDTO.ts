export class ConsultantStudentDTO {
  id!: String
  year_id?: number
  year?: Year
  branch_id?: number
  branch?: Branch
  student_id?: number
  studentInfos?: StudentInfos
  consultant_id?: number
  consultant?: Consultant
  user_id_creator?: number
  user?: User
  user_id_manager?: number
  manager?: Manager
  user_id_financial?: number
  financial?: Financial
  user_id_student_status?: number
  description?: string
  created_at?: string
  financial_status?: string
  manager_status?: string
  student_status?: string
  financial_refused_status?: string
  financial_status_updated_at?: string
}

export class StudentInfos {
  id!: number
  student_id!: number
  school_name?: string
  first_name?: string
  last_name?: string
  nationality_code?: string
  phone?: string
  major?: string
  education_level?: string
  concours_year?: string
}

export class Year {
  active?: boolean
  name?: string
}

export class Branch {
  id!: string
  name?: string
}
export class Consultant {
  id!: string
  email?: string
  first_name?: string
  last_name?: string
}
export class User {
  id!: string
  email?: string
  first_name?: string
  last_name?: string
}
export class Manager {
  id!: string
  email?: string
  first_name?: string
  last_name?: string
}
export class Financial {
  id!: string
  email?: string
  first_name?: string
  last_name?: string
}
