const FinancialRefusedStatus = ({
  financial_refused_status,
}: {
  financial_refused_status: string | null;
}) => {
  let out = "--";
  switch (financial_refused_status) {
    case "noMoney":
      out = "پرداختی نداشته است";
      break;
    case "not_returned":
      out = "عدم برگشت وجه";
      break;
    case "returned":
      out = "برگشتی داشته است";
      break;
    default:
      break;
  }
  return <>{out}</>;
};

export default FinancialRefusedStatus;
