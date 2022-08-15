import { Box, Button, CircularProgress } from "@mui/material";
import AbsencepresenceBtnsType from '../dto/AbsencepresenceBtnsType';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { UPDATE_ABSENCE_PERESENCE } from '../gql/mutaion';
import { useMutation } from '@apollo/client';
import { useState } from "react";
import { absenceMainStatusObject } from 'constants/index';

type colorType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;

const colorsObject: Map<string, colorType> = new Map<string, colorType>([
    ['present', "success"],
    ['dellay15', "inherit"],
    ['dellay30', "warning"],
    ['absent', "error"],
]);

const AbsencepresenceBtns = ({ ap_status, id }: AbsencepresenceBtnsType) => {
    const [myApStatus, setMyApStatus] = useState<string>(ap_status);
    const [updateAbsencePresence, { loading }] = useMutation(UPDATE_ABSENCE_PERESENCE);
    return (<Box
        sx={{
            display: 'flex',
            justifyContent: "space-between"
        }}
    >
        {
            Object.keys(absenceMainStatusObject).map((key: string) => {
                return <Button
                    variant={myApStatus === key ? "contained" : "outlined"}
                    startIcon={myApStatus === key ? <TaskAltIcon fontSize="small" /> : null}
                    color={colorsObject.get(key)}
                    onClick={() => {
                        updateAbsencePresence({
                            variables: {
                                id: id,
                                status: key,
                            },
                            onCompleted: () => {
                                setMyApStatus(key);
                            }
                        });
                    }}
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={10} color="inherit" /> : null}
                    sx={{
                        boxShadow: 3
                    }}
                >
                    {absenceMainStatusObject[key]}
                </Button>
            })
        }
    </Box>)
}

export default AbsencepresenceBtns;