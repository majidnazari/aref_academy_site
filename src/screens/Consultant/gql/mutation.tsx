import { useMutation, gql } from "@apollo/client";
import { arrayBuffer } from "node:stream/consumers";
//const timetable=[];

// export const ADD_A_COUNSULTANT = gql`
// mutation ADD_CONSULTANT(
//   $userId:ID!,
//   $step:Int!,
//   $dayofWeek:DayOfWeek!,
//   $start:String!,
//   $end:String!,
//   # $dayofWeek2:DayOfWeek!,
//   # $start2:String!,
//   # $end2:String!
//   ){
//   addConsultant(consultant:{
//     userId:$userId
//     step:$step
//     # timeTable:[
//     #   { 
//         for(let i = 0; i < $dayofWeek.length;i++)    
//         {
//           timetable[dayOfWeek]:$dayofWeek[i]
//       	  timetable[startEnd]:{
//           start:$start
//           end:$end
//       					},

//         }

//       # },
//       #  {     
//       # 	dayOfWeek:$dayofWeek2
//       # 	startEnd:{
//       #     start:$start2
//       #     end:$end2
//       # 					}
//       # }
//     # ]

//   }){
//      _id
//       userId
//     step
//     timeTable{
//       dayOfWeek
//       startEnd{
//         start
//         end
//       }

//     }
//   }
// }
// `;
interface TimeTable {
  dayOfWeek: string;
  startEnd: {
    start: string,
    end: string,
  }
}


export const addConsultantWithDefinition = (variables: any) => {
  console.log("function is begin");
  // console.log("the function add consultant is running");
  // console.log(variables.dayofWeek);
  let timetables: TimeTable[] = [];
  let timetable: TimeTable;
  let statement = " mutation ADD_CONSULTANT($userId:ID!,$step:Int!,";
  for (let i = 0; i < variables.dayofWeek.length; i++) {
    statement += "$dayofWeek" + (i + 1) + ":DayOfWeek!,";
    statement += "$start" + (i + 1) + ":String!,";
    statement += "$end" + (i + 1) + ":String!,";

  }
  statement += " ){addConsultant(consultant:{userId:$userId step:$step timeTable:[";
  for (let i = 0; i < variables.dayofWeek.length; i++) {

    timetable =
    {
      "dayOfWeek": variables.dayofWeek[i],
      "startEnd": {
        "start": "12",
        "end": "14",
      }
    };
    statement += "{ dayOfWeek :$dayofWeek" + (i + 1) + " ";
    statement += "startEnd:{ start:$start" + (i + 1) + " ";
    statement += " end:$end" + (i + 1) + " }}, ";
    //timetables[i] = timetable;
  }
  // if (timetables.length) {
  //   console.log(timetables);
  // }
  // statement +=timetables;
  statement += " ]}){_id  userId step timeTable{ dayOfWeek startEnd{ start  end  } }}} ";
  const tmp = gql` ${statement} `;
  console.log("function is end");
  return tmp;
  //console.log(statement);
}





// export const addConsultantWithoutDefinition = (variables: any) => {
//   // console.log("the function add consultant is running");
//   // console.log(variables.dayofWeek);
//   let timetables: TimeTable[] = [];
//   let timetable: TimeTable;
//   let statement = "";
//   // let statement = "mutation ADD_CONSULTANT($userId:ID!,$step:Int!,";
//   // for (let i = 0; i < variables.dayofWeek.length; i++) {
//   //   statement += "$dayofWeek" + (i + 1) + ":DayOfWeek!,";
//   //   statement += "$start" + (i + 1) + ":String!,";
//   //   statement += "$end" + (i + 1) + ":String!,";

//   // }
//   statement += `mutation{addConsultant(consultant:{userId:"${variables.userId}"  step:${variables.step}  timeTable:[`;
//   for (let i = 0; i < variables.dayofWeek.length; i++) {

//     // timetable =
//     // {
//     //   "dayOfWeek": variables.dayofWeek[i],
//     //   "startEnd": {
//     //     "start": variables.start,
//     //     "end": variables.end,
//     //   }
//     // };
//     statement += `{ dayOfWeek :  ${variables.dayofWeek[i]}`;
//     statement += ` startEnd:{ start: "${variables.start}" `;
//     statement += ` end: "${variables.start}" }}, `;
//     //timetables[i] = timetable;
//   }
//   // if (timetables.length) {
//   //   console.log(timetables);
//   // }
//   // statement +=timetables;
//   statement += " ]}){_id }}";
//   console.log(statement);

//   const tmp = gql`
//   statement
//   `;
//   const [runMutation]=useMutation(tmp);
//   return (runMutation());
// }

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
export const DELETE_CONSULTANT_TEST = gql`
        mutation CONSULTANT_TEST_DELETE($_id:ID!)
        { 
            deleteTest(_id:$_id)
            {
                success
            }
        }
        `;



