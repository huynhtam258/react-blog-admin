import dayjs from "dayjs";

export const convertDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setSeconds(0);
  return date.toISOString();
}

export const convertCommonDate = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD HH:mm')
}