import React from 'react';
import { Alert, StatusBar, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { LinearGradient } from 'expo';
import Moment from 'moment';

import { Colors, DateFormat } from './constants';
import {
  ApplyButton,
  DashedDivider,
  DatePickerButton,
  NavigationBar,
  WeekdayHeader,
} from './components';
import { Api, formatDate, getCalendarDateRange } from './utilities';

export default class App extends React.Component {
  state = {
    applyButtonVisible: false,
    minimumMoveInDate: Moment()
      .add(1, 'days')
      .format(DateFormat.standardDateFormat),
    moveInDate: undefined,
    moveOutDate: undefined,
    bookedDates: undefined,
  };

  componentWillMount() {
    Api.getCalendarConfiguration().then(config => {
      this.setState({
        minimumMoveInDate: Moment(config.minimum_move_in).format(
          DateFormat.standardDateFormat
        ),
        minimumDuration: config.minimum_duration,
        blockedPeriods: config.blocked_periods,
      });
    });
  }

  onPressClearButton() {
    this.setState({
      moveInDate: undefined,
      moveOutDate: undefined,
      bookedDates: undefined,
      applyButtonVisible: false,
    });
  }

  /**
   * Show Alert dialog with alert message. Timeout is used to allow the apply button modal to close before showing the alert due to:
   * https://github.com/facebook/react-native/issues/10471
   * @param  {string} message
   */
  showAlertDialog(message) {
    setTimeout(() => {
      Alert.alert(message);
    }, 600);
  }

  /**
   * Build object with move-in and move-out dates and POST it to a dummy backend
   */
  applyDates() {
    const data = {
      move_in: formatDate(this.state.moveInDate),
      move_out: formatDate(this.state.moveOutDate),
    };
    return Api.postToBackend(data).then(() => {
      this.showAlertDialog('Booking Successful!');
    });
  }

  onPressApplyButton() {
    this.applyDates();
    this.setState({ applyButtonVisible: false });
  }

  /**
   * Update move-in / move-out date and mark it in the calendar
   * @param {string} date
   * @param {string} type 'Move-in' or 'Move-Out'
   */
  setDate(date, type) {
    switch (type) {
      case 'Move-In':
        this.setState(
          {
            moveInDate: date,
          },
          () => this.markDaysInCalendar()
        );
        break;
      case 'Move-Out':
        this.setState(
          {
            moveOutDate: date,
          },
          () => this.markDaysInCalendar()
        );
        break;
      default:
        break;
    }
  }

  markDaysInCalendar() {
    const { moveInDate, moveOutDate } = this.state;

    if (!moveInDate || !moveOutDate) {
      this.setState({
        bookedDates: getCalendarDateRange(
          formatDate(moveInDate || moveOutDate),
          false
        ),
      });
    } else {
      this.setState({
        applyButtonVisible: true,
        bookedDates: getCalendarDateRange(
          formatDate(moveInDate),
          formatDate(moveOutDate)
        ),
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ApplyButton
          visible={this.state.applyButtonVisible}
          onPress={() => this.onPressApplyButton()}
        />
        <LinearGradient colors={[Colors.lightBlue, Colors.mediumBlue]}>
          <NavigationBar
            moveInDate={this.state.moveInDate}
            moveOutDate={this.state.moveOutDate}
            onPressClearButton={() => this.onPressClearButton()}
          />
          <View style={styles.datePickerButtonContainer}>
            <DatePickerButton
              moveDate={this.state.moveInDate}
              moveInDate={this.state.moveInDate}
              moveOutDate={this.state.moveOutDate}
              typeOfDate={'Move-In'}
              setDate={(date, type) => this.setDate(date, type)}
              blockedPeriods={this.state.blockedPeriods}
              minimumMoveInDate={new Date(this.state.minimumMoveInDate)}
              minimumDuration={this.state.minimumDuration}
            />
            <DashedDivider />
            <DatePickerButton
              moveDate={this.state.moveOutDate}
              moveInDate={this.state.moveInDate}
              moveOutDate={this.state.moveOutDate}
              typeOfDate={'Move-Out'}
              setDate={(date, type) => this.setDate(date, type)}
              blockedPeriods={this.state.blockedPeriods}
              minimumMoveInDate={new Date(this.state.minimumMoveInDate)}
              minimumDuration={this.state.minimumDuration}
            />
          </View>
          <WeekdayHeader />
          <CalendarList
            minDate={this.state.minimumMoveInDate}
            monthFormat={DateFormat.calendarMonthFormat}
            hideArrows={true}
            hideExtraDays={true}
            firstDay={7}
            scrollEnabled={true}
            pastScrollRange={0}
            theme={{
              calendarBackground: Colors.transparent,
              todayTextColor: Colors.white,
              dayTextColor: Colors.white,
              textDisabledColor: Colors.semiTransparentWhite,
              monthTextColor: Colors.white,
              textMonthFontSize: 18,
              bookedDateColor: Colors.lightYellow,
              bookedDateTextColor: Colors.black,
            }}
            markedDates={this.state.bookedDates}
            markingType={'interactive'}
          />
        </LinearGradient>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  datePickerButtonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 28,
    backgroundColor: Colors.white,
    shadowColor: Colors.transparentBlack,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.4,
  },
};
