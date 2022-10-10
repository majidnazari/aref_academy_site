import { useQuery } from "@apollo/client";
import PaginatorInfo from "interfaces/paginator-info.interface";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE_LIST } from "./gql/query";

const JuryScreen = () => {
  const params = useParams<string>();
  const courseId: number = Number(params.courseId);
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
  const [list, setList] = useState<any[]>([]);

  const { fetchMore, refetch } = useQuery(
    GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE_LIST,
    {
      variables: {
        course_id: courseId,
        first: process.env.REACT_APP_USERS_PER_PAGE
          ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
          : 10,
        page: 1,
      },
      onCompleted: (data) => {
        setPageInfo(data.getCourseStudentsWithAbsencePresence.paginatorInfo);
        setList(data.getCourseStudentsWithAbsencePresence.data);
      },
      fetchPolicy: "no-cache",
    }
  );
  return <></>;
};
export default JuryScreen;
