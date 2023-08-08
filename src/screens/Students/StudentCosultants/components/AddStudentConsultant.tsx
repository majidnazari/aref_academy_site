import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GET_CONSULTANTS, GET_A_STUDENT, GET_YEARS } from "../gql/query";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_STUDENT_CONSULTANT } from "../gql/mutation";
import { useState } from "react";
import { showSuccess } from "utils/swlAlert";
import { vmsNationalCode } from "utils/utils";

interface Props {
  studentId: string | undefined;
  refetch: Function;
}

const AddStudentConsultant = ({ studentId, refetch }: Props) => {
  const [consultantId, setConsultantId] = useState<string | undefined>("");
  const [isValidStudent, setIsValidStudent] = useState<boolean>(false);
  const [yearId, setYearId] = useState<string>("");

  const [consultantOptions, setConsultantOptions] = useState<any[]>([
    { label: "", id: "" },
  ]);
  useQuery(GET_CONSULTANTS, {
    variables: {
      first: 1000,
      page: 1,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
      fetchPolicy: "no-cache",
    },
    onCompleted: (result) => {
      console.log("consultantsData : ", result);
      if (result?.getUsers?.data) {
        const tmp = [{ label: "", id: 0 }];
        setConsultantOptions(tmp);
        const consultants = result.getUsers.data;
        for (const i in consultants) {
          tmp.push({
            id: +consultants[i].id,
            label: consultants[i].first_name + "-" + consultants[i].last_name,
          });
        }
      }
    },
  });

  const { data: allYears } = useQuery(GET_YEARS, {
    variables: {
      first: 100,
      page: 1,
      active: true,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
    },
  });

  useQuery(GET_A_STUDENT, {
    variables: {
      id: studentId,
      fetchPolicy: "no-cache",
    },
    onCompleted: (studentData) => {
      if (studentData) {
        setIsValidStudent(
          vmsNationalCode(studentData?.getStudent.nationality_code.trim())
        );
      }
    },
  });

  const handleChangeYear = (event: SelectChangeEvent<string>) => {
    setYearId(event.target.value);
  };

  const [createStudentConsultant, { loading: addStudentLoading }] = useMutation(
    CREATE_STUDENT_CONSULTANT
  );

  const insertStudentConsultant = () => {
    if (!isValidStudent) {
      return;
    }
    const input = {
      variables: {
        student_id: studentId ? parseInt(studentId) : 0,
        consultant_id: consultantId ? parseInt(consultantId) : null,
        year_id: +yearId,
        student_status: "ok",
      },
    };
    createStudentConsultant(input).then(() => {
      showSuccess("مشاور با موفقیت اضافه شد");
      refetch();
    });
  };

  return (
    <Box component={Paper} sx={{ p: 1, my: 2 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        افزودن مشاور
      </Typography>
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl sx={{ width: "100%" }}>
            {consultantOptions.length ? (
              <Autocomplete
                onChange={(event: any, newValue: any) => {
                  setConsultantId(newValue?.id);
                }}
                disablePortal
                id="combo-box-demo"
                options={consultantOptions}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="انتخاب مشاور" />
                )}
              />
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl sx={{ width: "100%" }}>
            <Select
              defaultValue=""
              id="grouped-select"
              value={yearId}
              onChange={handleChangeYear}
              //error={error.year_id ? true : false}
              variant="filled"
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>سال تحصیلی</em>
              </MenuItem>
              {allYears ? (
                allYears.getYears.data.map((year: any) => {
                  return (
                    <MenuItem value={year.id} key={year.id}>
                      {year.name}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value="" disabled>
                  <em>در حال بارگذاری ...</em>
                </MenuItem>
              )}
            </Select>
            {/* {error.year_id ? (
            <FormHelperText error>{error.year_id}</FormHelperText>
          ) : (
            ""
          )} */}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mx: 1 }}
            onClick={() => {
              insertStudentConsultant();
            }}
            disabled={addStudentLoading || !isValidStudent}
            endIcon={
              addStudentLoading ? (
                <CircularProgress color="inherit" size={10} />
              ) : null
            }
          >
            افزودن
          </Button>
        </Grid>
      </Grid>
      {!isValidStudent ? (
        <Alert sx={{ mt: 2 }} severity="error">
          کد ملی دانش آموز در پرونده وارد نشده است{" "}
        </Alert>
      ) : null}
    </Box>
  );
};

export default AddStudentConsultant;
