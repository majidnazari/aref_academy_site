import { useEffect, useState } from "react";

const replaceAt = function (input: string, index: number, replacement: string) {
  const out =
    input.substring(0, index) +
    replacement +
    input.substring(index + replacement.length);
  return out;
};

const transformToStart = (phone: string): string => {
  let tmp = replaceAt(phone, 4, "*");
  tmp = replaceAt(tmp, 5, "*");
  tmp = replaceAt(tmp, 6, "*");
  tmp = replaceAt(tmp, 7, "*");
  return tmp;
};

const ShowPhone = ({ phone }: { phone: string }) => {
  const [finalPhone, setFinalPhone] = useState<string>("");

  useEffect(() => {
    setFinalPhone(transformToStart(phone));
  }, [phone]);
  return (
    <div
      onMouseEnter={() => {
        setFinalPhone(phone);
      }}
      onMouseLeave={() => {
        setFinalPhone(transformToStart(phone));
      }}
      style={{ direction: "ltr" }}
    >
      {finalPhone}
    </div>
  );
};
export default ShowPhone;
