export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getDayOfWeek (date) {
  if (date instanceof Date) {
    return DAYS[date.getDay()];
  } else {
    return '';
  }
}

export function getMonthOfYear (date) {
  if (date instanceof Date) {
    return MONTHS[date.getMonth()];
  } else {
    return '';
  }
}

export function getDateFormat (date) {
  if (date instanceof Date) {
    return [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear()
    ].join('/');
  } else {
    return '';
  }
}

export function getFullFormat (date) {
  if (date instanceof Date) {
    return [
      getDayOfWeek(date) + ',',
      getMonthOfYear(date),
      ((date.getDate() > 9)? '' : '0') + date.getDate() + ',',
      date.getFullYear()
    ].join(' ');
  } else {
    return '';
  }
}

export function getNumDayOfMonth (number) {
  if (number < 0 || number > 11) {
    return 0;
  } else if (number === 1) {
    return 29;
  } else if ([3, 5, 8, 10].includes(number)) {
    return 30;
  } else {
    return 31;
  }
}