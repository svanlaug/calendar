import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Images, Layout } from '../constants';

const NavigationBar = props => {
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity activeOpacity={Layout.buttonActiveOpacity}>
        <Image source={Images.backArrowIcon} />
      </TouchableOpacity>
      {(props.moveInDate || props.moveOutDate) &&
        <TouchableOpacity
          onPress={() => props.onPressClearButton()}
          activeOpacity={Layout.buttonActiveOpacity}
        >
          <Text style={styles.clearButtonText}>
            {props.moveInDate && props.moveOutDate ? 'Clear all' : 'Clear'}
          </Text>
        </TouchableOpacity>}
    </View>
  );
};

const statusBarHeight = 20;
const styles = {
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 64,
    paddingTop: statusBarHeight,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  clearButtonText: {
    fontSize: 16,
    color: Colors.white,
    backgroundColor: Colors.transparent,
    marginTop: 2,
  },
};

export default NavigationBar;
