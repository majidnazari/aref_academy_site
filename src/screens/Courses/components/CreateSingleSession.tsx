import { useState } from "react";
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AdapterJalali from '@date-io/date-fns-jalali';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { CREATE_SINGLE_SESSION } from '../gql/mutation';
import { useMutation } from '@apollo/client';
import FormHelperText from '@mui/material/FormHelperText';
import { showSuccess } from "../../../utils/swlAlert";

interface IProps {
    courseId: number;
    callBack: () => void;
}

interface ErrorData {
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
}

const CreateSingleSession = ({ courseId, callBack }: IProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndtTime] = useState<Date | null>(null);
    const [price, setPrice] = useState<string>("0");
    const [special, setSpecial] = useState<string>("0");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});

    const [insertSingleSession] = useMutation(CREATE_SINGLE_SESSION);

    const handleChangeSpecial = (event: SelectChangeEvent<string>) => {
        setSpecial(event.target.value);
    };

    const insertSession = () => {
        if (!validation()) return;
        setLoading(true);       
        const variables = {
            course_id: courseId,
            start_date: moment(startDate).format("YYYY-MM-DD"),
            start_time: moment(startTime).format("HH:mm"),
            end_time: moment(endTime).format("HH:mm"),
            price: Number(price.replace(/,/g, '')),
            special: special === '1'
        };
        console.log({ variables });
        insertSingleSession({ variables })
            .then(() => {
                setLoading(false);
                showSuccess("جلسه جدید با موفقیت ایجاد شد");
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
        setError(result);
        return out;
    }

    return (
        <Grid container spacing={2}>
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
                        e.target.value = Number(e.target.value.replace(/,/g, '')).toLocaleString();;
                        setPrice(e.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={2}  >
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
                        insertSession();
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
export default CreateSingleSession;