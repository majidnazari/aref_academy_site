import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CREATE_CLASSROOM } from './gql/mutation';
import { GET_BRANCHES } from '../gql/query';
import { useMutation, useQuery } from '@apollo/client';
import { showSuccess } from "../../../utils/swlAlert";
import { FormControl, FormHelperText, Grid, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import {
    useNavigate
} from "react-router-dom"

interface ErrorData {
    name?: string;
    description?: string;
    branchId?: string;
}

const BranchesClassRoomCreateScreen = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [branchId, setBranchId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorData>({});
    const [createClassRoom] = useMutation(CREATE_CLASSROOM);
    const navigate = useNavigate();

    const { data: branches } = useQuery(GET_BRANCHES, {
        variables: {
            first: 100,
            page: 1,
        }
    });

    const createYearHandler = () => {
        if (!validateForm()) return;
        setLoading(true);
        createClassRoom({
            variables: {
                name: name,
                branch_id: +branchId,
                description: description
            }
        }).then(() => {
            showSuccess('کلاس فیزیکی جدید با موفقیت اضافه شد.');
            setName("");
            //navigate('/class-rooms');
        }).finally(() => {
            setLoading(false);
        });

    }

    const validateForm = () => {
        let out = true;
        let result: ErrorData = {};
        setError({});
        if (!name) {
            result = { ...result, name: 'نام را وارد کنید.' };
            out = false;
        }
        if (!branchId) {
            result = { ...result, branchId: 'نام را وارد کنید.' };
            out = false;
        }
        setError(result);
        return out;
    }

    const handleChangeBranchId = (event: SelectChangeEvent<string>) => {
        setBranchId(event.target.value);
    };

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h1>
            ایجاد کلاس فیزیکی جدید
        </h1>

        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="نام"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    error={error.name ? true : false}
                    helperText={error.name ? error.name : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <TextField
                    fullWidth
                    label="توضیحات"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                    error={error.description ? true : false}
                    helperText={error.description ? error.description : ""}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4} >
                <FormControl sx={{ width: "100%" }}>
                    <Select
                        defaultValue=""
                        id="grouped-select"
                        value={branchId}
                        onChange={handleChangeBranchId}
                        error={error.branchId ? true : false}
                        variant="filled"
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>شعبه</em>
                        </MenuItem>
                        {branches && branches.getBranches.data.map((branch: any) => (
                            <MenuItem key={branch.id} value={branch.id}>{branch.name}</MenuItem>
                        ))
                        }
                    </Select>
                    {error.branchId ? <FormHelperText error >{error.branchId}</FormHelperText> : ""}
                </FormControl>
            </Grid>
        </Grid>
        <Box mt={2}>
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />} color="primary" onClick={createYearHandler}
                disabled={loading}
            >
                ایجاد کلاس فیزیکی جدید
                {loading ? <CircularProgress size={15} color="primary" /> : null}
            </Button>
        </Box>
    </Container >)
}

export default BranchesClassRoomCreateScreen;