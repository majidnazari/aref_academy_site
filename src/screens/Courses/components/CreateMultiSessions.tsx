import { useState } from "react";
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { dayOfWeeksObject } from '../../../constants/index';
import AdapterJalali from '@date-io/date-fns-jalali';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { CREATE_MULTI_SESSIONS } from '../gql/mutation';
import { GET_BRANCH_CLASSROOMS } from '../gql/query';
import { useMutation, useQuery } from '@apollo/client';
import FormHelperText from '@mui/material/FormHelperText';
import { showSuccess } from "../../../utils/swlAlert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const daysOfWeek = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنج شنبه',
    'جمعه'
];
interface IProps {
    courseId: number;
    callBack: () => void;
}

interface ErrorData {
    days?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    branch_classroom_id?: string;
}

const CreateMultiSessions = ({ courseId, callBack }: IProps) => {
    const [days, setDays] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndtTime] = useState<Date | null>(null);
    const [price, setPrice] = useState<string>("0");
    const [branchClassRoomId, setBranchClassRoomId] = useState<string>("");
    const [special, setSpecial] = useState<string>("0");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});

    const [insertMultiCourse] = useMutation(CREATE_MULTI_SESSIONS);

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


    const handleChange = (event: SelectChangeEvent<typeof days>) => {
        const {
            target: { value },
        } = event;
        setDays(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeSpecial = (event: SelectChangeEvent<string>) => {
        setSpecial(event.target.value);
    };
    const handleChangeBranchClassRoomId = (event: SelectChangeEvent<string>) => {
        setBranchClassRoomId(event.target.value);
    }

    const insertMultiSessions = () => {
        if (!validation()) return;
        setLoading(true);
        const daysTmp = [];
        for (let i = 0; i < days.length; i++) {
            daysTmp.push(dayOfWeeksObject[days[i]]);
        }
        const variables = {
            course_id: courseId,
            days: daysTmp,
            start_date: moment(startDate).format("YYYY-MM-DD"),
            end_date: moment(endDate).format("YYYY-MM-DD"),
            start_time: moment(startTime).format("HH:mm"),
            end_time: moment(endTime).format("HH:mm"),
            price: Number(price.replace(/,/g, '')),
            branch_class_room_id: Number(branchClassRoomId),
            special: special === '1'
        };
        insertMultiCourse({ variables })
            .then(() => {
                setLoading(false);
                showSuccess("جلسات جدید با موفقیت ایجاد شد");
                callBack();
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const validation = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (days.length === 0) {
            result = { ...result, days: "لطفا روز های دوره را انتخاب کنید" };
            out = false;
        }
        if (!startDate) {
            result = { ...result, startDate: "لطفا تاریخ شروع را انتخاب کنید" };
            out = false;
        }
        if (!endDate) {
            result = { ...result, endDate: "لطفا تاریخ پایان را انتخاب کنید" };
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

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} xl={4}  >
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-checkbox-label">انتخاب روزهای هفته</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={days}
                        onChange={handleChange}
                        input={<OutlinedInput label="انتخاب روزهای هفته" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {daysOfWeek.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={days.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                    {error.days ? <FormHelperText error >{error.days}</FormHelperText> : ""}
                </FormControl>
            </Grid>
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
                <LocalizationProvider
                    dateAdapter={AdapterJalali}
                >
                    <DatePicker
                        label="تاریخ پایان"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} style={{ width: "100%" }} />}
                        mask="____/__/__"
                    />
                </LocalizationProvider>
                {error.endDate ? <FormHelperText error >{error.endDate}</FormHelperText> : ""}
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}  >
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
            <Grid item xs={12} sm={6} md={4} xl={3}  >
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
            <Grid item xs={12} sm={6} md={2} xl={2}  >
                <TextField
                    label="قیمت-تومان"
                    style={{ width: "100%" }}
                    value={price}
                    onChange={(e) => {
                        if (isNaN(Number(e.target.value.replace(/,/g, '')))) {
                            setPrice("");
                            return;
                        }
                        e.target.value = Number(e.target.value.replace(/,/g, '')).toLocaleString();;
                        setPrice(e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={3}  >
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="special-label">محل برگزاری</InputLabel>
                    <Select
                        labelId="special-label"
                        value={branchClassRoomId}
                        onChange={handleChangeBranchClassRoomId}
                        input={<OutlinedInput label="محل برگزاری" />}
                    >
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
            <Grid item xs={12} sm={12} md={12} xl={12}  >
                <Button
                    onClick={() => {
                        insertMultiSessions();
                    }}
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={15} color="primary" /> : null}
                    ذخیره
                </Button>
            </Grid>
        </Grid>
    )
}
export default CreateMultiSessions;