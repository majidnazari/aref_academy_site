import { GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE } from "../gql/query";
import { useQuery } from "@apollo/client";


interface PropType {
    course_id: number;
    course_session_id: number;
}
const ListStudents = ({ course_id, course_session_id }: PropType) => {
    const { loading, data: studentsList } = useQuery(GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE, {
        variables: {
            course_id: 1,
            course_session_id: 125,
            first: 1000,
            page: 1
        }
    });
    return (
        <div>
            <h1>List Students</h1>
        </div>
    )
}

export default ListStudents;