import React, { useState } from 'react';
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
    userId = "63d3dd302c419803bc1b6516";
    const navigate = useNavigate();

    const [consultant, setConsultant] = useState<ConsultantData | null>(null);
    const [step, setStep] = useState<number | null>(null);
    const [saturday, setSaturday] = useState<StartEnd[] | null>(null);
    const [saturdayTimeTable, setSaturdayTimeTable] = useState<any | null>(null);
    //let saturdayTimeTable: string[]=[];
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
            const timeTablesTitle = getTimeTableTitle(data.consultant.step);
            // console.log(data);
            // console.log("timeTablesTitle");
            // console.log({timeTablesTitle});
            calculateSaturday(timeTablesTitle, data.consultant.timeTable);

        },
        fetchPolicy: "no-cache",
    });

    const getTimeTableTitle = (userStep: number) => {
        let timeTableFrom = "";
        let timeTableTo = "";
        let timeTable = [];

        let now = moment("08:00", 'HHmm').format("HH:mm");
        let date = new Date();
        timeTableFrom = moment([date.getFullYear(), date.getMonth(), date.getDay(), 8, 0, 0]).format("HH:mm");
        let timetmp = now.split(':');

        for (let hour = 8; hour < 20;) {

            timeTableTo = moment([date.getFullYear(), date.getMonth(), date.getDay(), timetmp[0], timetmp[1], 0]).add(5, 'minutes').format("HH:mm");
            timetmp = timeTableTo.split(':');
            timeTable.push(timeTableFrom + " - " + timeTableTo);
            timeTableFrom = timeTableTo;
            hour = parseInt(timetmp[0]);
        }
        setTimetable(timeTable);
        //console.log(timeTable);
        return timeTable;

    }
    const calculateSaturday = (timeTablesTitle: string[], userTimeTables: TimeTable[]) => {
        const saturdays: any = [];

        // console.log("userTimeTable.dayOfWeek",userTimeTables);       
        userTimeTables?.forEach(userTimeTable => {
            switch (userTimeTable.dayOfWeek) {
                case "SUNDAY":
                    //console.log("the case SUNDAY is");
                    userTimeTable.startEnd.forEach(startEndSaturday => {
                        saturdays.push(startEndSaturday);
                    })

                    break;
            }
            setSaturday(saturdays);
            //console.log("the satu is:");
            //console.log(saturdays);



            // for (let i = 8; i <= 20; i++) {
            //     for (let j = 0; j <= 55; j = j + 5, index++) {
            //         console.log("the index is:" , index);
            //         console.log("the j is:" , j);
            //         // starttmp=saturdays[index].start.split(':');
            //         // timetabletmp=timeTablesTitle[index].split('-');
            //         // timetabletmpstart=timetabletmp[0].split(':');
            //         // timetabletmpstarthour=timetabletmpstart[0];
            //         // timetabletmpstartminute=timetabletmpstart[1];
            //         // timetabletmpend=timetabletmp[1].split(':');
            //         // timetabletmpendhour=timetabletmpend[0];
            //         // timetabletmpendminute=timetabletmpend[1];
            //         // endtmp=saturdays[index].end.split(':');


            //         // startHour=starttmp[0];
            //         // startMinute=starttmp[1];
            //         // endHour=endtmp[0];
            //         // endMinute=endtmp[1];


            //         // console.log("timetabletmpstarthour is:",timetabletmpstarthour);
            //         // console.log("timetabletmpstartminute is:",timetabletmpstartminute);
            //         // console.log("timetabletmpendhour is:",timetabletmpendhour);
            //         // console.log("timetabletmpendhour is:",timetabletmpendhour);

            //         // console.log("startHour is:",startHour);
            //         // console.log("startMinute is:",startMinute);
            //         // console.log("endHour is:",endHour);
            //         // console.log("endMinute is:",endMinute);


            //         // if (timeTablesTitle[index] === saturdays[index].start + "-" + saturdays[index].end) {
            //         //     saturdayTimeTable.push(timeTablesTitle[index]);
            //         // }
            //         // else {
            //         //     saturdayTimeTable.push("");
            //         // }
            //     }
            //     console.log("the i is:" , i);

            // }


        });

        let index = 0;
        let timetabletmp: string[] = [];
        let timetabletmpstart:any;
        let timetabletmpend:any;
        let timetabletmpstarthour = "";
        let timetabletmpstartminute = "";
       
        let timetabletmpendhour = "";
        let timetabletmpendminute = "";
        let starttmp:any;
        let endtmp :any;
        let startHour = "";
        let startMinute = "";
        let endHour = "";
        let endMinute = "";
        const format='hh:mm';

        // console.log("timetabletmpstarthour is:");
        // console.log(timetabletmpstarthour);
        // console.log("timetabletmpstartminute is:");
        // console.log(timetabletmpstartminute);

        // console.log("timetabletmpendhour is:");
        // console.log(timetabletmpendhour);
        // console.log("timetabletmpendminute is:");
        // console.log(timetabletmpendminute);

        saturdays.forEach((saturdayElement: any) => {
            //console.log("the saturdayElement foreach is:", saturdayElement);
            starttmp=moment(saturdayElement.start.trim(),format);
            endtmp=moment(saturdayElement.end.trim(),format);
            timeTablesTitle.forEach(timeTableElement => {
                //console.log("the timeTableElement foreach is:", timeTableElement);
                timetabletmp = timeTableElement.split('-');
                timetabletmpstart=moment(timetabletmp[0].trim(),format);
                timetabletmpend=moment(timetabletmp[1].trim(),format);

                if (timetabletmpstart.isBetween(starttmp, endtmp)) {
                    setSaturdayTimeTable([...saturdayTimeTable,timeTableElement]);
                    //saturdayTimeTable.push(timeTableElement);
                   // console.log("saturdayTimeTable is: ", saturdayTimeTable);
                    //console.log(" the timeTableElement : ", timeTableElement, " is between of : " ,saturdayElement );
                }

                // console.log("the time table is :", timetabletmp);
                //timetabletmpstart = timetabletmp[0].split(':');
                //timetabletmpstarthour = timetabletmpstart[0].trim();
                //timetabletmpstartminute = timetabletmpstart[1].trim();

                //timetabletmpend = timetabletmp[1].split(':');
                //timetabletmpendhour = timetabletmpend[0].trim();
                //timetabletmpendminute = timetabletmpend[1].trim();

                // starttmp = saturdayElement.start.split(':');
                // startHour = starttmp[0];
                // startMinute = starttmp[1];
                // endtmp = saturdayElement.end.split(':');

                // endHour = endtmp[0];
                // endMinute = endtmp[1];

                // if (
                //     (
                //         (startHour >= timetabletmpstarthour) &&
                //         (timetabletmpstartminute >= startMinute) &&
                //         (endHour <= timetabletmpendhour) &&
                //         (timetabletmpstartminute < endMinute)
                //     ) ||
                //     (
                //         (startHour >= timetabletmpstarthour) &&
                //         (timetabletmpstartminute >= startMinute) &&
                //         (endHour <= timetabletmpendhour+1) &&
                //         (timetabletmpstartminute > endMinute)
                //     )
                // ) {
                //     console.log("saturdayElement is: ", saturdayElement);
                //     console.log("timeTableElement target is: ", timeTableElement);

                // }

            });
        })

         //console.log("saturdayTimeTable is:");
         //console.log(saturdayTimeTable);
    }

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            تایم های مشاور
        </Typography>
        <TableContainer component={Paper}>
            <Table aria-label="customized table " style={{ lineHeight: "0.1px" }}>
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
                <TableBody>                    
                    {
                        timetable?.map((elementtmp: string, index: number) => (
                            <StyledTableRow key={index++}>
                                <StyledTableCell align="left">
                                    {
                                        elementtmp
                                    }
                                </StyledTableCell>
                                {console.log("the element :" ,elementtmp)}
                                {console.log("the saqturday:",saturdayTimeTable)}
                                {elementtmp == saturdayTimeTable
                                    ?
                                    <StyledTableCell align="left" style={{ backgroundColor: 'blueviolet', color: 'black', }} />
                                    :
                                    <StyledTableCell align="left" />}
                                {
                                    tmp
                                }

                            </StyledTableRow>
                        ))

                    }


                </TableBody>
            </Table>

        </TableContainer>
    </Container >);
}

export default SchedulerConsultant;