import React, { useState } from 'react';
import Container from '@mui/material/Container';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { CREATE_FAULT } from './gql/mutation';
//import { EDIT_CONSULTANT } from './gql/mutation';
import { ConstantTestLevel } from "../../constants";

import { useMutation } from '@apollo/client';
import { showSuccess } from "../../utils/swlAlert";
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