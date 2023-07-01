import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import moment_jalali from "moment-jalaali";


const HeaderBox = ({ element_date }: { element_date: String | undefined }) => {    
  
  
const jalali_date=moment_jalali(element_date?.toString()).format("jYYYY/jMM/jDD");

  return (
    <>
      
        <Grid item xs={12} md={4} lg={4} >
            <Box>               
              {jalali_date}
              </Box>
        </Grid>
     
    </>
  );
};

export default HeaderBox;
