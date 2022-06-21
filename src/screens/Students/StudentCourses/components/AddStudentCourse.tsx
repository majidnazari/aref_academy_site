import { Box, Button, FormControl, MenuItem, Paper, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GET_COURSES } from '../gql/query';
import { useQuery } from "@apollo/client";

const AddStudentCourse = () => {

    const {data , loading, error} = useQuery(GET_COURSES);

    return (<Box
        component={Paper}
        sx={{ p: 1, my: 2 }}
    >
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            افزودن درس
        </Typography>
        <Box>
            <FormControl sx={{ width: 250 }}>
                <Select
                    defaultValue=""
                    // value={studentInfo.major}
                    // onChange={handleChangeMajor}
                    variant="filled"
                    displayEmpty
                >
                    <MenuItem value="" disabled >
                        <em>انتخاب درس</em>
                    </MenuItem>
                    {/* {Object.keys(majorObject).map((key, index) => (
                        <MenuItem key={index} value={key}>{majorObject[key]}</MenuItem>
                    ))
                    } */}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, mx: 1 }}
            >
                افزودن
            </Button>
        </Box>
    </Box>)
}

export default AddStudentCourse;