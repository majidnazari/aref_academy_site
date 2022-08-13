import { GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE } from "../gql/query";
import { useQuery } from "@apollo/client";
import { Box, Button, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Container from '@mui/material/Container';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import FormControl from '@mui/material/FormControl';


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
            setStudentList(data.getCourseStudentsWithAbsencePresence.data);
            //setBranches(data.getBranches.data);
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
                            <StyledTableCell align="left"> حضور و غیاب </StyledTableCell>
                            <StyledTableCell align="left">برچسب</StyledTableCell>
                            <StyledTableCell align="left">وضعیت</StyledTableCell>
                            <StyledTableCell align="left">تایید مدیر</StyledTableCell>
                            <StyledTableCell align="left">تایید حسابداری</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentList.map((element: any, index: number) => (
                            <StyledTableRow key={element.id}>
                                <StyledTableCell align="left">
                                    {index + 1}
                                </StyledTableCell>

                                <StyledTableCell align="left">{element.student.first_name} {element.student.last_name}</StyledTableCell>

                                <StyledTableCell align="left">
                                    <FormControl sx={{ width: "100%" }}>
                                        <Select
                                            defaultValue=""
                                            id="grouped-select"
                                            // value={allYears ? yearId : ""}
                                            // onChange={handleChangeYear}
                                            // error={error.year_id ? true : false}
                                            variant="filled"
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled >
                                                <em>حاضر / غایب </em>
                                            </MenuItem>
                                            {/* {allYears ?
                                                allYears.getYears.data.map((year: any) => {
                                                    return <MenuItem
                                                        value={year.id}
                                                        key={year.id}>{year.name}
                                                    </MenuItem>
                                                }) : <MenuItem value="1" disabled >
                                                    <em>در حال بارگذاری ...</em>
                                                </MenuItem>
                                            } */}
                                        </Select>
                                        {/* {error.year_id ? <FormHelperText error >{error.year_id}</FormHelperText> : ""} */}
                                    </FormControl>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {element.ap_attendance_status}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {element.cs_student_status}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {element.cs_manager_status}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {element.cs_financial_status}
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