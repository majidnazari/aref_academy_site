import { typesObject } from 'constants/index';
import momentj from 'moment-jalaali';


export const getAbsentSessionDate = (consultant_definition_details: any): string => {
   // ${consultant_definition_details.id}-
    return `${momentj(consultant_definition_details?.session_date).format("jYYYY/jMM/jDD")} - ${consultant_definition_details?.start_hour}- ${consultant_definition_details?.end_hour}`
}

export default getAbsentSessionDate;