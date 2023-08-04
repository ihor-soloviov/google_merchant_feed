import moment from "moment";

export const getNewestFile = (files) => {
  return files.reduce((prev, current) => {
    const prevDateStr = prev.split(".")[0];
    const currentDateStr = current.split(".")[0];
    const prevDate = moment(prevDateStr, "DDMMYYYY-HHmmss_SSS");
    const currentDate = moment(currentDateStr, "DDMMYYYY-HHmmss_SSS");
    return currentDate.isAfter(prevDate) ? current : prev;
  });
};
