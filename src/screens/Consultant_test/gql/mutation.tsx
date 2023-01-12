import { gql } from '@apollo/client';


export const CREATE_CONSULTANT_TEST = gql`
    mutation CONSULTANT_TEST_CREATE($code:Int!,$lessonId:Int!,$level:TestLevel!,$subject:String!)
        { 
            addTest(test:{
                code:$code
                lessonId:$lessonId
                level:$level
                subject:$subject
            })
            {
                _id
                code
                lessonId
                level
                subject
            }
        }
`;
export const UPDATE_CONSULTANT_TEST = gql`
    mutation CONSULTANT_TEST_EDIT($_id:ID!,$code:Int!,$lessonId:Int!,$level:TestLevel!,$subject:String!)
    { 
    updateTest(
        _id:$_id 
        test:{ 
        code:$code
        lessonId:$lessonId
        level:$level
        subject:$subject
    }){
        _id
        code
        lessonId
        level
        subject
    }
    }
`;
export const DELETE_CONSULTANT_TEST = gql`
        mutation CONSULTANT_TEST_DELETE($_id:ID!)
        { 
            deleteTest(_id:$_id)
            {
                success
            }
        }
        `;



