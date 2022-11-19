import { gql } from '@apollo/client';

export const DELETE_FAULT = gql`
    mutation DELETE_FAULT ($id:ID!) {  
        deleteFault(id:$id){
            id
        }
    }  
`;

export const CREATE_FAULT = gql`
    mutation CREATE_FAULT(
        $description: String!
        )
        {
            createFault(input:{
                description:$description,
            }){
                id
            }
        }
    
`;

export const CREATE_CONSULTANT_TEST=gql`
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
export const UPDATE_CONSULTANT_TEST=gql`
    mutation CONSULTANT_TEST_EDIT($id:ID!,$code:Int!,$lessonId:Int!,$level:TestLevel!,$subject:String!)
    { 
    updateTest(_id:$id test:{ 
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
export const CONSULTANT_TEST_DELETE=gql`
        mutation CONSULTANT_TEST_DELETE($id:ID!)
        { 
            deleteTest(_id:$id
            ){
                success
            }
        }
        `;

export const EDIT_FAULT = gql`
    mutation EDIT_FAULT(
        $id:Int!,
        $description:String,
        )
        {
        updateFault(input:{
            id:$id,
            description:$description,
        }){
            id
        }
    }
`;
