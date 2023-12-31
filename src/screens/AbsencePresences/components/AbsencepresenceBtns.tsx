import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import AbsencepresenceBtnsType from "../dto/AbsencepresenceBtnsType";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { UPDATE_ABSENCE_PERESENCE } from "../gql/mutaion";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { absenceMainStatusObject } from "constants/index";
import RestoreIcon from "@mui/icons-material/Restore";

type colorType =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | undefined;

const colorsObject: Map<string, colorType> = new Map<string, colorType>([
  ["present", "success"],
  ["dellay15", "inherit"],
  ["dellay30", "warning"],
  ["absent", "error"],
]);

const AbsencepresenceBtns = ({
  ap_status,
  id,
  callBack,
}: AbsencepresenceBtnsType) => {
  const [myApStatus, setMyApStatus] = useState<string>(ap_status);
  const [updateAbsencePresence, { loading }] = useMutation(
    UPDATE_ABSENCE_PERESENCE
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {Object.keys(absenceMainStatusObject).map(
        (key: string, index: number) => {
          return (
            <Button
              key={index}
              variant={myApStatus === key ? "contained" : "outlined"}
              startIcon={
                myApStatus === key ? <TaskAltIcon fontSize="small" /> : null
              }
              color={colorsObject.get(key)}
              onClick={() => {
                updateAbsencePresence({
                  variables: {
                    id: id,
                    status: key,
                  },
                  onCompleted: () => {
                    setMyApStatus(key);
                    callBack(id, key, "ap_status");
                  },
                });
              }}
              disabled={loading}
              endIcon={
                loading ? <CircularProgress size={10} color="inherit" /> : null
              }
              sx={{
                boxShadow: 3,
              }}
            >
              {absenceMainStatusObject[key]}
            </Button>
          );
        }
      )}
      <IconButton
        onClick={() => {
          updateAbsencePresence({
            variables: {
              id: id,
              status: "noAction",
            },
            onCompleted: () => {
              setMyApStatus("noAction");
            },
          });
        }}
        disabled={loading}
        // endIcon={loading ? <CircularProgress size={10} color="inherit" /> : null}
        sx={{
          boxShadow: 3,
        }}
      >
        <RestoreIcon />
      </IconButton>
    </Box>
  );
};

export default AbsencepresenceBtns;
