import React from 'react';
import { Text, View } from 'react-native';

import { Colors } from '../constants';

const WeekdayHeader = () => {
  return (
    <View style={styles.weekdayHeader}>
      {weekdayNames.map((day, index) =>
        <Text key={index} style={styles.weekday}>
          {day}
        </Text>
      )}
    </View>
  );
};

const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const styles = {
  weekdayHeader: {
    height: 40,
    marginTop: 18,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: Colors.semiTransparentWhite,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  weekday: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
    backgroundColor: Colors.transparent,
  },
};

export default WeekdayHeader;
