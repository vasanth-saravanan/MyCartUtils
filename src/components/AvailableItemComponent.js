import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Title, Avatar} from 'react-native-paper';
import {AppStyles} from '../utils/AppStyles';
import {AvatarIconStyle, CommontStyles} from '../utils/CommonStyles';
import StarRating from 'react-native-star-rating';
import {SwipeListView} from 'react-native-swipe-list-view';
import AvailableData from '../utils/staticData/AvailableData';
import {storeAvailableData, storeLoanedData} from '../redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class AvailableItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.data.availableData.length == 0) {
      let {actions} = this.props;
      actions.storeAvailableData(
        AvailableData.map((item, index) => ({
          key: `${index}`,
          status: item.status,
          image: item.image,
          name: item.name,
          rating: item.rating,
          size: item.size,
          total: item.total,
          startDate: item.startDate,
          endDate: item.endDate,
          sellerName: item.sellerName,
          sellerProfile: item.sellerProfile,
        })),
      );
    }
  }

  render() {
    const VisibleItem = props => {
      const {data, rowHeightAnimatedValue, removeRow, rightActionState} = props;

      if (rightActionState) {
        Animated.timing(rowHeightAnimatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          removeRow();
        });
      }
      return (
        <Animated.View
          style={[styles.container, {height: rowHeightAnimatedValue}]}>
          <View
            style={[
              CommontStyles.baseContainer,
              CommontStyles.flexDirectionRow,
            ]}>
            <Image source={data.item.image} style={styles.image} />
            <View style={styles.bodyContainer}>
              <View style={styles.itemDetailContainer}>
                <Text style={styles.itemName}>{data.item.name}</Text>
                <Text style={styles.brandName}>Brand Name</Text>

                <View style={styles.itemHeadingContainer}>
                  <Text style={styles.currency}>
                    ${data.item.total}
                    {'  '}
                    <Text style={styles.dayText}>Day</Text>
                  </Text>

                  <Text style={[styles.country, {top: 5}]}>US</Text>
                  <Text style={[styles.size, {top: 5}]}>{data.item.size}</Text>
                  <StarRating
                    fullStarColor={AppStyles.color.yellowLight}
                    emptyStarColor={AppStyles.color.yellowLight}
                    disabled={true}
                    maxStars={1}
                    rating={1}
                    starSize={18}
                    starStyle={{top: 5, marginLeft: 5}}
                  />
                  <Text style={[styles.rating, {top: 5}]}>
                    {data.item.rating}
                  </Text>
                  <Avatar.Icon
                    icon="eye"
                    size={30}
                    color={AppStyles.color.greyDark}
                    style={[AvatarIconStyle.transparent, {top: 5}]}
                  />
                  <Text style={[styles.views, {top: 5}]}>12</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      );
    };
    const renderItem = (data, rowMap) => {
      const rowHeightAnimatedValue = new Animated.Value(100);
      return (
        <VisibleItem
          data={data}
          rowHeightAnimatedValue={rowHeightAnimatedValue}
          removeRow={() => deleteRow(rowMap, data.item.key)}
        />
      );
    };

    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    const deleteRow = (rowMap, rowKey) => {
      let {actions} = this.props;
      closeRow(rowMap, rowKey);
      const newData = [...this.props.data.availableData];
      const prevIndex = this.props.data.availableData.findIndex(
        item => item.key === rowKey,
      );
      newData[prevIndex].key = `"${Math.random()}"`;
      this.props.data.loanedData.push(newData[prevIndex]);
      actions.storeLoanedData(this.props.data.loanedData);
      newData.splice(prevIndex, 1);
      actions.storeAvailableData(newData);
    };

    const HiddenItemWithActions = props => {
      const {
        rightActionActivated,
        rowActionAnimatedValue,
        rowHeightAnimatedValue,
        onDelete,
      } = props;
      if (rightActionActivated) {
        Animated.spring(rowActionAnimatedValue, {
          toValue: 500,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(rowActionAnimatedValue, {
          toValue: 75,
          useNativeDriver: false,
        }).start();
      }

      return (
        <Animated.View
          style={(styles.rowBack, {height: rowHeightAnimatedValue})}>
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {flex: 1, width: rowActionAnimatedValue},
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Text>Remove from Available Items</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      );
    };
    const renderHiddenItem = (data, rowMap) => {
      const rowActionAnimatedValue = new Animated.Value(75);
      const rowHeightAnimatedValue = new Animated.Value(100);
      return (
        <HiddenItemWithActions
          data={data}
          rowMap={rowMap}
          rowActionAnimatedValue={rowActionAnimatedValue}
          rowHeightAnimatedValue={rowHeightAnimatedValue}
          onClose={() => closeRow(rowMap, data.item.key)}
          onDelete={() => deleteRow(rowMap, data.item.key)}
        />
      );
    };
    return (
      <>
        <View
          style={[
            CommontStyles.flexDirectionRow,
            CommontStyles.marginBottom5,
            styles.baseContainer,
          ]}>
          <View style={styles.verticalLine}></View>
          <Title style={styles.headingText}>Available Items</Title>
        </View>

        <View style={[styles.itemHeading]}>
          <View style={styles.itemHeadingContainer}>
            <Title
              style={[
                styles.itemHeadingText,
                {color: AppStyles.color.greyDark},
              ]}>
              Category
            </Title>
            <View style={styles.horizontalLine}></View>
          </View>
          <Text style={styles.itemCountText}>
            {this.props.data.availableData.length} ITEM
          </Text>
        </View>

        <SwipeListView
          style={styles.flatList}
          data={this.props.data.availableData}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.noDataFound}>
              <Text style={styles.itemName}>No data found</Text>
            </View>
          }
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe
          leftActivationValue={100}
          rightActivationValue={-200}
          leftActionValue={0}
          rightActionValue={-500}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: {...state},
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({storeAvailableData, storeLoanedData}, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvailableItemComponent);

const styles = StyleSheet.create({
  baseContainer: {
    paddingHorizontal: 13,
    marginTop: 10,
  },
  flatList: {
    paddingHorizontal: 13,
  },
  verticalLine: {
    width: 7,
    backgroundColor: AppStyles.color.primary,
    marginRight: 5,
  },
  headingText: {
    color: AppStyles.color.secondry,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 23,
  },
  itemHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 13,
  },
  itemHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemHeadingText: {
    color: AppStyles.color.secondry,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 14,
  },
  horizontalLine: {
    height: 2,
    width: 60,
    backgroundColor: AppStyles.color.secondry,
    marginLeft: 10,
  },
  itemCountText: {
    color: AppStyles.color.greyDark,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 13,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: AppStyles.color.white,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    flex: 1,
    width: null,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'stretch',
  },
  bodyContainer: {
    flex: 3,
    flexDirection: 'row',
    padding: 5,
  },
  itemDetailContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  itemName: {
    color: AppStyles.color.secondry,
    fontFamily: 'Arquitecta',
    fontSize: 17,
    marginBottom: 5,
  },
  rating: {
    color: AppStyles.color.greyDark,
    fontFamily: 'Arquitecta',
    fontSize: 15,
    marginLeft: 5,
  },
  views: {
    color: AppStyles.color.greyDark,
    fontFamily: 'Arquitecta',
    fontSize: 15,
  },
  brandName: {
    color: AppStyles.color.greyDark,
    fontFamily: 'Arquitecta',
    fontSize: 15,
  },
  country: {
    color: AppStyles.color.greyDark,
    fontFamily: 'Arquitecta',
    fontSize: 13,
    marginLeft: 5,
  },
  size: {
    color: AppStyles.color.secondry,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 17,
    marginLeft: 5,
  },
  currency: {
    color: AppStyles.color.secondry,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 18,
    marginTop: 5,
  },
  dayText: {
    color: AppStyles.color.greyDark,
    fontFamily: 'Arquitecta',
    fontSize: 14,
  },
  separator: {
    height: 10,
  },
  noDataFound: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 200,
    paddingRight: 17,
  },
  backRightBtnRight: {
    right: 0,
  },
});
