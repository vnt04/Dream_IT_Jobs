import { formatDistanceToNow, differenceInDays } from "date-fns";
import { vi } from "date-fns/locale";

export const calculateDaysAgo = (timeCreated) => {
  return formatDistanceToNow(new Date(timeCreated.$date || timeCreated), {
    addSuffix: true,
    locale: vi,
  });
};

export const calculateDayNumber = (timeCreated) => {
  return differenceInDays(
    new Date(),
    new Date(timeCreated.$date || timeCreated)
  );
};

export const formatCurrency = (number) => {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const getRows = (original, number) => {
  const rows = [];
  for (let i = 0; i < original?.length; i += number) {
    rows.push(original.slice(i, i + number));
  }
  return rows;
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export const compareDate = (date1, date2) => {
  return parseDate(date2) - parseDate(date1);
};
