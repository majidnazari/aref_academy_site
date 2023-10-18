interface ConsultantFinancialType {
    id : number
    year_id : number
    year ?:
    {
      active: boolean
      name : string
    }
    branch_id : number
    branch ?:{
      id : number
      name : string     
    }
    student_id : number
    student ?:{
      id : number
      first_name : string 
      last_name : string 
      is_academy_student : boolean
    }
    consultant_id : number
    consultant ?:{ 
      id : number
      email :string
      first_name :string
      last_name :string
      
    }
    user_id_creator : number
    user ?:
    {
      id : number
      first_name :string
      last_name :string
    }
    user_id_manager : number
    manager ?:{
      id : number
      first_name : string
      last_name : string
    }
    user_id_financial : number
    financial ?: {
      id : number
      first_name : string
      last_name : string
    }
    user_id_student_status ?: number
    consultant_definition_detail_id ?: number
    consultantDefinitionDetails ?:{
      id : number
      start_hour :string
      end_hour :string
      session_date :string 
    }
 
    financial_status :string
    manager_status :string
    student_status :string
    financial_refused_status :string
    financial_status_updated_at :string
    description :string
    created_at:string
    updated_at:string
}
export default ConsultantFinancialType;