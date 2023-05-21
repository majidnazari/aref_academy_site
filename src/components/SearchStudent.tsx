import { useQuery } from "@apollo/client";
import {
  Box,
  Paper,
  FormControl,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GET_STUDENTS } from "screens/Consultant/gql/query";

const SearchStudent = ({ callBack }: { callBack: Function }) => {
  const [searchName, setSearchName] = useState<string>("");
  const [loadingMobile, setLoadingMobile] = useState<boolean>(false);
  const [mobileOptions, setMobileOptions] = useState<any[]>([]);

  const { refetch: refetchPhones } = useQuery(GET_STUDENTS, {
    variables: {
      first: 1,
      page: 1,
      full_name: "",
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {
      setMobileOptions(data.getStudents.data);
    },
  });

  useEffect(() => {
    setLoadingMobile(true);
    refetchPhones({
      first: 50,
      page: 1,
      full_name: searchName,
    }).then(() => {
      setLoadingMobile(false);
    });
  }, [searchName]);

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
          mr: 1,
        }}
      >
        <Autocomplete
          freeSolo
          id="student-mobiles"
          options={mobileOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="نام و نام خانوادگی"
              variant="filled"
              onChange={(e) => {
                if (e.target.value.trim().length >= 3) {
                  setSearchName(e.target.value.trim());
                }
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingMobile ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          getOptionLabel={(option) =>
            option.first_name
              ? option.first_name + " " + option.last_name + `(${option.phone})`
              : ""
          }
          style={{ width: 400 }}
          onChange={(_event, newTeam) => {
            callBack(newTeam?.id);
          }}
        />
      </FormControl>
    </Box>
  );
};

export default SearchStudent;
