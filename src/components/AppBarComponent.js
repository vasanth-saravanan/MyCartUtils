import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Title} from 'react-native-paper';
import {AppStyles} from '../utils/AppStyles';
import {AvatarIconStyle, CommontStyles} from '../utils/CommonStyles';

class AppBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.appBar}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Avatar.Icon
              icon="play"
              size={40}
              color={AppStyles.color.primary}
              style={[AvatarIconStyle.transparent, styles.backIon]}
            />
          </TouchableOpacity>
          <View style={CommontStyles.baseContainer}>
            <Title style={styles.title}>{this.props.title}</Title>
          </View>
        </View>
      </View>
    );
  }
}

export default AppBarComponent;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: AppStyles.color.white,
    borderBottomWidth: 1.5,
    borderBottomColor: AppStyles.color.greyLight,
  },
  headerLeftContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backIon: {
    transform: [{rotateY: '180deg'}],
    position: 'absolute',
  },
  title: {
    color: AppStyles.color.secondry,
    fontFamily: 'ArquitectaHeavy',
    alignSelf: 'center',
  },
});
