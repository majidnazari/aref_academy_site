import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Session } from "../dto/Session.dto";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import WatchLaterTwoToneIcon from "@mui/icons-material/WatchLaterTwoTone";

const Summary = ({ sessions }: { sessions: Session[] }) => {
  const [data, setData] = useState({
    absent: 0,
    present: 0,
    delay: 0,
    notRegisterd: 0,
    noAction: 0,
  });

  const calculateData = () => {
    const tmpData = { ...data };
    sessions.map((item: Session) => {
      switch (item.status) {
        case "absent":
          tmpData.absent++;
          break;

        case "present":
          // out = <CheckCircleRoundedIcon color="success" fontSize="small" />;
          tmpData.present++;
          break;

        case "noAction":
          //out = <HorizontalRuleRoundedIcon color="disabled" fontSize="small" />;
          tmpData.noAction++;
          break;

        case "not_registered":
          // out = (
          //   <RemoveCircleOutlineRoundedIcon color="disabled" fontSize="small" />
          // );
          tmpData.notRegisterd++;
          break;
        case "dellay15":
          //out = <WatchLaterTwoToneIcon color="warning" />;
          tmpData.delay++;
          break;
        case "dellay30":
          //out = <WatchLaterTwoToneIcon color="warning" />;
          tmpData.delay++;
          break;
        case "dellay45":
          //out = <WatchLaterTwoToneIcon color="warning" />;
          tmpData.delay++;
          break;
        case "dellay60":
          tmpData.delay++;
          break;
      }
      return item;
    });
    return tmpData;
  };
  useEffect(() => {
    setData(calculateData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "normal",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <CheckCircleRoundedIcon color="success" fontSize="small" />
        {data.present}
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <WatchLaterTwoToneIcon color="warning" fontSize="small" />
        {data.delay}
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <DoNotDisturbOnRoundedIcon color="error" fontSize="small" />
        {data.absent}
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <HorizontalRuleRoundedIcon color="disabled" fontSize="small" />
        {data.noAction}
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <RemoveCircleOutlineRoundedIcon color="disabled" fontSize="small" />
        {data.notRegisterd}
      </Box>
    </Box>
  );
};
export default Summary;
