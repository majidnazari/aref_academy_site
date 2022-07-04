import { useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { EDIT_SINGLE_SESSION } from './gql/mutation';
import { GET_A_COURSE_SESSION, GET_BRANCH_CLASSROOMS } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import {
    useParams
} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import {
    useNavigate
} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';
import { trim } from 'stylis';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Button } from "@mui/material";
import AdapterJalali from '@date-io/date-fns-jalali';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

interface ErrorData {
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    branch_classroom_id?: string;
}

const CourseSessionsEditScreen = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndtTime] = useState<Date | null>(null);
    const [price, setPrice] = useState<string>("0");
    const [name, setName] = useState<string>("");
    const [branchClassRoomId, setBranchClassRoomId] = useState<string>("");
    const [special, setSpecial] = useState<string>("0");
    const [error, setError] = useState<ErrorData>({});
    const [loading, setLoading] = useState<boolean>(false);

    const params = useParams<string>();
    const { courseId, sessionId } = params;

    const { loading: loadingReadData, error: errorReadData } = useQuery(GET_A_COURSE_SESSION, {
        variables: {
            id: sessionId
        },
        onCompleted: (data) => {
            const { start_date, start_time, end_time, name, price, special, classRoom } = data.getCourseSession;
            console.log(data.getCourseSession);
            setStartDate(start_date);
            setStartTime(new Date(start_date + ' ' + start_time));
            setEndtTime(new Date(start_date + ' ' + end_time));
            setName(name);
            setPrice(price.toLocaleString());
            setBranchClassRoomId(classRoom.id);
            setSpecial(special ? "1" : "0");
        },
        fetchPolicy: "no-cache"
    });

    const { data: branchClassroomsData } = useQuery(GET_BRANCH_CLASSROOMS, {
        variables: {
            first: 1000,
            page: 1,
            orderBy: [{
                column: 'id',
                order: 'DESC'
            }]
        }
    });

    const [editSingleSession] = useMutation(EDIT_SINGLE_SESSION);

    const handleChangeSpecial = (event: SelectChangeEvent) => {
        setSpecial(event.target.value);
    }

    const handleChangeBranchClassRoomId = (event: SelectChangeEvent<string>) => {
        setBranchClassRoomId(event.target.value);
    }

    const editSessionHandler = () => {
        if (!validation()) return;
        setLoading(true);
        const variables = {
            id: sessionId,
            course_id: Number(courseId),
            start_date: moment(startDate).format("YYYY-MM-DD"),
            start_time: moment(startTime).format("HH:mm"),
            end_time: moment(endTime).format("HH:mm"),
            price: Number(price.replace(/,/g, '')),
            branch_class_room_id: Number(branchClassRoomId),
            special: special === '1',
            name: trim(name)
        };
        editSingleSession({ variables })
            .then(() => {
                setLoading(false);
                showSuccess("جلسه با موفقیت ویرایش شد");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const validation = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!startDate) {
            result = { ...result, startDate: "لطفا تاریخ شروع را انتخاب کنید" };
            out = false;
        }
        if (!startTime) {
            result = { ...result, startTime: "لطفا ساعت شروع را انتخاب کنید" };
            out = false;
        }
        if (!endTime) {
            result = { ...result, endTime: "لطفا ساعت پایان را انتخاب کنید" };
            out = false;
        }
        if (!branchClassRoomId) {
            result = { ...result, branch_classroom_id: "محل برگزاری جلسات را انتخاب کنید" };
            out = false;
        }
        setError(result);
        return out;
    }
    const navigate = useNavigate();
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 3 }} >
            ویرایش جلسه
            {loadingReadData && <CircularProgress size={15} />}
        </Typography>

        {errorReadData && <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 3 }} >خطا در دریافت اطلاعات</Typography>}
        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} sm={6} md={4} xl={4}  >
                <LocalizationProvider
                    dateAdapter={AdapterJalali}
                >
                    <DatePicker
                        label="تاریخ شروع"
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} style={{ width: "100%" }} />}
                        mask="____/__/__"
                    />
                </LocalizationProvider>
                {error.startDate ? <FormHelperText error >{error.startDate}</FormHelperText> : ""}
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}  >
                <LocalizationProvider dateAdapter={AdapterJalali}>
                    <MobileTimePicker
                        label="ساعت شروع"
                        value={startTime}
                        onChange={(newValue) => {
                            setStartTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} style={{ width: "100%" }} />}
                    />
                </LocalizationProvider>
                {error.startTime ? <FormHelperText error >{error.startTime}</FormHelperText> : ""}
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}  >
                <LocalizationProvider dateAdapter={AdapterJalali}>
                    <MobileTimePicker
                        label="ساعت پایان"
                        value={endTime}
                        onChange={(newValue) => {
                            setEndtTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} style={{ width: "100%" }} />}
                    />
                </LocalizationProvider>
                {error.endTime ? <FormHelperText error >{error.endTime}</FormHelperText> : ""}
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}  >
                <TextField
                    label="قیمت-تومان"
                    style={{ width: "100%" }}
                    value={price}
                    onChange={(e) => {
                        if (isNaN(Number(e.target.value.replace(/,/g, '')))) {
                            setPrice("");
                            return;
                        }
                        e.target.value = Number(e.target.value.replace(/,/g, '')).toLocaleString();
                        setPrice(e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={4}  >
                <TextField
                    label="نام(اختیاری)"
                    style={{ width: "100%" }}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}  >
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="special-label">محل برگزاری</InputLabel>
                    <Select
                        labelId="special-label"
                        value={branchClassRoomId || ""}
                        onChange={handleChangeBranchClassRoomId}
                        input={<OutlinedInput label="محل برگزاری" />}
                    >
                        <MenuItem value="" disabled>
                            <em>محل برگزاری</em>
                        </MenuItem>
                        {
                            branchClassroomsData
                            && branchClassroomsData.getBranchClassRooms.data.map((item: any) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.branch.name + ' - ' + item.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    {error.branch_classroom_id ? <FormHelperText error >{error.branch_classroom_id}</FormHelperText> : ""}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={1}  >
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="special-label">فوق العاده</InputLabel>
                    <Select
                        labelId="special-label"
                        value={special}
                        onChange={handleChangeSpecial}
                        input={<OutlinedInput label="فوق العاده" />}
                    >
                        <MenuItem value="0">
                            خیر
                        </MenuItem>

                        <MenuItem value="1">
                            بله
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                sx={{ float: "left" }}
                variant="contained"
                startIcon={<SaveIcon />} color="primary" onClick={editSessionHandler}
                disabled={loading}
            >
                ثبت تغییرات
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>

            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/courses/${courseId}/sessions`)}
                disabled={loading}
            >
                <ArrowBackIcon />
                بازگشت
            </Button>
        </Box>

    </Container >)
}

export default CourseSessionsEditScreen;
