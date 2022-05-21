import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CREATE_COURSE } from './gql/mutation';
import { GET_YEARS } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { FormControl, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
    useNavigate
} from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';


interface ErrorData {
    name?: string;
    year_id?: number;
    teacher_id?: number;
    lesson?: string;
    type?: string;
    user_id_creator?: number;
}

interface CourseData {
    id: number;
    name: string;
    user_id_creator: number;
    year_id: number;
    teacher_id: number;
    lesson: string;
    type: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

const CoursesCreateScreen = () => {
    const [name, setName] = useState<string>("");
    const [yearId, setYearId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [createCourse] = useMutation(CREATE_COURSE);
    const navigate = useNavigate();

    const { data: allYears } = useQuery(GET_YEARS, {
        variables: {
            first: 100,
            page: 1,
        }
    });

    const handleChangeYear = (event: SelectChangeEvent<string>) => {
        setYearId(event.target.value);
    };

    const createCourseHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        createCourse({
            variables: {
                name: name,
                active: false
            }
        }).then(() => {
            showSuccess(' درس جدید با موفقیت اضافه شد.');
            setName("");
            navigate('/courses');
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
        setError(result);
        return out;
    }
    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>ایجاد درس جدید</h1>

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
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.name ? true : false}
                    helperText={error.name ? error.name : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="درس"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.name ? true : false}
                    helperText={error.name ? error.name : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نوع"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.name ? true : false}
                    helperText={error.name ? error.name : ""}
                    variant="filled"
                />
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />} color="primary" onClick={createCourseHandler}
                disabled={loading}
            >
                ایجاد درس جدید
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
        </Box>
    </Container >)
}

export default CoursesCreateScreen;