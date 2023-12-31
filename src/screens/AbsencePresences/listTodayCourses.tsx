import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_COURSE_SESSIONS } from "./gql/query";
import { useEffect, useState } from "react";
import { CourseSessionType } from './dto/CourseSessionType';
import GroupIcon from '@mui/icons-material/Group';
import CourseName from "components/CourseName";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const ListTodayCourses = () => {
    const navigate = useNavigate();
    const [courseSessions, setCourseSessions] = useState<CourseSessionType[]>([]);
    const { data: fetchedCourseSessions, loading } = useQuery(GET_COURSE_SESSIONS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            date_after: moment().format("YYYY-MM-DD"),
            date_befor: moment().format("YYYY-MM-DD"),
            orderBy: [
                {
                    column: 'start_date',
                    order: 'DESC'
                },
                {
                    column: 'start_time',
                    order: 'ASC'
                }
            ]
        }
    });

    useEffect(() => {
        if (fetchedCourseSessions) {
            setCourseSessions(fetchedCourseSessions.getCourseSessions.data);
        }
    }, [fetchedCourseSessions]);
    if (loading) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
        </Container>
            ;
    }

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            کلاس های امروز
        </Typography>
        <Grid container spacing={2}>
            {
                courseSessions.map(item => {
                    return (
                        <Grid item xs={12} md={4} lg={4} key={item.id} >
                            <Box
                                sx={{
                                    backgroundColor: "info.main",
                                    color: "white",
                                    borderRadius: "5px",
                                    boxShadow: 3,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    py: 2
                                }}
                                onClick={() => {
                                    navigate(`/absence-presences/list-students/${item.course.id}/${item.id}`);
                                }}
                            >
                                <GroupIcon sx={{ mx: 1 }} fontSize="small" />
                                <CourseName course={item.course} />
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    </Container>)
}

export default ListTodayCourses;