import {StyleSheet} from 'react-native';
import {AppStyles} from './AppStyles';

const CommontStyles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  safeAreaContainer: {
    flex: 0,
    backgroundColor: AppStyles.color.secondry,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
  marginBottom5: {
    marginBottom: 5,
  },
});

const AvatarIconStyle = StyleSheet.create({
  transparent: {
    backgroundColor: AppStyles.color.tranparent,
  },
});

export {CommontStyles, AvatarIconStyle};
