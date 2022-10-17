import { useQuery } from "@apollo/client";
import {
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Container,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE_LIST } from "./gql/query";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHeadLoader from "./components/TableHeadLoader";
import TableCulomnLoader from "./components/TableCulomnLoader";
import { useState } from "react";
import { JuryDto } from "./dto/Jury.dto";
import TableGuild from "./components/TableGuild";
import CircularProgress from "@mui/material/CircularProgress";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const JuryScreen = () => {
  const params = useParams<string>();
  const courseId: number = Number(params.courseId);
  const [list, setList] = useState<JuryDto[]>([]);

  const { loading: loadingList } = useQuery(
    GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE_LIST,
    {
      variables: {
        course_id: courseId,
      },
      onCompleted: (data) => {
        setList(data.getCourseStudentsWithAbsencePresenceList);
      },
      fetchPolicy: "no-cache",
    }
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <TableGuild />
          {loadingList ? (
            <CircularProgress sx={{ p: 1 }} color="primary" />
          ) : null}
          {!list.length && !loadingList ? (
            <Typography sx={{ p: 1 }}>داده ای موجود نیست</Typography>
          ) : null}
          <Table
            stickyHeader
            aria-label="sticky dens table"
            size="small"
            padding="normal"
          >
            <TableHead>
              <TableRow>
                {list && list[0] ? (
                  <TableHeadLoader sessions={list[0].sessions} />
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((element: JuryDto, index: number) => (
                <StyledTableRow key={element.id}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {element.student?.first_name} {element.student?.last_name}
                  </StyledTableCell>
                  <TableCulomnLoader sessions={element.sessions} />
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
export default JuryScreen;
