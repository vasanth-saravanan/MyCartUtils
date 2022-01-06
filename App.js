import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Route from './src/navigation/Route';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Route"
            options={{headerShown: false}}
            component={Route}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
