import { lessonsObject, typesObject } from 'constants/index';

const CourseName = ({ course }: any) => {
    return (<>
        {lessonsObject[course.lesson]} -
        {course.teacher.first_name} {course.teacher.last_name} -
        {course.name} -
        {typesObject[course.type]} -
        مقطع {course.education_level}
    </>)
}

export default CourseName;