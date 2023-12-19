import { Button } from "@mui/material";
import { typesObject } from "constants/index";
import moment from "moment-jalaali";
import momentj from "moment-jalaali";
import { useState } from "react";

export const NextWeekSearchBtn = ({
  search_date,
  runNextWeek,
  disabled_flag,
}: {
  search_date: string;
  runNextWeek: Function;
  disabled_flag: boolean;
}) => {
  const nextWeekDate = moment(search_date).format("YYYY-MM-DD") >=  moment().add(7, "days").format("YYYY-MM-DD");
  const [showNextWeekFlag, setShowNextWeekFlag] =    useState<boolean>(nextWeekDate);

  return (
    <Button
      variant="contained"
      color="info"
      style={{ width: "100%" }}
      onClick={() => {
        runNextWeek();
      }}
      disabled={(nextWeekDate)} //|| disabled_flag}
      size="large"
    >
      هفته بعد
    </Button>
  );
};

export default NextWeekSearchBtn;
