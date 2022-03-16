import React, {useEffect} from 'react';
import {View, Alert, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {AuthContext} from './component/context';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddJobScreen from './screens/AddJobScreen';
import SelectJobScreen from './screens/SelectJobScreen';
import LogOutScreen from './screens/LogOutScreen';
import RootStackScreen from './screens/RootStackScreen';

// const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();
const AddJobStack = createNativeStackNavigator();
const logOutStack = createNativeStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerTitle: 'DASHBOARD',
      headerStyle: {
        backgroundColor: '#344955',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Kanit-SemiBold',
      },
      footerStyle: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Dashboard',
      }}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerTitle: 'ALL JOB',
      headerStyle: {
        backgroundColor: '#344955',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Kanit-SemiBold',
      },
    }}>
    <DetailsStack.Screen name="DetailsScreen" component={DetailsScreen} />
    <DetailsStack.Screen name="SelectJobScreen" component={SelectJobScreen} />
  </DetailsStack.Navigator>
);

const AddJobStackScreen = ({navigation}) => (
  <AddJobStack.Navigator
    screenOptions={{
      headerTitle: 'ADD NEW JOB',
      headerStyle: {
        backgroundColor: '#344955',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Kanit-SemiBold',
      },
    }}>
    <AddJobStack.Screen name="AddJobScreen" component={AddJobScreen} />
  </AddJobStack.Navigator>
);

const LogOutStackScreen = ({navigation}) => (
  <logOutStack.Navigator
    screenOptions={{
      headerTitle: 'SIGN OUT',
      headerStyle: {
        backgroundColor: '#344955',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Kanit-SemiBold',
      },
    }}>
    <logOutStack.Screen name="LogOutScreen" component={LogOutScreen} />
  </logOutStack.Navigator>
);

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        let userToken;
        userToken = null;
        console.log('userName -> ', userName);
        console.log('password -> ', password);

        try {
          const baseUrl = 'http://10.0.41.45/phpAPI';
          const response = await axios.get(`${baseUrl}/State/login_query.php`, {
            params: {
              EmployeeUsername: userName,
              Password: password,
            },
          });

          if (response.data.message == 'LoginSuccess') {
            try {
              userToken = 'asdfaas';
              await AsyncStorage.setItem('userToken', userToken);
              await AsyncStorage.setItem('userName', userName);
              dispatch({type: 'LOGIN', id: userName, token: userToken});
              Alert.alert(
                'Welcome',
                `ยินดีต้อนรับเข้าสู่ Application คุณ ${JSON.stringify(
                  response.data.response[0].ThFullName,
                )}`,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            } catch (e) {
              console.log(e);
            }
          } else {
            Alert.alert(
              'Error',
              'Username & Password ไม่ถูกต้องกรุณากรอกใหม่อีกครั้ง',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );

            console.log('userToken -> ', userToken);

            dispatch({type: 'LOGIN', id: userName, token: userToken});
          }
        } catch (error) {
          Alert.alert(
            'Error',
            'Username & Password ไม่ถูกต้องกรุณากรอกใหม่อีกครั้ง --',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
        }
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);

        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }

        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      console.log('userToken -> ', userToken);
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderColor: 'transparent',
              overflow: 'hidden',
            }}>
            <Tab.Screen
              name="Dashboard"
              component={HomeStackScreen}
              options={{
                tabBarLabel: 'Dashboard',
                tabBarColor: '#344955',
                tabBarIcon: ({color}) => (
                  <Icon name="ios-home" color={color} size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="JobAll"
              component={DetailsStackScreen}
              options={{
                tabBarLabel: 'All Job',
                tabBarColor: '#344955',
                tabBarIcon: ({color}) => (
                  <Icon name="ios-apps" color={color} size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="AddJob"
              component={AddJobStackScreen}
              options={{
                tabBarLabel: 'Add Job',
                tabBarColor: '#344955',
                tabBarIcon: ({color}) => (
                  <Icon name="ios-add-circle" color={color} size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="Logout"
              component={LogOutStackScreen}
              options={{
                tabBarLabel: 'Logout',
                tabBarColor: '#344955',
                tabBarIcon: ({color}) => (
                  <Icon name="ios-log-out" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
