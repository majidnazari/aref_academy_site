import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    title: string;
    body: any;
    open: boolean;
    callBack: Function;
}
const MessageDialogs: FC<Props> = ({ title = 'خطا', body, open, callBack }) => {
    const [openDialog, setOpenDialog] = useState(open);

    const handleClose = (): void => {
        setOpenDialog(false);
        callBack();
    }

    const generateTextMessage = (body: any): string => {
        if (typeof body === 'string') {
            return body;
        } else if (typeof body === 'object') {
            let tmp = '';
            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    tmp += (tmp === '' ? '' : ' , ') + `${body[key]}\n`;
                }
            }
            return tmp;
        }
        return '';
    }
    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ marginBottom: 2 }} >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {generateTextMessage(body)}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
                justifyContent: 'center'
            }}>
                <Button variant="contained" color="error" onClick={handleClose} autoFocus>
                    متوجه شدم
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MessageDialogs;