import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';

import {
  faCheckCircle,
  faTimesCircle,
  faAlignJustify,
  faCommentAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [getValue, setGetValue] = useState('');
  const [getValue2, setGetValue2] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      console.log('in refresh');
      fetchData();
    }, 5);
  };
  const fetchUser = async () => {
    if (getValue != '') {
      const url = `${baseUrl}/State/vw_Employee.php?EmployeeUsername=${getValue}`;
      const response = await axios.get(url);
      setEmpolyeeCode(
        JSON.stringify(response.data.response[0].EmployeeCode).replace(
          /"/g,
          '',
        ),
      );
      setUserThName(
        JSON.stringify(response.data.response[0].ThFullName).replace(/"/g, ''),
      );
      setUserDepartment(
        JSON.stringify(response.data.response[0].DepartmentName).replace(
          /"/g,
          '',
        ),
      );
      setUserCompany(
        JSON.stringify(response.data.response[0].AliasCompanyName).replace(
          /"/g,
          '',
        ),
      );
    }
  };
  const getValueFunction = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('userName').then(
      value =>
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        setGetValue(value),
      // Setting the value in Text
    );
  };
  getValueFunction();

  const getValueFunction2 = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('userToken').then(
      value =>
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        setGetValue2(value),
      // Setting the value in Text
    );
  };
  getValueFunction2();
  // console.log('getValue = ', getValue);
  const [EmpolyeeCode, setEmpolyeeCode] = useState('');
  const [UserThName, setUserThName] = useState('');
  const [UserDepartment, setUserDepartment] = useState('');
  const [UserCompany, setUserCompany] = useState('');
  const baseUrl = 'http://10.0.41.45/phpAPI';
  const [state, setState] = React.useState({data: []});
  const [AllJobCount, setAllJobCount] = useState('');
  const [AllJobSuccess, setAllJobSuccess] = useState('');
  const [AllJobProcessing, setAllJobProccessing] = useState('');
  const [AllJobUnsuccess, setAllJobUnsuccess] = useState('');
  const [allJobMonth1, setallJobMonth1] = useState(0);
  const [allJobMonth2, setallJobMonth2] = useState(0);
  const [allJobMonth3, setallJobMonth3] = useState(0);
  const [allJobMonth4, setallJobMonth4] = useState(0);
  const [allJobMonth5, setallJobMonth5] = useState(0);
  const [allJobMonth6, setallJobMonth6] = useState(0);
  const [allJobMonth7, setallJobMonth7] = useState(0);
  const [allJobMonth8, setallJobMonth8] = useState(0);
  const [allJobMonth9, setallJobMonth9] = useState(0);
  const [allJobMonth10, setallJobMonth10] = useState(0);
  const [allJobMonth11, setallJobMonth11] = useState(0);
  const [allJobMonth12, setallJobMonth12] = useState(0);
  const [Years, setYears] = useState('');

  // useEffect(() => {}, [EmpolyeeCode, UserThName, UserDepartment, UserCompany]);

  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const url = `${baseUrl}/State/job_detail_all.php`;
      // const response = await axios.get(url);
      const response = await fetch(url);
      const json = await response.json();
      setState({data: json.response});

      let AllJob = state.data.length;
      let AllJobS = state.data.filter(value => value.Status === '6').length;
      let AllJobP = state.data.filter(value => value.Status < '6').length;
      let AllJobU = state.data.filter(value => value.Status === '7').length;
      setAllJobCount(AllJob);
      setAllJobSuccess(AllJobS);
      setAllJobProccessing(AllJobP);
      setAllJobUnsuccess(AllJobU);

      const Year = moment().utcOffset('+07:00').format('YYYY');

      const month_1 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-01',
      ).length;

      const month_2 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-02',
      ).length;

      const month_3 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-03',
      ).length;

      const month_4 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-04',
      ).length;

      const month_5 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-05',
      ).length;

      const month_6 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-06',
      ).length;

      const month_7 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-07',
      ).length;

      const month_8 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-08',
      ).length;

      const month_9 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-09',
      ).length;

      const month_10 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-10',
      ).length;

      const month_11 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-11',
      ).length;

      const month_12 = state.data.filter(
        value =>
          moment(value.Date_create).utcOffset('+07:00').format('YYYY-MM') ==
          Year + '-12',
      ).length;

      setallJobMonth1(month_1);
      setallJobMonth2(month_2);
      setallJobMonth3(month_3);
      setallJobMonth4(month_4);
      setallJobMonth5(month_5);
      setallJobMonth6(month_6);
      setallJobMonth7(month_7);
      setallJobMonth8(month_8);
      setallJobMonth9(month_9);
      setallJobMonth10(month_10);
      setallJobMonth11(month_11);
      setallJobMonth12(month_12);
      setYears(Year);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);

    // fetch.setState({data: response.data});
    // console.log(response.data);
  };

  useEffect(() => {
    fetchUser();
    fetchData();
    console.log('in first');
    if (AllJobCount > 0) {
      setRefresh(true);
      setTimeout(() => {
        setRefresh(false);
        console.log('in refresh first');
        console.log('userName = ', getValue);
        console.log('token = ', getValue2);
      }, 5);
    }
  }, [AllJobCount]);

  // useEffect(() => {

  // }, [refresh]);

  return (
    <View style={styles.contatiner}>
      <StatusBar backgroundColor="#232f34" barStyle="light-content" />
      {/* <ImageBackground
        source={require('../assets/blackblueblur.png')}
        resizeMode="cover"
        style={styles.image}> */}
      {/* <StatusBar backgroundColor="#4682B4" barStyle="light-content" /> */}

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }>
        <Animatable.View animation="slideInLeft" style={styles.header}>
          <View
            style={{
              flex: 0.4,
              backgroundColor: 'white',
              minWidth: '98%',
              borderRadius: 5,
              flexDirection: 'row',
              marginVertical: '1%',
              top: 0,
            }}>
            <View
              style={{
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesomeIcon icon={faUserCircle} size={80} color="#344955" />
            </View>

            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                paddingLeft: -10,
                margin: 5,
              }}>
              <Text style={styles.dataUser}>รหัสพนักงาน : {EmpolyeeCode}</Text>
              <Text style={styles.dataUser}>ชื่อ-นามสกุล : {UserThName}</Text>
              <Text style={styles.dataUser}>บริษัท : {UserCompany}</Text>
              <Text style={styles.dataUser}>แผนก : {UserDepartment}</Text>
            </View>
          </View>

          {hasError && <Text>Something went wrong.</Text>}
          {isLoading ? (
            <View
              style={{
                flexDirection: 'column',
                flex: 10,
                width: Dimensions.get('window').width * 0.98,
                height: Dimensions.get('window').height * 0.6,
                borderRadius: 5,
                paddingVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#344955',
                  minWidth: 150,
                  height: 150,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <ActivityIndicator size="large" color={'white'} />
                  </View>
                  <Text style={{color: 'white'}}>Loading ...</Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                // backgroundColor: 'green',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                  flex: 0.7,
                  minWidth: '93%',
                  borderRadius: 5,
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                }}>
                <View style={styles.statusCount}>
                  <FontAwesomeIcon
                    icon={faAlignJustify}
                    size={24}
                    style={styles.icon}
                    color="#232f34"
                  />
                  <Text style={styles.statusCountText}>All Job</Text>

                  <Text style={styles.statusCountNum}>{AllJobCount}</Text>
                </View>

                <View style={styles.statusCount}>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size={24}
                    style={styles.icon}
                    color="#232f34"
                  />
                  <Text style={styles.statusCountText}>Success</Text>
                  <Text style={styles.statusCountNum}>{AllJobSuccess}</Text>
                </View>
                <View style={styles.statusCount}>
                  <FontAwesomeIcon
                    icon={faCommentAlt}
                    size={24}
                    style={styles.icon}
                    color="#232f34"
                  />
                  <Text style={styles.statusCountText}>Processing</Text>
                  <Text style={styles.statusCountNum}>{AllJobProcessing}</Text>
                </View>
                <View style={styles.statusCount}>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    size={24}
                    style={styles.icon}
                    color="#232f34"
                  />
                  <Text style={styles.statusCountText}>Unsuccess</Text>
                  <Text style={styles.statusCountNum}>{AllJobUnsuccess}</Text>
                </View>
              </View>

              <View style={{marginTop: '1%', flex: 0.2}}>
                <Text
                  style={{
                    color: '#232f34',
                    fontSize: 18,
                    fontFamily: 'Kanit-Medium',
                  }}>
                  Chart of Year {Years}
                </Text>

                <View style={{flex: 0.7}}>
                  <LineChart
                    data={{
                      labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ],
                      datasets: [
                        {
                          data: [
                            allJobMonth1,
                            allJobMonth2,
                            allJobMonth3,
                            allJobMonth4,
                            allJobMonth5,
                            allJobMonth6,
                            allJobMonth7,
                            allJobMonth8,
                            allJobMonth9,
                            allJobMonth10,
                            allJobMonth11,
                            allJobMonth12,
                          ],
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width * 0.98}
                    height={Dimensions.get('window').height * 0.42}
                    // width={Dimensions.get('window').width - 30} // from react-native
                    // height={Dimensions.get('window').height / 3}
                    // yAxisLabel=""
                    // yAxisSuffix=""
                    // xAxisInterval={12} // optional, defaults to 1

                    chartConfig={{
                      barPercentage: 1,
                      propsForLabels: {},
                      backgroundGradientFrom: '#f9aa33',
                      backgroundGradientFromOpacity: 1,
                      backgroundGradientTo: '#f9aa33',
                      backgroundGradientToOpacity: 1,
                      decimalPlaces: 1, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffffff',
                      },

                      propsForLabels: {
                        fontSize: 12,
                        fontWeight: 'bold',
                      },
                      propsForVerticalLabels: {
                        fontSize: 10,
                        fontWeight: 'bold',
                      },
                    }}
                    withInnerLines={false}
                    verticalLabelRotation={90}
                    withVerticalLines={false}
                    withInnerLines={true}
                    // fromZero={false}
                    withHorizontalLines={false}
                    bezier
                    style={{
                      width: '100%',
                      borderRadius: 5,
                    }}
                    yLabelsOffset={40}
                    yAxisInterval={1} // optional, defaults to 1
                    segments={0}
                  />
                </View>
              </View>
            </View>
          )}
        </Animatable.View>
      </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contatiner: {
    flex: 1,
    backgroundColor: '#00000010',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },

  header: {
    justifyContent: 'center',
  },

  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000010',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  dataUser: {
    color: '#232f34',
    fontSize: 15,
    fontFamily: 'Kanit-Medium',
  },

  statusCount: {
    width: 80,
    height: 80,
    justifyContent: 'center',

    alignItems: 'center',
  },
  statusCountText: {
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#232f34',
    fontFamily: 'Kanit-Medium',
  },
  statusCountNum: {
    fontSize: 30,
    color: '#232f34',
    fontWeight: 'normal',
  },
});
