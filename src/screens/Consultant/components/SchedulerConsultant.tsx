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
    userId = "63da17010eb3b6ec9e7f4ec7";
    const navigate = useNavigate();

    const [consultant, setConsultant] = useState<ConsultantData | null>(null);
    const [step, setStep] = useState<number | null>(null);
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
            setStep(data.consultant.step);
            console.log("the step is:", step);
            console.log("the data is:");
            console.log(data.consultant);
            setConsultant(data.consultant);
        },
        fetchPolicy: "no-cache",
    });

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
            <Table aria-label="customized table">
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
                        console.log("the  consultant?.timeTable is:")}{
                        console.log(consultant?.timeTable)
                    }
                    {/* <StyledTableRow >
                        <StyledTableCell align="left">{consultant?.timeTable[0].dayOfWeek}</StyledTableCell>
                        <StyledTableCell align="left">{consultant?.timeTable[0].startEnd[0].start}</StyledTableCell>
                        <StyledTableCell align="left">{consultant?.timeTable[0].startEnd[0].end}</StyledTableCell>

                    </StyledTableRow> */}
                    {
                        consultant?.timeTable.map((timeTableElement: TimeTable, index: number) => (
                            <StyledTableRow >

                                {
                                    timeTableElement.startEnd.map((startEndElement: StartEnd) => (
                                        <StyledTableCell align="left">
                                            {
                                                startEndElement.start
                                            }
                                        </StyledTableCell>

                                    ))
                                }

                            </StyledTableRow>
                        ))
                    }


                    {/* {consultant?.map((element: ConsultantData, index: number) => (
                        <StyledTableRow key={element._id}>
                            <StyledTableCell align="left">3{element.userId}</StyledTableCell>
                            <StyledTableCell align="left">{element.step} </StyledTableCell>
                            {
                                element.timeTable.map((timeTableelement: TimeTable) => (
                                    <StyledTableCell align="left">{timeTableelement.dayOfWeek} </StyledTableCell>
                                ))
                            }


                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    navigate(`/faults/edit/${element._id}`);
                                }}
                                variant="contained"
                                startIcon={<EditIcon />}
                                color="success"
                            >
                                ویرایش
                            </Button></StyledTableCell>
                            <StyledTableCell align="left">
                                <Button
                                    size="small"

                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                    color="error"
                                >
                                    حذف
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))} */}
                </TableBody>
            </Table>

        </TableContainer>
    </Container >)
}

export default SchedulerConsultant;