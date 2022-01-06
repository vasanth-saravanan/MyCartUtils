import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyCloset from '../screens/MyCloset';

const Stack = createStackNavigator();

function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyCloset"
        options={{headerShown: false}}
        component={MyCloset}
      />
    </Stack.Navigator>
  );
}

export default Route;
