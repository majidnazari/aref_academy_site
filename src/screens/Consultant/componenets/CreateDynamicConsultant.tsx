import { useMutation, gql } from "@apollo/client";
import { addConsultantWithDefinition } from "../gql/mutation";
import AdapterJalali from '@date-io/date-fns-jalali';
import moment from 'moment';

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

const CreateDynamicConsultant = ({ variables }: any) => {

    console.log("the inner var are:");
    console.log(variables);
    
    const variables1: any = {
        userId: variables.userId,
        step: Number(variables.step),

        dayofWeek: variables.dayofWeek[0],
        start1: moment(variables.startTime).format("HH:mm"),
        end1: moment(variables.endTime).format("HH:mm"),

    };
    console.log("the muattion is:");
    console.log(addConsultantWithDefinition(variables));
    const [insertOneConsultant] = useMutation(addConsultantWithDefinition(variables)); 

    insertOneConsultant({ variables })
        .then(() => {

            console.log("مشاور جدید با موفقیت ایجاد شد");
            //callBack();
        })
        .finally(() => {
            console.log("finished");
        });
    return (
        <h1>
            افزودن مشاور
        </h1>
    )

}

export default CreateDynamicConsultant;