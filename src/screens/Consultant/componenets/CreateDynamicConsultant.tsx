import { useMutation, gql } from "@apollo/client";
import { addConsultantWithDefinition } from "../gql/mutation";
import AdapterJalali from '@date-io/date-fns-jalali';
import moment from 'moment';
import { useEffect, useState } from "react";
import { TenMpRounded } from "@mui/icons-material";
import { showSuccess } from "../../../utils/swlAlert";


export enum DayOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
interface StartEnd {
    start: string,
    end: string
}
interface TimeTable {
    dayOfWeek: DayOfWeek,
    startEnd: StartEnd[]

}
interface variablesConsultant {
    userId?: string;
    step?: string;
    dayOfWeek?: string;
    startTime?: string;
    endTime?: string;
    //timeTable?: TimeTable[];
}
const CreateDynamicConsultant = ({ variables, inactive }: any) => {    

    const [runableState, setRunableState] = useState(true);

    const tmp: any = {
        userId: variables.userId,
        step: variables.step,
        start: variables.start,
        end: variables.end,
    }

    for (let i = 0; i < variables.dayofWeek.length; i++) {
        let nameindex = "dayofWeek" + (i + 1);
        tmp[nameindex] = variables.dayofWeek[i];
    }

    const [insertOneConsultant] = useMutation(addConsultantWithDefinition(variables));

    useEffect(() => {
        //console.log("use effect is run and runComponent is:",runableState);
        if(runableState){
            insertOneConsultant({ variables: tmp })
            .then(() => {
                showSuccess("مشاور جدید با موفقیت ایجاد شد");              
                
            })  
            .finally(()=>{
                inactive();
                setRunableState(false);
            })   
        }    
               
    },[runableState]);
    return (
        <></>
        // <button onClick={() => functionhelper()}> فعال کردن </button>
    )
}
export default CreateDynamicConsultant;