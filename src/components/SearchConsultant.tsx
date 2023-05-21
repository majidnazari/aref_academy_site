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
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";


class SearchData {
  first_name?: string;
  last_name?: string;
  email?: string;  
}

class SearchConsultantProp {
  callBack!: Function;
  loading!: boolean;
}

const SearchConsultant = ({ callBack, loading }: SearchConsultantProp) => {
  const [search, setSearch] = useState<SearchData>({
    first_name: undefined,
    last_name: undefined,
    //lessonName: undefined,
    email: undefined,
  });

  const [skip, setSkip] = useState<Boolean>(true);
  const [first_name, setFirstName] = useState<string>();
  const [last_name, setLastName] = useState<string>();
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
        first_name: search?.first_name ? search.first_name : undefined,
        last_name: search?.last_name ? search.last_name : undefined,
        email: search?.email ? search?.email : undefined,       
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
      first_name: first_name,
      last_name: last_name,
      email: email,      

    }).then(() => {
      setLoadingConsultant(false);
    });
  }, [first_name, last_name, email]);
 
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
          value={search.first_name}
          onChange={(e: any) => setSearch({ ...search, first_name: e.target.value })}
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
          value={search.last_name}
          onChange={(e: any) => setSearch({ ...search, last_name: e.target.value })}
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