import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {AuthContext} from '../component/context';

const SignInScreen = () => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = val => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (username, password) => {
    if ((username !== '') & (password !== '')) {
      signIn(username, password);
    } else {
      Alert.alert(
        'Error',
        'Username & Password กรอกไม่ครบถ้วน กรุณากรอกใหม่อีกครั้ง',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#ffffff" barStyle="light-content" /> */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome !</Text>
      </View>
      <Animatable.View style={styles.footerLayer} animation="fadeInUpBig">
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#ffffff" size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Username"
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              placeholderTextColor="#FFF"
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.text_footer, {marginTop: 30}]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#ffffff" size={20} />
            <TextInput
              placeholder="Enter Password"
              style={styles.textInput}
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
              placeholderTextColor="#FFF"
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="white" size={20} />
              ) : (
                <Feather name="eye" color="white" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}>
              <LinearGradient
                colors={['#f9aa11', '#f9aa33']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#000000'}]}>
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 5}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 13,

                color: 'white',
                fontFamily: 'Kanit-Medium',
              }}>
              ** การเข้าใช้งานให้ใช้ Username และ Password
              เดียวกับการเข้าใช้งานคอมพิวเตอร์
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,

                color: 'white',
                fontFamily: 'Kanit',
              }}>
              Copyright (c) 2021 by IT Department | Programmer:
              Tsg.app@thaisummit.co.th
            </Text>
          </View>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    backgroundColor: '#344955',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    zIndex: 2,
  },

  footerLayer: {
    flex: 4,
    backgroundColor: '#232f34',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    zIndex: 1,
  },

  text_header: {
    color: '#232f34',
    // fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Kanit-Bold',
  },
  text_footer: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Kanit-SemiBold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#ffffff',
    marginTop: -12,
    fontFamily: 'Kanit',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Kanit-SemiBold',
  },
});
