import { Box, FormControl, MenuItem, Paper, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

const AddStudentCourse = () => {
    return (<Box
        component={Paper}
        sx={{ p: 1, my: 2 }}
    >
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            افزودن درس
        </Typography>
        <Box>
            <FormControl sx={{ width: "100%" }}>
                <Select
                    defaultValue=""
                    // value={studentInfo.major}
                    // onChange={handleChangeMajor}
                    variant="filled"
                    displayEmpty
                >
                    <MenuItem value="" disabled >
                        <em>رشته</em>
                    </MenuItem>
                    {/* {Object.keys(majorObject).map((key, index) => (
                        <MenuItem key={index} value={key}>{majorObject[key]}</MenuItem>
                    ))
                    } */}
                </Select>
            </FormControl>
        </Box>
    </Box>)
}

export default AddStudentCourse;