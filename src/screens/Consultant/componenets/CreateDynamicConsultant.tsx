import { useMutation, gql } from "@apollo/client";
import { addConsultantWithDefinition } from "../gql/mutation";
import AdapterJalali from '@date-io/date-fns-jalali';
import moment from 'moment';
import { useEffect } from "react";
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
    alert("the component is start ");
   // inactive();
    const tmp: any = {
        userId: variables.userId,
        step: variables.step,
        start: variables.start,
        end: variables.end,
    }
    // useEffect(() => {
    //     //alert("use effect run"); 

    //     console.log("component use effect is run");

    // }, []);

    for (let i = 0; i < variables.dayofWeek.length; i++) {
        let nameindex = "dayofWeek" + (i + 1);
        tmp[nameindex] = variables.dayofWeek[i];
    }

    const [insertOneConsultant] = useMutation(addConsultantWithDefinition(variables));

    const functionhelper = () => {alert("start");
        insertOneConsultant({ variables: tmp })
            .then(() => {
               
                showSuccess('سال تحصیلی جدید با موفقیت اضافه شد.');
                //console.log("مشاور جدید با موفقیت ایجاد شد");
                //callBack();
            })
            .finally(() => {
                //alert("finally run"); 
                //console.log("finished");
                inactive();
            });
            
    }


    // console.log("the component is end");
    return (
        <button onClick={() => functionhelper()}> فعال کردن </button>
    )

}

export default CreateDynamicConsultant;