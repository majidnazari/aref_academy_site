import React, { useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CREATE_USER } from './gql';
import { useMutation } from '@apollo/client';
import PaginatorInfo from '../../interfaces/paginator-info.interface';
import { showSuccess, showConfirm } from "../../utils/swlAlert";
import { Grid } from '@mui/material';
import { Password } from '@mui/icons-material';
interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    group_id: number;
}

const UersCreateScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<any>();
    const [first_name, setFirstName] = useState<any>();
    const [last_name, setLastName] = useState<any>();
    const [group_id, setGroupId] = useState<string>("");
    const [createUser] = useMutation(CREATE_USER);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setGroupId(event.target.value);
    };

    const createUserHandler = () => {
        createUser({
            variables: {
                email,
                first_name,
                last_name,
                group_id,
            }
        }).then(() => {
            showSuccess('کابر با موفقیت اضافه شد.');
        });

    }

    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>ایجاد کاربر جدید</h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نام"
                    id="first_name"
                    value={first_name}
                    onChange={setFirstName}
                />
            </Grid>

            <Grid item xs={12} md={4} lg={4}  >
                <TextField
                    fullWidth
                    label="نام خانوادگی"
                    id="last_name"
                    value={last_name}
                    onChange={setLastName}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}  >
                <TextField
                    fullWidth
                    label="تلفن همراه"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}  >
                <TextField
                    fullWidth
                    label="رمز عبور"
                    id="password"
                    value={password}
                    onChange={setPassword}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}  >
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel htmlFor="grouped-select">
                        گروه‌کاربری
                    </InputLabel>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        label="Grouping"
                        value={group_id}
                        onChange={handleChange}
                    >
                        <MenuItem value="" disabled >
                            <em>گروه‌کاربری</em>
                        </MenuItem>
                        <MenuItem value={1}>Option 1</MenuItem>
                        <MenuItem value={2}>Option 2</MenuItem>
                        <MenuItem value={3}>Option 3</MenuItem>
                        <MenuItem value={4}>Option 4</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button variant="contained"
                startIcon={<AddCircleIcon />} color="primary" onClick={createUserHandler}>
                ایجاد کاربر
            </Button>
        </Box>
    </Container >)
}

export default UersCreateScreen;