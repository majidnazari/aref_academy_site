import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import ListStudents from "./components/ListStudents";

const ListStudentsScreen = () => {
    const { courseId, courseSessionId } = useParams<string>();
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            حضورغیاب
        </Typography>
        {
            courseId && courseSessionId ?
                <ListStudents
                    course_id={+courseId}
                    course_session_id={+courseSessionId}
                /> : null
        }
    </Container>)
}
export default ListStudentsScreen;