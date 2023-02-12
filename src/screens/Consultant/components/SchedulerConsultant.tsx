import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { GET_A_COSULTANT } from '../gql/query';
import { DELETE_CONSULTANT } from '../gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import {
    useNavigate
} from "react-router-dom"
import { showSuccess, showConfirm } from "../../../utils/swlAlert";
import moment from 'moment-jalaali';
import { Typography } from '@mui/material';


interface ConsultantData {
    _id: string;
    userId: string;
    step: number;
    timeTable: TimeTable[];
}

interface StartEnd {
    start: string,
    end: string
}
interface TimeTable {
    dayOfWeek: string,
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

const SchedulerConsultant = ({ userId }: any) => {
    //userId = "63da17010eb3b6ec9e7f4ec7";
    userId = "63d3dd302c419803bc1b6516";

    const navigate = useNavigate();

    const [consultant, setConsultant] = useState<ConsultantData | null>(null);
    const [step, setStep] = useState<number | null>(null);
    const [saturday, setSaturday] = useState<StartEnd[] | null>(null);
    const [saturdayTimeTableState, setSaturdayTimeTableState] = useState<any | null>(null);
    const [sundayTimeTableState, setSundayTimeTableState] = useState<any | null>(null);
    const [mondayTimeTableState, setMondayTimeTableState] = useState<any | null>(null);
    const [thuesdayTimeTableState, setThuesdayTimeTableState] = useState<any | null>(null);
    const [wednesdayTimeTableState, setWednesdayTimeTableState] = useState<any | null>(null);
    const [thursdayTimeTableState, setThursdayTimeTableState] = useState<any | null>(null);
    const [fridayTimeTableState, setFridayTimeTableState] = useState<any | null>(null);
    let saturdayTimeTable: string[] = Array(144).fill("00:00-00:00");
    let allSaturday: string[] = [];
    const [timetable, setTimetable] = useState<string[] | null>(null);
    let tmp: any = [];
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const { data: courseData } = useQuery(GET_A_COSULTANT, {
        variables: {
            id: userId,
        },
        onCompleted: (data) => {
            setConsultant(data.consultant);
            setStep(data.consultant.step);
            const allTimeOfDay = getTimeTableTitle(data.consultant.step);           
            allSaturday = calculateSaturday(allTimeOfDay, data.consultant.timeTable);           
            setSaturdayTimeTableState(allSaturday);
            //console.log("allSaturday is:", allSaturday);

        },
        fetchPolicy: "no-cache",
    });

    const getTimeTableTitle = (userStep: number) => {
        let timeTableFrom: any;
        let timeTableTo = "";
        let timeTable = [];

        let now = moment("08:00", 'HHmm').format("HH:mm");
        let date = new Date();
        timeTableFrom = moment([date.getFullYear(), date.getMonth() + 1, date.getDate(), 8, 0, 0]).format("HH:mm");
        //timeTableFrom = moment([8,0,0],"hh:mm");
        let timetmp = now.split(':');
        for (let hour = 8; hour < 20;) {

            timeTableTo = moment([date.getFullYear(), date.getMonth() + 1, date.getDate(), timetmp[0], timetmp[1], 0]).add(5, 'minutes').format("HH:mm");
            timetmp = timeTableTo.split(':');
            timeTable.push(timeTableFrom + "-" + timeTableTo);
            timeTableFrom = timeTableTo;
            hour = parseInt(timetmp[0]);
        }
        setTimetable(timeTable);
        return timeTable;

    }
    const calculateSaturday = (timeTablesTitle: string[], userTimeTables: TimeTable[]) => {
        const saturdays: any = [];    
        userTimeTables?.forEach(userTimeTable => {
            switch (userTimeTable.dayOfWeek) {
                case "SATURDAY":
                    //console.log("the case SUNDAY is");
                    userTimeTable.startEnd.forEach(startEndSaturday => {
                        saturdays.push(startEndSaturday);
                    })

                    break;
            }
            setSaturday(saturdays);          
        });


        let timetabletmp: string[] = [];
        let timetabletmpstart: any;
        let timetabletmpend: any;
        let timetabletmpstarthour = "";
        let timetabletmpstartminute = "";

        let timetabletmpendhour = "";
        let timetabletmpendminute = "";
        let starttmp: any;
        let endtmp: any;
        let startHour = "";
        let startMinute = "";
        let endHour = "";
        let endMinute = "";
        const format = 'hh:mm';

        saturdays.forEach((saturdayElement: any) => {
            starttmp = moment(saturdayElement.start.trim(), 'hh:mm');
            endtmp = moment(saturdayElement.end.trim(), 'hh:mm');
            let index = 0;
            timeTablesTitle?.forEach(timeTableElement => {
                //console.log("the timeTableElement foreach is:", timeTableElement);
                timetabletmp = timeTableElement.split('-');
                timetabletmpstart = moment(timetabletmp[0].trim(), 'hh:mm');
                timetabletmpend = moment(timetabletmp[1].trim(), 'hh:mm');
                if ((timetabletmpstart.isBetween(starttmp, endtmp)) || (timetabletmpend.isBetween(starttmp, endtmp))) {                  
                    saturdayTimeTable[index] = timeTableElement;                   
                }               
                index++;
            });
        })
        return saturdayTimeTable;       
    }
    useEffect(() => {
       
    }, [saturdayTimeTableState])

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
                تایم های مشاور
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="customized table " >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">ساعات حضور</StyledTableCell>
                            <StyledTableCell align="left">شنبه</StyledTableCell>
                            <StyledTableCell align="left"> یکشنبه </StyledTableCell>
                            <StyledTableCell align="left"> دوشنبه  </StyledTableCell>
                            <StyledTableCell align="left">  سه شنبه </StyledTableCell>
                            <StyledTableCell align="left">چهارشنبه  </StyledTableCell>
                            <StyledTableCell align="left">پنج شنبه</StyledTableCell>
                            <StyledTableCell align="left"> جمعه </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        
                        {
                            saturdayTimeTableState
                                ?
                              
                                timetable?.map((elementtmp: string, index: number) => (
                                    <StyledTableRow key={index++}>
                                        <StyledTableCell align="left">
                                            {
                                                elementtmp
                                            }
                                        </StyledTableCell>
                                      
                                        {
                                            elementtmp == saturdayTimeTableState[index]
                                                ?
                                                <StyledTableCell align="left" style={{ backgroundColor: 'blueviolet', color: 'black', }} />
                                                :
                                                <StyledTableCell align="left" />
                                        }


                                    </StyledTableRow>
                                ))
                                :
                                ""
                        }


                    </TableBody>
                </Table>

            </TableContainer>
        </Container >);
}

export default SchedulerConsultant;