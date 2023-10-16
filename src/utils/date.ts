export const convertDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setSeconds(0);
  return date.toISOString();
}