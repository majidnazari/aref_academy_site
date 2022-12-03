const FinancialRefusedStatus = ({
  financial_refused_status,
}: {
  financial_refused_status: string | null;
}) => {
  let out = "--";
  switch (financial_refused_status) {
    case "noMoney":
      out = "عدم برگشت وجه";
      break;
    case "withMoney":
      out = "برگشت وجه";
      break;
    default:
      break;
  }
  return <>{out}</>;
};

export default FinancialRefusedStatus;
