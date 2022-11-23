import { forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import StudentCoursesType from "interfaces/studentCourses.interface";
import CourseName from "components/CourseName";
import GetEditBox from "./GetEditBox";
import { useMutation } from "@apollo/client";
import { UPDATE_STUDENT_COURSE } from "../screens/Students/StudentCourses/gql/mutation";
import { showSuccess } from "utils/swlAlert";
import { Alert } from "@mui/material";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  openDialog: boolean;
  studentCourse: StudentCoursesType;
  refresh: () => void;
}

interface StudentCourseFormData {
  student_status: string;
  financial_status: string;
  manager_status: string;
}

const Edit = ({ openDialog, studentCourse, refresh }: Props) => {
  const [open, setOpen] = useState(openDialog);
  const [formData, setFormData] = useState<any>({} as any);
  const [updateCourseStudent] = useMutation(UPDATE_STUDENT_COURSE);
  const [errorText, setErrorText] = useState<string>("");

  if (!openDialog) {
    return <></>;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const updateCourseStudentHandler = () => {
    setErrorText("");
    const variables: any = {
      id: studentCourse.id,
    };
    let key: keyof typeof formData;
    for (key in formData) {
      variables[key] = formData[key];
    }
    if (
      variables.refusedStatus &&
      variables.refusedStatus === "transfer" &&
      !variables.transferred_to_course_id
    ) {
      setErrorText("کلاس مقصد جابجایی انتخاب نشده است");
      return false;
    }
    if (!variables.transferred_to_course_id)
      variables.transferred_to_course_id = null;

    if (!variables.description) variables.description = null;

    const input = {
      variables,
    };
    updateCourseStudent(input).then(() => {
      showSuccess("ویرایش با موفقیت انجام شد");
      setOpen(false);
      refresh();
    });
  };

  const formDataController = (data: StudentCourseFormData) => {
    const oldData = {
      manager_status: studentCourse.manager_status,
      financial_status: studentCourse.financial_status,
      student_status: studentCourse.student_status,
    };
    const tmpFormData: any = {};
    let key: keyof typeof data;
    for (key in data) {
      if (oldData[key] !== data[key]) {
        tmpFormData[key] = data[key];
      }
    }
    setFormData(tmpFormData);
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
          <GetEditBox
            setFormData={formDataController}
            studentCourse={studentCourse}
          />
          {errorText !== "" ? (
            <Alert sx={{ pt: 1 }} severity="warning">
              {errorText}
            </Alert>
          ) : null}
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateCourseStudentHandler();
            }}
          >
            ذخیره
          </Button>
          <Button onClick={handleClose}>انصراف</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Edit;
