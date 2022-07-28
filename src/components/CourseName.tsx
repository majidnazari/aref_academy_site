import { typesObject } from 'constants/index';

const CourseName = ({ course }: any) => {
    return (<>
        {course?.lesson?.name} -
        {course?.teacher.first_name} {course?.teacher.last_name} -
        {course?.name} -
        {typesObject[course?.type]} -
        مقطع {course?.education_level}
    </>)
}

export const getCourseName = (course: any): string => {
    return `${course?.lesson?.name} - ${course.teacher.first_name} ${course.teacher.last_name} - ${course.name} - ${typesObject[course.type]} - مقطع ${course.education_level}`
}


export default CourseName;