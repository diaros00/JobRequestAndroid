import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import SignInScreen from './SignInScreen';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#232f34" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeInDownBig"
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>JOB REQUEST</Text>
        <Text style={styles.title}>TSG APPLICATION</Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate(SignInScreen)}>
            <LinearGradient
              colors={['#f9aa11', '#f9aa33']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
// const height_logo = height * 0.28;
const height_logo = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a6572',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 170,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    // fontWeight: 'bold',
    fontFamily: 'Kanit-Bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontFamily: 'Kanit',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    fontFamily: 'Kanit-SemiBold',
  },
  textSign: {
    color: 'black',
    fontWeight: 'bold',
  },
});
