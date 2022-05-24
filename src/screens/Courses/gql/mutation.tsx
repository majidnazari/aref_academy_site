import { gql } from '@apollo/client';

export const DELETE_COURSE = gql`
    mutation DELETE_COURSE ($id:ID!) {  
        deleteCourse(id:$id){
            id
        }
    }  
`;

export const CREATE_COURSE = gql`
    mutation CREATE_COURSE(
        $year_id: Int!
        $teacher_id: Int!
        $name: String!
        $lesson: String!
        $type: String!
        $education_level: String!
        )
        {
            createCourse(input:{
                year_id: $year_id
                teacher_id: $teacher_id
                name: $name
                lesson: $lesson
                type: $type
                education_level: $education_level
            }){
                id
            }
        }
    
`;

export const EDIT_COURSE = gql`
mutation EDIT_COURSE(
    $id: ID!
    $year_id: Int
    $teacher_id: Int
    $name: String
    $lesson: String
    $type: String
    $education_level: String
    )
    {
        updateCourse(input:{
            id: $id
            year_id: $year_id
            teacher_id: $teacher_id
            name: $name
            lesson: $lesson
            type: $type
            education_level: $education_level
        }){
            id
        }
    }
`;
