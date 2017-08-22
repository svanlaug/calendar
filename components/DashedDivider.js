import React from 'react';
import { View } from 'react-native';

import { Colors } from '../constants';

const DatePicker = () => {
  return <View style={styles.dashedDivider} />;
};

const styles = {
  dashedDivider: {
    width: 1,
    borderColor: Colors.lightGrey,
    borderWidth: 0.5,
    borderStyle: 'dashed',
  },
};

export default DatePicker;
