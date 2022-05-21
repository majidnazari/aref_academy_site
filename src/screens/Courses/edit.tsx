import  { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { EDIT_YEAR } from './gql/mutation';
import { GET_A_COURSE } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import {
    useParams
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


interface ErrorData {
    name?: string;
    active?: string;
}

interface YearData {
    id: number;
    active: boolean;
    name: string;
    user_id_creator: number;
}

const CoursesEditScreen = () => {
    const [name, setName] = useState<string>("");
    const [active, setActive] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [editYear] = useMutation(EDIT_YEAR);
    const params = useParams<string>();
    const yearId = params.yearId;

    const { data: yearData } = useQuery(GET_A_COURSE, {
        variables: {
            id: yearId
        },
        fetchPolicy: "no-cache"
    });

    const handleChange = (event: SelectChangeEvent<string>) => {
        setActive(parseInt(event.target.value) > 0);
    };

    useEffect(() => {
        if (yearData) {
            const yaerInfo: YearData = yearData.getYear;
            setActive(yaerInfo.active);
            setName(yaerInfo.name);
        }

    }, [yearData]);


    const editYearHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        editYear({
            variables: {
                id: yearId,
                name: name,
                active: active,
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
            result = { ...result, name: 'سال را وارد کنید.' };
            out = false;
        }
        else if (isNaN(parseInt(name)) || parseInt(name) <= 0) {
            result = { ...result, name: 'سال را صحیح وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }

    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>ویرایش حساب کاربری</h1>

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
            <Grid item xs={12} md={4} lg={4}  >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        value={active ? "1" : "0"}
                        onChange={handleChange}
                        error={error.active ? true : false}
                        variant="filled"
                        displayEmpty
                    >

                        <MenuItem
                            value={0}
                        >
                            غیر فعال
                        </MenuItem>
                        <MenuItem
                            value={1}
                        >
                            فعال
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                variant="contained"
                startIcon={<SaveIcon />} color="primary" onClick={editYearHandler}
                disabled={loading}
            >
                ثبت تغییرات
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
        </Box>
    </Container >)
}

export default CoursesEditScreen;
