import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AbsencepresenceSelectType from "../dto/AbsencepresenceSelectType";
import { UPDATE_ABSENCE_PERESENCE } from "../gql/mutaion";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { attendanceStatusObject } from "constants/index";

const AbsencepresenceSelect = ({
  ap_attendance_status,
  id,
  callBack,
}: AbsencepresenceSelectType) => {
  const [myAttendanceStatus, setMyAttendanceStatus] =
    useState<string>(ap_attendance_status);
  const [updateAbsencePresence, { loading }] = useMutation(
    UPDATE_ABSENCE_PERESENCE
  );

  const handleChangeStatus = (event: SelectChangeEvent<string>) => {
    updateAbsencePresence({
      variables: {
        id: id,
        attendance_status: event.target.value,
      },
      onCompleted: () => {
        setMyAttendanceStatus(event.target.value);
        callBack(id, event.target.value, "attendance_status");
      },
    });
  };
  return (
    <FormControl sx={{ width: "100%" }}>
      <Select
        defaultValue=""
        id="grouped-select"
        value={myAttendanceStatus}
        onChange={handleChangeStatus}
        variant="filled"
        displayEmpty
      >
        {loading && <CircularProgress sx={{ m: 2 }} />}
        {Object.keys(attendanceStatusObject).map((key: any) => (
          <MenuItem value={key} key={key}>
            {attendanceStatusObject[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AbsencepresenceSelect;
