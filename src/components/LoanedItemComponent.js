import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'react-native-paper';
import {AppStyles} from '../utils/AppStyles';
import {CommontStyles} from '../utils/CommonStyles';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import LoanedData from '../utils/staticData/LoanedData';
import {storeLoanedData, storeAvailableData} from '../redux';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class LoanedItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.data.loanedData.length == 0) {
      let {actions} = this.props;
      actions.storeLoanedData(
        LoanedData.map((item, index) => ({
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
      const {data, rowHeightAnimatedValue, removeRow, leftActionState} = props;

      if (leftActionState) {
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

                <View style={styles.itemHeadingContainer}>
                  <StarRating
                    fullStarColor={AppStyles.color.yellowLight}
                    emptyStarColor={AppStyles.color.yellowLight}
                    disabled={true}
                    maxStars={1}
                    rating={1}
                    starSize={18}
                  />
                  <Text style={styles.rating}>{data.item.rating}</Text>
                  <Text style={styles.country}>US</Text>
                  <Text style={styles.size}>{data.item.size}</Text>
                </View>

                <Text style={styles.currency}>
                  ${data.item.total}
                  {'  '}
                  <Text style={styles.totalText}>Total</Text>
                </Text>
              </View>

              <View style={styles.itemSellerContainer}>
                <Text style={styles.dateText}>
                  {moment(data.item.startDate).format('DD MMM ')}to
                  {moment(data.item.endDate).format(' DD MMM')}
                </Text>
                <View style={styles.sellerDetailContainer}>
                  <Text style={styles.sellerName}>{data.item.sellerName}</Text>
                  <View style={styles.imageContainer}>
                    <Image
                      source={data.item.sellerProfile}
                      style={styles.sellerImage}
                    />
                  </View>
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
      const newData = [...this.props.data.loanedData];
      const prevIndex = this.props.data.loanedData.findIndex(
        item => item.key === rowKey,
      );
      newData[prevIndex].key = `"${Math.random()}"`;
      this.props.data.availableData.push(newData[prevIndex]);
      actions.storeAvailableData(this.props.data.availableData);
      newData.splice(prevIndex, 1);
      actions.storeLoanedData(newData);
    };

    const HiddenItemWithActions = props => {
      const {
        leftActionActivated,
        rowActionAnimatedValue,
        rowHeightAnimatedValue,
        onDelete,
      } = props;
      if (leftActionActivated) {
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
              styles.backRightBtnLeft,
              {flex: 1, width: rowActionAnimatedValue},
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={onDelete}>
              <Text>Remove from Loaned Items</Text>
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
          <Title style={styles.headingText}>Loanded Items</Title>
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
            {this.props.data.loanedData.length} ITEM
          </Text>
        </View>

        <SwipeListView
          style={styles.flatList}
          data={this.props.data.loanedData}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.noDataFound}>
              <Text style={styles.itemName}>No data found</Text>
            </View>
          }
          renderHiddenItem={renderHiddenItem}
          disableLeftSwipe={true}
          leftActivationValue={200}
          rightActivationValue={100}
          leftActionValue={500}
          rightActionValue={0}
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
  actions: bindActionCreators({storeLoanedData, storeAvailableData}, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoanedItemComponent);

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
  totalText: {
    color: AppStyles.color.greyDark,
    fontFamily: 'Arquitecta',
    fontSize: 18,
  },
  itemSellerContainer: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  sellerName: {
    color: AppStyles.color.secondry,
    fontFamily: 'ArquitectaHeavy',
    fontSize: 17,
    marginLeft: 5,
  },
  dateText: {
    color: AppStyles.color.secondry,
    fontFamily: 'Arquitecta',
    fontSize: 13,
    marginLeft: 5,
    marginTop: 20,
  },
  sellerDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  sellerImage: {
    height: 25,
    width: 25,
    borderRadius: 100,
    marginLeft: 5,
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
  backRightBtnLeft: {
    left: 0,
  },
});
