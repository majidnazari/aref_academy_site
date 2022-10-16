import { Box } from "@mui/system";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";
const TableGuild = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
      }}
    >
      <Box sx={{ mx: 1 }}>
        <CheckCircleRoundedIcon color="success" fontSize="small" />
        <Box sx={{ fontSize: "11px" }}>حاضر</Box>
      </Box>

      <Box sx={{ mx: 1 }}>
        <DoNotDisturbOnRoundedIcon color="error" fontSize="small" />
        <Box sx={{ fontSize: "11px" }}>غایب</Box>
      </Box>
      <Box sx={{ mx: 1 }}>
        <HorizontalRuleRoundedIcon color="disabled" />
        <Box sx={{ fontSize: "11px" }}>درج نشده</Box>
      </Box>
      <Box sx={{ mx: 1 }}>
        <WatchLaterTwoToneIcon color="warning" />
        <Box sx={{ fontSize: "11px" }}> تاخیر</Box>
      </Box>
      <Box sx={{ mx: 1 }}>
        <RemoveCircleOutlineRoundedIcon color="disabled" />
        <Box sx={{ fontSize: "11px" }}> ثبت نام نشده</Box>
      </Box>
    </Box>
  );
};

export default TableGuild;
