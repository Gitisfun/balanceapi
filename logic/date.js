import dayjs from "dayjs";

class DateHelper {
  static getDaysInWeek(date) {
    let startDate = dayjs(date).startOf("week");
    const list = [];
    startDate = startDate.add(1, "day");
    for (let i = 1; i <= 7; i++) {
      list.push(startDate.format("YYYY-MM-DD"));
      startDate = startDate.add(1, "day");
    }

    return list;
  }

  static getDaysInMonth(date) {
    let startDate = dayjs(date).startOf("month");
    const list = [];
    const length = startDate.daysInMonth();
    for (let i = 1; i <= length; i++) {
      list.push(startDate.format("YYYY-MM-DD"));
      startDate = startDate.add(1, "day");
    }

    return list;
  }
  static getStartOfWeek(date) {
    if (date) {
      const start = dayjs(date).startOf("week");
      const temp = start.add("1", "day");
      return temp.format("YYYY-MM-DD");
    }
    return null;
  }

  static getEndOfWeek(date) {
    if (date) {
      const start = dayjs(date).endOf("week");
      const temp = start.add("1", "day");
      return temp.format("YYYY-MM-DD");
    }
    return null;
  }

  static getMonth(date) {
    if (date) return dayjs(date).month() + 1;
    return null;
  }

  static getYear(date) {
    if (date) return dayjs(date).year();
    return null;
  }
}

export default DateHelper;
