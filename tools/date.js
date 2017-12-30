export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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