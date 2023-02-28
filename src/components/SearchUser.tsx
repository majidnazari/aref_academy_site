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
import { GET_LESSONS } from "screens/Consultant_test/gql/query";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { GET_USERS } from "screens/Users/gql/query";
import { GET_GROUPS, GET_BRANCHES } from 'screens/Users/gql/query';


class SearchData {
  first_name?: string;
  last_name?: string;
  email?: string;
  group_id?: number;
  branch_id?: number;
}

class SearchUserProp {
  callBack!: Function;
  loading!: boolean;
}

const SearchUser = ({ callBack, loading }: SearchUserProp) => {
  const [search, setSearch] = useState<SearchData>({
    first_name: undefined,
    last_name: undefined,
    //lessonName: undefined,
    email: undefined,
    group_id: undefined,
    branch_id: undefined,
  });

  const [skip, setSkip] = useState<Boolean>(true);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [userGroupName, setUserGroupName] = useState<string>("");
  const [userGroupId, setUserGroupId] = useState<number>();
  const [userBranchName, setUserBranchName] = useState<string>("");
  const [userBranchId, setUserBranchId] = useState<number>();


  const [loadingGroup, setLoadingGroup] = useState<boolean>(false);
  const [groupOptions, setGroupOptions] = useState<any[]>([]);
  const [loadingBranch, setLoadingBranch] = useState<boolean>(false);
  const [branchOptions, setBranchOptions] = useState<any[]>([]);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [lessonOptions, setLessonOptions] = useState<any[]>([]);
  
  


  const { refetch: refetchGetLessons } = useQuery(GET_LESSONS, {
    variables: {
      first: 1,
      page: 1,
      full_name: "",
      last_name:"",
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
  

  const { refetch: refetchGetBranches } = useQuery(GET_BRANCHES, {
    variables: {
      first: 1,
      page: 1,
      orderBy: [{
        column: 'id',
        order: 'DESC'
      }],
      name: "",      
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {         
     // if (!skip) {
      setBranchOptions(data.getBranches.data);       
      //}
    },
  });

  const { refetch: refetchGetGroups } = useQuery(GET_GROUPS, {
    variables: {
      first: 1,
      page: 1,
      persian_name: "",      
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {         
     // if (!skip) {
        setGroupOptions(data.getGroups.data);       
      //}
    },
  });

  const { refetch: refetchUser } = useQuery(GET_USERS,
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
        email: search?.email ? search.email : undefined,
        group_id: search?.group_id,
        branch_id: search?.branch_id,
        //lessonName:search?.lessonName,
        // lessonId: 0,
        // level: TestLevel.A,
        // subject: "",
        fetchPolicy: "network-only",
      },
      onCompleted: (data: any) => {       
       if (!skip) {
          setGroupOptions(data.getUsers.data);
         setBranchOptions(data.getUsers.data);
        }
      }
    });

  // const handleChangeLevel = (event: SelectChangeEvent<TestLevel>) => {

  //   setSearch({
  //     ...search,
  //     level: (event.target.value as TestLevel),
  //   });
  // };

  useEffect(() => {
    setLoadingUser(true);
    refetchUser({
      first: 1000,
      page: 1,
      first_name: firstName,
      last_name: lastName,
      email: email,
      group_id: userGroupId,
      branch_id: userBranchId,

    }).then(() => {
      setLoadingUser(false);
    });
  }, [firstName, lastName, email,userGroupId,userBranchId]);


  useEffect(() => {
    setLoadingGroup(true);
    refetchGetGroups({
      first: 10,
      page: 1,
      persian_name: userGroupName,
    }).then((data) => {      
      setLoadingGroup(false);
    }); 
  }, [userGroupName]);


  useEffect(() => {
    setLoadingBranch(true);
    refetchGetBranches({
      first: 10,
      page: 1,
      name: userBranchName,
    }).then((data) => {
      //console.log("use effect branch is:");
      //console.log(data);
      setLoadingBranch(false);
    });  
  }, [userBranchName]);

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

      <FormControl
        sx={{
          mr: 1,
        }}
      >
        <Autocomplete
          id="group-names"
          options={groupOptions}
          renderInput={(params) => (
            // console.log("render input is:"),
            // console.log({ ...params }),
            <TextField
              {...params}
              label="گروه کاربری"
              variant="filled"
              onChange={(e) => {
                if (e.target.value.trim().length >= 1) {
                  setSkip(false);
                  setUserGroupName(e.target.value.trim());                 
                }
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingGroup ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          getOptionLabel={(option) => option.persian_name}
          style={{ width: 200 }}
          value={search?.group_id}
          onChange={(_event, newTeam) => {
            
            setSearch({
              ...search,
              group_id: newTeam?.id ? +newTeam.id : undefined,
            });
          }}
        />
      </FormControl>

      <FormControl
        sx={{
          mr: 1,
        }}
      >
        <Autocomplete
          id="branch-names"
          options={branchOptions}
          renderInput={(params) => (
            // console.log("render input is:"),
            // console.log({ ...params }),
            <TextField
              {...params}
              label=" شعبه"
              variant="filled"
              onChange={(e) => {
                if (e.target.value.trim().length >= 1) {
                  setSkip(false);
                  setUserBranchName(e.target.value.trim());                 
                }
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingBranch ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          getOptionLabel={(option) => option.name}
          style={{ width: 200 }}
          value={search?.branch_id}
          onChange={(_event, newTeam) => {            
            setSearch({
              ...search,
              branch_id: newTeam?.id ? +newTeam.id : undefined,
            });
          }}
        />
      </FormControl>
      {/* <FormControl
        sx={{
          width: "20%",
          mr: 1,
        }}
      >
        <InputLabel id="level-select-id"> سطح </InputLabel>
        <Select
          labelId="level-select-id"
          id="level"
          label="گروه کاربری"
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

export default SearchUser;