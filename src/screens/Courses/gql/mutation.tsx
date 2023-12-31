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
        $lesson_id: Int!
        $type: String!
        $education_level: String!
        $branch_id:Int!
        $gender:String!
        )
        {
            createCourse(input:{
                year_id: $year_id
                teacher_id: $teacher_id
                name: $name
                lesson_id: $lesson_id
                type: $type
                education_level: $education_level
                branch_id:$branch_id
                gender:$gender
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
    $lesson_id: Int
    $type: String
    $education_level: String
    $branch_id:Int!
    $gender:String
    )
    {
        updateCourse(input:{
            id: $id
            year_id: $year_id
            teacher_id: $teacher_id
            name: $name
            lesson_id: $lesson_id
            type: $type
            education_level: $education_level
            branch_id:$branch_id
            gender:$gender
        }){
            id
        }
    }
`;

export const CREATE_MULTI_SESSIONS = gql`
    mutation CREATE_MULTI_SESSIONS(
            $course_id: Int!
            $branch_class_room_id: Int!
            $days: [String]
            $name: String
            $price: Int
            $special: Boolean
            $start_date: String!
            $end_date: String!
            $start_time: String!
            $end_time: String!
        )
        {
            createCourseSessionByDuringDate(input:{
                course_id: $course_id
                branch_class_room_id: $branch_class_room_id
                days: $days
                name: $name
                price: $price
                special: $special
                start_date: $start_date
                end_date: $end_date
                start_time: $start_time
                end_time: $end_time
            }){
                id
            }
        }
`;

export const CREATE_SINGLE_SESSION = gql`
    mutation CREATE_SINGLE_SESSION(
            $course_id: Int!
            $branch_class_room_id: Int!
            $name: String
            $price: Int
            $special: Boolean
            $start_date: String!
            $start_time: String!
            $end_time: String!
        )
        {
            createCourseSession(input:{
                course_id: $course_id
                branch_class_room_id: $branch_class_room_id
                name: $name
                price: $price
                special: $special
                start_date: $start_date
                start_time: $start_time
                end_time: $end_time
            }){
                id
            }
        }
`;

export const EDIT_SINGLE_SESSION = gql`
    mutation EDIT_SINGLE_SESSION(
            $id: ID!
            $course_id: Int
            $branch_class_room_id: Int
            $name: String
            $price: Int
            $special: Boolean
            $start_date: Date
            $start_time: String
            $end_time: String
        )
        {
            updateCourseSession(input:{
                id:$id
                course_id: $course_id
                branch_class_room_id: $branch_class_room_id
                name: $name
                price: $price
                special: $special
                start_date: $start_date
                start_time: $start_time
                end_time: $end_time
            }){
                id
            }
        }
`;

export const DELETE_SESSION = gql`
    mutation DELETE_SESSION ($id:ID!) {  
        deleteCourseSession(id:$id){
            id
        }
    }  
`;