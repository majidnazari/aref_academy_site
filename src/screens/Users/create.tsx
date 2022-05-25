import React, { ChangeEventHandler, useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { CREATE_USER } from './gql/mutation';
import { GET_GROUPS } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useNavigate
} from "react-router-dom";
interface GroupData {
    id: number;
    persian_name: string;
}

interface ErrorData {
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    group_id?: string;
}

const UersCreateScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [first_name, setFirstName] = useState<string>("");
    const [last_name, setLastName] = useState<string>("");
    const [group_id, setGroupId] = useState<string>("");
    const [groups, setGroups] = useState<GroupData[]>([]);
    const [error, setError] = useState<ErrorData>({});
    const navigate = useNavigate();
    const [createUser] = useMutation(CREATE_USER);
    useQuery(GET_GROUPS, {
        variables: {
            first: 100,
            page: 1,
        },
        onCompleted: (data) => {
            setGroups(data.getGroups.data);
        }
    });

    const handleChange = (event: SelectChangeEvent<string>) => {
        setGroupId(event.target.value);
    };

    const createUserHandler = () => {
        if (!validateForm()) return;
        createUser({
            variables: {
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                group_id: parseInt(group_id, 10),
            }
        }).then(() => {
            showSuccess('کابر با موفقیت اضافه شد.');
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setGroupId("");
        });

    }

    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!email) {
            result = { ...result, email: 'موبایل را وارد کنید.' };
            out = false;
        }
        else if (email.length !== 11) {
            result = { ...result, email: 'موبایل باید ۱۱ رقم باشد.' };
            out = false;
        }

        if (!password) {
            result = { ...result, password: 'رمز عبور را وارد کنید.' };
            out = false;
        }
        else if (password.length < 6) {
            result = { ...result, password: 'رمز عبور حداقل 6 کاراکتر باید باشد.' };
            out = false;
        }

        if (!first_name) {
            result = { ...result, first_name: 'نام را وارد کنید.' };
            out = false;
        }
        if (!last_name) {
            result = { ...result, last_name: 'نام خانوادگی را وارد کنید.' };
            out = false;
        }
        if (!group_id) {
            result = { ...result, group_id: 'گروه کاربری را انتخاب کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>ایجاد کاربر جدید</h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نام"
                    id="first_name"
                    value={first_name}
                    onChange={(e: any) => setFirstName(e.target.value)}
                    error={error.first_name ? true : false}
                    helperText={error.first_name ? error.first_name : ""}
                    variant="filled"
                />
            </Grid>

            <Grid item xs={12} md={4} lg={4}  >
                <TextField
                    fullWidth
                    label="نام خانوادگی"
                    id="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    error={error.last_name ? true : false}
                    helperText={error.last_name ? error.last_name : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}  >
                <TextField
                    fullWidth
                    label="تلفن همراه"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error.email ? true : false}
                    helperText={error.email ? error.email : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}  >
                <TextField
                    fullWidth
                    label="رمز عبور"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error.password ? true : false}
                    helperText={error.password ? error.password : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}  >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        value={group_id}
                        onChange={handleChange}
                        error={error.group_id ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>گروه‌کاربری</em>
                        </MenuItem>
                        {
                            groups.map((group) => {
                                return <MenuItem
                                    value={group.id}
                                    key={group.id}>{group.persian_name}
                                </MenuItem>
                            })
                        }
                    </Select>
                    {error.group_id ? <FormHelperText error >{error.group_id}</FormHelperText> : ""}
                </FormControl>
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button 
                variant="contained"
                sx={{ float: "left" }}
                startIcon={<AddCircleIcon />} color="primary" onClick={createUserHandler}>
                ایجاد کاربر
            </Button>
            <Button
                sx={{ float: "right" }}
                variant="contained"
                color="secondary" 
                onClick={() => navigate(`/users`)}
            >
                 <ArrowBackIcon />
                بازگشت
            </Button>
        </Box>
    </Container >)
}

export default UersCreateScreen;