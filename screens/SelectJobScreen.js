import React, {useEffect, useState, useMemo} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  PermissionsAndroid,
  TouchableHighlight,
  Animated,
  RefreshControl,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const baseUrl = 'http://10.0.41.45/phpAPI';
const linkurl = '';
const SelectJobScreen = ({route, navigation}) => {
  // const Num_req = route.params.Num_req;

  const {Num_req, Test} = route.params;
  const [ItemsHandleJob, setItemsHandleJob] = React.useState([]);
  const [DataTextHandleJob, setDataTextHandleJob] = React.useState('');
  const [DataTextHandleJobCode, setDataTextHandleJobCode] = React.useState('');
  const [StateLogin, setStateLogin] = useState({data: []});
  const [State, setState] = useState({data: []});
  const [StateImage, setStateImage] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [getValue, setGetValue] = useState('');
  const [EmployeeCodeLogin, setEmployeeCodeLogin] = useState('');
  const [UserDepartment, setUserDepartment] = useState('');

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

  const getCharacters = async () => {
    try {
      const url = `${baseUrl}/State/vw_Employee_IT_all.php`;

      const response = await axios.get(url);
      // console.log(response.data.response);
      const mapArray = response.data.response.map(
        ({EmployeeCode, ThFullName}) => ({
          ThFullName: ThFullName,
          EmployeeCode: EmployeeCode,
        }),
      );
      setItemsHandleJob(mapArray);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePickerHandleJob = itemValue => {
    console.log('itemvalue >> ', itemValue);
    setDataTextHandleJob(itemValue);
    console.log('DataTextHandleJob >> ', DataTextHandleJob);

    function findEmployeeCodeHandleJob(tempItem) {
      return tempItem.ThFullName === itemValue;
    }
    setDataTextHandleJobCode(
      ItemsHandleJob.find(findEmployeeCodeHandleJob).EmployeeCode,
    );
    console.log('DataTextHandleJobCode >> ', DataTextHandleJobCode);
  };

  const fetchUser = async () => {
    if (getValue != '') {
      fetch(`${baseUrl}/State/vw_Employee.php?EmployeeUsername=${getValue}`)
        .then(response => response.json())
        .then(
          responseData =>
            setStateLogin({
              data: responseData.response,
            }),
          console.log('StateLogin.data = ', JSON.stringify(StateLogin.data)),
        );
    }
  };
  useEffect(() => {
    setIsLoading(true);

    if (State.data && StateLogin.data) {
      if (State.data.length > 0 && StateLogin.data.length > 0) {
        setIsLoading(false);
        console.log('loding data successfully');
        setJobIDValue(JSON.stringify(State.data[0].Job_ID).replace(/"/g, ''));
        setEmployee_fullname_request(
          JSON.stringify(State.data[0].Employee_fullname_request).replace(
            /"/g,
            '',
          ),
        );
        setNumberApprover(
          JSON.stringify(State.data[0].NumberApprover).replace(/"/g, ''),
        );
        setStatus_approve_lastest(
          JSON.stringify(State.data[0].Status_approve).replace(/"/g, ''),
        );
        setApprover1_code(
          JSON.stringify(State.data[0].Approver1_code).replace(/"/g, ''),
        );
        setApprover2_code(
          JSON.stringify(State.data[0].Approver2_code).replace(/"/g, ''),
        );
        setApprover3_code(
          JSON.stringify(State.data[0].Approver3_code).replace(/"/g, ''),
        );
        setApprover4_code(
          JSON.stringify(State.data[0].Approver4_code).replace(/"/g, ''),
        );
        setStatus_approve_user_complete_Text(
          JSON.stringify(State.data[0].Status_approve_user_complete).replace(
            /"/g,
            '',
          ),
        );

        console.log('JobIDValue = ', JobIDValue);
        console.log('Employee_fullname_request = ', Employee_fullname_request);
        console.log('NumberApprover = ', NumberApprover);
        console.log('Status_approve_lastest = ', Status_approve_lastest);
        console.log('Approver1_code = ', Approver1_code);
        console.log('Approver2_code = ', Approver2_code);
        console.log('Approver3_code = ', Approver3_code);
        console.log('Approver4_code = ', Approver4_code);
        console.log(
          'Status_approve_user_complete = ',
          Status_approve_user_complete_Text,
        );

        // // // // // // // // // // // // // // stateLogin // // // // // // // // // // // // // // // // // //
        setEmployeeCodeLogin(
          JSON.stringify(StateLogin.data[0].EmployeeCode).replace(/"/g, ''),
        );

        setUserDepartment(
          JSON.stringify(StateLogin.data[0].DepartmentName).replace(/"/g, ''),
        );

        console.log('EmployeeCodeLogin = ', EmployeeCodeLogin);
        console.log('UserDepartment = ', UserDepartment);
      } else {
        fetchData();
        fetchUser();
        getCharacters();
        setIsLoading(true);
        console.log('loding data Unsuccessfully');
      }
    } else {
      console.log('No State.data');
      navigation.navigate('JobAll');
    }
  }, [State.data, StateLogin.data, isLoading]);

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      console.log('in refresh');
      fetchData();
    }, 1000);
  };

  const onChangeApprover1Comment = Approver1CommentText => {
    setApprover1CommentText(Approver1CommentText);
  };
  const onChangeApprover2Comment = Approver2CommentText => {
    setApprover2CommentText(Approver2CommentText);
  };
  const onChangeApprover3Comment = Approver3CommentText => {
    setApprover3CommentText(Approver3CommentText);
  };
  const onChangeApprover4Comment = Approver4CommentText => {
    setApprover4CommentText(Approver4CommentText);
  };
  const onChangeApproverITComment = ApproverITCommentText => {
    setApproverITCommentText(ApproverITCommentText);
  };

  const [JobIDValue, setJobIDValue] = useState('');
  const [Employee_fullname_request, setEmployee_fullname_request] =
    useState('');
  const [Status_approve, setStatus_approve] = useState('');
  const [Status_approve_lastest, setStatus_approve_lastest] = useState('');
  const [
    Status_approve_user_complete_Text,
    setStatus_approve_user_complete_Text,
  ] = useState('');
  const [NumberApprover, setNumberApprover] = useState('');
  const [Approver1_code, setApprover1_code] = useState('');
  const [Approver2_code, setApprover2_code] = useState('');
  const [Approver3_code, setApprover3_code] = useState('');
  const [Approver4_code, setApprover4_code] = useState('');
  const [ApproverIT_code, setApproverIT_code] = useState('');
  const [ApproveURL, setApproveURL] = useState('');

  const [Approver1CommentText, setApprover1CommentText] = useState('');
  const [Approver2CommentText, setApprover2CommentText] = useState('');
  const [Approver3CommentText, setApprover3CommentText] = useState('');
  const [Approver4CommentText, setApprover4CommentText] = useState('');
  const [ApproverITCommentText, setApproverITCommentText] = useState('');

  const urlja = useMemo(() => {
    if (
      Status_approve_lastest == 1 &&
      Status_approve_user_complete_Text == 'no'
    ) {
      return 'job_detail_update_by_approver1.php';
    } else if (
      Status_approve_lastest == 2 &&
      Status_approve_user_complete_Text == 'no'
    ) {
      return 'job_detail_update_by_approver2.php';
    } else if (
      Status_approve_lastest == 3 &&
      Status_approve_user_complete_Text == 'no'
    ) {
      return 'job_detail_update_by_approver3.php';
    } else if (
      Status_approve_lastest == 4 &&
      Status_approve_user_complete_Text == 'no'
    ) {
      return 'job_detail_update_by_approver4.php';
    } else if (Status_approve_user_complete_Text == 'yes') {
      return 'job_detail_update_by_approverIT.php';
    } else {
      return '';
    }
  }, [isLoading]);

  console.log('urlja = ', urlja);

  const UpdateChecker = () =>
    Alert.alert('Approve', 'Are you sure for Approved ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('OK Pressed'), updateApprove();
        },
      },
    ]);

  const updateApprove = () => {
    try {
      const FormData = require('form-data');
      const data = new FormData();

      if (
        Status_approve_lastest == 1 &&
        Status_approve_user_complete_Text == 'no'
      ) {
        // if (Status_approve_lastest == 1 && EmployeeCodeLogin == Approver1_code) {

        data.append('Job_ID', JobIDValue);
        data.append('Employee_fullname_request', Employee_fullname_request);
        data.append('Approver1_comment', Approver1CommentText);
        data.append('Status_approve', 2);
        console.log('woooooooooooooow');
      } else if (
        Status_approve_lastest == 2 &&
        Status_approve_user_complete_Text == 'no'
      ) {
        data.append('Job_ID', JobIDValue);
        data.append('Employee_fullname_request', Employee_fullname_request);
        data.append('Approver2_comment', Approver2CommentText);
        data.append('Status_approve', 3);
      } else if (
        Status_approve_lastest == 3 &&
        Status_approve_user_complete_Text == 'no'
      ) {
        data.append('Job_ID', JobIDValue);
        data.append('Employee_fullname_request', Employee_fullname_request);
        data.append('Approver3_comment', Approver3CommentText);
        data.append('Status_approve', 4);
      } else if (
        Status_approve_lastest == 4 &&
        Status_approve_user_complete_Text == 'no'
      ) {
        data.append('Job_ID', JobIDValue);
        data.append('Employee_fullname_request', Employee_fullname_request);
        data.append('Approver4_comment', Approver4CommentText);
        data.append('Status_approve', 5);
      } else if (Status_approve_user_complete_Text == 'yes') {
        data.append('Job_ID', JobIDValue);
        data.append('Employee_fullname_request', Employee_fullname_request);
        data.append('ApproverIT_comment', ApproverITCommentText);
        data.append('Status_approve', 6);
        data.append('Handle_by', DataTextHandleJob);
        data.append('Handle_by_code', DataTextHandleJobCode);
      } else {
        console.log('woooooooooooooow2');

        console.log('No have NumberApprover');
        Alert.alert('Error', 'No have NumberApprover ', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            },
          },
        ]);
        throw 'exit';
      }

      if (NumberApprover == 1 && Status_approve_lastest == 1) {
        data.append('Status_approve_user_complete', 'yes');
      } else if (NumberApprover == 2 && Status_approve_lastest == 2) {
        data.append('Status_approve_user_complete', 'yes');
      } else if (NumberApprover == 3 && Status_approve_lastest == 3) {
        data.append('Status_approve_user_complete', 'yes');
      } else if (NumberApprover == 4 && Status_approve_lastest == 4) {
        data.append('Status_approve_user_complete', 'yes');
      } else if (Status_approve_user_complete_Text == 'yes') {
        data.append('Status_approve_user_complete', 'yes');
      } else {
        data.append('Status_approve_user_complete', 'no');
      }

      var requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      console.log('JobIDValue = ', JobIDValue);
      console.log('Employee_fullname_request = ', Employee_fullname_request);
      console.log('data = ', data);
      console.log('urlja = ', urlja);

      fetch(
        `${baseUrl}/State/${urlja}`,
        // 'http://10.0.41.45/phpAPI/State/job_detail_update_by_approver1.php',
        requestOptions,
      )
        .then(response => response.json())
        .then(res => {
          console.log('res is', res.status);
          setTimeout(() => {
            Alert.alert(
              'Complete',
              'บันทึกข้อมูลเรียบร้อย ' + JSON.stringify(res.message),
              [
                {
                  text: 'OK',
                  onPress: () => {
                    pullMe(), console.log('OK Pressed');
                  },
                },
              ],
            );
          }, 5000);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    var request_1_url = `${baseUrl}/State/job_detail.php?Num_req=${Num_req}`;
    var request_2_url = `${baseUrl}/State/job_detail_file.php?Num_req=${Num_req}`;
    setIsLoading(true);
    setHasError(false);
    try {
      setIsLoading(true);
      fetch(request_1_url)
        .then(response => response.json())
        .then(responseData => {
          setState({
            data: responseData.response,
          });
          // console.log('State.data = ', JSON.stringify(State.data[0].Job_ID));
          console.log('State.data = ', JSON.stringify(State.data));
        })
        .then(() => {
          fetch(request_2_url)
            .then(response => response.json())
            .then(responseData => {
              setStateImage({
                data: responseData.response,
              });
              console.log('StateImage.data = ', StateImage.data);
            })
            .done();
        })
        .done();

      setIsLoading(false);
    } catch (err) {
      setHasError(true);
      process.exit(1);
    }
  };

  const checkPermission = async itemFilename => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted.');
        downloadImage(itemFilename);
      } else {
        alert('Storage Permission Not Granted.');
      }
    } catch (error) {
      console.warn('error check permission : ', error);
    }
  };

  const downloadImage = itemFilename => {
    if (itemFilename != '') {
      let date = new Date();
      const IMAGE_PATH = `http://10.0.41.45/phpAPI/State/${itemFilename}`;
      let image_URL = IMAGE_PATH;
      console.log('image_URL = ', image_URL);
      let ext = getExtension(image_URL);

      ext = '.' + ext[0];
      // get config  and fs from RNFetchBlob
      const {config, fs} = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      // console.log(
      //   'PictureDir. ',
      //   PictureDir +
      //     '/image_' +
      //     Math.floor(date.getTime() + date.getSeconds() / 2) +
      //     ext,
      // );
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };

      try {
        RNFetchBlob.config({
          // add this option that makes response data to be stored as a file,
          // this is much more performant.
          fileCache: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
        })
          .fetch('GET', image_URL)
          .then(res => {
            // the temp file path
            console.log('The file saved to ', res.path());

            Alert.alert(
              'Complete',
              'Image Downloaded Successfully With PATH = ' + res.path(),
              [
                {
                  text: 'OK',
                },
              ],
            );
          })
          .catch(err => {
            console.log('err = ', err);
          });
        // config(options)
        //   .fetch('GET', image_URL)
        //   .then(res => {
        //     console.log('res ', JSON.stringify(res));
        //     alert('Image Downloaded Successfully.');
        //   });
      } catch (err) {
        console.warn('err downloadImage() : ', err);
      }
    } else {
      console.warn('itemFilename is not have.');
    }
  };

  const getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.contatiner}>
      <StatusBar backgroundColor="#232f34" barStyle="light-content" />

      {hasError && (
        <View>
          <Text>Something went wrong.</Text>
        </View>
      )}
      {isLoading ? (
        <View style={styles.header}>
          <View
            style={{
              marginBottom: 30,
              flex: 0.15,
              backgroundColor: '#F9aa33',
              minWidth: '98%',
              marginBottom: '1%',
              marginTop: '1%',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 23,
                color: '#232f34',
                fontFamily: 'Kanit-Medium',
                textAlign: 'center',
              }}>
              JOB DETAIL
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: 'Kanit-Light',
                textAlign: 'center',
              }}>
              REQ-XXXX-XX-XXX
            </Text>
          </View>

          <View
            style={{
              width: '98%',
              flex: 1,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: '#344955',
                minWidth: 150,
                height: 150,
                borderRadius: 5,
                flexDirection: 'column',
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
        <View style={styles.header}>
          <View
            style={{
              flex: 0.15,
              backgroundColor: '#F9aa33',
              minWidth: '98%',
              marginBottom: '1%',
              marginTop: '1%',
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 23,
                color: '#232f34',
                fontFamily: 'Kanit-Medium',
                textAlign: 'center',
              }}>
              JOB DETAIL
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: 'Kanit-Light',
                textAlign: 'center',
              }}>
              {Num_req}
            </Text>
          </View>

          <View
            style={{
              width: '98%',
              flex: 0.9,
              backgroundColor: '#ffffff',
              padding: 10,
              borderRadius: 5,
              marginBottom: '1%',
            }}>
            <FlatList
              removeClippedSubviews={true}
              refreshing={false}
              data={State.data}
              style={{flex: 1}}
              refreshControl={
                <RefreshControl
                  colors={['#9Bd35A', '#689F38']}
                  refreshing={refresh}
                  onRefresh={() => pullMe()}
                />
              }
              keyExtractor={(x, i) => i}
              renderItem={({item}) => (
                // <Text>{item.Employee_code_request}</Text>

                <View>
                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>Job_ID</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={styles.textFlatList}>{`${item.Job_ID} `}</Text>
                    </View>
                  </View>
                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>NumReq</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={styles.textFlatList}>{`${item.Num_req} `}</Text>
                    </View>
                  </View>
                  {item.Status == '1' ? (
                    <View style={styles.rowJobDetail}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>Status</Text>
                      </View>
                      <View
                        style={[
                          styles.rowStatus,
                          {
                            backgroundColor: 'gray',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.textFlatList,
                            {fontSize: 15, color: 'white'},
                          ]}>
                          {' '}
                          <Icon
                            name="time-outline"
                            color="white"
                            size={18}
                          />{' '}
                          {`${item.Status_Detail} `}
                        </Text>
                      </View>
                    </View>
                  ) : item.Status == '6' ? (
                    <View style={styles.rowJobDetail}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>Status</Text>
                      </View>
                      <View
                        style={[
                          styles.rowStatus,
                          {
                            backgroundColor: '#00b26f',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.textFlatList,
                            {fontSize: 15, color: 'white'},
                          ]}>
                          {' '}
                          <Icon
                            name="checkmark-circle-outline"
                            color="white"
                            size={18}
                          />{' '}
                          {`${item.Status_Detail} `}
                        </Text>
                      </View>
                    </View>
                  ) : item.Status == '7' ? (
                    <View style={styles.rowJobDetail}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>Status</Text>
                      </View>
                      <View
                        style={[
                          styles.rowStatus,
                          {
                            backgroundColor: '#dc3545',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.textFlatList,
                            {fontSize: 15, color: 'white'},
                          ]}>
                          {' '}
                          <Icon
                            name="close-circle-outline"
                            color="white"
                            size={18}
                          />{' '}
                          {`${item.Status_Detail} `}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.rowJobDetail}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>Status</Text>
                      </View>
                      <View
                        style={[
                          styles.rowStatus,
                          {
                            backgroundColor: '#ffc107',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.textFlatList,
                            {color: 'black', fontSize: 15},
                          ]}>
                          {' '}
                          <Icon
                            name="chatbox-ellipses-outline"
                            color="black"
                            size={18}
                          />{' '}
                          {`${item.Status_Detail} `}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>Update_by</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Update_by} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        EmployeeCode
                      </Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Employee_code_request} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        EmployeeName
                      </Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Employee_fullname_request} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>Job_name</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={styles.textFlatList}>{`${item.Job_name} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>Job_detail</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Job_detail} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Date_desire
                      </Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Date_desire} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Date_create
                      </Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Date_create} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Date_modified
                      </Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Date_modified} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Developer_by
                      </Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Developer_by} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>Handle_by</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.Handle_by} `}</Text>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>Priority</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={styles.textFlatList}>{`${item.Priority} `}</Text>
                    </View>
                  </View>

                  {item.Hardware_objective != '' ? (
                    <View>
                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Hardware_objective
                          </Text>
                        </View>
                        <View style={styles.rowJobDetailText}>
                          <Text
                            style={
                              styles.textFlatList
                            }>{`${item.Hardware_objective} `}</Text>
                        </View>
                      </View>

                      {item.Hardware_objective == 'อื่นๆ' ? (
                        <View style={styles.rowJobDetail}>
                          <View style={styles.rowJobDetailBox}>
                            <Text style={styles.rowJobDetailBoxText}>
                              Hardware_other
                            </Text>
                          </View>
                          <View style={styles.rowJobDetailText}>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Hardware_other} `}</Text>
                          </View>
                        </View>
                      ) : null}

                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Hardware_type
                          </Text>
                        </View>
                        <View style={styles.rowJobDetailText}>
                          <Text
                            style={
                              styles.textFlatList
                            }>{`${item.Hardware_type} `}</Text>
                        </View>
                      </View>

                      {item.Hardware_type == 'อื่นๆ' ? (
                        <View style={styles.rowJobDetail}>
                          <View style={styles.rowJobDetailBox}>
                            <Text style={styles.rowJobDetailBoxText}>
                              Hardware_type_other
                            </Text>
                          </View>
                          <View style={styles.rowJobDetailText}>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Hardware_type_other} `}</Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ) : null}

                  {item.Software_objective != '' ? (
                    <View>
                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Software_objective
                          </Text>
                        </View>
                        <View style={styles.rowJobDetailText}>
                          <Text
                            style={
                              styles.textFlatList
                            }>{`${item.Software_objective} `}</Text>
                        </View>
                      </View>

                      {item.Software_objective == 'อื่นๆ' ? (
                        <View style={styles.rowJobDetail}>
                          <View style={styles.rowJobDetailBox}>
                            <Text style={styles.rowJobDetailBoxText}>
                              Software_other
                            </Text>
                          </View>
                          <View style={styles.rowJobDetailText}>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Software_other} `}</Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ) : null}

                  {item.Intranet != '' ? (
                    <View style={styles.rowJobDetail}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>Intranet</Text>
                      </View>
                      <View style={styles.rowJobDetailText}>
                        <Text
                          style={
                            styles.textFlatList
                          }>{`${item.Intranet} `}</Text>
                      </View>
                    </View>
                  ) : null}

                  {item.Budget_plan != '' ? (
                    <View style={styles.rowJobDetail}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>
                          Budget_plan
                        </Text>
                      </View>
                      <View style={styles.rowJobDetailText}>
                        <Text
                          style={
                            styles.textFlatList
                          }>{`${item.Budget_plan} `}</Text>
                      </View>
                    </View>
                  ) : null}

                  {item.Budget_unplan != '' ? (
                    <View style={styles.rowJobDetail}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>
                          Budget_unplan
                        </Text>
                      </View>
                      <View style={styles.rowJobDetailText}>
                        <Text
                          style={
                            styles.textFlatList
                          }>{`${item.Budget_unplan} `}</Text>
                      </View>
                    </View>
                  ) : null}

                  {/* ---------------------------- STATUS APRROVE -------------------------*/}

                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      marginBottom: 5,
                    }}>
                    <View
                      style={[
                        styles.rowJobDetailBox,
                        {borderBottomRightRadius: 0, borderBottomLeftRadius: 0},
                      ]}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Work Approve Process (%)
                      </Text>
                    </View>
                    <View
                      style={[
                        // styles.rowJobDetailBox,
                        {
                          marginBottom: 5,
                          height: 25,
                          flexDirection: 'row',
                          width: '100%',
                          backgroundColor: '#ffffff50',
                          borderColor: '#000',
                          // borderWidth: 2,
                          borderRadius: 5,
                          borderBottomRightRadius: 5,
                          borderBottomLeftRadius: 5,
                        },
                      ]}>
                      {item.Status_approve == 1 ? (
                        <View
                          style={
                            ([StyleSheet.absoluteFill],
                            {backgroundColor: '#00d928', width: '25%'})
                          }>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              position: 'absolute',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'white',
                              }}>
                              25%
                            </Text>
                          </View>
                        </View>
                      ) : item.Status_approve >= 2 &&
                        item.Status_approve <= 5 ? (
                        <View
                          style={
                            ([StyleSheet.absoluteFill],
                            {backgroundColor: '#00d928', width: '50%'})
                          }>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              position: 'absolute',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'white',
                              }}>
                              50%
                            </Text>
                          </View>
                        </View>
                      ) : item.Status_approve == 6 ? (
                        <View
                          style={
                            ([StyleSheet.absoluteFill],
                            {backgroundColor: '#00d928', width: '75%'})
                          }>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              position: 'absolute',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'white',
                              }}>
                              75%
                            </Text>
                          </View>
                        </View>
                      ) : item.Status_approve == 12 ? (
                        <View
                          style={
                            ([StyleSheet.absoluteFill],
                            {backgroundColor: '#00d928', width: '100%'})
                          }>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              position: 'absolute',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'white',
                              }}>
                              100%
                            </Text>
                          </View>
                        </View>
                      ) : item.Status_approve >= 7 &&
                        item.Status_approve <= 10 ? (
                        <View
                          style={
                            ([StyleSheet.absoluteFill],
                            {backgroundColor: '#dc3545', width: '50%'})
                          }>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              position: 'absolute',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'white',
                              }}>
                              50%
                            </Text>
                          </View>
                        </View>
                      ) : item.Status_approve == 11 ? (
                        <View
                          style={
                            ([StyleSheet.absoluteFill],
                            {backgroundColor: '#dc3545', width: '75%'})
                          }>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              position: 'absolute',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'white',
                              }}>
                              75%
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>

                    <View style={[styles.rowJobDetail, {marginBottom: 0}]}>
                      <View style={styles.rowJobDetailBox}>
                        <Text style={styles.rowJobDetailBoxText}>
                          Status Approve
                        </Text>
                      </View>
                      <View style={styles.rowJobDetailText}>
                        <Text
                          style={
                            styles.textFlatList
                          }>{`${item.Job_status_approve_detail} `}</Text>
                      </View>
                    </View>
                  </View>

                  {/* ---------------------------- STATUS APRROVE -------------------------*/}

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>Requester</Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <View>
                        <Text
                          style={
                            styles.textFlatList
                          }>{`${item.Employee_fullname_request} `}</Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            width: 30,
                            height: 30,
                            borderRadius: 5,
                          }}>
                          <Icon
                            name="checkmark-circle"
                            color="#00ab84"
                            size={30}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            marginLeft: 5,
                          }}>
                          <Text
                            style={{
                              textAlign: 'left',
                              fontWeight: 'bold',
                              fontSize: 15,
                              color: 'black',
                              fontFamily: 'Kanit-Medium',
                            }}>
                            Create at {`${item.Date_create} `}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Requester comment
                      </Text>
                    </View>
                    <View style={styles.rowJobDetailText}>
                      <Text
                        style={
                          styles.textFlatList
                        }>{`${item.User_comment} `}</Text>
                    </View>
                  </View>

                  {/* -------------------------APPROVER คนที่ 1 --------------------- */}
                  {item.Approver1 != null && item.Approver1 != '' ? (
                    <View>
                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 1
                          </Text>
                        </View>

                        <View style={styles.rowJobDetailText}>
                          <View>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver1} `}</Text>
                          </View>

                          {/* Status_approve = 2 - 6 , 8 - 12   checkmark อนุมัติสำเร็จแล้ว */}
                          {(item.Status_approve >= 2 &&
                            item.Status_approve <= 6) ||
                          (item.Status_approve >= 8 &&
                            item.Status_approve <= 12) ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="checkmark-circle"
                                  color="#00ab84"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Approved at {`${item.Approver1_actiondate} `}
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 1  รออนุมัติ
                          item.Status_approve == 1 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="arrow-forward-circle"
                                  color="#0cb7c7"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Inprocess ...
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 7  ไม่อนุมัติ
                          item.Status_approve == 7 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  {`${item.Job_status_approve_detail} `}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            //  Status_approve = 13
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Canceled or Unsuccess
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 1 Comment
                          </Text>
                        </View>

                        {EmployeeCodeLogin == Approver1_code &&
                        Status_approve_lastest == 1 ? (
                          <View
                            style={[
                              styles.rowJobDetailText,
                              {
                                borderRadius: 5,
                                backgroundColor: 'white',
                                marginLeft: 5,
                                width: '100%',
                                flex: 0.6,
                              },
                            ]}>
                            <TextInput
                              placeholder="กรอก comment เพิ่มเติม"
                              onChangeText={onChangeApprover1Comment}
                              value={Approver1CommentText}
                            />
                          </View>
                        ) : (
                          <View style={styles.rowJobDetailText}>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver1_comment} `}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ) : null}

                  {/* -------------------------APPROVER คนที่ 1 --------------------- */}

                  {/* -------------------------APPROVER คนที่ 2 --------------------- */}
                  {item.Approver2 != null && item.Approver2 != '' ? (
                    <View>
                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 2
                          </Text>
                        </View>

                        <View style={styles.rowJobDetailText}>
                          <View>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver2} `}</Text>
                          </View>

                          {/* Status_approve = 3 - 6 , 9 - 12   checkmark อนุมัติสำเร็จแล้ว */}
                          {(item.Status_approve >= 3 &&
                            item.Status_approve <= 6) ||
                          (item.Status_approve >= 9 &&
                            item.Status_approve <= 12) ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="checkmark-circle"
                                  color="#00ab84"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Approved at {`${item.Approver2_actiondate} `}
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 2  รออนุมัติ
                          item.Status_approve == 2 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="arrow-forward-circle"
                                  color="#0cb7c7"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Inprocess ...
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 8  ไม่อนุมัติ
                          item.Status_approve == 8 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  {`${item.Job_status_approve_detail} `}
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 1 ,7  รอ pending
                          item.Status_approve == 1 ||
                            item.Status_approve == 7 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="chatbox-ellipses"
                                  color="gray"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Pending ...
                                </Text>
                              </View>
                            </View>
                          ) : (
                            //  Status_approve = 13
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Canceled or Unsuccess
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 2 Comment
                          </Text>
                        </View>
                        {EmployeeCodeLogin == Approver2_code &&
                        Status_approve_lastest == 2 ? (
                          // {item.Approver2_comment != null ? (
                          <View
                            style={[
                              styles.rowJobDetailText,
                              {
                                borderRadius: 5,
                                backgroundColor: 'white',
                                marginLeft: 5,
                                width: '100%',
                                flex: 0.6,
                              },
                            ]}>
                            <TextInput
                              placeholder="กรอก comment เพิ่มเติม"
                              onChangeText={onChangeApprover2Comment}
                              value={Approver2CommentText}
                              // ref={textInputJobName}
                            />
                          </View>
                        ) : (
                          <View style={styles.rowJobDetailText}>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver2_comment} `}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ) : null}

                  {/* -------------------------APPROVER คนที่ 2 --------------------- */}

                  {/* -------------------------APPROVER คนที่ 3 --------------------- */}
                  {item.Approver3 != null && item.Approver3 != '' ? (
                    <View>
                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 3
                          </Text>
                        </View>

                        <View style={styles.rowJobDetailText}>
                          <View>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver3} `}</Text>
                          </View>

                          {/* Status_approve = 4 - 6 , 10 - 12   checkmark อนุมัติสำเร็จแล้ว */}
                          {(item.Status_approve >= 4 &&
                            item.Status_approve <= 6) ||
                          (item.Status_approve >= 10 &&
                            item.Status_approve <= 12) ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="checkmark-circle"
                                  color="#00ab84"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Approved at {`${item.Approver3_actiondate} `}
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 3  รออนุมัติ
                          item.Status_approve == 3 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="arrow-forward-circle"
                                  color="#0cb7c7"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Inprocess ...
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 9  ไม่อนุมัติ
                          item.Status_approve == 9 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  {`${item.Job_status_approve_detail} `}
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 1 2 ,7 8  รอ pending
                          (item.Status_approve >= 1 &&
                              item.Status_approve <= 2) ||
                            (item.Status_approve >= 7 &&
                              item.Status_approve <= 8) ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="chatbox-ellipses"
                                  color="gray"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Pending ...
                                </Text>
                              </View>
                            </View>
                          ) : (
                            //  Status_approve = 13
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Canceled or Unsuccess
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 3 Comment
                          </Text>
                        </View>
                        {EmployeeCodeLogin == Approver3_code &&
                        Status_approve_lastest == 3 ? (
                          <View
                            style={[
                              styles.rowJobDetailText,
                              {
                                borderRadius: 5,
                                backgroundColor: 'white',
                                marginLeft: 5,
                                width: '100%',
                                flex: 0.6,
                              },
                            ]}>
                            <TextInput
                              placeholder="กรอก comment เพิ่มเติม"
                              onChangeText={onChangeApprover3Comment}
                              value={Approver3CommentText}
                              // ref={textInputJobName}
                            />
                          </View>
                        ) : (
                          <View style={styles.rowJobDetailText}>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver3_comment} `}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ) : null}
                  {/* -------------------------APPROVER คนที่ 3 --------------------- */}

                  {/* -------------------------APPROVER คนที่ 4 --------------------- */}
                  {item.Approver4 != null && item.Approver4 != '' ? (
                    <View>
                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 4
                          </Text>
                        </View>

                        <View style={styles.rowJobDetailText}>
                          <View>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver4} `}</Text>
                          </View>

                          {/* Status_approve = 5 - 6 , 11 - 12   checkmark อนุมัติสำเร็จแล้ว */}
                          {(item.Status_approve >= 5 &&
                            item.Status_approve <= 6) ||
                          (item.Status_approve >= 11 &&
                            item.Status_approve <= 12) ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="checkmark-circle"
                                  color="#00ab84"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Approved at {`${item.Approver4_actiondate} `}
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 4  รออนุมัติ
                          item.Status_approve == 4 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="arrow-forward-circle"
                                  color="#0cb7c7"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Inprocess ...
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 10  ไม่อนุมัติ
                          item.Status_approve == 10 ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  {`${item.Job_status_approve_detail} `}
                                </Text>
                              </View>
                            </View>
                          ) : // Status_approve = 1 ,7  รอ pending
                          (item.Status_approve >= 1 &&
                              item.Status_approve <= 3) ||
                            (item.Status_approve >= 7 &&
                              item.Status_approve <= 9) ? (
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="chatbox-ellipses"
                                  color="gray"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Pending ...
                                </Text>
                              </View>
                            </View>
                          ) : (
                            //  Status_approve = 13
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 30,
                                  height: 30,
                                  borderRadius: 5,
                                }}>
                                <Icon
                                  name="close-circle"
                                  color="red"
                                  size={30}
                                />
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  marginLeft: 5,
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    color: 'black',
                                    fontFamily: 'Kanit-Medium',
                                  }}>
                                  Canceled or Unsuccess
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.rowJobDetail}>
                        <View style={styles.rowJobDetailBox}>
                          <Text style={styles.rowJobDetailBoxText}>
                            Approver User 4 Comment
                          </Text>
                        </View>
                        {EmployeeCodeLogin == Approver4_code &&
                        Status_approve_lastest == 4 ? (
                          <View
                            style={[
                              styles.rowJobDetailText,
                              {
                                borderRadius: 5,
                                backgroundColor: 'white',
                                marginLeft: 5,
                                width: '100%',
                                flex: 0.6,
                              },
                            ]}>
                            <TextInput
                              placeholder="กรอก comment เพิ่มเติม"
                              onChangeText={onChangeApprover4Comment}
                              value={Approver4CommentText}
                              // ref={textInputJobName}
                            />
                          </View>
                        ) : (
                          <View style={styles.rowJobDetailText}>
                            <Text
                              style={
                                styles.textFlatList
                              }>{`${item.Approver4_comment} `}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ) : null}

                  {/* -------------------------APPROVER คนที่ 4 --------------------- */}
                  {/* -------------------------APPROVER IT --------------------- */}
                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Approver User IT
                      </Text>
                    </View>

                    <View style={styles.rowJobDetailText}>
                      <View>
                        <Text
                          style={
                            styles.textFlatList
                          }>{`${item.ApproverIT} `}</Text>
                      </View>

                      {/* Status_approve = 5 - 6 , 11 - 12   checkmark อนุมัติสำเร็จแล้ว */}
                      {item.Status_approve == 6 || item.Status_approve == 12 ? (
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                            }}>
                            <Icon
                              name="checkmark-circle"
                              color="#00ab84"
                              size={30}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              marginLeft: 5,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'black',
                                fontFamily: 'Kanit-Medium',
                              }}>
                              Approved at {`${item.ApproverIT_actiondate} `}
                            </Text>
                          </View>
                        </View>
                      ) : // Status_approve = 4  รออนุมัติ
                      item.Status_approve == 5 ? (
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                            }}>
                            <Icon
                              name="arrow-forward-circle"
                              color="#0cb7c7"
                              size={30}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              marginLeft: 5,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'black',
                                fontFamily: 'Kanit-Medium',
                              }}>
                              Inprocess ...
                            </Text>
                          </View>
                        </View>
                      ) : // Status_approve = 10  ไม่อนุมัติ
                      item.Status_approve == 11 ? (
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                            }}>
                            <Icon name="close-circle" color="red" size={30} />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              marginLeft: 5,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'black',
                                fontFamily: 'Kanit-Medium',
                              }}>
                              {`${item.Job_status_approve_detail} `}
                            </Text>
                          </View>
                        </View>
                      ) : // Status_approve = 1 - 4,7 - 10  รอ pending
                      (item.Status_approve >= 1 && item.Status_approve <= 4) ||
                        (item.Status_approve >= 7 &&
                          item.Status_approve <= 10) ? (
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                            }}>
                            <Icon
                              name="chatbox-ellipses"
                              color="gray"
                              size={30}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              marginLeft: 5,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'black',
                                fontFamily: 'Kanit-Medium',
                              }}>
                              Pending ...
                            </Text>
                          </View>
                        </View>
                      ) : (
                        //  Status_approve = 13
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                            }}>
                            <Icon name="close-circle" color="red" size={30} />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              marginLeft: 5,
                            }}>
                            <Text
                              style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'black',
                                fontFamily: 'Kanit-Medium',
                              }}>
                              Canceled or Unsuccess
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.rowJobDetail}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        Approver IT Comment
                      </Text>
                    </View>

                    {EmployeeCodeLogin == ApproverIT_code &&
                    // EmployeeCodeLogin == '1100528' &&
                    item.Status_approve_user_complete == 'yes' ? (
                      <View
                        style={[
                          styles.rowJobDetailText,
                          {
                            borderRadius: 5,
                            backgroundColor: 'white',
                            marginLeft: 5,
                            width: '100%',
                            flex: 0.6,
                          },
                        ]}>
                        <TextInput
                          placeholder="กรอก comment เพิ่มเติม"
                          onChangeText={onChangeApproverITComment}
                          // onChangeText={onChangeJobNameHandler}
                          // ref={textInputJobName}
                        />
                      </View>
                    ) : (
                      <View style={styles.rowJobDetailText}>
                        <Text
                          style={
                            styles.textFlatList
                          }>{`${item.ApproverIT_comment} `}</Text>
                      </View>
                    )}
                  </View>

                  {EmployeeCodeLogin == ApproverIT_code &&
                  item.Status_approve_user_complete == 'yes' ? (
                    <View style={styles.rowJobDetail}>
                      <View
                        style={{
                          borderRadius: 5,
                          padding: 5,
                          flex: 0.47,
                          padding: 5,
                          backgroundColor: '#00000050',
                        }}>
                        <Text style={styles.rowJobDetailBoxText}>
                          Handle Job
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 5,
                          flex: 0.75,
                          marginLeft: 5,
                          overflow: 'hidden',
                        }}>
                        <Picker
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#00000050',
                            color: 'black',
                          }}
                          selectedValue={DataTextHandleJob}
                          onValueChange={(item, index) =>
                            setDataTextHandleJob(item) +
                            handlePickerHandleJob(item)
                          }>
                          <Picker.Item
                            label="เลือกผู้ Handle งาน ..."
                            value=""
                            style={{
                              fontSize: 13,
                              fontFamily: 'Kanit-Medium',
                              fontWeight: 'bold',
                            }}
                          />
                          {ItemsHandleJob.map((item, index) => {
                            return (
                              <Picker.Item
                                key={index}
                                label={'คุณ ' + item.ThFullName}
                                value={item.ThFullName}
                                style={{
                                  fontSize: 13,
                                  fontFamily: 'Kanit-Medium',
                                }}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    </View>
                  ) : null}

                  {/* -------------------------APPROVER IT --------------------- */}

                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      marginBottom: 5,
                    }}>
                    <View style={styles.rowJobDetailBox}>
                      <Text style={styles.rowJobDetailBoxText}>
                        File Upload
                      </Text>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                      {StateImage.data && Array.isArray(StateImage.data) ? (
                        <FlatList
                          removeClippedSubviews={true}
                          data={StateImage.data}
                          style={{flex: 1}}
                          keyExtractor={(x, i) => i}
                          renderItem={({item}) => (
                            <View>
                              <View>
                                <Text
                                  style={[
                                    styles.textFlatList,
                                    {textAlign: 'left'},
                                  ]}>
                                  {' '}
                                  {`${item.File_name} `}
                                </Text>

                                <Image
                                  style={{
                                    width: '100%',
                                    height: 250,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    resizeMode: 'contain',
                                    borderRadius: 5,
                                  }}
                                  source={{
                                    uri:
                                      'http://10.0.41.45/phpAPI/State/' +
                                      `${item.File_name}`,
                                  }}
                                />
                              </View>
                              <View
                                style={[
                                  styles.rowStatus,
                                  {
                                    backgroundColor: '#00b26f',
                                    marginTop: 5,
                                    flex: 1,
                                    width: '100%',
                                    left: 0,
                                  },
                                ]}>
                                <TouchableHighlight
                                  style={[
                                    styles.textFlatList,
                                    {textAlign: 'left'},
                                  ]}
                                  onPress={() => {
                                    console.log(
                                      'item.File_name = ',
                                      item.File_name,
                                    );

                                    checkPermission(item.File_name);
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontWeight: 'bold',
                                    }}>
                                    <Icon name="save" color="white" size={20} />{' '}
                                    Download File
                                  </Text>
                                </TouchableHighlight>
                              </View>
                            </View>
                          )}
                        />
                      ) : (
                        <Text style={styles.textFlatList}>
                          No file uploded.
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              )}></FlatList>
          </View>

          {/* -------------------------APPROVER IT --------------------- */}

          {/* UPDATE CONDITION SHOW */}

          {
            // EmployeeCodeLogin == '1100528' ? (
            EmployeeCodeLogin == Approver1_code &&
            Status_approve_lastest == 1 ? (
              <View style={styles.btnView}>
                <View style={[styles.btnViewStyle, styles.btnViewStyleUpdate]}>
                  <TouchableOpacity
                    style={[styles.textFlatList, {textAlign: 'left'}]}
                    onPress={() => {
                      UpdateChecker();
                    }}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="checkmark-circle-outline"
                        color="white"
                        size={22}
                      />
                      Approve
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.btnViewStyle, styles.btnViewStyleBack]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsScreen')}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="close-circle-outline"
                        color="white"
                        size={22}
                      />
                      Not Approved
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : EmployeeCodeLogin == Approver2_code &&
              Status_approve_lastest == 2 ? (
              <View style={styles.btnView}>
                <View style={[styles.btnViewStyle, styles.btnViewStyleUpdate]}>
                  <TouchableOpacity
                    style={[styles.textFlatList, {textAlign: 'left'}]}
                    onPress={() => {
                      UpdateChecker();
                    }}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="checkmark-circle-outline"
                        color="white"
                        size={22}
                      />
                      Approve
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.btnViewStyle, styles.btnViewStyleBack]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsScreen')}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="close-circle-outline"
                        color="white"
                        size={22}
                      />
                      Not Approved
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : EmployeeCodeLogin == Approver3_code &&
              Status_approve_lastest == 3 ? (
              <View style={styles.btnView}>
                <View style={[styles.btnViewStyle, styles.btnViewStyleUpdate]}>
                  <TouchableOpacity
                    style={[styles.textFlatList, {textAlign: 'left'}]}
                    onPress={() => {
                      UpdateChecker();
                    }}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="checkmark-circle-outline"
                        color="white"
                        size={22}
                      />
                      Approve
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.btnViewStyle, styles.btnViewStyleBack]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsScreen')}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="close-circle-outline"
                        color="white"
                        size={22}
                      />
                      Not Approved
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : EmployeeCodeLogin == Approver4_code &&
              Status_approve_lastest == 4 ? (
              <View style={styles.btnView}>
                <View style={[styles.btnViewStyle, styles.btnViewStyleUpdate]}>
                  <TouchableOpacity
                    style={[styles.textFlatList, {textAlign: 'left'}]}
                    onPress={() => {
                      UpdateChecker();
                    }}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="checkmark-circle-outline"
                        color="white"
                        size={22}
                      />
                      Approve
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.btnViewStyle, styles.btnViewStyleBack]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsScreen')}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="close-circle-outline"
                        color="white"
                        size={22}
                      />
                      Not Approved
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : // ) : EmployeeCodeLogin == '1100528' &&
            EmployeeCodeLogin == ApproverIT_code &&
              Status_approve_user_complete_Text == 'yes' ? (
              <View style={styles.btnView}>
                <View style={[styles.btnViewStyle, styles.btnViewStyleUpdate]}>
                  <TouchableOpacity
                    style={[styles.textFlatList, {textAlign: 'left'}]}
                    onPress={() => {
                      UpdateChecker();
                    }}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="checkmark-circle-outline"
                        color="white"
                        size={22}
                      />
                      Approve
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.btnViewStyle, styles.btnViewStyleBack]}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsScreen')}>
                    <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                      <Icon
                        name="close-circle-outline"
                        color="white"
                        size={22}
                      />
                      Not Approved
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View></View>
            )
          }
          {/* UPDATE CONDITION SHOW */}

          {/* <View style={[styles.btnViewStyle, styles.btnViewStyleBack]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailsScreen')}>
                  <Text style={[styles.btnViewText, {flexDirection: 'row'}]}>
                    <Icon
                      name="arrow-back-circle-outline"
                      color="white"
                      size={20}
                    />
                    Back
                  </Text>
                </TouchableOpacity>
              </View> */}
        </View>
      )}
    </View>
  );
};

export default SelectJobScreen;

const styles = StyleSheet.create({
  contatiner: {
    // justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#00000010',
  },

  header: {
    flex: 15,
    alignItems: 'center',
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
  textTitle: {
    color: '#000000',
    fontSize: 27,
    fontFamily: 'Kanit-Medium',
  },
  textTitle_login: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Kanit-Medium',
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'Kanit-Medium',
    letterSpacing: 0.25,
    color: 'gray',
  },

  btn: {
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
    borderRadius: 5,
    flex: 0.1,
    alignSelf: 'stretch',
    marginHorizontal: '2%',
    marginBottom: '1%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnViewStyle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 2,
    marginTop: 5,
  },
  btnViewStyleUpdate: {
    backgroundColor: '#00b26f',
  },
  btnViewStyleBack: {
    backgroundColor: '#dc3545',
  },
  btnViewText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    fontFamily: 'Kanit-Medium',
  },

  textFlatList: {
    color: 'black',
    textAlign: 'left',
    fontSize: 17,
    fontFamily: 'Kanit-Medium',
  },

  rowJobDetail: {
    flexDirection: 'row',
    flex: 0.5,
    marginBottom: '1%',
  },
  rowJobDetailBox: {
    flex: 0.4,
    backgroundColor: '#F9aa33',
    borderRadius: 5,
    padding: 5,
  },
  rowJobDetailBoxText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Kanit-Medium',
  },

  rowJobDetailText: {
    flex: 0.5,
    padding: 5,
  },
  rowStatus: {
    flex: 0.55,
    padding: 5,
    width: '60%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
  },
});
