import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_A_STUDENT, GET_CONSULTANT_FINANCIALS } from "../gql/query";
import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableBody,
  Button,
  Box,
  Alert,
  Stack,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PaginatorInfo from "interfaces/paginator-info.interface";
import ConsultantFinancialType from "../dto/consultantFinancial.interface";
import CourseName from "components/CourseName";
import StatusIcon from "components/StatusIcon";
import moment from "moment-jalaali";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "components/EditCourseStudentStatus";
import { showSuccess, showConfirm } from "utils/swlAlert";
import FinancialRefusedStatus from "components/FinancialRefusedStatus";
import { useNavigate } from "react-router-dom";
import ConsultantGetEditBox from "./ConsultantGetEditBox";
import EditConsultantFinancialStatus from "./EditAdminConsultantFinancialStatus";
import { getUserData } from "utils/user";
import EditFinancialConsultantFinancialStatus from "./EditFinancialConsultantFinancialStatus";
import EditManagerConsultantFinancialStatus from "./EditManagerConsultantFinancialStatus";
import EditAdminConsultantFinancialStatus from "./EditAdminConsultantFinancialStatus";
import { generateQueryOptions } from "utils/utils";
import { visuallyHidden } from "@mui/utils";

interface EditConsultantFinancial {
  openDialog: boolean;
  consultantFinancial: ConsultantFinancialType;
  key: number;
  id: number;
}

const ConsultantFinancials = () => {
  const { studentId } = useParams<string>();
  const [consultantFinancial, setConsultantFinancial] = useState<
    ConsultantFinancialType[]
  >([]);
  const [
    opensultantFinancialStatusDialog,
    setOpensultantFinancialStatusDialog,
  ] = useState(false);
  const [closeConsultantFinancialDialog, setCloseConsultantFinancialDialog] =
    useState(false);

  const [consultantFinancialId, setConsultantFinancialId] = useState(0);
  const [userType, setUserType] = useState<string>("");

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("created_at");

  const [pageInfo, setPageInfo] = useState<PaginatorInfo>({
    count: 0,
    currentPage: 1,
    firstItem: 0,
    hasMorePages: false,
    lastItem: 0,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });

  const fillConsultantFinancialHandler = (consultant_id: number) => {
    setConsultantFinancialId(consultant_id);
    setOpensultantFinancialStatusDialog(true);
    setCloseConsultantFinancialDialog(false);
  };

  const closeConsultantFinancialDialogHnadler = () => {
    setCloseConsultantFinancialDialog(true);
    setOpensultantFinancialStatusDialog(false);
  };

  const { fetchMore, refetch} = useQuery(GET_CONSULTANT_FINANCIALS, {
    variables: {
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: pageInfo.currentPage,
      ...generateQueryOptions(),
      orderBy: [
        {
          column: "created_at",
          order: "DESC",
        },
      ],
    },
    onCompleted: (data) => {
      setUserType(user.group.name);
      setPageInfo(data.getConsultantFinancials.paginatorInfo);
      setConsultantFinancial(data.getConsultantFinancials.data);
    },
    fetchPolicy: "no-cache",
  });

  const refreshConsultantFinancialHandler = () => {
    refetch();
  };

  const user = getUserData();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const convertNameComponent = (userType: string) => {
    switch (userType) {
      case "admin":
        return (
          <EditAdminConsultantFinancialStatus
            consultantFinancialId={consultantFinancialId}
            refreshData={refreshConsultantFinancialHandler}
            openConsultantFinancialDialog={opensultantFinancialStatusDialog}
            closeConsultantFinancialDialog={
              closeConsultantFinancialDialogHnadler
            }
          />
        );
      case "financial":
        return (
          <EditFinancialConsultantFinancialStatus
            consultantFinancialId={consultantFinancialId}
            refreshData={refreshConsultantFinancialHandler}
            openConsultantFinancialDialog={opensultantFinancialStatusDialog}
            closeConsultantFinancialDialog={
              closeConsultantFinancialDialogHnadler
            }
          />
        );

      default:
        return (
          <EditManagerConsultantFinancialStatus
            consultantFinancialId={consultantFinancialId}
            refreshData={refreshConsultantFinancialHandler}
            openConsultantFinancialDialog={opensultantFinancialStatusDialog}
            closeConsultantFinancialDialog={
              closeConsultantFinancialDialogHnadler
            }
          />
        );
    }
  };

  interface Data {
    student: string;
    branch: string;
    consultant: string;
    financial_refused_status: string;
    student_status: string;
    manager_status: string;
    financial_status: string;
    user_creator: string;
    created_at: string;
    edit?: string;
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    sortable: boolean;
  }

  type Order = "asc" | "desc";

  interface EnhancedTableProps {
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  const headCells: readonly HeadCell[] = [
    {
      id: "branch",
      sortable: false,
      disablePadding: true,
      label: "شعبه",
    },
    {
      id: "consultant",
      sortable: false,
      disablePadding: false,
      label: "مشاور",
    },
    {
      id: "student",
      sortable: false,
      disablePadding: false,
      label: " دانش آموز",
    },
    {
      id: "student_status",
      sortable: true,
      disablePadding: false,
      label: "وضعیت دانش آموز",
    },
    {
      id: "manager_status",
      sortable: true,
      disablePadding: false,
      label: "تایید مدیر",
    },
    {
      id: "financial_status",
      sortable: true,
      disablePadding: false,
      label: "تایید مالی",
    },
    {
      id: "financial_refused_status",
      sortable: false,
      disablePadding: false,
      label: " وضعیت برگشت وجه",
    },
    {
      id: "created_at",
      sortable: true,
      disablePadding: false,
      label: "تاریخ ایجاد",
    },
    {
      id: "edit",
      sortable: false,
      disablePadding: false,
      label: "ویرایش",
    },
  ];

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">ردیف</TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.sortable ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const reloadData = (field: string, order: string) => {
   
    refetch({
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      ...generateQueryOptions(),
      orderBy: [
        {
          column: field,
          order: order,
        },
      ],
    });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {   

    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    reloadData(property, isAsc ? "DESC" : "ASC");
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setConsultantFinancial([]);
    fetchMore({
      variables: {
        first: process.env.REACT_APP_USERS_PER_PAGE
          ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
          : 5,
        page: value,
        orderBy: [
          {
            column: orderBy,
            order: order.toUpperCase(),
          },
        ],
        // first_name: search?.first_name ? search.first_name : undefined,
        // last_name: search?.last_name ? search.last_name : undefined,
        // email: search?.email ? search.email : undefined,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setPageInfo(fetchMoreResult.getConsultantFinancials.paginatorInfo);
        setConsultantFinancial(fetchMoreResult.getConsultantFinancials.data);
      },
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {opensultantFinancialStatusDialog && convertNameComponent(userType)}

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={consultantFinancial.length}
          />
          {/* <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left"> شعبه </StyledTableCell>
              <StyledTableCell align="left"> مشاور </StyledTableCell>
              <StyledTableCell align="left"> دانش آموز </StyledTableCell>
              <StyledTableCell align="left"> وضعیت دانش آموز </StyledTableCell>
              <StyledTableCell align="left">تایید مدیر</StyledTableCell>
              <StyledTableCell align="left">تایید حسابداری</StyledTableCell>
              <StyledTableCell align="left">پس از انصراف</StyledTableCell>
              <StyledTableCell align="left">تاریخ</StyledTableCell>
              <StyledTableCell align="left">ویرایش</StyledTableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {consultantFinancial.map(
              (element: ConsultantFinancialType, index: number) => (
                <StyledTableRow key={element.id}>
                  <StyledTableCell align="left">
                    {pageInfo.perPage * (pageInfo.currentPage - 1) + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element.branch?.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element.consultant?.first_name}{" "}
                    {element.consultant?.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element.student?.first_name} {element.student?.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusIcon status={element.student_status} />
                    <Typography
                      component={"div"}
                      sx={{ fontSize: 9, fontWeight: "bold" }}
                    >
                      {element.user
                        ? element.user?.first_name +
                          " " +
                          element.user?.last_name
                        : null}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusIcon status={element.manager_status} />
                    <Typography
                      component={"div"}
                      sx={{ fontSize: 9, fontWeight: "bold" }}
                    >
                      {element?.manager
                        ? element.manager?.first_name +
                          " " +
                          element.manager?.last_name
                        : null}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusIcon status={element.financial_status} />
                    <Typography
                      component={"div"}
                      sx={{ fontSize: 9, fontWeight: "bold" }}
                    >
                      {element.financial
                        ? element.financial?.first_name +
                          " " +
                          element.financial?.last_name
                        : null}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {/* {element.financial_refused_status} */}
                    <FinancialRefusedStatus
                      financial_refused_status={
                        element.financial_refused_status
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(element.created_at).format("jYYYY/jMM/jDD")}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      size="small"
                      onClick={() => {
                        fillConsultantFinancialHandler(element.id);
                      }}
                      variant="contained"
                      startIcon={<EditIcon />}
                      color="success"
                    >
                      ویرایش
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
        <Stack spacing={5} sx={{ my: 2 }}>
          <Pagination
            count={pageInfo.lastPage}
            page={pageInfo.currentPage}
            onChange={handleChange}
          />
        </Stack>
      </TableContainer>
    </Container>
  );
};
export default ConsultantFinancials;
