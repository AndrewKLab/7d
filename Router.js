import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderRight, Reccord } from './_components';
import { connect } from 'react-redux';
import { MainTheme } from './_styles';
import * as ScreenOrientation from 'expo-screen-orientation';
import { stylesActions } from './_actions';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import NewRecordsPage from './Screens/NewRecordsPage';

const Stack = createStackNavigator();
function mapStateToProps(state) {
  const { theme } = state.style;
  return {
    theme,
  };
}

const screenOptions = (theme, navigation, route) => {
  return {
    headerRight: () => <HeaderRight />,
    headerStyle: {
      backgroundColor:
        theme === 'default' ? MainTheme.colors.primary : '#1f1f1f',
    },
    headerTintColor: '#fff',
    animationEnabled: false,
  };
};

const Router = ({ dispatch, theme }) => {
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    dispatch(stylesActions.getTheme())
      .then(() => {
        ScreenOrientation.getOrientationAsync().then((info) => {
          dispatch(
            stylesActions.getOrintation(
              info === 1 || info === 2 ? 'portrait' : 'landscape'
            )
          );
        });
      })
      .then(() => {
        dispatch(stylesActions.getFontSize());
      })
      .then(() => {
        setLoading(false);
      });
    // set initial orientation
    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        dispatch(
          stylesActions.setOrintation(
            evt.orientationInfo.orientation === 1 ||
              evt.orientationInfo.orientation === 2
              ? 'portrait'
              : 'landscape'
          )
        );
      }
    );

    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, [dispatch]);

  return (
    <PaperProvider theme={theme === 'default' ? MainTheme : PaperDarkTheme}>
      <NavigationContainer
        theme={theme === 'default' ? DefaultTheme : DarkTheme}>
        <Stack.Navigator
          screenOptions={({ navigation, route }) =>
            screenOptions(theme, navigation, route)
          }>
          <Stack.Screen name="7D формат" component={NewRecordsPage} />
          <Stack.Screen
            name="Запись"
            component={Reccord}
            options={({ route }) => ({ title: route.params.title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default connect(mapStateToProps)(Router);
