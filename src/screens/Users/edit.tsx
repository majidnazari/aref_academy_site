import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { EDIT_USER } from './gql/mutation';
import { GET_GROUPS, GET_A_USER, GET_BRANCHES } from './gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import {
    useParams
} from "react-router-dom";
import {
    useNavigate
} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    branchId?: string;
}

interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    group: {
        id: number;
        persian_name: string;
    };
}

const UersEditScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [first_name, setFirstName] = useState<string>("");
    const [last_name, setLastName] = useState<string>("");
    const [group_id, setGroupId] = useState<string>("");
    const [groups, setGroups] = useState<GroupData[]>([]);
    const [error, setError] = useState<ErrorData>({});
    const [branchId, setBranchId] = useState<string>("");
    const navigate = useNavigate();
    const [editUser] = useMutation(EDIT_USER);
    const params = useParams<string>();
    const userId = params.userId;

    const { data: userData } = useQuery(GET_A_USER, {
        variables: {
            id: userId
        }
    });

    const { data: grp } = useQuery(GET_GROUPS, {
        variables: {
            first: 100,
            page: 1,
        }
    });

    const { data: branches } = useQuery(GET_BRANCHES, {
        variables: {
            first: 1000,
            page: 1,
            orderBy: [{
                column: 'id',
                order: 'DESC'
            }]
        }
    });

    useEffect(() => {
        if (userData) {
            const userInfo: UserData = userData.getUser;
            setEmail(userInfo.email);
            setFirstName(userInfo.first_name);
            setLastName(userInfo.last_name);
            setGroupId(userInfo.group.id.toString());
        }
        if (grp) {
            setGroups(grp.getGroups.data);
        }
    }, [userData, grp]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setGroupId(event.target.value);
    };

    const handleChangeBranch = (event: SelectChangeEvent<string>) => {
        setBranchId(event.target.value);
    }

    const editUserHandler = () => {
        if (!validateForm()) return;
        editUser({
            variables: {
                id: userId,
                email: email,
                first_name: first_name,
                last_name: last_name,
                group_id: parseInt(group_id, 10),
                branch_id: +branchId
            }
        }).then(() => {
            showSuccess('کاربر با موفقیت ویرایش شد.');
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
        if (!branchId) {
            result = { ...result, branchId: 'شعبه را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }


    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h4>ویرایش حساب کاربری</h4>

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
            <Grid item xs={12} md={4} lg={4}  >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        value={branches ? (branchId || "") : ''}
                        onChange={handleChangeBranch}
                        error={error.branchId ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>شعبه</em>
                        </MenuItem>
                        {
                            branches && branches.getBranches.data.map((branch: any) => {
                                return <MenuItem key={branch.id} value={branch.id}>{branch.name}
                                </MenuItem>;
                            })

                        }
                    </Select>
                    {error.branchId ? <FormHelperText error >{error.branchId}</FormHelperText> : ""}
                </FormControl>
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button variant="contained"
                startIcon={<SaveIcon />} color="primary" onClick={editUserHandler}>
                ثبت تغییرات
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

export default UersEditScreen;
