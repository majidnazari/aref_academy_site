import { useLayoutEffect, useRef, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container, Switch, TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useMutation, useQuery } from "@apollo/client";
import { showConfirm, showSuccess } from "utils/swlAlert";
import {
  GET_CONSULTANT_SHOW_TIMES,
  GetConsultantStudentsByDefinitionId,
} from "../gql/query";
import {
  COPY_STUDENT_TO_NEXT_WEEK,
  DELETE_CONSULTANTN_DEFINITION_STUDENT_ID,
  DELETE_ONE_SESSION_OF_TIME_TABLE,
  UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID,
} from "../gql/mutation";
import { useParams } from "react-router-dom";
import StudentData from "utils/student";
import ComponentStudentDialog from "./ComponentStudentDialog";
import { useNavigate } from "react-router-dom";
import "../../../../src/assets/stringDate.css";
import SearchAllConsultantTimes from "./SearchAllConsultantTimes";
import StudentStatusComponent from "./StudentStatusDialog";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import TimeSpliterDialog from "./TimeSpliterDialog";
import ShowPhone from "screens/Students/components/ShowPhone";
import momentj from "moment-jalaali";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface ConsultantData {
  id: number;
  first_name?: string;
  last_name?: string;
}

interface getConsultantsTimeShowData {
  consultant?: ConsultantData;
  details?: detailsData[];
}

interface detailsData {
  consultant_id: number;
  id: string;
  consultant_first_name: string;
  student_id: string;
  student: StudentData;
  branch_class_room_id: number;
  start_hour: string;
  end_hour: string;
  session_date: string;
  branchClassRoom_name: string;
  student_status: string;
  copy_to_next_week: boolean;
  user_student_status_full_name: String;
  student_status_updated_at: Date;

  remote: boolean;
  compensatory_meet: boolean;
  single_meet: boolean;
  compensatory_of_definition_detail_id: number;
  compensatory_of_definition_detail_session_date: String;
  compensatory_of_definition_detail_start_hour: String;
  compensatory_of_definition_detail_end_hour: String;
}
class SearchData {
  consultant_id?: number;
  target_date?: string;
}

const convertStudentStatusTheme = (student_status: string) => {
  switch (student_status) {
    case "present":
      return consultantPresentStudentBox;
    case "absent":
      return consultantAbsentStudentBox;
    case "dellay5":
    case "dellay10":
    case "dellay15":
    case "dellay15more":
      return consultantDellayStudentBox;
    default:
      return consultantNotFilledStudentBox;
  }
};

const consultantNotFilledStudentBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  backgroundColor: "#ebebeb",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};

const consultantPresentStudentBox = {
  backgroundColor: "#ace1a3",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};

const consultantAbsentStudentBox = {
  backgroundColor: "#ed2a2a",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};

const consultantDellayStudentBox = {
  backgroundColor: "#f1f16f",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};

const ShowAllConsultantsTimes = () => {
  const params = useParams<string>();
  // const consultantId = params.consultantId;

  const [studentIds, setStudentIds] = useState<number[]>();
  const [consId, setConsId] = useState<string>("");
  const [timeTable, setTimeTable] = useState<getConsultantsTimeShowData[]>([]);
  const [dialogconsultantTimeTableId, setDialogConsultantTimeTableId] =
    useState<string>();
  const [studentDialogOpen, setStudentDialogOpen] = useState<boolean>(false);
  const [timeSpliterDialogOpen, setTimeSpliterDialogOpen] =
    useState<boolean>(false);
  const [studentStatusDialogOpen, setStudentStatusDialogOpen] =
    useState<boolean>(false);

  const [width, setWidth] = useState<string | number>(0);
  const ref = useRef(null);

  const current_date = moment().format("YYYY-MM-DD");
  const navigate = useNavigate();

  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [studentStatus, setStudentStatus] = useState<string>("no_action");

  const [search, setSearch] = useState<SearchData>({
    consultant_id: undefined,
    target_date: current_date,
  });

  const { refetch } = useQuery(GET_CONSULTANT_SHOW_TIMES, {
    variables: {
      // consultant_id: Number(consultantId),
      target_date: moment().format("YYYY-MM-DD"),
    },
    onCompleted: (data) => {
      setTimeTable(data.getConsultantsTimeShow);
    },
    fetchPolicy: "no-cache",
  });

  const { refetch: refetchConsultantStudentsByDefinitionId } = useQuery(
    GetConsultantStudentsByDefinitionId,
    {
      variables: {
        id: -1,
      },
      onCompleted: (data) => {
        setStudentIds(data.GetConsultantStudentsByDefinitionId);
      },
      fetchPolicy: "no-cache",
      skip: true,
    }
  );

  const closeDialog = () => {
    setStudentDialogOpen(false);
  };
  const closeStudentStatusDialog = () => {
    setStudentStatusDialogOpen(false);
  };

  const closeTimeSpliterDialog = () => {
    setTimeSpliterDialogOpen(false);
  };

  const refreshConsultantDefinition = () => {
    refetch();
  };
  const [deleteConsultantTimeTableStudentId] = useMutation(
    DELETE_CONSULTANTN_DEFINITION_STUDENT_ID
  );

  const [deleteOneSessionTimeTable] = useMutation(
    DELETE_ONE_SESSION_OF_TIME_TABLE
  );

  const searchMaper = (input: SearchData) => {
    return {
      consultant_id: input?.consultant_id
        ? Number(input.consultant_id)
        : undefined,
      target_date: input?.target_date
        ? moment(input.target_date).format("YYYY-MM-DD")
        : current_date,
    };
  };

  const [copyStudentToNextWeek] = useMutation(COPY_STUDENT_TO_NEXT_WEEK);

  const handleSearch = (searchData: SearchData): void => {
    setSearchLoading(true);
    setSearch({ ...searchData });
    const refetchData: SearchData = { ...searchData };

    refetch(searchMaper(refetchData)).then(() => {
      setSearchLoading(false);
    });
  };

  const handleAddStudent = (defenitionId: string) => {
    refetchConsultantStudentsByDefinitionId({
      id: +defenitionId,
    }).then((res) => {
      //console.log("res is " ,res);
    });

    setDialogConsultantTimeTableId(defenitionId);
    setStudentDialogOpen(true);
  };

  const handleAddStudentStatus = (defenitionId: string,consultant_id: string) => {
    
    setConsId(consultant_id);
    setDialogConsultantTimeTableId(defenitionId);
    setStudentStatusDialogOpen(true);
  };

  const splitTimeHandler = (defenitionId: string) => {
    setDialogConsultantTimeTableId(defenitionId);
    setTimeSpliterDialogOpen(true);
  };

  const [ConsultantTimeTableStudentStatus] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );

  const changeStudentStatus = (
    id: string,
    student_id: string,
    student_status: string
  ) => {
    ConsultantTimeTableStudentStatus({
      variables: {
        id: id,
        student_id: student_id,
        student_status: student_status,
      },
    }).then(() => {
      showSuccess("وضعیت دانش آموز با موفقیت به تاخیر تغییر کرد.");
      refetch();
      setStudentStatus(student_status);
      //showPreviousWeekBeforeRefresh();
    });
  };

  const consultantRedirect = (consultant_id: number | undefined) => {
    navigate("/consultant/" + consultant_id + "/select-one");
  };

  useLayoutEffect(() => {
    setWidth((ref as any).current.offsetWidth - 20 || "300px");
  }, []);
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <SearchAllConsultantTimes
        callBack={handleSearch}
        disabled={searchLoading}
      />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {studentDialogOpen && (
          <ComponentStudentDialog
            studentIdsOfOneConsultant={studentIds}
            consultantTimeTableId={dialogconsultantTimeTableId}
            refreshData={refreshConsultantDefinition}
            openDialog={studentDialogOpen}
            closeDialog={closeDialog}
          />
        )}

        {studentStatusDialogOpen && (
          <StudentStatusComponent
            consultantTimeTableId={dialogconsultantTimeTableId}
            consultantId={consId}
            refreshData={refreshConsultantDefinition}
            openStudentStatusDialog={studentStatusDialogOpen}
            closeStudentStatusDialog={closeStudentStatusDialog}
          />
        )}
        {timeSpliterDialogOpen && (
          <TimeSpliterDialog
            definitionId={dialogconsultantTimeTableId}
            refreshData={refreshConsultantDefinition}
            openTimeSpliterDialog={timeSpliterDialogOpen}
            closeTimeSplietrDialog={closeTimeSpliterDialog}
          />
        )}
        {searchLoading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="customized table" sx={{ maxWidth: "100%" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    width="50"
                    sx={{
                      fontSize: 25,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    مشاوران{" "}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      fontSize: 25,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                    ref={ref}
                  >
                    {" "}
                    برنامه روزانه مشاور
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeTable.map(
                  (element: getConsultantsTimeShowData, index: number) => (
                    <TableRow key={index}>
                      <StyledTableCell align="center">
                        <Box
                          className="dateOfWeekString"
                          onClick={() =>
                            consultantRedirect(element.consultant?.id)
                          }
                        >                         
                          <span> </span>
                          {element.consultant?.first_name}
                          {"    "}
                          {element.consultant?.last_name} {"    "}
                          <span></span>
                          <span></span>
                          <span></span>                        

                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: width,
                            overflowX: "scroll",
                          }}
                        >
                          {element.details?.map(
                            (detail: detailsData, index_details: number) => (
                              <Box key={index_details}>
                                <Box
                                  sx={{
                                    border: 1,
                                    borderColor: "#0288d1",
                                    fontSize: 18,
                                    fontWeight: 800,
                                    textAlign: "left",
                                    backgroundColor: "white",
                                    color: "#0288d1",
                                    borderRadius: "5px",
                                    boxShadow: 3,
                                    display: "inline-block",
                                    ustifyContent: "flex-end",
                                    alignItems: "flex-end",
                                    p: 1,
                                    width: 160,
                                    m: 1,
                                    direction: "rtl",
                                    whiteSpace: "pre-wrap",
                                  }}
                                  id={detail.id + "-" + detail.start_hour}
                                >
                                  {detail.end_hour}-{detail.start_hour}
                                  <VerticalSplitIcon
                                    sx={{
                                      textAlign: "right",
                                      // border: 1,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => splitTimeHandler(detail.id)}
                                  />
                                </Box>

                                <Box
                                  sx={convertStudentStatusTheme(
                                    detail?.student_status
                                  )}
                                  key={index_details}
                                >
                                  <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <Button
                                      startIcon={
                                        <PersonAddAlt1Icon
                                          sx={{ textAlign: "right" }}
                                        />
                                      }
                                      sx={{
                                        color: "black",
                                        fontSize: 13,
                                        fontWeight: 800,
                                        textAlign: "right",
                                      }}
                                      onClick={() =>
                                        handleAddStudent(detail.id)
                                      }
                                    >
                                      {" "}
                                      {detail?.branchClassRoom_name}
                                    </Button>
                                    {/* <StudentStatusComponent
                                  consultantTimeTableId={detail.id}                                  
                                  refreshData={refreshStudent}
                                /> */}

                                    {detail?.student_id ? (
                                      <Button
                                        startIcon={
                                          <ManageAccountsIcon
                                            sx={{ textAlign: "left" }}
                                          />
                                        }
                                        sx={{
                                          color: "black",
                                          fontSize: 13,
                                          fontWeight: 800,
                                          textAlign: "left",
                                        }}
                                        onClick={() =>
                                          handleAddStudentStatus(detail.id,String(element.consultant?.id))
                                        }
                                      >
                                        {" "}
                                      </Button>
                                    ) : null}
                                  </Box>

                                  {detail?.student_id ? (
                                    <Box>
                                      {/* <Box>
                                    کلاس : {detail.branchClassRoom_name}
                                  </Box> */}
                                      <Box
                                        sx={{
                                          fontWeight: 800,
                                          pl: 1,
                                        }}
                                      >
                                        {detail?.student?.first_name}{" "}
                                        {detail?.student?.last_name}
                                      </Box>
                                      {/* <Box>
                                    ثبت نامی :{" "}
                                    {detail?.student?.is_academy_student === 1
                                      ? " آکادمی"
                                      : "جذب"}{" "}
                                  </Box> */}
                                      <Box
                                        sx={{
                                          fontWeight: 800,
                                          pl: 1,
                                        }}
                                      >
                                        <ShowPhone
                                          phone={detail?.student?.phone}
                                        />
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        mt={1}
                                      >
                                        <Button
                                          color="success"
                                          variant="contained"
                                          sx={{
                                            fontSize: 13,
                                          }}
                                          onClick={() => {
                                            ConsultantTimeTableStudentStatus({
                                              variables: {
                                                id: detail.id,
                                                student_id: detail.student_id,
                                                student_status: "present",
                                              },
                                            }).then(() => {
                                              showSuccess(
                                                "وضعیت دانش آموز با موفقیت به حاضر تغییر کرد."
                                              );
                                              refetch();
                                            });
                                          }}
                                        >
                                          {"حاضر "}
                                        </Button>
                                        <Button
                                          color="warning"
                                          variant="contained"
                                          sx={{
                                            fontSize: 13,
                                          }}
                                          onClick={() => {
                                            ConsultantTimeTableStudentStatus({
                                              variables: {
                                                id: detail.id,
                                                student_id: detail.student_id,
                                                student_status: "absent",
                                              },
                                            }).then(() => {
                                              showSuccess(
                                                "وضعیت دانش آموز با موفقیت به غایب تغییر کرد."
                                              );
                                              refetch();
                                            });
                                          }}
                                        >
                                          {"غایب "}
                                        </Button>
                                      </Box>
                                      <Box>
                                        <FormControl
                                          sx={{
                                            mt: 2,

                                            backgroundColor: "white",
                                            width: "100%",
                                          }}
                                        >
                                          <Select
                                            sx={{
                                              height: 35,
                                              backgroundColor: "white",
                                              width: "100%",
                                              fontSize: 13,
                                            }}
                                            labelId="week-label"
                                            id="week-select"
                                            // value={detail?.student_status}
                                            // onClick={(e) => {
                                            //   ConsultantTimeTableStudentStatus({
                                            //     variables: {
                                            //       id: detail.id,
                                            //       student_id: detail.student_id,
                                            //       student_status: e,
                                            //     },
                                            //   }).then(() => {
                                            //     showSuccess(
                                            //       "وضعیت دانش آموز با موفقیت به تاخیر تغییر کرد."
                                            //     );
                                            //     refetch();
                                            //   });
                                            // }}
                                            value={detail.student_status}
                                            onChange={(e) => {
                                              changeStudentStatus(
                                                detail.id,
                                                detail.student_id,
                                                e.target.value
                                              );
                                              // alert(detail.id);
                                              // alert(detail.student_id);
                                              // setStudentStatus(e.target.value);
                                            }}
                                            input={<OutlinedInput />}
                                          >
                                            <MenuItem value=""></MenuItem>

                                            <MenuItem value="dellay5">
                                              تاخیر ۵ دقیقه{" "}
                                            </MenuItem>
                                            <MenuItem value="dellay10">
                                              تاخیر ۱۰ دقیقه
                                            </MenuItem>
                                            <MenuItem value="dellay15">
                                              تاخیر ۱۵ دقیقه
                                            </MenuItem>
                                            <MenuItem value="dellay15more">
                                              تاخیر بیشتر از ۱۵ دقیقه
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Box>

                                      {detail?.student_id ? (
                                        <Box
                                          display={"flex"}
                                          justifyContent={"space-between"}
                                        >
                                          <Button
                                            color="error"
                                            variant="contained"
                                            onClick={() => {
                                              showConfirm(async () =>
                                                deleteConsultantTimeTableStudentId(
                                                  {
                                                    variables: {
                                                      id: detail.id,
                                                    },
                                                  }
                                                ).then(() => {
                                                  showSuccess(
                                                    "حذف با موفقیت انجام شد."
                                                  );
                                                  refetch();
                                                })
                                              );
                                            }}
                                            sx={{
                                              mt: 2,
                                              fontSize: 13,
                                            }}
                                          >
                                            {" حذف "}
                                          </Button>
                                         
                                          <Button
                                            color="info"
                                            variant="contained"
                                            disabled={detail.copy_to_next_week}
                                            onClick={() => {
                                              showConfirm(async () =>
                                                copyStudentToNextWeek({
                                                  variables: {
                                                    id: detail.id,
                                                  },
                                                }).then(() => {
                                                  showSuccess(
                                                    "کپی با موفقیت انجام شد."
                                                  );
                                                  refetch();
                                                })
                                              );
                                            }}
                                            sx={{
                                              mt: 2,
                                              fontSize: 13,
                                            }}
                                          >
                                            {"کپی"}
                                          </Button>
                                         
                                        </Box>
                                      ) : null}

                                      <Box>
                                        <Switch
                                          checked={
                                            detail.single_meet === true
                                              ? detail.single_meet
                                              : false
                                          }
                                          size="small"
                                          onClick={() => {
                                            //alert(detail.single_meet);
                                            ConsultantTimeTableStudentStatus({
                                              variables: {
                                                id: detail.id,
                                                student_id: detail.student_id,
                                                single_meet:
                                                  !detail.single_meet,
                                              },
                                            }).then(() => {
                                              showSuccess(
                                                "وضعیت  تک جلسه تغییر کرد."
                                              );
                                              refetch();
                                              // showPreviousWeekBeforeRefresh();
                                            });
                                          }}
                                        />{" "}
                                        تک جلسه{" "}
                                      </Box>
                                      <Box>
                                        <Switch
                                          checked={
                                            detail.remote === true
                                              ? detail.remote
                                              : false
                                          }
                                          size="small"
                                          onClick={() => {
                                            //alert(detail.remote);
                                            ConsultantTimeTableStudentStatus({
                                              variables: {
                                                id: detail.id,
                                                student_id: detail.student_id,
                                                remote: !detail.remote,
                                              },
                                            }).then(() => {
                                              showSuccess(
                                                "وضعیت  تک جلسه تغییر کرد."
                                              );
                                              refetch();
                                            });
                                          }}
                                        />{" "}
                                        غیر حضوری{" "}
                                      </Box>
                                      {detail?.user_student_status_full_name ? (
                                        <Box>
                                          {"کاربر ثبت کننده: "}
                                          {
                                            detail.user_student_status_full_name
                                          }{" "}
                                          {"  "}
                                          <Box
                                            sx={{
                                              direction: "rtl",
                                            }}
                                          >
                                            {detail?.student_status_updated_at
                                              ? momentj(
                                                  detail.student_status_updated_at
                                                ).format("jYYYY/jMM/jDD-HH:mm")
                                              : null}
                                          </Box>
                                          {/* {detail?.student_status_updated_at} */}
                                        </Box>
                                      ) : null}
                                    </Box>
                                  ) : (
                                    <Button
                                      color="error"
                                      variant="outlined"
                                      onClick={() => {
                                        showConfirm(async () =>
                                          deleteOneSessionTimeTable({
                                            variables: {
                                              id: detail.id,
                                            },
                                          }).then(() => {
                                            showSuccess(
                                              "حذف  جلسه با موفقیت انجام شد."
                                            );
                                            refetch();
                                          })
                                        );
                                      }}
                                      sx={{
                                        mt: 2,
                                        fontSize: 13,
                                      }}
                                    >
                                      {" حذف جلسه  "}
                                    </Button>
                                  )}
                                </Box>
                              </Box>
                            )
                          )}
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            ></Box>
          </TableContainer>
        )}
      </Container>
    </Paper>
  );
};
export default ShowAllConsultantsTimes;
