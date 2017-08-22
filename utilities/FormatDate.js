import Moment from 'moment';

import { DateFormat } from '../constants';

/**
 * Format a date to a desired format.
 * @param  {string} date          Date to be formatted
 * @param  {string} currentFormat Current format of date being passed in
 * @param  {string} desiredFormat Desired format of date
 * @return {string}               Formatted date
 */
export default function formatDate(date, currentFormat, desiredFormat) {
  const dateFormat = desiredFormat
    ? desiredFormat
    : DateFormat.standardDateFormat;

  return Moment(date, currentFormat).format(dateFormat);
}
