import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const baseUrl = 'http://10.0.41.45/phpAPI';

const DetailsScreen = ({navigation}) => {
  const [state, setState] = React.useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [page]);

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      console.log('in refresh');
      fetchData();
      setRefresh(false);
    }, 1);
  };

  const fetchData = async () => {
    setHasError(false);

    try {
      setLoader(true);
      const url = `${baseUrl}/State/job_detail_all.php`;
      // const response = await axios.get(url);
      const response = await fetch(url);
      const json = await response.json();
      setState({data: json.response});
      setLoader(false);

      // fetch.setState({data: response.data});
      // console.log(response.data);
    } catch (err) {
      setHasError(true);
      process.exit(1);
    }
    setIsLoading(false);
  };

  const onEndReached = page => {
    if (!loader) {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.contatiner}>
      <StatusBar backgroundColor="#232f34" barStyle="light-content" />

      <Animatable.View animation="slideInLeft" style={styles.header}>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'white',
            minWidth: '98%',
            marginBottom: '1%',
            marginTop: '1%',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9aa33',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#232f34',
              fontFamily: 'Kanit-Medium',
            }}>
            All Job Request Flatlist
          </Text>
        </View>

        <View
          style={{
            marginBottom: '1%',
            flexDirection: 'row',
            flex: 0.3,
            width: '98%',
            // marginHorizontal: 20,
            borderRadius: 5,
            paddingLeft: 15,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <Icon name="search-outline" color="black" size={15} />
          <TextInput
            style={{fontSize: 12, color: 'black'}}
            placeholder="Search .."></TextInput>
        </View>

        <View style={{flex: 4, width: '98%'}}>
          <FlatList
            data={state.data}
            initialNumToRender={5}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.1}
            style={{flex: 1}}
            onEndReached={onEndReached}
            keyExtractor={(x, i) => i}
            refreshControl={
              <RefreshControl
                colors={['#9Bd35A', '#689F38']}
                refreshing={refresh}
                onRefresh={() => pullMe()}
              />
            }
            renderItem={({item}) => (
              // <Text>{item.Employee_code_request}</Text>

              <View
                style={{
                  borderColor: 'black',
                  height: 180,
                  borderRadius: 5,
                  marginBottom: '1%',
                  // justifyContent: 'center',

                  backgroundColor: '#ffffff',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 15,
                    fontSize: 16,
                    color: 'white',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text
                    style={[
                      styles.textFlatList,
                      {fontSize: 18},
                    ]}>{`${item.Num_req} `}</Text>

                  <Text
                    style={
                      styles.textFlatList
                    }>{`${item.Employee_fullname_request} `}</Text>
                  <Text style={styles.textFlatList}>{`${item.Job_name}`}</Text>

                  <Text style={styles.textFlatList}>{`${moment(item.Date_create)
                    .utcOffset('+07:00')
                    .format('YYYY-MM-DD HH:mm')}`}</Text>

                  {/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   สีของปุ่มสถานะต่างๆ  <<<<<<<<<<<<<<<<<<<<<<<<< */}
                  {item.Status == '1' ? (
                    <View
                      style={{
                        width: '40%',
                        height: 30,
                        backgroundColor: 'gray',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 5,
                      }}>
                      <Text
                        style={[
                          styles.textFlatList,
                          {textAlign: 'center', color: 'white'},
                        ]}>
                        <Icon name="time-outline" color="white" size={18} />{' '}
                        {`${item.Status_Detail}`}
                      </Text>
                    </View>
                  ) : item.Status == '6' ? (
                    <View
                      style={{
                        width: '40%',
                        height: 30,
                        backgroundColor: '#00b26f',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 5,
                      }}>
                      <Text
                        style={[
                          styles.textFlatList,
                          {textAlign: 'center', color: 'white'},
                        ]}>
                        <Icon
                          name="checkmark-circle-outline"
                          color="white"
                          size={18}
                        />{' '}
                        {`${item.Status_Detail}`}
                      </Text>
                    </View>
                  ) : item.Status == '7' ? (
                    <View
                      style={{
                        width: '40%',
                        height: 30,
                        backgroundColor: '#dc3545',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 5,
                      }}>
                      <Text
                        style={[
                          styles.textFlatList,
                          {textAlign: 'center', color: 'white'},
                        ]}>
                        {' '}
                        <Icon
                          name="close-circle-outline"
                          color="white"
                          size={18}
                        />{' '}
                        {`${item.Status_Detail}`}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: '50%',
                        height: 30,
                        backgroundColor: '#ffc107',
                        justifyContent: 'center',
                        borderRadius: 5,
                        marginTop: 5,
                      }}>
                      <Text
                        style={[
                          styles.textFlatList,
                          {textAlign: 'center', color: 'black'},
                        ]}>
                        <Icon
                          name="chatbox-ellipses-outline"
                          color="black"
                          size={18}
                        />{' '}
                        {`${item.Status_Detail}`}
                      </Text>
                    </View>
                  )}

                  {/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   สีของปุ่มสถานะต่างๆ  <<<<<<<<<<<<<<<<<<<<<<<<< */}
                </View>
                <View style={styles.btnView}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SelectJobScreen', {
                        Num_req: item.Num_req,
                        Test: 'Test',
                      })
                    }>
                    {/* // onPress={() => navigation.navigate('SelectJobScreen')}> */}
                    <Text style={styles.btnViewText}>
                      <Icon name="pencil" color="black" size={20} />
                      View / Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </Animatable.View>
    </View>

    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   {/* <StatusBar backgroundColor="#50a3a4" barStyle="light-content" /> */}

    //   <Text>Detail Screen </Text>
    //   <Button
    //     title="Go to detail Screen again"
    //     onPress={() => navigation.push('JobAll')}></Button>
    //   <Button
    //     title="Go to home"
    //     onPress={() => navigation.navigate('Home')}></Button>
    //   <Button title="Go to back" onPress={() => navigation.goBack()}></Button>
    //   <Button
    //     title="Go to the first screen"
    //     onPress={() => navigation.popToTop()}></Button>
    // </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  contatiner: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#00000010',
  },

  header: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#3686c910',
  },

  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  btn: {
    // backgroundColor: 'gray',
    borderRadius: 100 / 10,
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  btnActive: {
    borderRadius: 100 / 10,
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#E0E0E0',
  },

  btnView: {
    backgroundColor: '#f9aa33',
    borderRadius: 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    marginBottom: 10,
  },

  btnViewText: {
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Kanit-Medium',
    fontSize: 15,
  },

  textFlatList: {
    color: 'black',
    fontSize: 15,

    fontFamily: 'Kanit-Medium',
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
