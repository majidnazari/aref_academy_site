import React, { useState } from 'react';
import Container from '@mui/material/Container';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import AdapterJalali from '@date-io/date-fns-jalali';
import moment from 'moment';
import { dayOfWeeksCosultant } from '../../constants/index';
import { DayOfWeekConsultantEnum } from '../../constants/index';

// import { CREATE_FAULT } from './gql/mutation';
//import { CREATE_CONSULTANT_TEST } from './gql/mutation';
import { ConstantTestLevel } from "../../constants";
import { ADD_A_COUNSULTANT } from "./gql/mutation";
import { addConsultantWithDefinition } from "./gql/mutation";
import  CreateDynamicConsultant  from "./componenets/CreateDynamicConsultant";



import { useMutation } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import {
    Box,
    Paper,
    FormControl,
    TextField,
    Autocomplete,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Checkbox,
    ListItemText,
    FormHelperText,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';


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

    callBack: () => void;
}

export enum DayOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
interface StartEnd {
    start: string,
    end: string
}
interface TimeTable {
    dayOfWeek: DayOfWeek,
    startEnd: StartEnd[]

}
interface ErrorData {
    userId?: string;
    step?: string;
    days?: string;
    startTime?: string;
    endTime?: string;
    //timeTable?: TimeTable[];
}
let variables_tmp = {
    userId: "1",
    step: 10,
    dayofWeek: "MONDAY",
    start: "12:34",
    end: "12:44",

};

const CreateConsultantCreateScreen = () => {

    const [userId, setUserId] = useState<string>("");
    const [step, setStep] = useState<string>("");
    //const [timeTable, setTimeTable] = useState<TimeTable>();
    const [error, setError] = useState<ErrorData>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [days, setDays] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndtTime] = useState<Date | null>(null);
    

    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent<typeof days>) => {
        const {
            target: { value },
        } = event;
        setDays(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const [insertOneConsultant] = useMutation(ADD_A_COUNSULTANT);


    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});

        if (!userId) {
            result = { ...result, userId: 'مشاور را وارد کنید.' };
            out = false;
        }
        if (!step) {
            result = { ...result, step: 'وقت مشاوره را وارد کنید.' };
            out = false;
        }
        if (days.length === 0) {
            result = { ...result, days: "لطفا روز های دوره را انتخاب کنید" };
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

    const insertConsultant = () => {
        if (!validateForm()) return;
        //setLoading(true);
        const daysTmp = [];
        // var o = new Object();
        // o["Company Name"] = 'Flexiple';
        // o["ID"] = 123;

        for (let i = 0; i < days.length; i++) {

            daysTmp.push(dayOfWeeksCosultant[days[i]]);
            //tmp["dayofWeek"] = 111;
            //console.log(dayOfWeeksCosultant[days[i]]);
        }
        //console.log(dayOfWeeksCosultant);
        // const variables = {
        //     userId: userId,
        //     step:Number(step),
        //     dayofWeek1:daysTmp[0],            
        //     start1: moment(startTime).format("HH:mm"),
        //     end1: moment(endTime).format("HH:mm"),
        //     dayofWeek2:daysTmp[1],            
        //     start2: moment(startTime).format("HH:mm"),
        //     end2: moment(endTime).format("HH:mm"),            
        // };
        const variables = {
            userId: userId,
            step: Number(step),

            dayofWeek: daysTmp,
            start: moment(startTime).format("HH:mm"),
            end: moment(endTime).format("HH:mm"),

        };
        //const [insertOneConsultant2] = useMutation(addConsultant(variables));

        //addConsultantWithoutDefinition(variables)
        console.log(variables);

        // console.log( addConsultantWithDefinition(variables));
        //console.log(insertOneConsultant({ variables }));
        const tmp = addConsultantWithDefinition(variables);
        variables_tmp = {
            userId: variables.userId,
            step: Number(variables.step),
            dayofWeek: "MONDAY",
            start: variables.start,
            end: variables.end,
    
        };
        console.log("the variables_tmp.userId is:");
        console.log(variables_tmp.userId);
        //console.log(<CreateDynamicConsultant variables={tmp} />);
        console.log("after component");

        //<CreateDynamicConsultant variables={tmp} > add consultant </CreateDynamicConsultant>
        // insertOneConsultant({ variables })
        //     .then(() => {
        //         setLoading(false);
        //         showSuccess("مشاور جدید با موفقیت ایجاد شد");
        //         //callBack();
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    };

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>ایجادمشاور جدید </h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label=" کد مشاور "
                    value={userId}
                    onChange={(e: any) => setUserId(e.target.value)}
                    error={error.userId ? true : false}
                    helperText={error.userId ? error.userId : ""}
                    variant="filled"
                />
            </Grid>

            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label=" استپ مشاور "
                    value={step}
                    onChange={(e: any) => setStep(e.target.value)}
                    error={error.step ? true : false}
                    helperText={error.step ? error.step : ""}
                    variant="filled"
                />
            </Grid>

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
        </Grid>
        <Box mt={2}>
            <Button
                sx={{ float: "left" }}
                variant="contained"
                startIcon={<AddCircleIcon />} color="primary"
                disabled={loading}
                onClick={() => insertConsultant()}
            >
                ایجاد مشاور جدید
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
            { 
            console.log("the var is:" )}{
            console.log( variables_tmp)
            
            }
           {variables_tmp.userId !=="1"  ? <CreateDynamicConsultant variables={variables_tmp} > component </CreateDynamicConsultant> : ""}           
           
            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/consultant-test`)}
                disabled={loading}
            >
                <ArrowBackIcon />
                بازگشت
            </Button>
            
        </Box>
    </Container >)

}

export default CreateConsultantCreateScreen;

