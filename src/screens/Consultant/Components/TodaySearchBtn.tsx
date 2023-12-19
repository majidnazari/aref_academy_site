import { Button } from "@mui/material";
import { typesObject } from "constants/index";
import moment from "moment-jalaali";
import momentj from "moment-jalaali";
import { useState } from "react";

export const TodaySearchBtn = ({
  search_date,
  runToday,
  disabled_flag,
}: {
  search_date: string;
  runToday: Function;
  disabled_flag: boolean;
}) => {
  const todayDate =  moment(search_date).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD");
  const [showTodayFlag, setShowTodayFlag] = useState<boolean>(todayDate);

 // alert(moment(search_date).format("YYYY-MM-DD") );
  //alert( moment().format("YYYY-MM-DD"));
  //alert( todayDate);

  return ( 
    <Button
      variant="contained"
      color="info"
      style={{ width: "100%" }}
      onClick={() => {
        runToday();
      }}
      disabled={(todayDate)} // || ( (todayDate) && (disabled_flag) )}
      size="large"
    >
      امروز 
    </Button>
  );
};

export default TodaySearchBtn;
