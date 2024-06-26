import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PendingIcon from "@mui/icons-material/Pending";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

interface PropType {
  status: string;
}

const StatusIcon = ({ status }: PropType) => {
  switch (status) {
    case "pending":
      return <PendingActionsIcon color="error" />;
    case "semi_approved":
      return <HourglassBottomIcon color="warning" />;
    case "approved":
      return <ThumbUpAltIcon color="success" />;
    case "ok":
      return <CheckBoxIcon color="success" />;
    case "refused":
      return <PlaylistRemoveIcon color="error" />;
    case "refused_pending":
      return <PendingIcon color="error" />;
    case "fired":
      return <DoNotDisturbOnIcon color="error" />;
    case "fired_pending":
      return <PendingIcon color="error" />;
    case "refuse_pending":
      return <PendingIcon color="error" />;
    case "fired":
      return <DoNotDisturbOnIcon color="error" />;
    case "fire_pending":
      return <PendingIcon color="error" />;
    case "financial_pending":
      return <LocalAtmIcon color="warning" />;
    default:
      return null;
  }
};

export default StatusIcon;
