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
import { GET_A_COURSE, GET_YEARS } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import {
    useParams
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import { lessonsObject, typesObject } from '../../constants';


interface ErrorData {
    name?: string;
    year_id?: string;
    teacher_id?: string;
    lesson?: string;
    type?: string;
}

interface CourseData {
    id: number;
    user_id_creator: number;
    year_id: number;
    teacher_id: number;
    name: string;
    lesson: string;
    type: string;
}

const CoursesEditScreen = () => {
    const [name, setName] = useState<string>("");
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

    const handleChangeYear = (event: SelectChangeEvent<string>) => {
        setYearId(event.target.value);
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
                type: type
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
            result = { ...result, name: 'نام درس را وارد کنید.' };
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

    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>ویرایش درس</h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نام"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.name ? true : false}
                    helperText={error.name ? error.name : ""}
                    variant="filled"
                />
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
                <TextField
                    fullWidth
                    label="دبیر"
                    value={teacherId}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.teacher_id ? true : false}
                    helperText={error.teacher_id ? error.teacher_id : ""}
                    variant="filled"
                />
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
                variant="contained"
                startIcon={<SaveIcon />} color="primary" onClick={editCourseHandler}
                disabled={loading}
            >
                ثبت تغییرات
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
        </Box>
    </Container >)
}

export default CoursesEditScreen;
