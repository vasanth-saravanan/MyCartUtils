import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, Image} from 'react-native';
import {Title} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AppStyles} from '../utils/AppStyles';
import {CommontStyles} from '../utils/CommonStyles';
import StarRating from 'react-native-star-rating';
import AppBarComponent from '../components/AppBarComponent';
import {APP_CONSTANTS} from '../utils/Constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoanedItems from './LoanedItems';
import AvailableItems from './AvailableItems';
import {Images} from '../utils/Images';

const Tab = createMaterialTopTabNavigator();
class MyCloset extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommontStyles.baseContainer}>
        <SafeAreaView style={CommontStyles.safeAreaContainer} />
        <AppBarComponent
          title={APP_CONSTANTS.mycloset}
          navigation={this.props.navigation}
        />
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View
              style={[
                CommontStyles.baseContainer,
                CommontStyles.flexDirectionRow,
              ]}>
              <View style={styles.imageContainer}>
                <Image source={Images.sample} style={styles.image} />
              </View>

              <View style={styles.bodyContainer}>
                <Title style={styles.userName}>Maud Garrett</Title>
                <Text style={styles.userId}>#12345</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.bodyContainer}>
                <Title style={styles.ratingText}>Your Rating:</Title>
                <View style={styles.starContainer}>
                  <Text style={styles.rating}>4.1</Text>
                  <StarRating
                    fullStarColor={AppStyles.color.yellowLight}
                    emptyStarColor={AppStyles.color.yellowLight}
                    disabled={true}
                    maxStars={5}
                    rating={4.1}
                    starSize={18}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container, CommontStyles.paddingBottom10]}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>Total Items:</Text>
              <Text style={styles.itemCount}>
                {this.props.data.loanedData.length +
                  this.props.data.availableData.length}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>Pending:</Text>
              <Text style={styles.itemCount}>0</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>Loaned:</Text>
              <Text style={styles.itemCount}>
                {this.props.data.loanedData.length}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>Available:</Text>
              <Text style={styles.itemCount}>
                {this.props.data.availableData.length}
              </Text>
            </View>
          </View>
        </View>
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: false,
            tabBarActiveTintColor: AppStyles.color.secondry,
            tabBarLabelStyle: styles.label,
            tabBarIndicatorStyle: styles.indicator,
            tabBarStyle: styles.tabBarOptions,
          }}
          initialRouteName={'LoanedItems'}
          backBehavior={'initialRoute'}>
          <Tab.Screen
            name="LoanedItems"
            component={LoanedItems}
            options={{tabBarLabel: 'LOANED ITEMS'}}
          />
          <Tab.Screen
            name="AvailableItems"
            component={AvailableItems}
            options={{
              tabBarLabel: 'AVAILABLE ITEMS',
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: {...state},
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyCloset);
const styles = StyleSheet.create({
  indicator: {
    backgroundColor: AppStyles.color.primary,
    paddingBottom: 5,
  },
  label: {
    fontFamily: 'ArquitectaHeavy',
    fontSize: 15,
  },
  tabBarOptions: {
    backgroundColor: AppStyles.color.white,
    color: AppStyles.color.white,
    elevation: 3,
  },
  wrapper: {
    paddingTop: 10,
    backgroundColor: AppStyles.color.white,
  },
  container: {
    paddingHorizontal: 13,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: AppStyles.color.white,
  },
  imageContainer: {
    borderRadius: 100,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  bodyContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  userName: {
    fontFamily: 'ArquitectaHeavy',
    fontSize: 20,
  },
  userId: {
    color: AppStyles.color.greyDark,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 15,
  },
  ratingText: {
    color: AppStyles.color.greyDark,
    fontFamily: 'Arquitecta',
    fontSize: 14,
    textAlign: 'right',
  },
  rating: {
    color: AppStyles.color.greyDark,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 18,
    marginRight: 5,
  },
  ratingContainer: {
    flex: 0.7,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemContainer: {
    marginRight: 15,
  },
  itemName: {
    color: AppStyles.color.greyDark,
    marginBottom: 5,
    fontSize: 13,
  },
  itemCount: {
    color: AppStyles.color.secondry,
    fontFamily: 'Arquitecta',
    fontSize: 18,
  },
});
