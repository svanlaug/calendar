import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modalbox';

import { Colors, Layout } from '../constants';

const ApplyButton = props => {
  return (
    <Modal
      style={styles.modal}
      backdrop={true}
      backdropOpacity={0}
      position={'bottom'}
      isOpen={props.visible}
      backButtonClose={true}
      swipeToClose={false}
    >
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={styles.applyButton}
        activeOpacity={Layout.buttonActiveOpacity}
      >
        <Text style={styles.applyButtonText}>Apply Dates</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = {
  modal: {
    height: 78,
    width: 200,
    backgroundColor: Colors.transparent,
  },
  applyButton: {
    height: 56,
    width: 200,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.transparentBlack,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
  },
  applyButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
};

export default ApplyButton;
