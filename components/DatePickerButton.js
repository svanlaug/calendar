import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

import { DateFormat } from '../constants';
import { validateDateRange } from '../utilities';

export default class DatePickerButton extends React.Component {
  /**
   * Get style for datepicker button.
   * @param  {string} typeOfDate  'Move-In' or 'Move-Out'
   * @return {object}             Style object
   */
  getButtonStyle(typeOfDate) {
    if (typeOfDate === 'Move-In') {
      return styles.moveInButton;
    } else if (typeOfDate === 'Move-Out') {
      return styles.moveOutButton;
    }
  }

  /**
   * Show Alert dialog with alert message. Timeout is used to allow the datePicker modal to close before showing the alert due to:
   * https://github.com/facebook/react-native/issues/10471
   * @param  {string} alertMessage Context specific alert message
   */
  showAlertDialog(alertMessage) {
    setTimeout(() => {
      Alert.alert(alertMessage);
    }, 600);
  }

  /**
   * Checks if datepicker input is valid and if so updates the date
   * @param  {string} date
   * @param  {string} typeOfDate 'Move-In' or 'Move-Out'
   */
  updateDateIfValid(date, typeOfDate) {
    const isDateBlocked = this.props.blockedPeriods.some(blockedPeriod => {
      return Moment(date).isBetween(
        blockedPeriod.start,
        blockedPeriod.end,
        null,
        '[]'
      );
    });

    if (isDateBlocked) {
      this.showAlertDialog(
        'The date you picked is blocked. Please select another one!'
      );
    } else {
      let moveIn, moveOut;
      if (typeOfDate === 'Move-In') {
        moveIn = date;
        moveOut = this.props.moveOutDate;
      } else {
        moveIn = this.props.moveInDate;
        moveOut = date;
      }

      if (moveIn && moveOut) {
        const validation = validateDateRange(
          Moment(moveIn),
          Moment(moveOut),
          this.props.minimumDuration,
          this.props.blockedPeriods
        );
        if (validation.valid) {
          this.setDate(date, typeOfDate);
        } else {
          this.showAlertDialog(validation.error);
        }
      } else {
        this.setDate(date, typeOfDate);
      }
    }
  }

  /**
   * Update move-in / move-out date
   * @param {string} date
   * @param {string} typeOfDate
   */
  setDate(date, typeOfDate) {
    this.props.setDate(date, this.props.typeOfDate);
  }

  render() {
    return (
      <DatePicker
        style={[styles.button, this.getButtonStyle(this.props.typeOfDate)]}
        date={this.props.moveDate}
        mode="date"
        placeholder={this.props.typeOfDate}
        format={DateFormat.datePickerDisplayFormat}
        minDate={this.props.minimumMoveInDate}
        confirmBtnText="Done"
        titleText={`${this.props.typeOfDate} Date`}
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            borderWidth: 0,
          },
        }}
        showIcon={false}
        onDateChange={(dateDisplay, dateString) =>
          this.updateDateIfValid(dateString, this.props.typeOfDate)}
      />
    );
  }
}

const styles = {
  button: {
    height: 56,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveInButton: {
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  moveOutButton: {
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
  },
};
