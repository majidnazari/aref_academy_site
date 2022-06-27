import { forwardRef,  useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import StudentCoursesType from "interfaces/studentCourses.interface";
import CourseName from 'components/CourseName';
import GetEditBox from './GetEditBox';


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface EditProps {
    setFormData: Function;
    studentCourse: StudentCourseFormData;
}

interface Props {
    openDialog: boolean;
    studentCourse: StudentCoursesType;
}

interface StudentCourseFormData {
    student_status: string;
    financial_status: string;
    manager_status: string;
}
const Edit = ({ openDialog, studentCourse }: Props) => {
    const [open, setOpen] = useState(openDialog);
    const [formData, setFormData] = useState<StudentCourseFormData>();
    if (!openDialog) { return <></>; }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
            >
                <DialogTitle>
                    {"ویرایش - "}
                    <CourseName course={studentCourse.course} />
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        
                    </DialogContentText> */}
                    <GetEditBox setFormData={setFormData} studentCourse={studentCourse} />
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            console.log(formData);
                        }}
                    >ذخیره</Button>
                    <Button onClick={handleClose}>انصراف</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Edit;