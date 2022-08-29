import { gql } from '@apollo/client';

export const DELETE_FAULT = gql`
    mutation DELETE_FAULT ($id:ID!) {  
        deleteFault(id:$id){
            id
        }
    }  
`;

export const CREATE_STUDENT = gql`
    mutation CREATE_STUDENT(
        $egucation_level: String!
        $father_phone: String
        $first_name: String!
        $home_phone: String
        $last_name: String!
        $major: String
        $mother_phone: String
        $parents_job_title: String
        $phone: String!
        $nationality_code: String!
        )
        {
        createStudent(input:{
                egucation_level:$egucation_level,
                father_phone:$father_phone,
                first_name:$first_name,
                home_phone:$home_phone,
                last_name:$last_name,
                major:$major,
                mother_phone:$mother_phone,
                parents_job_title:$parents_job_title,
                phone:$phone,
                nationality_code:$nationality_code
            }){
                id
            }
        }
    
`;

export const EDIT_STUDENT = gql`
    mutation EDIT_STUDENT(
        $id:ID!,
        $description: String
        $egucation_level: String!
        $father_phone: String
        $first_name: String!
        $home_phone: String
        $last_name: String!
        $level: String
        $major: String
        $mother_phone: String
        $parents_job_title: String
        $phone: String!
        $nationality_code: String!
        )
        {
        updateStudent(input:{
            id:$id,
            description:$description,
            egucation_level:$egucation_level,
            father_phone:$father_phone,
            first_name:$first_name,
            home_phone:$home_phone,
            last_name:$last_name,
            level:$level,
            major:$major,
            mother_phone:$mother_phone,
            parents_job_title:$parents_job_title,
            phone:$phone,
            nationality_code:$nationality_code
        }){
            id
        }
    }
`;
