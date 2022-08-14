import { GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE } from "../gql/query";
import { useQuery } from "@apollo/client";
import { Box, Button, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import { attendanceStatusObject } from 'constants/index';
import StatusIcon from "components/StatusIcon";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


interface PropType {
    course_id: number;
    course_session_id: number;
}
const ListStudents = ({ course_id, course_session_id }: PropType) => {
    const [studentList, setStudentList] = useState<any[]>([]);
    const { loading, data: studentsListData } = useQuery(GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE, {
        variables: {
            course_id: course_id,
            course_session_id: course_session_id,
            first: 1000,
            page: 1
        },
        onCompleted: (data) => {
            const tmp = data.getCourseStudentsWithAbsencePresence.data.filter((item: any) => item.cs_student_status === 'ok');
            setStudentList(tmp);
        },
    });
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
                فهرست دانش‌آموزان
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">ردیف</StyledTableCell>
                            <StyledTableCell align="left"> نام</StyledTableCell>
                            <StyledTableCell align="center"> حضور و غیاب </StyledTableCell>
                            <StyledTableCell align="left">برچسب</StyledTableCell>
                            <StyledTableCell align="left">مدیر</StyledTableCell>
                            <StyledTableCell align="left">حسابداری</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentList.map((element: any, index: number) => (
                            <StyledTableRow key={element.id}>
                                <StyledTableCell align="left">
                                    {index + 1}
                                </StyledTableCell>

                                <StyledTableCell align="left">{element.student.first_name} {element.student.last_name}</StyledTableCell>
                                <StyledTableCell align="left"

                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => {
                                                //
                                            }}
                                            sx={{
                                                boxShadow: 3
                                            }}
                                        >حاضر</Button>

                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            sx={{
                                                boxShadow: 3
                                            }}
                                            onClick={() => {
                                                //
                                            }}
                                        >تاخیر زیر ۱۵ دقیقه</Button>

                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            sx={{
                                                boxShadow: 3
                                            }}
                                            onClick={() => {
                                                //
                                            }}
                                        >تاخیر بالای ۱۵ دقیقه</Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            sx={{
                                                boxShadow: 3
                                            }}
                                            onClick={() => {
                                                //
                                            }}
                                        >غایب</Button>
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <FormControl sx={{ width: "100%" }}>
                                        <Select
                                            defaultValue=""
                                            id="grouped-select"
                                            value={element.ap_attendance_status}
                                            // onChange={handleChangeYear}
                                            variant="filled"
                                            displayEmpty
                                        >
                                            {
                                                Object.keys(attendanceStatusObject).map((key: any) => (
                                                    <MenuItem value={key} key={key} >
                                                        {attendanceStatusObject[key]}
                                                    </MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </StyledTableCell>


                                <StyledTableCell align="left">
                                    <StatusIcon status={element.cs_manager_status} />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <StatusIcon status={element.cs_financial_status} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    )
}

export default ListStudents;