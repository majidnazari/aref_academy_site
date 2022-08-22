import { Box, Typography } from "@mui/material";
import AbsencepresenceBtnsType from '../dto/AbsencepresenceBtnsType';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useState } from "react";
import { absenceMainStatusObject } from 'constants/index';

type colorType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;

const colorsObject: Map<string, colorType> = new Map<string, colorType>([
    ['present', "success"],
    ['dellay15', "inherit"],
    ['dellay30', "warning"],
    ['absent', "error"],
]);
const absenceMainStatusObjectNew = { ...absenceMainStatusObject, "noAction": "ثبت نشده" };
const AbsencepresenceBtns = ({ ap_status, id }: AbsencepresenceBtnsType) => {
    const [myApStatus] = useState<string>(ap_status);
    return (<Box
        sx={{
            display: 'flex',
            justifyContent: "space-between"
        }}
    >
        {
            Object.keys(absenceMainStatusObjectNew).map((key: string, index: number) => {
                return <Box key={index}
                    sx={{
                        display: myApStatus === key ? 'block' : 'none',
                    }}
                >
                    {myApStatus === key ?
                        <Typography 
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {absenceMainStatusObject[key] ?
                                <><TaskAltIcon fontSize="small" color={colorsObject.get(key)} />
                                    {absenceMainStatusObject[key]}</>
                                : "ثبت نشده"}
                        </Typography>
                        : null}
                </Box>

            })
        }
    </Box>)
}

export default AbsencepresenceBtns;