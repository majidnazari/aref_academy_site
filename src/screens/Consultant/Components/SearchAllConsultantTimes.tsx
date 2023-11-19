import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { GET_STUDENTS } from "../gql/query";
import { GET_CONSULTANTS } from "../gql/query";

import { SearchAllConsultantProps } from "../dto/search-consultant-showalltime";
import { getCourseName } from "components/CourseName";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterJalali from "@date-io/date-fns-jalali";
import { GET_BRANCH_CLASSROOMS, GET_CONSULTANT_SHOW_TIMES } from "../gql/query";
import moment from "moment";
import momentja from "moment-jalaali";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const SearchAllConsultantTimes = ({
  callBack,
  disabled,
}: {
  callBack: Function;
  disabled: boolean;
}) => {
  const [search, setSearch] = useState<SearchAllConsultantProps>({});

  const [skip, setSkip] = useState<Boolean>(true);
  const [loadingConsultants, setLoadingConsultants] = useState<boolean>(false);
  const [consultantptions, setConsultantOptions] = useState<any[]>([]);
  const [consultantName, setConsultantName] = useState<string>("");
  const [loadingConsultant, setLoadingConsultant] = useState<boolean>(false);
  const [nextWeekDate, setNextWeekDate] = useState<string>(
    moment().add(7, "days").format("YYYY/MM/DD")
  );
  const [today, setToday] = useState<string>(moment().format("YYYY/MM/DD"));

  const [consulatntId, setConsulatntId] = useState<number | undefined>();
  const [showNextWeekFlag, setShowNextWeekFlag] = useState<boolean>(true);

  const { refetch: refetchConsultants } = useQuery(GET_CONSULTANTS, {
    variables: {
      first: 100,
      page: 1,
      consultant_id: null,
      target_date: moment().format("YYYY-MM-DD"),
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {
      // if (!skip) {
      const tmp: any = [];
      data.getConsultants.data.map((item: any) => {
        tmp.push({
          id: +item.id,
          name: item.first_name + " " + item.last_name,
        });
        //console.log("GET_CONSULTANT_SHOW_TIMES in search component:" , tmp);
        return item;
      });

      // console.log("consulatnt are:",tmp);
      setConsultantOptions(tmp);
      //}
    },
  });

  const showNextWeek = () => {
    setSearch({
      ...search,
      target_date: nextWeekDate as string,
    });
    const tmp: any = { ...search };
    for (const i in tmp) {
      if (tmp[i] === "") tmp[i] = undefined;
    }
    setShowNextWeekFlag(false);
    callBack({ target_date: nextWeekDate, consultant_id: consulatntId });
  };

  const showPreviousWeek = () => {
    setSearch({
      ...search,
      target_date: today as string,
    });

    const tmp: any = { ...search };
    for (const i in tmp) {
      if (tmp[i] === "") tmp[i] = undefined;
    }
    setShowNextWeekFlag(true);
    callBack({ target_date: today, consultant_id: consulatntId });
  };

  const customStyles = {
    width: 200,
    margin: "0 auto",
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        نمایش روزانه برنامه مشاوران
      </Typography>
      <Box sx={{ mb: 1, marginLeft: 1 }}>
        <Grid container sx={{ p: 1 }} spacing={1}>
          <Grid item xs={12} sm={6} md={2} xl={2} lg={2}>
            <FormControl
              sx={{
                mr: 1,
                width: "100%",
              }}
            >
              <Autocomplete
                id="consultant-names"
                options={consultantptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=" مشاور "
                    variant="filled"
                    //style={{ width: "100%" }}
                    onChange={(e) => {
                      if (e.target.value.trim().length >= 1) {
                        setSkip(false);
                        setConsultantName(e.target.value.trim());
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingConsultant ? (
                            <CircularProgress color="inherit" size={10} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                getOptionLabel={(option) => option.name}
                // style={customStyles}
                //style={{ width: "100%" }}
                value={search?.consultant_id}
                onChange={(_event, newTeam) => {
                  setSearch({
                    ...search,
                    consultant_id: newTeam?.id ? +newTeam.id : undefined,
                  });
                  setConsulatntId(search?.consultant_id);
                  // alert(consulatntId);
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2} xl={2} lg={2}>
            <LocalizationProvider dateAdapter={AdapterJalali}>
              <DatePicker
                label="از تاریخ"
                value={search.target_date || moment().format("YYYY/MM/DD")}
                onChange={(newValue) => {
                  if (newValue) {
                    setSearch({
                      ...search,
                      target_date: newValue as string,
                    });
                    setNextWeekDate(
                      moment(newValue).add(7, "days").format("YYYY/MM/DD")
                    );
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} style={{ width: "100%" }} />
                )}
                mask="____/__/__"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={2} xl={2} lg={2}>
            <Button
              variant="contained"
              color="info"
              size="large"
              style={{ width: "100%" }}
              onClick={() => {
                const tmp: any = { ...search };
                for (const i in tmp) {
                  if (tmp[i] === "") tmp[i] = undefined;
                }
                callBack(tmp);
              }}
              disabled={disabled}
            >
              جستجو
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2} xl={2} lg={2}>
            <Button
              variant="contained"
              color="info"
              size="large"
              style={{ width: "100%" }}
              onClick={() => {
                // alert(selectedDate);
                showPreviousWeek();
              }}
              disabled={showNextWeekFlag || disabled}
            >
              امروز
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2} xl={2} lg={2}>
            <Button
              variant="contained"
              color="info"
              style={{ width: "100%" }}
              onClick={() => {
                showNextWeek();
              }}
              disabled={!showNextWeekFlag || disabled}
              size="large"
            >
              هفته آتی
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchAllConsultantTimes;
