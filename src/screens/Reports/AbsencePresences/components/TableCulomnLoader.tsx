import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";
import { Session } from "../dto/Session.dto";
import { SessionsStatusType } from "../dto/SessionsStatusType";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";
import { borderColor } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}));
const LoadAbsentPresentIcons = ({ status }: { status: SessionsStatusType }) => {
  let out: any;
  switch (status) {
    case "absent":
      out = <DoNotDisturbOnRoundedIcon color="error" fontSize="small" />;
      break;

    case "present":
      out = <CheckCircleRoundedIcon color="success" fontSize="small" />;
      break;

    case "noAction":
      out = <HorizontalRuleRoundedIcon color="disabled" fontSize="small" />;
      break;

    case "not_registered":
      out = (
        <RemoveCircleOutlineRoundedIcon color="disabled" fontSize="small" />
      );
      break;
    case "dellay15":
      out = <WatchLaterTwoToneIcon color="warning" />;
      break;
    case "dellay30":
      out = <WatchLaterTwoToneIcon color="warning" />;
      break;
    case "dellay45":
      out = <WatchLaterTwoToneIcon color="warning" />;
      break;
    case "dellay60":
      out = <WatchLaterTwoToneIcon color="warning" />;
      break;
    default:
      return <>{status}</>;
  }
  return out;
};

const TableCulomnLoader = ({ sessions }: { sessions: Session[] }) => {
  return (
    <>
      {sessions.map((item: Session) => {
        return (
          <TableCell key={item.session_id} align="left" >
            <LoadAbsentPresentIcons status={item.status} />
          </TableCell>
        );
      })}
    </>
  );
};

export default TableCulomnLoader;
