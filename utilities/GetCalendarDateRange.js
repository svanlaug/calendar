import Moment from 'moment';

import { DateFormat } from '../constants';

/**
 * Generate an array that contains all dates for a specified date range
 * @param  {string} start Start date
 * @param  {string} end   End date
 * @return {array}
 */
function buildDateRange(start, end) {
  const startDate = Moment(start);
  const endDate = Moment(end);
  const range = [];
  let currentDate = startDate;

  while (currentDate.isSameOrBefore(endDate, 'day')) {
    range.push(Moment(currentDate));
    currentDate = currentDate.add(1, 'days');
  }

  return range;
}

/**
 * Builds calendar options for a specified date range
 * @param  {string}     startDate
 * @param  {string=}    endDate     optional
 * @return {object}
 */
export default function getCalendarDateRange(startDate, endDate) {
  const dateRange = buildDateRange(startDate, endDate || startDate);
  const dateFormat = DateFormat.standardDateFormat;
  const datesWithOptions = dateRange.map((date, index) => {
    const options = [
      { startingDay: index === 0, endingDay: index === dateRange.length - 1 },
    ];
    return [date, options];
  });

  return datesWithOptions.reduce((accumulator, [date, options]) => {
    accumulator[date.format(dateFormat)] = options;
    return accumulator;
  }, {});
}
