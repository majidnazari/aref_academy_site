import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { EDIT_COURSE } from './gql/mutation';
import { GET_A_COURSE, GET_YEARS, GET_USERS } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import {
    useParams
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import { lessonsObject, typesObject, educationLevelsObject } from '../../constants';
import {
    useNavigate
} from "react-router-dom"


interface ErrorData {
    name?: string;
    education_level?: string;
    year_id?: string;
    teacher_id?: string;
    lesson?: string;
    type?: string;
}

interface CourseData {
    id: number;
    user_id_creator: number;
    education_level: string;
    year_id: number;
    teacher_id: number;
    name: string;
    lesson: string;
    type: string;
}

const CoursesEditScreen = () => {
    const [name, setName] = useState<string>("");
    const [educationLevel, setEducationLevel] = useState<string>("");
    const [yearId, setYearId] = useState<string>("");
    const [teacherId, setTeacherId] = useState<string>("1");
    const [lesson, setLesson] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [editCourse] = useMutation(EDIT_COURSE);
    const params = useParams<string>();
    const courseId = params.courseId;

    const { data: courseData } = useQuery(GET_A_COURSE, {
        variables: {
            id: courseId
        },
        fetchPolicy: "no-cache"
    });

    const { data: allYears } = useQuery(GET_YEARS, {
        variables: {
            first: 100,
            page: 1,
            orderBy: [{
                column: 'id',
                order: 'DESC'
            }]
        }
    });

    const { data: teachers } = useQuery(GET_USERS, {
        variables: {
            first: 1000,
            page: 1,
            group_id: 5
        }
    });

    const handleChangeEducationLevel = (event: SelectChangeEvent<string>) => {
        setEducationLevel(event.target.value);
    };

    const handleChangeYear = (event: SelectChangeEvent<string>) => {
        setYearId(event.target.value);
    };
    const handleChangeTeacher = (event: SelectChangeEvent<string>) => {
        setTeacherId(event.target.value);
    };
    const handleChangeLesson = (event: SelectChangeEvent<string>) => {
        setLesson(event.target.value);
    };

    const handleChangeType = (event: SelectChangeEvent<string>) => {
        setType(event.target.value);
    };

    useEffect(() => {
        if (courseData) {
            const CourseInfo: CourseData = courseData.getCourse;
            setName(CourseInfo.name);
            setYearId(CourseInfo.year_id.toString());
            setTeacherId(CourseInfo.teacher_id.toString());
            setLesson(CourseInfo.lesson);
            setType(CourseInfo.type);
            setEducationLevel(CourseInfo.education_level);
        }

    }, [courseData]);


    const editCourseHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        editCourse({
            variables: {
                id: courseId,
                name: name,
                year_id: Number(yearId),
                teacher_id: Number(teacherId),
                lesson: lesson,
                type: type,
                education_level: educationLevel
            }
        }).then(() => {
            showSuccess('ویرایش با موفقیت انجام شد');
        }).finally(() => {
            setLoading(false);
        });

    }

    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!name) {
            result = { ...result, name: 'کد درس را وارد کنید.' };
            out = false;
        }
        if (!educationLevel) {
            result = { ...result, education_level: ' مقطع را وارد کنید.' };
            out = false;
        }
        if (!yearId) {
            result = { ...result, year_id: ' سال را وارد کنید.' };
            out = false;
        }
        if (!teacherId) {
            result = { ...result, teacher_id: 'نام دبیر را وارد کنید.' };
            out = false;
        }
        if (!lesson) {
            result = { ...result, lesson: 'نام درس پایه را وارد کنید.' };
            out = false;
        }
        if (!type) {
            result = { ...result, type: 'نوع را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }
    const navigate = useNavigate();
    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>ویرایش کلاس</h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="کد درس"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.name ? true : false}
                    helperText={error.name ? error.name : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <FormControl sx={{ width: "100%" }}>
                    <FormControl sx={{ width: "100%" }}>
                        <Select
                            defaultValue=""
                            value={educationLevel}
                            onChange={handleChangeEducationLevel}
                            error={error.education_level ? true : false}
                            variant="filled"
                            displayEmpty
                        >
                            <MenuItem value="" disabled >
                                <em> مقطع</em>
                            </MenuItem>
                            {Object.keys(educationLevelsObject).map((key, index) => (
                                <MenuItem key={index} value={key}>{educationLevelsObject[key]}</MenuItem>
                            ))
                            }
                        </Select>
                        {error.education_level ? <FormHelperText error >{error.education_level}</FormHelperText> : ""}
                    </FormControl>
                    {error.education_level ? <FormHelperText error >{error.education_level}</FormHelperText> : ""}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        value={yearId}
                        onChange={handleChangeYear}
                        error={error.year_id ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>سال تحصیلی</em>
                        </MenuItem>
                        {allYears ?
                            allYears.getYears.data.map((year: any) => {
                                return <MenuItem
                                    value={year.id}
                                    key={year.id}>{year.name}
                                </MenuItem>
                            }) : <MenuItem value="" disabled >
                                <em>در حال بارگذاری ...</em>
                            </MenuItem>
                        }
                    </Select>
                    {error.year_id ? <FormHelperText error >{error.year_id}</FormHelperText> : ""}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        value={teacherId}
                        onChange={handleChangeTeacher}
                        error={error.teacher_id ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>دبیر</em>
                        </MenuItem>
                        {teachers ?
                            teachers.getUsers.data.map((teacher: any) => {
                                return <MenuItem
                                    value={teacher.id}
                                    key={teacher.id}>
                                    {teacher.first_name} {teacher.last_name}
                                </MenuItem>
                            }) : <MenuItem value="" disabled >
                                <em>در حال بارگذاری ...</em>
                            </MenuItem>
                        }
                    </Select>
                    {error.teacher_id ? <FormHelperText error >{error.teacher_id}</FormHelperText> : ""}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        value={lesson}
                        onChange={handleChangeLesson}
                        error={error.lesson ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>درس پایه</em>
                        </MenuItem>
                        {Object.keys(lessonsObject).map((key, index) => (
                            <MenuItem key={index} value={key}>{lessonsObject[key]}</MenuItem>
                        ))
                        }
                    </Select>
                    {error.lesson ? <FormHelperText error >{error.lesson}</FormHelperText> : ""}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4}  >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        value={type}
                        onChange={handleChangeType}
                        error={error.type ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>نوع</em>
                        </MenuItem>
                        {Object.keys(typesObject).map((key, index) => (
                            <MenuItem key={index} value={key}>{typesObject[key]}</MenuItem>
                        ))
                        }
                    </Select>
                    {error.type ? <FormHelperText error >{error.type}</FormHelperText> : ""}
                </FormControl>
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                sx={{ float: "left" }}
                variant="contained"
                startIcon={<SaveIcon />} color="primary" onClick={editCourseHandler}
                disabled={loading}
            >
                ثبت تغییرات
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>

            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary" 
                onClick={() => navigate(`/courses`)}
                disabled={loading}
            >
                بازگشت
            </Button>
        </Box>

    </Container >)
}

export default CoursesEditScreen;
