import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ListSessions from './components/ListSessions';
import {
    useParams
} from "react-router-dom";
import { GET_A_COURSE } from './gql/query';
import { useQuery } from '@apollo/client';
import CourseName from 'components/CourseName';

const ReportsCourseSessionsScreen = () => {
    const [listSessionsKey, setListSessionsKey] = useState<number>(0);
    const params = useParams<string>();
    const courseId: number = Number(params.courseId);

    const { loading, error, data: courseData } = useQuery(GET_A_COURSE, {
        variables: {
            id: courseId
        }
    });

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {loading && <div>Loading...</div>}
            {error && <div>Error :(</div>}
            {!courseData ? null :
                (<Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
                    <CourseName course={courseData.getCourse} />
                </Typography>)
            }

            <Typography component={'div'} sx={{ mt: 2 }} >
                <ListSessions courseId={courseId} key={listSessionsKey} />
            </Typography>
        </Container >
    );
}

export default ReportsCourseSessionsScreen;
