import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import LoanedItemComponent from '../components/LoanedItemComponent';
import {AppStyles} from '../utils/AppStyles';
import {CommontStyles} from '../utils/CommonStyles';
import {APP_CONSTANTS} from '../utils/Constants';

class LoanedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[CommontStyles.baseContainer, styles.baseContainer]}>
        <SafeAreaView style={CommontStyles.safeAreaContainer} />
        <LoanedItemComponent />
      </View>
    );
  }
}

export default LoanedItems;
const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: AppStyles.color.greyLight,
  },
});
