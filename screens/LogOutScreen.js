import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../component/context';

const LogOutScreen = ({navigation}) => {
  useEffect(() => {}, []);
  const {signOut} = React.useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <StatusBar backgroundColor="#232f34" barStyle="light-content" />
        <Text
          style={{
            fontSize: 22,
            color: '#232f34',
            fontFamily: 'Kanit-Bold',
          }}>
          Log out
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#232f34',
            fontFamily: 'Kanit-Medium',
          }}>
          Are you sure you want to logout ?{' '}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{
              flex: 0.4,
              backgroundColor: '#f9aa33',
              borderRadius: 5,
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <TouchableOpacity onPress={() => signOut()}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                YES
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.1}}></View>
          <View
            style={{
              flex: 0.4,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              borderColor: '#f9aa33',
              width: '100%',
              height: 40,
              borderRadius: 5,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text
                style={{
                  color: '#f9aa33',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                BACK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LogOutScreen;
