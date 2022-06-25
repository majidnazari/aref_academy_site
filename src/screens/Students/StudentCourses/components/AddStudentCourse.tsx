import { Box, Button, FormControl, MenuItem, Paper, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GET_COURSES } from '../gql/query';
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_STUDENT_COURSE } from '../gql/mutation';
import { lessonsObject, typesObject } from '../../../../constants';
import { useState } from "react";
interface Props {
    studentId: string | undefined;
}

const AddStudentCourse = ({ studentId }: Props) => {
    const [courseId, setCourseId] = useState<string | undefined>("");
    const { data: coursesData, loading } = useQuery(GET_COURSES, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            orderBy: [{
                column: 'id',
                order: 'DESC'
            }]
        },
        onCompleted: (data) => {
            console.log(data);
        }
    });

    const [createStudentCourse] = useMutation(CREATE_STUDENT_COURSE);

    const insertStudentCourse = () => {
        createStudentCourse({
            variables: {
                student_id: studentId ? parseInt(studentId) : 0,
                course_id: courseId ? parseInt(courseId) : 0,
                status: "ok"
            }
        });
    }

    const handleChangeCourse = (e: SelectChangeEvent<string>) => {
        setCourseId(e.target.value)
    }
    return (<Box
        component={Paper}
        sx={{ p: 1, my: 2 }}
    >
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            افزودن درس
        </Typography>
        <Box>
            <FormControl sx={{ width: 500 }}>
                <Select
                    defaultValue=""
                    value={courseId}
                    onChange={handleChangeCourse}
                    variant="filled"
                    displayEmpty
                >
                    <MenuItem value="" disabled >
                        <em>انتخاب درس</em>
                    </MenuItem>
                    {coursesData && Object.keys(coursesData.getCourses.data).map((key, index) => (
                        <MenuItem key={index} value={key}>
                            {lessonsObject[coursesData.getCourses.data[key].lesson]} -
                            {coursesData.getCourses.data[key].teacher.first_name} {coursesData.getCourses.data[key].teacher.last_name} -
                            {coursesData.getCourses.data[key].name} -
                            {typesObject[coursesData.getCourses.data[key].type]} -
                            مقطع {coursesData.getCourses.data[key].education_level}
                        </MenuItem>
                    ))
                    }
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, mx: 1 }}
                onClick={() => {
                    insertStudentCourse();
                }}
            >
                افزودن
            </Button>
        </Box>
    </Box>)
}

export default AddStudentCourse;