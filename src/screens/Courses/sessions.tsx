import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CreateMultiSessions from './components/CreateMultiSessions';
import CreateSingleSession from './components/CreateSingleSession';
import ListSessions from './components/ListSessions';
import {
    useParams
} from "react-router-dom";
import { GET_A_COURSE } from './gql/query';
import { useQuery } from '@apollo/client';
import CourseName from 'components/CourseName';


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CourseSessionsScreen = () => {
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const [listSessionsKey, setListSessionsKey] = useState<number>(0);
    const params = useParams<string>();
    const courseId: number = Number(params.courseId);

    const { loading, error, data: courseData } = useQuery(GET_A_COURSE, {
        variables: {
            id: courseId
        }
    });

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const refreshList = () => {
        setListSessionsKey(listSessionsKey + 1);
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {loading && <div>Loading...</div>}
            {error && <div>Error :(</div>}
            {!courseData ? null :
                (<Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
                    <CourseName course={courseData.getCourse} />
                </Typography>)
            }
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>درج کلی جلسات</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CreateMultiSessions courseId={courseId} callBack={refreshList} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>درج تک جلسه</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CreateSingleSession courseId={courseId} callBack={refreshList} />
                </AccordionDetails>
            </Accordion>
            <Typography component={'div'} sx={{ mt: 2 }} >
                <ListSessions courseId={courseId} key={listSessionsKey} />
            </Typography>
        </Container >
    );
}

export default CourseSessionsScreen;
