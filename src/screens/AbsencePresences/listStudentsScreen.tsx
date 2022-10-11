import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ListStudents from "./components/ListStudents";
import { CREATE_ABSENCE_PERESENCE_LIST } from "./gql/mutaion";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import AddStudentQuikly from "./components/AddStudentQuikly";

const ListStudentsScreen = () => {
  const { courseId, courseSessionId } = useParams<string>();
  const [createAbsencePresenceList] = useMutation(
    CREATE_ABSENCE_PERESENCE_LIST
  );
  const [listKey, setListKey] = useState<number>(0);

  const createAbsencePresenceListHandler = (
    inputCourseId: string,
    inputCourseSessionId: string
  ): void => {
    createAbsencePresenceList({
      variables: {
        course_id: parseInt(inputCourseId),
        course_session_id: parseInt(inputCourseSessionId),
      },
    });
  };
  useEffect(() => {
    if (courseId && courseSessionId) {
      createAbsencePresenceListHandler(courseId, courseSessionId);
    }
  }, [courseId, courseSessionId]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        حضورغیاب
      </Typography>
      {courseId && courseSessionId ? (
        <ListStudents
          course_id={+courseId}
          course_session_id={+courseSessionId}
          key={listKey}
        />
      ) : null}
      <AddStudentQuikly
        reloadList={() => {
          setListKey(listKey + 1);
        }}
      />
    </Container>
  );
};
export default ListStudentsScreen;
