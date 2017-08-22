export default {
  /**
   * Get calendar configuration from a dummy backend
   * @return {Promise}  A promise resolving with an object containing calendar configuration
   */
  getCalendarConfiguration() {
    return Promise.resolve({
      minimum_move_in: '2017-08-30',
      minimum_duration: 30,
      blocked_periods: [
        {
          start: '2018-10-30',
          end: '2019-01-01',
        },
      ],
    });
  },

  /**
   * Post the move in and move out to a dummy backend and log it to the console
   * @param  {object} data
   * @return {Promise}
   */
  postToBackend(data) {
    console.log('posting', data);
    return Promise.resolve();
  },
};
