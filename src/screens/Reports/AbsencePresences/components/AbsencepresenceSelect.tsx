import { Box } from "@mui/material";
import AbsencepresenceSelectType from '../dto/AbsencepresenceSelectType';
import { attendanceStatusObject } from 'constants/index';


const AbsencepresenceSelect = ({ ap_attendance_status, id }: AbsencepresenceSelectType) => {
    return (
        <>{
            Object.keys(attendanceStatusObject).map((key: any, index: number) => (

                <Box key={index}
                    sx={{
                        display: ap_attendance_status === key ? 'block' : 'none',
                    }}
                > {ap_attendance_status === key ? attendanceStatusObject[key] : null} </Box>
            ))
        }
        </>
    )
}

export default AbsencepresenceSelect;