import { useMutation, gql } from "@apollo/client";
import { arrayBuffer } from "node:stream/consumers";

interface TimeTable {
  dayOfWeek: string;
  startEnd: {
    start: string,
    end: string,
  }
}
export const addConsultantWithDefinition = (variables: any) => {

  //alert("function runs"); 

  let timetable: TimeTable;
  let statement = " mutation ADD_CONSULTANT($userId:ID!,$step:Int!,$start:String!,$end:String!,";
  for (let i = 0; i < variables.dayofWeek.length; i++) {
    statement += "$dayofWeek" + (i + 1) + ":DayOfWeek!,";
  }
  statement += " ){addConsultant(consultant:{userId:$userId step:$step timeTable:[";
  for (let i = 0; i < variables.dayofWeek.length; i++) {

    timetable =
    {
      "dayOfWeek": variables.dayofWeek[i],
      "startEnd": {
        "start": variables.start,
        "end": variables.end,
      }
    };
    statement += "{ dayOfWeek :$dayofWeek" + (i + 1) + " ";
    statement += "startEnd:{ start:$start ";// + (i + 1) + " ";
    statement += " end:$end }},";//+ (i + 1) + " }}, ";    
  }

  statement += " ]}){_id  userId step timeTable{ dayOfWeek startEnd{ start  end  } }}} ";
  const tmp = gql` ${statement} `;
  return tmp;
}

export const ADD_A_COUNSULTANT = gql`
mutation ADD_CONSULTANT(
  $userId:ID!,
  $step:Int!,
  $dayofWeek1:DayOfWeek!,
  $start1:String!,
  $end1:String!,
  $dayofWeek2:DayOfWeek!,
  $start2:String!,
  $end2:String!
  ){
  addConsultant(consultant:{
    userId:$userId
    step:$step
    timeTable:[
      { 
       
         dayOfWeek:$dayofWeek1
      	  startEnd:{
          start:$start1
          end:$end1
      					},

        } ,
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
export const DELETE_CONSULTANT = gql`
        mutation DELETE_CONSULTANT($id:ID!){
            deleteConsultant(_id:$id)
            {
             success
            }
          }
        `;



