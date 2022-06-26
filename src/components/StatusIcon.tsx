import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

interface PropType {
    status: string;
}

const StatusIcon = ({ status }: PropType) => {
    switch (status) {
        case 'pending':
            return <PendingActionsIcon color='warning' />;
        case 'approved':
            return <ThumbUpAltIcon color='success' />;
        case 'ok':
            return <CheckBoxIcon color='success' />;
        case 'refused':
            return <PlaylistRemoveIcon color='warning' />;
        case 'fired':
            return <DoNotDisturbOnIcon color='error' />;
        default:
            return null;
    }
}

export default StatusIcon;