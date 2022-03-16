import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  TextInput,
  StatusBar,
  Modal,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

const AddJobScreen = ({navigation}) => {
  const baseUrl = 'http://10.0.41.45/phpAPI';
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [getValue, setGetValue] = useState('');
  const [PickerFile, setPickerFile] = useState('');
  const [multipleFile, setMultipleFile] = useState([]);
  const [UserEmpolyeeCode, setUserEmpolyeeCode] = useState('');
  const [UserThName, setUserThName] = useState('');
  const [UserDepartmentCode, setUserDepartmentCode] = useState('');
  const [date, setDate] = useState(new Date());
  const [SelectedDate, setSelectedDate] = useState({
    dateValue: '',
    dateCheck: false,
  });
  const [open, setOpen] = useState(false);
  const [SelectedTypeOfJob, setSelectedTypeOfJob] = useState({
    typeOfJob: '',
    intranet: false,
    software: false,
    hardware: false,
  });

  const [dataTypeOfJob, setDataTypeOfJob] = React.useState('');

  const [isSelectedIntranet, setSelectionIntranet] = useState(false);

  const [SelectedSoftware, setSelectedSoftware] = useState({
    anotherSoftware: false,
  });

  const [dataSoftware, setDataSoftware] = React.useState('');
  const [SelectedHardwareObjective, setSelectedHardwareObjective] = useState({
    anotherHardwareObjective: false,
  });
  const [dataHardwareObjective, setDataHardwareObjective] = React.useState('');
  const [SelectedHardwareType, setSelectedHardwareType] = useState({
    anotherHardwareType: false,
  });
  const [dataHardwareType, setDataHardwareType] = React.useState('');
  const [Priority, setPriority] = React.useState('Normal');
  const [SelectedBudget, setSelectedBudget] = useState({
    plan: false,
    unplan: false,
  });

  const [dataBudget, setDataBudget] = React.useState('');
  const [SelectedNumberApprover, setSelectedNumberApprover] = useState({
    amount1: false,
    amount2: false,
    amount3: false,
    amount4: false,
  });
  const [SelectedApprover, setSelectedApprover] = useState({
    plan: false,
    unplan: false,
  });

  // const [DataApprover, setDataApprover] = React.useState();
  const [ItemsApprover, setItemsApprover] = React.useState([]);
  const [DataTextApprover, setDataTextApprover] = React.useState('');
  const [DataTextApproverCode, setDataTextApproverCode] = React.useState('');
  const [DataTextApprover2, setDataTextApprover2] = React.useState('');
  const [DataTextApproverCode2, setDataTextApproverCode2] = React.useState('');
  const [DataTextApprover3, setDataTextApprover3] = React.useState('');
  const [DataTextApproverCode3, setDataTextApproverCode3] = React.useState('');
  const [DataTextApprover4, setDataTextApprover4] = React.useState('');
  const [DataTextApproverCode4, setDataTextApproverCode4] = React.useState('');
  const [Datechecker, setDatechecker] = useState('');
  const [NumReq, setNumReq] = useState('');
  const [numRequest, setnumRequest] = useState('');

  const [JobName, setJobName] = useState('');
  const [JobDetail, setJobDetail] = useState('');
  const [JobSoftwareDetail, setJobSoftwareDetail] = useState('');
  const [JobHardwareDetail, setJobHardwareDetail] = useState('');
  const [JobHardwareTypeDetail, setJobHardwareTypeDetail] = useState('');
  const [Costcenter, setCostcenter] = useState('');
  const [Budget, setBudget] = useState('');
  const [CommentUser, setCommentUser] = useState('');
  const [NumberApprover, setNumberApprover] = React.useState('');
  const [NumberApproverSend, setNumberApproverSend] = React.useState('');

  const textInputJobName = React.createRef('');
  const textInputJobDetail = React.createRef('');
  const textInputJobSoftwareDetail = React.createRef('');
  const textInputJobHardwareDetail = React.createRef('');
  const textInputJobHardwareTypeDetail = React.createRef('');
  const textInputCostcenter = React.createRef('');
  const textInputBudget = React.createRef('');
  const textInputCommentUser = React.createRef('');

  const onChangeJobNameHandler = JobName => {
    setJobName(JobName);
  };
  const onChangeJobDetailHandler = JobDetail => {
    setJobDetail(JobDetail);
  };
  const onChangeJobSoftwareDetailHandler = JobSoftwareDetail => {
    setJobSoftwareDetail(JobSoftwareDetail);
  };
  const onChangeJobHardwareDetailHandler = JobHardwareDetail => {
    setJobHardwareDetail(JobHardwareDetail);
  };
  const onChangeJobHardwareTypeDetailHandler = JobHardwareTypeDetail => {
    setJobHardwareTypeDetail(JobHardwareTypeDetail);
  };
  const onChangeCostcenterHandler = Costcenter => {
    setCostcenter(Costcenter);
  };
  const onChangeBudgetHandler = Budget => {
    setBudget(Budget);
  };
  const onChangeCommentUserHandler = CommentUser => {
    setCommentUser(CommentUser);
  };

  const SaveChecker = () =>
    Alert.alert('Submit Data.', 'Are you sure for Submit ?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('OK Pressed'), handleSave();
        },
      },
    ]);

  const handleSave = async () => {
    if (!JobName.trim() || !JobDetail.trim()) {
      alert('Job Name or Job Detail is invalid');
      return;
    }

    var FormData = require('form-data');
    var data = new FormData();

    data.append('Employee_code_request', UserEmpolyeeCode);
    data.append('Employee_fullname_request', UserThName);
    data.append('Job_name', JobName);
    data.append('Job_detail', JobDetail);
    data.append('Date_desire', SelectedDate.dateValue);
    data.append('Num_req', numRequest);
    data.append('Priority', Priority);
    data.append('User_comment', CommentUser);
    // hardware
    data.append('Hardware_objective', dataHardwareObjective);
    data.append('Hardware_other', JobHardwareDetail);
    data.append('Hardware_type', dataHardwareType);
    data.append('Hardware_type_other', JobHardwareTypeDetail);
    // software
    data.append('Software_objective', dataSoftware);
    data.append('Software_other', JobSoftwareDetail);

    if (isSelectedIntranet) {
      data.append('Intranet', 'ขอใช้บริการระบบ Intranet');
    } else {
      data.append('Intranet', '');
    }

    data.append('Budget_plan', Costcenter);
    data.append('Budget_unplan', Budget);

    data.append('NumberApprover', NumberApproverSend);

    data.append('Approver1', DataTextApprover);
    data.append('Approver1_code', DataTextApproverCode);

    data.append('Approver2', DataTextApprover2);
    data.append('Approver2_code', DataTextApproverCode2);

    data.append('Approver3', DataTextApprover3);
    data.append('Approver3_code', DataTextApproverCode3);

    data.append('Approver4', DataTextApprover4);
    data.append('Approver4_code', DataTextApproverCode4);

    console.log('data = ', data);

    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    //////////////// file
    if (multipleFile?.length) {
      const fileToUpload = multipleFile;
      console.log('fileToUpload = ', fileToUpload);

      for (const file of fileToUpload) {
        data.append('files[]', {
          uri: file.path,
          type: file.mime,
          name: file.path.split('/').pop(),
        });
      }
    } else if (PickerFile != '') {
      console.log('wow');

      data.append('files[]', {
        uri: PickerFile.path,
        type: PickerFile.mime,
        name: PickerFile.path.split('/').pop(),
      });
    } else {
      console.log('No file Upload');
    }

    // console.log('data = ', data);
    //////////////// file

    try {
      setIsLoading(true);
      fetch('http://10.0.41.45/phpAPI/State/job_detail_add.php', requestOptions)
        .then(response => response.json())
        .then(res => {
          console.log('res is', res.status);

          if (textInputJobName.current !== null) {
            textInputJobName.current.clear();
          }
          if (textInputJobDetail.current !== null) {
            textInputJobDetail.current.clear();
          }

          if (textInputJobSoftwareDetail.current !== null) {
            textInputJobSoftwareDetail.current.clear();
          }
          if (textInputJobHardwareDetail.current !== null) {
            textInputJobHardwareDetail.current.clear();
          }
          if (textInputJobHardwareTypeDetail.current !== null) {
            textInputJobHardwareTypeDetail.current.clear();
          }
          if (textInputCostcenter.current !== null) {
            textInputCostcenter.current.clear();
          }
          if (textInputBudget.current !== null) {
            textInputBudget.current.clear();
          }
          if (textInputCommentUser.current !== null) {
            textInputCommentUser.current.clear();
          }

          setJobName('');
          setJobDetail('');
          setJobSoftwareDetail('');
          setJobHardwareDetail('');
          setJobHardwareTypeDetail('');
          setCostcenter('');
          setBudget('');
          setCommentUser('');
          setNumberApprover('');

          console.log('Clear Input!!');

          setPriority('Normal');
          setSelectedTypeOfJob({
            typeOfJob: '',
            intranet: false,
            software: false,
            hardware: false,
          });
          setSelectedSoftware({
            anotherSoftware: false,
          });
          setSelectionIntranet(false);
          setSelectedHardwareObjective({
            anotherHardwareObjective: false,
          });
          setSelectedHardwareType({
            anotherHardwareType: false,
          });
          setSelectedBudget({
            plan: false,
            unplan: false,
          });
          setSelectedDate('');
          setDataSoftware('');
          setDataHardwareType('');
          setDataHardwareObjective('');
          setDataTypeOfJob('');
          setDataBudget('');
          setDataTextApprover('');
          setDataTextApprover2('');
          setDataTextApprover3('');
          setDataTextApprover4('');
          setDataTextApproverCode('');
          setDataTextApproverCode2('');
          setDataTextApproverCode3('');
          setDataTextApproverCode4('');

          setSelectedNumberApprover({
            amount1: false,
            amount2: false,
            amount3: false,
            amount4: false,
          });

          setMultipleFile([]);
          setPickerFile('');
          fetchDataDatecheck();

          setTimeout(() => {
            setIsLoading(true);

            setTimeout(() => {
              setIsLoading(false);

              Alert.alert(
                'Complete',
                'บันทึกข้อมูลเรียบร้อย ' + JSON.stringify(res.message),
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('JobAll'), console.log('OK Pressed');
                    },
                  },
                ],
              );
            }, 3000);
          }, 2000);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getValueFunction = () => {
    try {
      AsyncStorage.getItem('userName').then(value => setGetValue(value));
    } catch (e) {
      console.log(e);
    }
  };
  getValueFunction();

  var dateCreate = moment().utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');

  const checkDate = date => {
    if (date != '') {
      // Alert.alert('type date: ' + date);
      const formattedDate = moment(date)
        .utcOffset('+07:00')
        .format('YYYY-MM-DD HH:mm:ss');
      // var formattedDate = format(date, 'MMMM do, yyyy H:mma');

      setSelectedDate({
        dateValue: formattedDate,
        dateCheck: true,
      });
      // Alert.alert(formattedDate);
    } else {
      setSelectedDate({
        dateCheck: false,
      });
    }
  };

  // Type of job ------------------------------------------------------------------------------

  const getSelectedPickerValueTypeOfJob = itemValue => {
    if (itemValue == 'Hardware') {
      // Alert.alert('Selected country is : ' + itemValue);
      setSelectedTypeOfJob({
        typeOfJob: itemValue,
        intranet: false,
        software: false,
        hardware: true,
      });

      setSelectedSoftware({
        anotherSoftware: false,
      });
      setDataSoftware('');
      setSelectionIntranet(false);
    } else if (itemValue == 'Intranet') {
      // Alert.alert('Selected country is : ' + itemValue);
      setSelectedTypeOfJob({
        typeOfJob: itemValue,
        intranet: true,
        software: false,
        hardware: false,
      });
      setSelectedSoftware({
        anotherSoftware: false,
      });
      setDataSoftware('');
      setDataHardwareObjective('');
      setDataHardwareType('');

      setSelectionIntranet(true);
      setSelectedHardwareObjective({
        anotherHardwareObjective: false,
      });
      setSelectedHardwareType({
        anotherHardwareType: false,
      });
    } else if (itemValue == 'Software') {
      // Alert.alert('Selected country is : ' + itemValue);
      setSelectedTypeOfJob({
        typeOfJob: itemValue,
        intranet: false,
        software: true,
        hardware: false,
      });
      setSelectedSoftware({
        anotherSoftware: false,
      });
      setSelectionIntranet(false);
      setSelectedHardwareObjective({
        anotherHardwareObjective: false,
      });
      setSelectedHardwareType({
        anotherHardwareType: false,
      });
      setDataHardwareObjective('');
      setDataHardwareType('');
    } else {
      setSelectedTypeOfJob({
        typeOfJob: itemValue,
        intranet: false,
        software: false,
        hardware: false,
      });
      setSelectedSoftware({
        anotherSoftware: false,
      });
      setSelectionIntranet(false);
      setSelectedHardwareObjective({
        anotherHardwareObjective: false,
      });
      setSelectedHardwareType({
        anotherHardwareType: false,
      });
    }
  };
  // Type of job ------------------------------------------------------------------------------

  // Type of job Intranet ------------------------------------------------------------------------------

  // Type of job Intranet ------------------------------------------------------------------------------

  // Type of job Software ------------------------------------------------------------------------------

  const getSelectedPickerValueSoftware = itemValue => {
    if (itemValue == 'อื่นๆ') {
      setSelectedSoftware({
        anotherSoftware: true,
      });
    } else {
      setSelectedSoftware({
        anotherSoftware: false,
      });
    }
  };

  // Type of job Software ------------------------------------------------------------------------------

  // Type of job Hardware ------------------------------------------------------------------------------

  // Type of job Hardware Objective

  const getSelectedPickerValueHardwareObjective = itemValue => {
    if (itemValue == 'hardware วัตถุประสงค์อื่นๆ') {
      setSelectedHardwareObjective({
        anotherHardwareObjective: true,
      });
    } else {
      setSelectedHardwareObjective({
        anotherHardwareObjective: false,
      });
    }
  };

  // Type of job Hardware Type

  const getSelectedPickerValueHardwareType = itemValue => {
    if (itemValue == 'hardware ประเภทอุปกรณ์อื่นๆ') {
      setSelectedHardwareType({
        anotherHardwareType: true,
      });
    } else {
      setSelectedHardwareType({
        anotherHardwareType: false,
      });
    }
  };

  // Type of job Hardware ------------------------------------------------------------------------------

  // Type of job Priority ------------------------------------------------------------------------------

  // Type of job Priority ------------------------------------------------------------------------------

  // Type of job Budget ------------------------------------------------------------------------------

  const getSelectedPickerValueBudget = itemValue => {
    if (itemValue == 'Plan') {
      setSelectedBudget({
        plan: true,
      });
    } else if (itemValue == 'Unplan') {
      setSelectedBudget({
        unplan: true,
      });
    } else {
      setSelectedBudget({
        plan: false,
        unplan: false,
      });
    }
  };

  // Type of job Budget ------------------------------------------------------------------------------

  // Type of job Approver ------------------------------------------------------------------------------

  const getSelectedPickerValueApprover = itemValue => {
    if (itemValue == 'Plan') {
      setSelectedApprover({
        plan: true,
      });
    } else if (itemValue == 'Unplan') {
      setSelectedApprover({
        unplan: true,
      });
    } else {
      setSelectedApprover({
        plan: false,
        unplan: false,
      });
    }
  };

  // Amount Approver ------------------------------------------------------------------------------

  const getSelectedPickerValueNumberApprover = itemValue => {
    if (itemValue == 'amount1') {
      setSelectedNumberApprover({
        amount1: true,
      });
      setNumberApproverSend(1);
    } else if (itemValue == 'amount2') {
      setSelectedNumberApprover({
        amount2: true,
      });
      setNumberApproverSend(2);
    } else if (itemValue == 'amount3') {
      setSelectedNumberApprover({
        amount3: true,
      });
      setNumberApproverSend(3);
    } else if (itemValue == 'amount4') {
      setSelectedNumberApprover({
        amount4: true,
      });
      setNumberApproverSend(4);
    } else {
      setSelectedNumberApprover({
        amount1: false,
        amount2: false,
        amount3: false,
        amount4: false,
      });
      setNumberApproverSend('');
    }
  };
  // Amount Approver ------------------------------------------------------------------------------

  // Type of job Approver ------------------------------------------------------------------------------
  // 1 ///////////////////////////////////////////////////////
  const handlePickerApprover = itemValue => {
    console.log('itemvalue >> ', itemValue);
    setDataTextApprover(itemValue);

    function findEmployeeCodeApprover(tempItem) {
      return tempItem.ThFullName === itemValue;
    }
    setDataTextApproverCode(
      ItemsApprover.find(findEmployeeCodeApprover).EmployeeCode,
    );
    console.log(DataTextApproverCode);
  };
  // 2 ///////////////////////////////////////////////////////
  const handlePickerApprover2 = itemValue => {
    console.log('itemvalue >> ', itemValue);
    setDataTextApprover2(itemValue);

    function findEmployeeCodeApprover(tempItem) {
      return tempItem.ThFullName === itemValue;
    }
    setDataTextApproverCode2(
      ItemsApprover.find(findEmployeeCodeApprover).EmployeeCode,
    );
    console.log(DataTextApproverCode2);
  };
  // 3 ///////////////////////////////////////////////////////
  const handlePickerApprover3 = itemValue => {
    console.log('itemvalue >> ', itemValue);
    setDataTextApprover3(itemValue);

    function findEmployeeCodeApprover(tempItem) {
      return tempItem.ThFullName === itemValue;
    }
    setDataTextApproverCode3(
      ItemsApprover.find(findEmployeeCodeApprover).EmployeeCode,
    );
    console.log(DataTextApproverCode3);
  };
  // 4 ///////////////////////////////////////////////////////
  const handlePickerApprover4 = itemValue => {
    console.log('itemvalue >> ', itemValue);
    setDataTextApprover4(itemValue);

    function findEmployeeCodeApprover(tempItem) {
      return tempItem.ThFullName === itemValue;
    }
    setDataTextApproverCode4(
      ItemsApprover.find(findEmployeeCodeApprover).EmployeeCode,
    );
    console.log(DataTextApproverCode4);
  };

  // ------------------------------set Approver -----------------------------------------

  const fetchUser = async () => {
    if (getValue) {
      const url = `${baseUrl}/State/vw_Employee.php?EmployeeUsername=${getValue}`;
      const response = await axios.get(url);
      // ตัดอักขระทั้งหมดยกเว้น a-z
      const stringCutEmployeeCode = JSON.stringify(
        response.data.response[0].EmployeeCode,
      ).replace(/"/g, '');
      setUserEmpolyeeCode(stringCutEmployeeCode);
      const stringCutThFullName = JSON.stringify(
        response.data.response[0].ThFullName,
      ).replace(/"/g, '');
      setUserThName(stringCutThFullName);
      const stringCutUserDepartmentCode = JSON.stringify(
        response.data.response[0].DepartmentCode,
      ).replace(/[^a-zA-Z0-9]/g, '');
      setUserDepartmentCode(stringCutUserDepartmentCode);
    }
  };

  if (getValue) {
    fetchUser();
  }

  // console.log('UserDepartmentCode >>', UserDepartmentCode);

  useEffect(() => {
    if (UserDepartmentCode !== '') {
      getCharacters();
    } else {
      console.log('not UserDepartmentCode');
    }
  }, [UserDepartmentCode]);

  const getCharacters = async () => {
    try {
      console.log('UserDepartmentCode in getCharater >> ', UserDepartmentCode);

      const url =
        `${baseUrl}/State/vw_Autherization.php?DepartmentCode=` +
        UserDepartmentCode;
      const response = await axios.get(url);
      // console.log(response.data.response);
      const mapArray = response.data.response.map(
        ({EmployeeCode, ThFullName}) => ({
          ThFullName: ThFullName,
          EmployeeCode: EmployeeCode,
        }),
      );
      setItemsApprover(mapArray);
    } catch (err) {
      console.log(err);
    }
  };
  // ------------------------------set Approver -----------------------------------------

  // ------------------------------set NumReq -----------------------------------------

  const fetchDataDatecheck = async () => {
    const url = `${baseUrl}/State/job_detail_for_check.php`;
    // const response = await axios.get(url);
    // const response = await fetch(url);
    // const json = await response.json();
    const response = await axios.get(url);

    setDatechecker(JSON.stringify(response.data.response[0].Date_create));
    setNumReq(JSON.stringify(response.data.response[0].Num_req));

    const month = moment().format('MM');
    const year = moment().format('Y');
    const x = '001';
    const fisrt_numRequire = 'REQ';
    const x_str = x.replace(/0/g, '');
    const stringCutDatechecker = Datechecker.replace(/"/g, '');
    const stringCutNumreq = NumReq.replace(/"/g, '');
    const mymonth = moment(stringCutDatechecker, 'YYYY-MM-DD').format('MM');
    if (Datechecker.length == 0) {
      const zero = '000';
      const string_int_combine = zero + 1;
      const x_str_for_new = string_int_combine.substr(
        string_int_combine.length - 3,
        3,
      );

      const numRequire =
        fisrt_numRequire + '-' + year + '-' + month + '-' + x_str_for_new;
      console.log('numRequire = ', numRequire);
      setnumRequest(numRequire);
    } else {
      if (mymonth == month) {
        const zero1 = stringCutNumreq.substr(stringCutNumreq.length - 3, 3);
        console.log('zero1 >> ', zero1);

        const int_combine1 = parseInt(zero1) + 1;
        const zeroAdd = '000';
        const string_int_combine1 = zeroAdd + int_combine1;
        const x_str_for_new1 = string_int_combine1.substr(
          string_int_combine1.length - 3,
          3,
        );

        const numRequire =
          fisrt_numRequire + '-' + year + '-' + month + '-' + x_str_for_new1;
        console.log('numRequire = ', numRequire);
        setnumRequest(numRequire);
      } else {
        const zero = '000';
        const string_int_combine = zero + 1;
        const x_str_for_new = string_int_combine.substr(
          string_int_combine.length - 3,
          3,
        );

        const numRequire =
          fisrt_numRequire + '-' + year + '-' + month + '-' + x_str_for_new;
        console.log('numRequire = ', numRequire);
        setnumRequest(numRequire);
      }
    }
  };

  useEffect(() => {
    fetchDataDatecheck();
    console.log('Datechecker >> ', Datechecker);
    console.log('NumReq >>', NumReq);
  }, [Datechecker, NumReq, numRequest]);
  // ------------------------------set NumReq -----------------------------------------

  const chooseFile = async () => {
    setMultipleFile([]);
    setPickerFile('');
    await ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      multiple: true,
      cropping: true,
    })
      .then(image => {
        console.log(image);

        setMultipleFile(image);

        // console.log('image.path.split = ', image.path.split('/').pop());
        // console.log('PickerFile =', PickerFile);
      })
      .catch(error => {
        console.log('error  = ', error);
      });
  };

  const takePhotoFromCamera = async () => {
    setMultipleFile([]);
    setPickerFile('');
    await ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);

        console.log('image.path  = ', image.path);
        console.log('image.size = ', image.size);

        setPickerFile(image);
        // setPickerFile(image);
        console.log('image.path.split = ', image.path.split('/').pop());
        console.log('PickerFile =', PickerFile);
      })
      .catch(error => {
        console.log('error  = ', error);
      });
  };

  return (
    <SafeAreaView style={styles.contatiner}>
      <StatusBar backgroundColor="#232f34" barStyle="light-content" />

      <Animatable.View animation="slideInLeft" style={styles.header}>
        {isLoading ? (
          <View
            style={{
              width: '130%',
              height: '130%',
              backgroundColor: '#00000080',
              position: 'absolute',
              zIndex: 3,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                zIndex: 999,
                width: '50%',
                height: '30%',
                borderRadius: 5,
                position: 'absolute',
                top: '25%',
                left: '25%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                size="large"
                color={'green'}
                style={{height: 100}}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Kanit',
                  textAlign: 'center',
                }}>
                <Icon name="save" color="green" size={20} /> Saving data ...
              </Text>
            </View>
          </View>
        ) : null}

        <View
          style={{
            marginBottom: '1%',
            flex: 0.2,
            zIndex: 1,
            backgroundColor: '#f9aa33',
            minWidth: '98%',
            marginBottom: '1%',
            marginTop: '1%',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: '#232f34',
              fontFamily: 'Kanit-SemiBold',

              textAlign: 'center',
            }}>
            JOB DETAIL
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#232f34',
              fontFamily: 'Kanit-Medium',
              textAlign: 'center',
            }}>
            {numRequest}
          </Text>
        </View>

        <ScrollView
          style={{
            width: '98%',
            flex: 0.8,
            borderRadius: 5,
          }}>
          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>NumReq</Text>
            </View>

            <View style={styles.rowJobDetailBox}>
              <View style={styles.line} />
              <Text style={styles.rowJobDetailBoxText}>{numRequest}</Text>
            </View>
          </View>
          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>Employee Code</Text>
            </View>

            <View style={styles.rowJobDetailBox}>
              <View style={styles.line} />
              <Text style={styles.rowJobDetailBoxText}>{UserEmpolyeeCode}</Text>
            </View>
          </View>
          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>Employee Name</Text>
            </View>

            <View style={styles.rowJobDetailBox}>
              <View style={styles.line} />
              <Text style={styles.rowJobDetailBoxText}>{UserThName}</Text>
            </View>
          </View>

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>Date Create</Text>
            </View>

            <View style={styles.rowJobDetailBox}>
              <View style={styles.line} />
              <Text style={styles.rowJobDetailBoxText}>{dateCreate}</Text>
            </View>
          </View>

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>Due Date
              </Text>
              <View
                style={{
                  position: 'relative',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0.5,
                  width: '80%',
                  top: '15%',
                }}
              />
            </View>

            <View
              style={[
                styles.rowJobDetailBox,
                {
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                },
              ]}>
              <View style={styles.btnChooseDate}>
                <TouchableOpacity
                  title="Choose Date"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setOpen(true)}>
                  <Icon name="calendar-outline" color="#000000" size={20} />
                  <Text
                    style={{
                      margin: 7,
                      color: '#000000',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    Choose Date
                  </Text>
                </TouchableOpacity>
              </View>

              <DatePicker
                modal
                open={open}
                date={date}
                is24hourSource="device"
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  checkDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              {SelectedDate.dateCheck ? (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={[
                      styles.textInput,
                      {
                        fontSize: 16,
                        margin: 5,
                        color: '#000000',
                      },
                    ]}>
                    {SelectedDate.dateValue}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>Job Name
              </Text>
            </View>
            <View style={styles.lineTextinput} />
            <View style={[styles.rowJobDetailBox, {backgroundColor: 'white'}]}>
              <TextInput
                style={[styles.textInput, {height: 100}]}
                placeholder="กรุณากรอกชื่องาน"
                onChangeText={onChangeJobNameHandler}
                ref={textInputJobName}
                value={JobName}
              />
            </View>
          </View>
          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>Job Detail
              </Text>
            </View>
            <View style={styles.lineTextinput} />
            <View style={[styles.rowJobDetailBox, {backgroundColor: 'white'}]}>
              <TextInput
                style={[styles.textInput, {height: 100}]}
                placeholder="กรุณากรอกรายละเอียดงาน"
                onChangeText={onChangeJobDetailHandler}
                ref={textInputJobDetail}
                value={JobDetail}
              />
            </View>
          </View>

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>Type of Job
              </Text>
              <View style={styles.linetype} />
            </View>

            <View
              style={[
                styles.pickerStyle,
                {
                  overflow: 'hidden',
                },
              ]}>
              <Picker
                style={styles.pickerStyleDetail}
                selectedValue={dataTypeOfJob}
                itemStyle={styles.itemStyle}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  setDataTypeOfJob(itemValue) +
                  getSelectedPickerValueTypeOfJob(itemValue)
                }>
                <Picker.Item label="Please Choose ..." value="" />
                <Picker.Item label="Hardware" value="Hardware" />
                <Picker.Item label="Software" value="Software" />
                <Picker.Item label="Intranet" value="Intranet" />
              </Picker>
            </View>
          </View>

          {SelectedTypeOfJob.intranet ? (
            <View style={styles.rowJob}>
              <View style={styles.rowJobDetail}>
                <Text style={styles.rowJobDetailText}>Intranet</Text>
                <View style={styles.linetype} />
              </View>

              <View
                style={[
                  styles.rowJobDetailBox,
                  {flexDirection: 'row', marginBottom: '1%'},
                ]}>
                <CheckBox
                  value={isSelectedIntranet}
                  onValueChange={setSelectionIntranet}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>ขอใช้บริการระบบ Intranet</Text>
              </View>
            </View>
          ) : null}

          {SelectedTypeOfJob.software ? (
            <View style={styles.rowJob}>
              <View style={styles.rowJobDetail}>
                <Text style={styles.rowJobDetailText}>
                  <Text style={{color: 'red'}}>* </Text>
                  วัตถุประสงค์
                </Text>
                <View style={styles.linetype} />
              </View>

              <View
                style={[
                  styles.pickerStyle,
                  {
                    overflow: 'hidden',
                  },
                ]}>
                <Picker
                  style={styles.pickerStyleDetail}
                  selectedValue={dataSoftware}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) =>
                    getSelectedPickerValueSoftware(itemValue) +
                    setDataSoftware(itemValue)
                  }>
                  <Picker.Item label="Please Choose ..." value="" />
                  <Picker.Item label="Software ใหม่" value="Software ใหม่" />
                  <Picker.Item
                    label="ปรับปรุงหรือแก้ไข"
                    value="ปรับปรุงหรือแก้ไข"
                  />
                  <Picker.Item label="ทดแทนของเดิม" value="ทดแทนของเดิม" />
                  <Picker.Item label="อื่นๆ" value="อื่นๆ" />
                </Picker>
              </View>
            </View>
          ) : null}
          {SelectedSoftware.anotherSoftware ? (
            <View style={styles.rowJob}>
              <View style={styles.rowJobDetail}>
                <Text style={styles.rowJobDetailText}>
                  <Text style={{color: 'red'}}>* </Text>Software อื่นๆ
                </Text>
              </View>
              <View style={styles.lineTextinput} />

              <View
                style={[styles.rowJobDetailBox, {backgroundColor: 'white'}]}>
                <TextInput
                  style={[styles.textInput, {height: 100}]}
                  placeholder="กรุณากรอกรายละเอียดงาน Software"
                  onChangeText={onChangeJobSoftwareDetailHandler}
                  ref={textInputJobSoftwareDetail}
                  value={JobSoftwareDetail}
                />
              </View>
            </View>
          ) : null}

          {SelectedTypeOfJob.hardware ? (
            <View>
              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    วัตถุประสงค์
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={dataHardwareObjective}
                    itemStyle={styles.itemStyle}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) =>
                      getSelectedPickerValueHardwareObjective(itemValue) +
                      setDataHardwareObjective(itemValue)
                    }>
                    <Picker.Item label="Please Choose ..." value="" />
                    <Picker.Item
                      label="ซื้ออุปกรณ์ใหม่"
                      value="ซื้ออุปกรณ์ใหม่"
                    />
                    <Picker.Item label="ปรับปรุง" value="ปรับปรุง" />
                    <Picker.Item label="ทดแทนของเดิม" value="ทดแทนของเดิม" />
                    <Picker.Item
                      label="อื่นๆ"
                      value="hardware วัตถุประสงค์อื่นๆ"
                    />
                  </Picker>
                </View>
              </View>

              {SelectedHardwareObjective.anotherHardwareObjective ? (
                <View style={styles.rowJob}>
                  <View style={styles.rowJobDetail}>
                    <Text style={styles.rowJobDetailText}>
                      <Text style={{color: 'red'}}>* </Text>
                      วัตถุประสงค์ Hardware อื่นๆ
                    </Text>
                  </View>
                  <View style={styles.lineTextinput} />

                  <View
                    style={[
                      styles.rowJobDetailBox,
                      {backgroundColor: 'white'},
                    ]}>
                    <TextInput
                      style={[styles.textInput, {height: 100}]}
                      placeholder="กรุณากรอกรายละเอียด Hardware อื่นๆ"
                      onChangeText={onChangeJobHardwareDetailHandler}
                      ref={textInputJobHardwareDetail}
                      value={JobHardwareDetail}
                    />
                  </View>
                </View>
              ) : null}

              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    ประเภทอุปกรณ์
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={dataHardwareType}
                    itemStyle={styles.itemStyle}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) =>
                      getSelectedPickerValueHardwareType(itemValue) +
                      setDataHardwareType(itemValue)
                    }>
                    <Picker.Item label="Please Choose ..." value="" />
                    <Picker.Item label="Computer" value="Computer" />
                    <Picker.Item label="Server" value="Server" />
                    <Picker.Item label="Printer" value="Printer" />
                    <Picker.Item
                      label="อื่นๆ"
                      value="hardware ประเภทอุปกรณ์อื่นๆ"
                    />
                  </Picker>
                </View>
              </View>

              {SelectedHardwareType.anotherHardwareType ? (
                <View style={styles.rowJob}>
                  <View style={styles.rowJobDetail}>
                    <Text style={styles.rowJobDetailText}>
                      <Text style={{color: 'red'}}>* </Text>
                      ประเภท Hardware อื่นๆ
                    </Text>
                  </View>
                  <View style={styles.lineTextinput} />

                  <View
                    style={[
                      styles.rowJobDetailBox,
                      {backgroundColor: 'white'},
                    ]}>
                    <TextInput
                      style={[styles.textInput, {height: 100}]}
                      placeholder="กรุณากรอกประเภท Hardware อื่นๆ"
                      onChangeText={onChangeJobHardwareTypeDetailHandler}
                      ref={textInputJobHardwareTypeDetail}
                      value={JobHardwareTypeDetail}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>
                Priority
              </Text>
              <View style={styles.linetype} />
            </View>

            <View
              style={[
                styles.pickerStyle,
                {
                  overflow: 'hidden',
                },
              ]}>
              <Picker
                style={styles.pickerStyleDetail}
                selectedValue={Priority}
                itemStyle={styles.itemStyle}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  setPriority(itemValue)
                }>
                <Picker.Item label="Normal" value="Normal" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>
          </View>

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>
                Budget
              </Text>
              <View style={styles.linetype} />
            </View>

            <View
              style={[
                styles.pickerStyle,
                {
                  overflow: 'hidden',
                },
              ]}>
              <Picker
                style={styles.pickerStyleDetail}
                selectedValue={dataBudget}
                itemStyle={styles.itemStyle}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  getSelectedPickerValueBudget(itemValue) +
                  setDataBudget(itemValue)
                }>
                <Picker.Item label="Please Choose ..." value="" />

                <Picker.Item label="Plan" value="Plan" />
                <Picker.Item label="Unplan" value="Unplan" />
              </Picker>
            </View>
          </View>

          {SelectedBudget.plan ? (
            <View style={styles.rowJob}>
              <View style={styles.rowJobDetail}>
                <Text style={styles.rowJobDetailText}>
                  <Text style={{color: 'red'}}>* </Text>
                  Budget (Plan)
                </Text>
              </View>
              <View style={styles.lineTextinput} />
              <View
                style={[styles.rowJobDetailBox, {backgroundColor: 'white'}]}>
                <TextInput
                  style={[styles.textInput, {height: 100}]}
                  placeholder="กรุณากรอก Costcenter"
                  onChangeText={onChangeCostcenterHandler}
                  ref={textInputCostcenter}
                  value={Costcenter}
                />
              </View>
            </View>
          ) : null}

          {SelectedBudget.unplan ? (
            <View style={styles.rowJob}>
              <View style={styles.rowJobDetail}>
                <Text style={styles.rowJobDetailText}>
                  <Text style={{color: 'red'}}>* </Text>
                  Budget (UnPlan)
                </Text>
              </View>
              <View style={styles.lineTextinput} />

              <View
                style={[styles.rowJobDetailBox, {backgroundColor: 'white'}]}>
                <TextInput
                  style={[styles.textInput, {height: 100}]}
                  placeholder="กรุณากรอกรายละเอียด"
                  onChangeText={onChangeBudgetHandler}
                  ref={textInputBudget}
                  value={Budget}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>
                Comment
              </Text>
            </View>
            <View style={styles.lineTextinput} />
            <View style={[styles.rowJobDetailBox, {backgroundColor: 'white'}]}>
              <TextInput
                style={[styles.textInput, {height: 100}]}
                placeholder="ข้อคิดเห็นเพิ่มเติม"
                onChangeText={onChangeCommentUserHandler}
                ref={textInputCommentUser}
                value={CommentUser}
              />
            </View>
          </View>

          <View style={styles.rowJob}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>
                Number of Approvers
              </Text>
              <View style={styles.linetype} />
            </View>

            {/* //////////////////////////////////////เลือกผู้อนุมัติ /////////////////////////////*/}

            <View
              style={[
                styles.pickerStyle,
                {
                  overflow: 'hidden',
                },
              ]}>
              <Picker
                style={styles.pickerStyleDetail}
                selectedValue={NumberApprover}
                itemStyle={styles.itemStyle}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  getSelectedPickerValueNumberApprover(itemValue) +
                  setNumberApprover(itemValue)
                }>
                <Picker.Item
                  label="Please Choose amount of Approver ..."
                  value=""
                />
                <Picker.Item label="1" value="amount1" />
                <Picker.Item label="2" value="amount2" />
                <Picker.Item label="3" value="amount3" />
                <Picker.Item label="4" value="amount4" />
              </Picker>
            </View>
          </View>

          {SelectedNumberApprover.amount1 ? (
            <View style={styles.rowJob}>
              <View style={styles.rowJobDetail}>
                <Text style={styles.rowJobDetailText}>
                  <Text style={{color: 'red'}}>* </Text>
                  Approver 1st {DataTextApproverCode}
                </Text>
                <View style={styles.linetype} />
              </View>

              <View
                style={[
                  styles.pickerStyle,
                  {
                    overflow: 'hidden',
                  },
                ]}>
                <Picker
                  style={styles.pickerStyleDetail}
                  selectedValue={DataTextApprover}
                  onValueChange={(item, index) =>
                    setDataTextApprover(item) + handlePickerApprover(item)
                  }>
                  <Picker.Item label="เลือกผู้อนุมัติคนที่ 1 ..." value="" />
                  {ItemsApprover.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={'คุณ ' + item.ThFullName}
                        value={item.ThFullName}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          ) : SelectedNumberApprover.amount2 ? (
            <View>
              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 1st {DataTextApproverCode}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover}
                    onValueChange={(item, index) =>
                      setDataTextApprover(item) + handlePickerApprover(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 1 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 2st {DataTextApproverCode2}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover2}
                    onValueChange={(item, index) =>
                      setDataTextApprover2(item) + handlePickerApprover2(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 2 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
          ) : SelectedNumberApprover.amount3 ? (
            <View>
              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 1st {DataTextApproverCode}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover}
                    onValueChange={(item, index) =>
                      setDataTextApprover(item) + handlePickerApprover(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 1 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 2st {DataTextApproverCode2}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover2}
                    onValueChange={(item, index) =>
                      setDataTextApprover2(item) + handlePickerApprover2(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 2 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 3st {DataTextApproverCode3}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover3}
                    onValueChange={(item, index) =>
                      setDataTextApprover3(item) + handlePickerApprover3(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 3 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
          ) : SelectedNumberApprover.amount4 ? (
            <View>
              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 1st {DataTextApproverCode}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover}
                    onValueChange={(item, index) =>
                      setDataTextApprover(item) + handlePickerApprover(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 1 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 2st {DataTextApproverCode2}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover2}
                    onValueChange={(item, index) =>
                      setDataTextApprover2(item) + handlePickerApprover2(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 2 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 3st {DataTextApproverCode3}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover3}
                    onValueChange={(item, index) =>
                      setDataTextApprover3(item) + handlePickerApprover3(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 3 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.rowJob}>
                <View style={styles.rowJobDetail}>
                  <Text style={styles.rowJobDetailText}>
                    <Text style={{color: 'red'}}>* </Text>
                    Approver 4st {DataTextApproverCode4}
                  </Text>
                  <View style={styles.linetype} />
                </View>

                <View
                  style={[
                    styles.pickerStyle,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                  <Picker
                    style={styles.pickerStyleDetail}
                    selectedValue={DataTextApprover4}
                    onValueChange={(item, index) =>
                      setDataTextApprover4(item) + handlePickerApprover4(item)
                    }>
                    <Picker.Item label="เลือกผู้อนุมัติคนที่ 4 ..." value="" />
                    {ItemsApprover.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={'คุณ ' + item.ThFullName}
                          value={item.ThFullName}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </View>
          ) : null}

          {/* //////////////////////////////////////เลือกผู้อนุมัติ /////////////////////////////*/}

          <View style={[styles.rowJob, {height: '100%'}]}>
            <View style={styles.rowJobDetail}>
              <Text style={styles.rowJobDetailText}>
                <Text style={{color: 'red'}}>* </Text>Upload File
              </Text>
              <View style={styles.linetype} />
            </View>

            <View
              style={[
                styles.rowJobDetailBox,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,
                  borderBottomStartRadius: 0,
                },
              ]}>
              <View
                style={[
                  styles.btnChooseDate,
                  {
                    width: 200,
                  },
                ]}>
                <TouchableOpacity
                  title="Upload File"
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // onPress={() => chooseFile()}>
                  onPress={() => setModalVisible(true)}>
                  <Text
                    style={{
                      margin: 7,
                      color: '#232F34',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    <Icon name="document" color="#232F34" size={20} />
                    Choose File/Take a photo
                  </Text>
                </TouchableOpacity>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View
                      style={{
                        padding: 10,
                        left: 35,
                        alignSelf: 'flex-end',
                        top: -40,
                      }}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Icon
                          name="close-circle-outline"
                          color="white"
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#00b26f',
                        height: 50,
                        borderRadius: 5,
                        width: 200,
                        marginTop: -45,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        title="Upload File"
                        style={{
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          chooseFile();
                          setModalVisible(!modalVisible);
                        }}>
                        <Icon name="document" color="white" size={25} />
                        <Text
                          style={{
                            margin: 7,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 14,
                          }}>
                          Choose From Library
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        backgroundColor: '#0f52ba',
                        height: 50,
                        borderRadius: 5,
                        width: 200,
                        marginTop: '1%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        title="Upload File"
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          takePhotoFromCamera();
                          setModalVisible(!modalVisible);
                        }}>
                        <Icon name="camera" color="white" size={25} />
                        <Text
                          style={{
                            margin: 7,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 14,
                          }}>
                          Take Photo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            <View
              style={{
                width: '100%',
                backgroundColor: '#00000030',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
                borderBottomWidth: 1,
                borderColor: '#3686c970',
                backgroundColor: 'white',
              }}>
              {/* {singlefile != null ? ( */}
              <ScrollView>
                {PickerFile != '' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                    }}>
                    <View style={{flexDirection: 'column', width: '50%'}}>
                      <Text
                        style={[
                          styles.textStyle,
                          {textAlign: 'left', flexShrink: 1},
                        ]}>
                        File Name :{' '}
                        {PickerFile.path.split('/').pop()
                          ? PickerFile.path.split('/').pop()
                          : ''}
                      </Text>
                      <Text style={[styles.textStyle, {textAlign: 'left'}]}>
                        File Size :{' '}
                        {(
                          Number(PickerFile.size ? PickerFile.size : '') *
                          0.000001
                        ).toFixed(2)}{' '}
                        MB
                        {'\n'}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'flex-end',
                        marginLeft: '3%',
                        marginBottom: '1%',
                        marginRight: '1%',
                        width: '45%',
                      }}>
                      <View
                        style={{
                          borderRadius: 5,
                          width: '100%',
                          height: '70%',
                        }}>
                        <Image
                          style={{
                            width: '100%',
                            height: 150,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            resizeMode: 'stretch',
                            borderRadius: 5,
                          }}
                          source={{
                            uri: PickerFile.path,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
                {multipleFile.map((item, key) => (
                  <View
                    key={key}
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                    }}>
                    <View>
                      <View style={{flexDirection: 'column', width: '80%'}}>
                        <Text style={[styles.textStyle, {textAlign: 'left'}]}>
                          File Name:{' '}
                          {item.path.split('/').pop()
                            ? item.path.split('/').pop()
                            : ''}
                          {'\n'}
                          File Size:
                          {(
                            Number(item.size ? item.size : '') * 0.000001
                          ).toFixed(2)}{' '}
                          MB
                          {'\n'}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginVertical: '1%',
                        marginBottom: '1%',
                        borderColor: 'black',
                        borderRadius: 5,
                        width: '40%',
                        height: '70%',
                        marginRight: '5%',
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: 150,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          resizeMode: 'stretch',
                          borderRadius: 5,
                          marginRight: '40%',
                        }}
                        source={{
                          uri: `${item.path}`,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </ScrollView>
              {/* //{' '}
             <Text style={styles.textStyle}>
               // File Name: {singlefile.name ? singleFile.name : ''}
               // {'\n'}
               // Type: {singleFile.type ? singleFile.type : ''}
               // {'\n'}
               // File Size: {singleFile.size ? singleFile.size : ''}
               // {'\n'}
               // URI: {singleFile.uri ? singleFile.uri : ''}
               // {'\n'}
               //{' '}
             </Text> */}
              {/* ) : null} */}
            </View>
          </View>
        </ScrollView>

        <View style={styles.btnView}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => SaveChecker()}>
            <Icon name="save" color="#232F34" size={22} />
            <Text
              style={[
                styles.btnViewText,
                {fontFamily: 'Kanit-Medium', color: '#000000', fontSize: 18},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default AddJobScreen;

const styles = StyleSheet.create({
  contatiner: {
    justifyContent: 'space-between',
    flex: 1,
    // backgroundColor: '#fff',
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
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textTitle: {
    color: '#000000',
    fontSize: 27,
    fontWeight: 'bold',
  },
  textTitle_login: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'normal',
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'gray',
  },

  tinyLogo: {
    borderRadius: 100,
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
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9aa33',

    borderRadius: 5,
    minWidth: '98%',
    marginBottom: '1%',
  },

  btnChooseDate: {
    borderRadius: 5,
    backgroundColor: '#f9aa33',
    height: '80%',
    width: '35%',
    marginLeft: '3%',
    // justifyContent: 'flex-start',
    // alignSelf: 'flex-start',
  },

  btnViewText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3686c9',
    marginLeft: 5,
  },

  rowJob: {
    flexDirection: 'column',
    height: 90,
    marginBottom: '1%',
    backgroundColor: '#ffffff',
  },

  rowJobDetail: {
    width: '100%',
    // backgroundColor: '#3686c990',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  rowJobDetailText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Kanit-Medium',
  },
  rowJobDetailBox: {
    height: 45,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  rowJobDetailBoxText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Kanit-Light',
  },

  pickerStyle: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  pickerStyleDetail: {
    flex: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
    width: '50%',
  },

  textInput: {
    fontSize: 16,
    textAlign: 'center',
  },

  itemStyle: {
    fontSize: 16,
    height: 75,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Kanit-Medium',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: '1%',
    fontSize: 16,
    color: '#000000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#00000095',
    borderRadius: 5,
    padding: 35,
    width: '70%',
    alignItems: 'center',
    // shadowColor: '#00000050',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  line: {
    position: 'relative',
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    width: '80%',
    bottom: '20%',
  },
  linetype: {
    position: 'relative',
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    width: '80%',
    top: '15%',
  },
  lineTextinput: {
    position: 'relative',
    borderBottomColor: '#000000',
    borderBottomWidth: 0.5,
    width: '80%',
    left: '10%',
  },
});
