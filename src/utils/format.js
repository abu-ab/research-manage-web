import dayjs from "dayjs";

export const formatDate = (val) => {
  return val ? dayjs(val).format("YYYY-MM-DD") : "";
};
