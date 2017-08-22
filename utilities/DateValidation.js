import Moment from 'moment';

/**
 * Validate that move in date is before move out date
 * @param  {Moment} startDate
 * @param  {Moment} endDate
 * @return {boolean}
 */
function validateDateRangeOrder(startDate, endDate) {
  return startDate.isBefore(endDate, 'day');
}

/**
 * Validate that a specified date range is greater than or equal to minimum duration
 * @param  {Moment} startDate
 * @param  {Moment} endDate
 * @param  {number} minimumDuration
 * @return {boolean}
 */
function validateDateRangeDuration(startDate, endDate, minimumDuration) {
  return endDate.diff(startDate, 'days') >= minimumDuration;
}

/**
 * Validate that a specified date range doesn't include a blocked period
 * @param  {Moment}   startDate
 * @param  {Moment}   endDate
 * @param  {array}    blockedPeriods
 * @return {boolean}
 */
function validateDateRangeBlockedPeriods(startDate, endDate, blockedPeriods) {
  return !blockedPeriods.some(blockedPeriod => {
    if (
      startDate.isBetween(blockedPeriod.start, blockedPeriod.end, null, '[]')
    ) {
      return true;
    }
    if (endDate.isBetween(blockedPeriod.start, blockedPeriod.end, null, '[]')) {
      return true;
    }
    if (
      startDate.isSameOrBefore(blockedPeriod.start) &&
      endDate.isSameOrAfter(blockedPeriod.end)
    ) {
      return true;
    }
    return false;
  });
}

/**
 * Validates a specified date range
 * @param  {Moment}   startDate
 * @param  {Moment}   endDate
 * @param  {number}   minimumDuration
 * @param  {array}    blockedPeriods
 * @return {object}
 */
export default function validateDateRange(
  startDate,
  endDate,
  minimumDuration,
  blockedPeriods
) {
  if (!validateDateRangeOrder(startDate, endDate)) {
    return { valid: false, error: 'Move-In has to be before Move-Out!' };
  }
  if (!validateDateRangeDuration(startDate, endDate, minimumDuration)) {
    return {
      valid: false,
      error: `Minimum duration is ${minimumDuration} days. Please stay longer!`,
    };
  }
  if (!validateDateRangeBlockedPeriods(startDate, endDate, blockedPeriods)) {
    return {
      valid: false,
      error:
        'You selected a date range that has a blocked period. Please select other dates!',
    };
  }
  return {
    valid: true,
  };
}
