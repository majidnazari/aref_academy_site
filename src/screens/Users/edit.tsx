import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GET_USERS, DELETE_USER } from './gql';
import { useMutation, useQuery } from '@apollo/client';
import PaginatorInfo from '../../interfaces/paginator-info.interface';
import { showSuccess, showConfirm } from "../../utils/swlAlert";
interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

const UersEditScreen = () => {

    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>Users Edit</h1>
    </Container>)
}

export default UersEditScreen;