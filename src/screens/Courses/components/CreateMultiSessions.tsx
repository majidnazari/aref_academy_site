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

const CreateMultiSessions = () => {
    const [days, setDays] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndtTime] = useState<Date | null>(null);
    const [price, setPrice] = useState<string>("0");
    const [special, setSpecial] = useState<string>("0");
    const [loading, setLoading] = useState<boolean>(false);

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
            </Grid>
            <Grid item xs={12} sm={6} md={4} xl={2}  >
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
            <Grid item xs={12} sm={6} md={4} xl={2}  >
                <Button
                    onClick={() => {
                        console.log(moment(startDate).format("YYYY-MM-DD"));
                        console.log(moment(startTime).format("HH:mm"));
                    }}
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ p: 2 }}
                >
                    {loading ? <CircularProgress size={15} color="primary" /> : null}
                    ذخیره
                </Button>
            </Grid>
        </Grid>
    )
}
export default CreateMultiSessions;