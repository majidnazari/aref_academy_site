import { Button } from "@mui/material";
import { typesObject } from "constants/index";
import moment from "moment-jalaali";
import momentj from "moment-jalaali";
import { useState } from "react";

export const PreviousWeekSearchBtn = ({
  search_date,
  runPreviousWeek,
  disabled_flag,
}: {
  search_date: string;
  runPreviousWeek: Function;
  disabled_flag: boolean;
}) => {
  const previousWeekDate =    moment(search_date).format("YYYY-MM-DD") <=  moment().add(-7, "days").format("YYYY-MM-DD");
  const [showPreviousWeekFlag, setShowPreviousWeekFlag] =  useState<boolean>(previousWeekDate);

 
  return (
    <Button
      variant="contained"
      color="info"
      style={{ width: "100%" }}
      onClick={() => {
        runPreviousWeek();
      }}
      disabled={(previousWeekDate) }//|| disabled_flag}
      size="large"
    >
      هفته قبل
    </Button>
  );
};

export default PreviousWeekSearchBtn;
