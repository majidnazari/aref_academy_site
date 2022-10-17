import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Box, TableCell } from "@mui/material";
import { Session } from "../dto/Session.dto";
import moment from "moment-jalaali";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}));

const TableHeadLoader = ({ sessions }: { sessions: Session[] }) => {
  return (
    <>
      <StyledTableCell align="left">ردیف</StyledTableCell>
      <StyledTableCell align="left">دانش آموز</StyledTableCell>

      {sessions.map((item: Session) => {
        return (
          <StyledTableCell key={item.session_id} align="left">
            <Box
              component="div"
              // className="hsRotate90"
              sx={{ fontSize: "10px" }}
            >
              {moment(item.start_date).format("jYYYY/jMM/jDD")}
            </Box>
          </StyledTableCell>
        );
      })}
    </>
  );
};

export default TableHeadLoader;
