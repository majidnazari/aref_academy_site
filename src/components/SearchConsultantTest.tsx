import { useQuery } from "@apollo/client"
import {
  Box,
  Paper,
  FormControl,
  TextField,
  Autocomplete,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { GET_COSULTANT_TESTS } from "screens/Consultant_test/gql/query";
import { GET_LESSONS } from "screens/Consultant_test/gql/query";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";

export enum TestLevel {
  A,
  B,
  C,
  D,
}

class SearchData {
  code?: number;
  lessonId?: number;
  //lessonName?: string;
  level?: TestLevel;
  subject?: string;
}

class SearchConsultantTestProp {
  callBack!: Function;
  loading!: boolean;
}

const SearchConsultantTest = ({ callBack, loading }: SearchConsultantTestProp) => {
  const [search, setSearch] = useState<SearchData>({
    code: undefined,
    lessonId: undefined,
    //lessonName: undefined,
    level: undefined,
    subject: undefined,
  });

  const [skip, setSkip] = useState<Boolean>(true);
  const [testcode, setTestCode] = useState<number>();
  const [testSubject, setTestSubject] = useState<string>();
  const [testLevel, setTestLevel] = useState<TestLevel>();
  const [testLessonName, setTestlessonName] = useState<string>("");
  const [testLesson, setTestLesson] = useState<number>();

  const [loadingLesson, setLoadingLesson] = useState<boolean>(false);
  const [loadingCosultantTest, setLoadingCosultantTest] = useState<boolean>(false);
  const [lessonOptions, setLessonOptions] = useState<any[]>([]);

  const { refetch: refetchGetLessons } = useQuery(GET_LESSONS, {
    variables: {
      first: 1,
      page: 1,
      name: "",
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {
     // console.log("the skip is" + skip);
      if (!skip) {
        setLessonOptions(data.getLessons.data);
        //console.log("the fetch get lesson is run");
        //console.log(data.getLessons.data);
      }
    },

  });

  const { refetch: refetchConsultantTest } = useQuery(GET_COSULTANT_TESTS,
    {
      variables: {
        first: 1,
        page: 1,
        orderBy: [{
          column: 'id',
          order: 'DESC'
        }],
        code: search?.code ? search.code : undefined,
        subject: search?.subject ? search.subject : undefined,
        level: search?.level,
        lessonId: search?.lessonId,
        //lessonName:search?.lessonName,
        // lessonId: 0,
        // level: TestLevel.A,
        // subject: "",
        fetchPolicy: "network-only",
      },
      onCompleted: (data: any) => {
        if (!skip) {
          setLessonOptions(data.test.data);
        }
      }
    });



  const handleChangeLevel = (event: SelectChangeEvent<TestLevel>) => {

    setSearch({
      ...search,
      level: (event.target.value as TestLevel),
    });
  };

  useEffect(() => {
    setLoadingCosultantTest(true);
    refetchConsultantTest({
      first: 1000,
      page: 1,
      code: testcode,
      subject: testSubject,
      level: testLevel,
      lessonId: testLesson,

    }).then(() => {
      setLoadingCosultantTest(false);
    });
  }, [testcode, testSubject, testLevel, testLesson]);


  useEffect(() => {
    setLoadingLesson(true);
    refetchGetLessons({
      first: 10,
      page: 1,
      name: testLessonName,
    }).then(() => {
      //console.log(data);
      setLoadingLesson(false);
    });
    // console.log("the initial lesson is:");
    // console.log(testLessonName);

  }, [testLessonName]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1,
      }}
      component={Paper}
    >
      <FormControl
        sx={{
          width: "20%",
          mr: 1,
        }}
      >
        <TextField
          fullWidth
          label="کد"
          value={search.code}
          onChange={(e: any) => setSearch({ ...search, code: e.target.value })}
          variant="filled"
        />
      </FormControl>

      <FormControl
        sx={{
          width: "20%",
          mr: 1,
        }}
      >
        <TextField
          fullWidth
          label="موضوع"
          value={search.subject}
          onChange={(e: any) => setSearch({ ...search, subject: e.target.value })}
          variant="filled"
        />
      </FormControl>

      {/* <FormControl
        sx={{
          width: "20%",
          mr: 1,
        }}
      >
        <TextField
          fullWidth
          label="شماره درس"
          value={search.lessonId}
          onChange={(e: any) => setSearch({ ...search, lessonId: e.target.value })}
          variant="filled"
        />
      </FormControl> */}

      <FormControl
        sx={{
          mr: 1,
        }}
      >
        <Autocomplete
          id="lesson-names"
          options={lessonOptions}
          renderInput={(params) => (
            //console.log("render input is:"),
            //console.log({ ...params }),
            <TextField
              {...params}
              label="درسها"
              variant="filled"
              onChange={(e) => {
                if (e.target.value.trim().length >= 1) {
                  setSkip(false);
                  setTestlessonName(e.target.value.trim());
                  //alert("the value is:" + lessonName);
                }
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingLesson ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          getOptionLabel={(option) => option.name}
          style={{ width: 270 }}
          value={search?.lessonId}
          onChange={(_event, newTeam) => {
            setSearch({
              ...search,
              lessonId: newTeam?.id ? +newTeam.id : undefined,
            });
          }}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "20%",
          mr: 1,
        }}
      >
        <InputLabel id="level-select-id"> سطح </InputLabel>
        <Select
          labelId="level-select-id"
          id="level"
          label="سطح"
          value={search.level || ""}
          onChange={handleChangeLevel}
          variant="filled"
        >
          <MenuItem value={""}>همه</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="D">D</MenuItem>
        </Select>
      </FormControl>



      {/* <FormControl
            sx={{
              mr: 1,
            }}
          >
            <Autocomplete
              id="lesson-names"
              options={lessonOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="درسها"
                  variant="filled"
                  onChange={(e) => {
                    if (e.target.value.trim().length >= 1) {
                      setSkip(false);
                      setTestCode(Number(e.target.value));
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingLesson ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
              getOptionLabel={(option) => option.name}
              style={{ width: 270 }}
              value={search?.code}
              onChange={(_event, newTeam) => {
                setSearch({
                  ...search,
                  code: newTeam?.id ? +newTeam.id : undefined,
                });
              }}
            />
          </FormControl> */}

      {/* <FormControl
            sx={{
              width: "20%",
              mr: 1,
            }}
          >
            <InputLabel id="gender-select-id">دخترانه/پسرانه</InputLabel>
            <Select
              labelId="gender-select-id"
              id="genderId"
              label="دخترانه/پسرانه"
              value={search.gender || ""}
              onChange={handleChangeGender}
              variant="filled"
            >
              <MenuItem value={""}>همه</MenuItem>
              <MenuItem value="male">پسرانه</MenuItem>
              <MenuItem value="female">دخترانه</MenuItem>
            </Select>
          </FormControl> */}
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() => {
          console.log(search);
          callBack(search);
        }}
        sx={{
          mr: 1,
          p: 2,
        }}
      >
        جستجو
        {loading && (
          <CircularProgress
            size={15}
            style={{ marginRight: 10, color: "#fff" }}
          />
        )}
      </Button>
    </Box>
  );


};

export default SearchConsultantTest;