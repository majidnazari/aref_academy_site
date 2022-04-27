import React from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const UersScreen = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(
        index: number,
        name: string,
        calories: number,
        fat: number,
        carbs: number,
    ) {
        return { index, name, calories, fat, carbs };
    }

    const rows = [
        createData(1, 'Frozen yoghurt', 159, 6.0, 24),
        createData(2, 'Ice cream sandwich', 237, 9.0, 37),
        createData(3, 'Eclair', 262, 16.0, 24),
        createData(4, 'Cupcake', 305, 3.7, 67),
        createData(5, 'Gingerbread', 356, 16.0, 49),
    ];

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">نام</StyledTableCell>
                        <StyledTableCell align="left">نام خانوادگی</StyledTableCell>
                        <StyledTableCell align="left">نام کاربری</StyledTableCell>
                        <StyledTableCell align="left">دسترسی</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.index}>
                            <StyledTableCell align="left">
                                {row.index}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.calories}</StyledTableCell>
                            <StyledTableCell align="left">{row.fat}</StyledTableCell>
                            <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Stack spacing={5} sx={{my:2}}>
                <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>
        </TableContainer>

    </Container>)
}

export default UersScreen;