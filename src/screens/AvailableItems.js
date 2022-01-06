import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import AvailableItemComponent from '../components/AvailableItemComponent';
import {AppStyles} from '../utils/AppStyles';
import {CommontStyles} from '../utils/CommonStyles';
import {APP_CONSTANTS} from '../utils/Constants';

class AvailableItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[CommontStyles.baseContainer, styles.baseContainer]}>
        <SafeAreaView style={CommontStyles.safeAreaContainer} />
        <AvailableItemComponent />
      </View>
    );
  }
}

export default AvailableItems;
const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: AppStyles.color.greyLight,
  },
});
