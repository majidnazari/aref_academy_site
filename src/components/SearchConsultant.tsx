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
import { GET_CONSULTANTS } from "screens/Consultant/gql/query";
import { GET_LESSONS } from "screens/Consultant_test/gql/query";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";


class SearchData {
  firstName?: string;
  lastName?: string;
  email?: string;  
}

class SearchConsultantProp {
  callBack!: Function;
  loading!: boolean;
}

const SearchConsultant = ({ callBack, loading }: SearchConsultantProp) => {
  const [search, setSearch] = useState<SearchData>({
    firstName: undefined,
    lastName: undefined,
    //lessonName: undefined,
    email: undefined,
  });

  const [skip, setSkip] = useState<Boolean>(true);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [loadingConsultant, setLoadingConsultant] = useState<boolean>(false);


  const { refetch: refetchConsultant } = useQuery(GET_CONSULTANTS,
    {
      variables: {
        first: 1,
        page: 1,
        orderBy: [{
          column: 'id',
          order: 'DESC'
        }],
        first_name: search?.firstName ? search.firstName : undefined,
        last_name: search?.lastName ? search.lastName : undefined,
        email: search?.email,       
        fetchPolicy: "network-only",
      },
      onCompleted: (data: any) => {
       
      }
    });
  
  useEffect(() => {
    setLoadingConsultant(true);
    refetchConsultant({
      first: 1000,
      page: 1,
      first_name: firstName,
      last_name: lastName,
      email: email,      

    }).then(() => {
      setLoadingConsultant(false);
    });
  }, [firstName, lastName, email]);
 
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
          label="نام"
          value={search.firstName}
          onChange={(e: any) => setSearch({ ...search, firstName: e.target.value })}
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
          label="نام خانوادگی"
          value={search.lastName}
          onChange={(e: any) => setSearch({ ...search, lastName: e.target.value })}
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
          label=" نام کاربری "
          value={search.email}
          onChange={(e: any) => setSearch({ ...search, email: e.target.value })}
          variant="filled"
        />
      </FormControl>
     
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

export default SearchConsultant;