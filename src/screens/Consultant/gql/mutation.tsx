import { gql } from "@apollo/client";

export const ADD_A_COUNSULTANT = gql`
mutation ADD_CONSULTANT($userId:ID!,$step:Int!,$dayofWeek1:DayOfWeek!,$start1:String!,$end1:String!,$dayofWeek2:DayOfWeek!,$start2:String!,$end2:String!){
  addConsultant(consultant:{
    userId:$userId
    step:$step
    timeTable:[
      {     
      	dayOfWeek:$dayofWeek1
      	startEnd:{
          start:$start1
          end:$end1
      					}
      },
       {     
      	dayOfWeek:$dayofWeek2
      	startEnd:{
          start:$start2
          end:$end2
      					}
      }
    ]
      
  }){
     _id
      userId
    step
    timeTable{
      dayOfWeek
      startEnd{
        start
        end
      }
      
    }
  }
}
`;