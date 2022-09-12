import { useQuery } from "@apollo/client";
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
import { GET_LESSONS } from "screens/Courses/gql/query";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";

class SearchData {
  name?: string | undefined;
  lesson_id?: number | undefined;
  gender?: string | undefined;
}

class SearchCourseProp {
  callBack!: Function;
  loading!: boolean;
}

const SearchCourse = ({ callBack, loading }: SearchCourseProp) => {
  const [search, setSearch] = useState<SearchData>({
    name: undefined,
    lesson_id: undefined,
    gender: undefined,
  });
  const [skip, setSkip] = useState<Boolean>(true);
  const [lessonName, setLessonName] = useState<string>("");
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false);
  const [lessonOptions, setLessonOptions] = useState<any[]>([]);

  const { refetch: refetchLessons } = useQuery(GET_LESSONS, {
    variables: {
      first: 1,
      page: 1,
      name: "",
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {
      if (!skip) {
        setLessonOptions(data.getLessons.data);
      }
    },
  });

  const handleChangeGender = (event: SelectChangeEvent<string>) => {
    setSearch({
      ...search,
      gender: event.target.value,
    });
  };

  useEffect(() => {
    setLoadingLesson(true);
    refetchLessons({
      first: 1000,
      page: 1,
      name: lessonName,
    }).then(() => {
      setLoadingLesson(false);
    });
  }, [lessonName]);

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
          width: "30%",
          mr: 1,
        }}
      >
        <TextField
          fullWidth
          label="کد درس"
          value={search.name}
          onChange={(e: any) => setSearch({ ...search, name: e.target.value })}
          variant="filled"
        />
      </FormControl>

      <FormControl
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
                  setLessonName(e.target.value.trim());
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
          value={search?.lesson_id}
          onChange={(_event, newTeam) => {
            setSearch({
              ...search,
              lesson_id: newTeam?.id ? +newTeam.id : undefined,
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
      </FormControl>
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() => {
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

export default SearchCourse;
