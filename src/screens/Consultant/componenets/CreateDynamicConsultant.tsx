import { useMutation, gql } from "@apollo/client";
import { addConsultantWithDefinition } from "../gql/mutation";
import AdapterJalali from '@date-io/date-fns-jalali';
import moment from 'moment';
import { useEffect } from "react";

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

    console.log("the component is begin");
    console.log(variables);

    const variables1: any = {
        userId: variables.userId,
        step: Number(variables.step),

        dayofWeek: variables.dayofWeek,
        start1: moment(variables.startTime).format("HH:mm"),
        end1: moment(variables.endTime).format("HH:mm"),

    };
    const tmp: any = {
        "userId": variables.userId,
        "step": variables.step,
        "start": variables.start,
        "end": variables.end,
    }

    useEffect(() => {
        alert("this is run");

    }, []);
    console.log("the muattion is:");
    console.log(addConsultantWithDefinition(variables));
    const [insertOneConsultant] = useMutation(addConsultantWithDefinition(variables));
    console.log("the mutation should run this variables:");
    //console.log(variables.dayofWeek);
    for (let i = 0; i < variables.dayofWeek.length; i++) {
        let nameindex = "dayofWeek" + (i + 1);
        //console.log(nameindex);
        tmp[nameindex] = variables.dayofWeek[i];
    }
    console.log(tmp);
    insertOneConsultant({ variables })
        .then(() => {

            console.log("مشاور جدید با موفقیت ایجاد شد");
            //callBack();
        })
        .finally(() => {
            console.log("finished");
        });
    console.log("the component is end");
    return (
        <button onClick={() => inactive()}> غیر غعال کردن   </button>
    )

}

export default CreateDynamicConsultant;