import { useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SearchStudent from "components/SearchStudent";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_A_USER } from "./gql/query";

const AddConsultantStudent = ({ title }: { title: string }) => {
  const [studentId, setStudentId] = useState<string>("");
  const { userId } = useParams();

  const { data: userData } = useQuery(GET_A_USER, {
    variables: {
      id: userId,
    },
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        افزودن دانش آموز به مشاور:{" "}
        {userData?.getUser ? (
          userData.getUser.first_name + " " + userData.getUser.last_name
        ) : (
          <CircularProgress />
        )}
      </Typography>

      <Grid container>
        <Grid item xs={12} md={4}>
          <SearchStudent callBack={setStudentId} />
        </Grid>
        <Grid item xs={12} md={2} sx={{ display: "flex", p: 1 }}>
          <Button fullWidth variant="contained" color="primary">
            افزودن دانش‌آموز جدید
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default AddConsultantStudent;
