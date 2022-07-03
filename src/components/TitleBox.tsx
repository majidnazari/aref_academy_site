import { Box, Typography } from '@mui/material';

interface TitleBoxProps {
    title: string;
    number: string;
    icon: React.ReactNode;
}
const TitleBox = ({ title, number, icon }: TitleBoxProps) => {
    return (<Box sx={{ display: 'flex', p: 2 }}>
        {icon}
        <Box sx={{ ml: 2 }}>
            <Typography
                sx={{
                    color: 'white',
                    fontSize: '25px',
                    mt: 1,
                }}
            >
                {title}
            </Typography>
        </Box>
    </Box>)
}

export default TitleBox;
