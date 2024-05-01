import React, {useState, useEffect, useId} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import Svg, {Circle, Path, Line, Image, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const events = [
  {
    id: '1',
    time: '9.30 am  ',
    name: 'Academic Panel',
    location: ' @Auditorium',
    timeRange: '  9:30am - 9:45am',
    notifTime: '9.48am',
    actualLocation: 'Auditorium',
  },
  {
    id: '2',
    time: '9.45 am  ',
    name: 'Student Life Panel',
    location: ' @LO2',
    timeRange: '  9:45am - 10:30am',
    notifTime: '9.50am',
    actualLocation: 'Learning Oasis 2',
  },
  {
    id: '3',
    time: '10.30 am',
    name: 'PforSSTPanel',
    location: ' @LO1',
    timeRange: '  10:30am - 10:45am',
    notifTime: '10.51am',
    actualLocation: 'Learning Oasis 1',
  },
  {
    id: '4',
    time: '10.45 am',
    name: 'CCA Performances',
    location: ' @Atrium',
    timeRange: '  10:45am - 11:15am',
    notifTime: '10.45am',
    actualLocation: 'Atrium',
  },
  {
    id: '5',
    time: '11.15 am',
    name: 'Student Life Panel',
    location: ' @LO2',
    timeRange: '  11.15am - 11.30am',
    notifTime: '11.15am',
    actualLocation: 'Learning Oasis 2',
  },
  {
    id: '6',
    time: '11.30 am',
    name: 'Academic Panel',
    location: ' @Auditorium',
    timeRange: '  11:30am - 11:45am',
    notifTime: '11.30am',
    actualLocation: 'Auditorium',
  },
  {
    id: '7',
    time: '11.45 am',
    name: 'PforSSTPanel',
    location: ' @LO1',
    timeRange: '  11.45am - 12.00am',
    notifTime: '11.45am',
    actualLocation: 'Learning Oasis 1',
  },
];

const FlatListItem = ({item}) => {
  const [isSvgOne, setSvgOne] = useState(false);
  const [notificationId, setNotificationId] = useState(null);

  useEffect(() => {
    const loadSvgState = async () => {
      const savedState = await AsyncStorage.getItem(`svgState-${item.id}`);
      setSvgOne(String(savedState) === 'true');
    };

    loadSvgState();
  }, [item.id]);

  const handlePress = async () => {
    // Toggle the state
    setSvgOne(prevState => !prevState);

    // Save the state to AsyncStorage
    await AsyncStorage.setItem(`svgState-${item.id}`, String(!isSvgOne)); 

    // If isSvgOne is set to true, schedule a notification
    if (isSvgOne === true) {
      // Ensure necessary permissions are granted
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert(
          'You need to enable permissions in order to receive notifications',
        );
        return;
      }
 
      if (notificationId) {
        // Cancel the scheduled notification
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        setNotificationId(null);
      } else {
        // Schedule the notification
        const eventTime = item.notifTime.split('.');
        const eventMinute = parseInt(eventTime[1].slice(0, 2), 10);
        let notifSec = (eventMinute - new Date().getMinutes()) * 60;
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          }),
        });
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: item.name,
            body: item.location,
          },
          trigger: {
            seconds: notifSec,
            repeats: false,
          },
        });

        setNotificationId(id);
      }
    }
  };

  return (
    <>
      <View style={styles.eventsContainer}>
        <View style={styles.eventsBox}>
          <Text style={styles.basicText}>{item.time}</Text>
          <View style={styles.eventsDetailsBox}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '4%',
                  marginTop: '3.5%',
                }}>
                <Text style={styles.basicText}>{item.name}</Text>
                <Text style={styles.generalText}>{item.location}</Text>
              </View>
              <Text style={styles.generalText}> {item.timeRange}</Text>
              <View style={{flex: 1, minHeight: 40}}>
                <TouchableOpacity
                  style={{position: 'absolute', top: -30, right: 0}}
                  onPress={handlePress}>
                  {isSvgOne == true ? (
                    <Svg
                      width={40}
                      height={40}
                      fill="#000000"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path d="M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z"></Path>
                      </G>
                    </Svg>
                  ) : (
                    <Svg
                      width={40}
                      height={40}
                      fill="#000000"
                      viewBox="0 0 40 40"
                      xmlnss="http://www.w3.org/2000/svg">
                      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                      <G
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"></G>
                      <G id="SVGRepo_iconCarrier">
                        <Path d="M10,21h4a2,2,0,0,1-4,0ZM3.076,18.383a1,1,0,0,1,.217-1.09L5,15.586V10a7.006,7.006,0,0,1,6-6.92V2a1,1,0,0,1,2,0V3.08A7.006,7.006,0,0,1,19,10v5.586l1.707,1.707A1,1,0,0,1,20,19H4A1,1,0,0,1,3.076,18.383ZM6.414,17H17.586l-.293-.293A1,1,0,0,1,17,16V10A5,5,0,0,0,7,10v6a1,1,0,0,1-.293.707Z"></Path>
                      </G>
                    </Svg>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop: '5%'}} />
    </>
  );
};
const EventsPage = ({navigation}) => {
  const renderItem = ({item}) => <FlatListItem item={item} />;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.imageBackground}
        resizeMode="cover">
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%'}} />
          <View>
            <View style={styles.topSidebar}>
              <Text style={styles.header}>Events</Text>
              <TouchableOpacity
                style={styles.hamburgerIconPress}
                onPress={() => navigation.openDrawer()}>
                <Svg
                  width="48"
                  height="52"
                  viewBox="0 0 48 52"
                  fill="none"
                  style={{marginTop: 11}}>
                  <LinearGradient
                    colors={['#D9D9D9', 'transparent']}
                    style={{borderRadius: 24}}></LinearGradient>
                  <Line x1="12" y1="16.5" x2="36" y2="16.5" stroke="#EBEBEF" />
                  <Line x1="12" y1="24.5" x2="36" y2="24.5" stroke="#EBEBEF" />
                  <Line x1="12" y1="32.5" x2="36" y2="32.5" stroke="#EBEBEF" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.topBox}>
            <View style={styles.redCircle}>
              <Text
                style={{
                  color: '#EBEBEF',
                  fontFamily: 'Lato',
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 16,
                  includeFontPadding: false,
                  textAlignVertical: 'top',
                }}>
                Important!
              </Text>
            </View>
            <View style={styles.topBoxPart1}>
              <Text style={styles.topBoxHeader}>CCA{'\n'}Performance</Text>
              <Svg
                style={{transform: [{translateY: -31}]}}
                xmlns="http://www.w3.org/2000/svg"
                width="191"
                height="191"
                viewBox="0 0 198 172"
                fill="none">
                <G filter="url(#filter0_d_14_166)">
                  <Path
                    d="M156.815 102.98H28.9929C27.1848 102.924 25 100.739 25 98.9885V28.9919C25 27.1848 27.1848 25 28.9929 25H155.007C156.815 25 159 27.1848 159 28.9919V98.9905C159 100.739 156.004 102.982 155.007 102.982L156.815 102.98Z"
                    fill="#2F2E41"
                  />
                </G>
                <Path
                  d="M152.247 28.2018H31.9389C29.9279 28.2018 28.2976 29.832 28.2976 31.8431V96.513C28.2976 98.5241 29.9279 100.154 31.9389 100.154H152.247C154.258 100.154 155.888 98.5241 155.888 96.513V31.8431C155.888 29.832 154.258 28.2018 152.247 28.2018Z"
                  fill="#D1D1E0"
                />
                <Path
                  d="M155.889 60.5786L151.136 62.1404V55.3017H155.448L155.889 60.5786Z"
                  fill="#F2A7AA"
                />
                <Path
                  d="M151.725 57.1943C154.341 57.1943 156.461 55.0753 156.461 52.4614C156.461 49.8474 154.341 47.7284 151.725 47.7284C149.11 47.7284 146.99 49.8474 146.99 52.4614C146.99 55.0753 149.11 57.1943 151.725 57.1943Z"
                  fill="#F2A7AA"
                />
                <Path
                  d="M153.024 51.9931C152.23 51.9679 151.711 51.1688 151.403 50.437C151.094 49.7052 150.777 48.8668 150.042 48.564C149.442 48.3172 148.381 49.9855 147.904 49.5397C147.41 49.0771 147.893 46.6994 148.418 46.2704C148.942 45.8414 149.66 45.7601 150.337 45.7292C151.986 45.6535 153.647 45.7853 155.266 46.1246C156.267 46.3321 157.297 46.6461 158.018 47.3695C158.933 48.2864 159.165 49.6715 159.233 50.9641C159.3 52.2875 159.224 53.6727 158.579 54.8307C157.934 55.9887 156.587 56.8438 155.297 56.5466C155.168 55.8457 155.297 55.1251 155.35 54.4129C155.4 53.7007 155.35 52.9324 154.912 52.3632C154.475 51.794 153.549 51.5725 153.041 52.0744"
                  fill="#36344E"
                />
                <Path
                  d="M154.32 136.665H149.868V142.976H154.32V136.665Z"
                  fill="#F2A7AA"
                />
                <Path
                  d="M145.531 146.798C145.062 146.798 144.647 146.787 144.333 146.759C143.149 146.65 142.021 145.778 141.454 145.267C141.199 145.037 141.118 144.673 141.25 144.359C141.345 144.132 141.536 143.963 141.771 143.896L144.897 143.004L149.958 139.592L150.014 139.693C150.036 139.73 150.533 140.624 150.698 141.23C150.763 141.46 150.746 141.65 150.648 141.799C150.581 141.903 150.488 141.961 150.412 141.995C150.505 142.09 150.791 142.284 151.675 142.427C152.965 142.632 153.237 141.294 153.249 141.238L153.257 141.193L153.296 141.168C153.911 140.773 154.289 140.593 154.419 140.632C154.5 140.658 154.637 140.697 155.002 144.339C155.039 144.454 155.297 145.292 155.12 146.092C154.929 146.964 151.119 146.664 150.359 146.593C150.337 146.593 147.483 146.798 145.531 146.798Z"
                  fill="#36344E"
                />
                <Path
                  d="M166.996 131.704L163.218 134.058L166.56 139.414L170.338 137.059L166.996 131.704Z"
                  fill="#F2A7AA"
                />
                <Path
                  d="M161.979 145.932C161.458 145.932 160.978 145.87 160.636 145.808C160.299 145.749 160.035 145.483 159.982 145.144C159.943 144.903 160.016 144.659 160.178 144.477L162.358 142.068L164.844 136.497L164.945 136.553C164.984 136.572 165.879 137.069 166.339 137.495C166.516 137.657 166.603 137.828 166.6 138.005C166.6 138.129 166.552 138.227 166.505 138.297C166.634 138.33 166.979 138.342 167.804 137.994C169.007 137.486 168.53 136.208 168.508 136.155L168.491 136.113L168.511 136.07C168.822 135.409 169.046 135.058 169.178 135.022C169.26 134.999 169.397 134.963 171.636 137.857C171.728 137.932 172.39 138.51 172.665 139.281C172.966 140.122 169.574 141.88 168.892 142.225C168.872 142.242 165.321 144.821 163.865 145.553C163.287 145.845 162.602 145.935 161.979 145.935V145.932Z"
                  fill="#36344E"
                />
                <Path
                  d="M157.597 83.8761H145.132L144.002 95.4646L148.951 138.283H155.314L152.769 113.552L163.09 135.88L168.746 131.924L160.686 111.079C160.686 111.079 163.564 92.9215 161.303 88.3988C159.042 83.8761 157.597 83.8761 157.597 83.8761Z"
                  fill="#36344E"
                />
                <Path
                  d="M163.797 84.5827H144.002L149.941 59.0028H158.565L163.797 84.5827Z"
                  fill="#353267"
                />
                <Path
                  d="M139.087 58.501C138.77 56.9448 139.35 55.5232 140.377 55.327C141.407 55.1307 142.495 56.2326 142.812 57.7888C142.947 58.4084 142.927 59.0505 142.751 59.6646L144.002 66.2733L140.767 66.7836L139.878 60.2141C139.477 59.7122 139.204 59.1262 139.087 58.501Z"
                  fill="#F2A7AA"
                />
                <Path
                  d="M158.355 59.0028H150.749L145.621 69.251L143.688 61.5712L139.437 62.0226C139.437 62.0226 140.442 77.029 144.838 76.5215C149.234 76.014 159.482 62.4937 158.355 59.0028Z"
                  fill="#353267"
                />
                <Path
                  d="M166.85 97.9825C167.167 99.5386 166.586 100.96 165.559 101.156C164.529 101.353 163.441 100.251 163.124 98.6947C162.989 98.075 163.009 97.4329 163.186 96.8189L161.934 90.2101L165.169 89.6998L166.058 96.2693C166.46 96.7712 166.732 97.3572 166.85 97.9825Z"
                  fill="#F2A7AA"
                />
                <Path
                  d="M154.02 59.0028C154.02 59.0028 158.343 58.8206 158.568 59.0028C159.746 59.9674 166.667 94.7075 166.667 94.7075H162.285L154.023 59.0028H154.02Z"
                  fill="#353267"
                />
                <G filter="url(#filter1_d_14_166)">
                  <Path
                    d="M155.889 60.5786L151.136 62.1404V55.3017H155.448L155.889 60.5786Z"
                    fill="#F2A7AA"
                  />
                  <Path
                    d="M151.725 57.1943C154.341 57.1943 156.461 55.0753 156.461 52.4614C156.461 49.8474 154.341 47.7284 151.725 47.7284C149.11 47.7284 146.99 49.8474 146.99 52.4614C146.99 55.0753 149.11 57.1943 151.725 57.1943Z"
                    fill="#F2A7AA"
                  />
                  <Path
                    d="M153.024 51.9931C152.23 51.9679 151.711 51.1688 151.403 50.437C151.094 49.7052 150.777 48.8668 150.042 48.564C149.442 48.3172 148.381 49.9855 147.904 49.5397C147.41 49.0771 147.893 46.6994 148.418 46.2704C148.942 45.8414 149.66 45.7601 150.337 45.7292C151.986 45.6535 153.647 45.7853 155.266 46.1246C156.267 46.3321 157.297 46.6461 158.018 47.3695C158.933 48.2864 159.165 49.6715 159.233 50.9641C159.3 52.2875 159.224 53.6727 158.579 54.8307C157.934 55.9887 156.587 56.8438 155.297 56.5466C155.168 55.8457 155.297 55.1251 155.35 54.4129C155.4 53.7007 155.35 52.9324 154.912 52.3632C154.475 51.794 153.549 51.5725 153.041 52.0744"
                    fill="#36344E"
                  />
                  <Path
                    d="M154.32 136.665H149.868V142.976H154.32V136.665Z"
                    fill="#F2A7AA"
                  />
                  <Path
                    d="M145.531 146.798C145.062 146.798 144.647 146.787 144.333 146.759C143.149 146.65 142.021 145.778 141.454 145.267C141.199 145.037 141.118 144.673 141.25 144.359C141.345 144.132 141.536 143.963 141.771 143.896L144.897 143.004L149.958 139.592L150.014 139.693C150.036 139.73 150.533 140.624 150.698 141.23C150.763 141.46 150.746 141.65 150.648 141.799C150.581 141.903 150.488 141.961 150.412 141.995C150.505 142.09 150.791 142.284 151.675 142.427C152.965 142.632 153.237 141.294 153.249 141.238L153.257 141.193L153.296 141.168C153.911 140.773 154.289 140.593 154.419 140.632C154.5 140.658 154.637 140.697 155.002 144.339C155.039 144.454 155.297 145.292 155.12 146.092C154.929 146.964 151.119 146.664 150.359 146.593C150.337 146.593 147.483 146.798 145.531 146.798Z"
                    fill="#36344E"
                  />
                  <Path
                    d="M166.996 131.704L163.218 134.058L166.56 139.414L170.338 137.059L166.996 131.704Z"
                    fill="#F2A7AA"
                  />
                  <Path
                    d="M161.979 145.932C161.457 145.932 160.978 145.87 160.635 145.808C160.299 145.749 160.035 145.483 159.982 145.144C159.943 144.903 160.015 144.659 160.178 144.477L162.358 142.068L164.844 136.497L164.945 136.553C164.984 136.572 165.879 137.069 166.339 137.495C166.516 137.657 166.603 137.828 166.6 138.005C166.6 138.129 166.552 138.227 166.505 138.297C166.634 138.33 166.979 138.342 167.803 137.994C169.007 137.486 168.53 136.208 168.508 136.155L168.491 136.113L168.51 136.07C168.822 135.409 169.046 135.058 169.178 135.022C169.26 134.999 169.397 134.963 171.636 137.857C171.728 137.932 172.39 138.51 172.665 139.281C172.966 140.122 169.574 141.88 168.892 142.225C168.872 142.242 165.321 144.821 163.865 145.553C163.287 145.845 162.602 145.935 161.979 145.935V145.932Z"
                    fill="#36344E"
                  />
                  <Path
                    d="M157.597 83.8761H145.132L144.002 95.4646L148.951 138.283H155.314L152.769 113.552L163.09 135.88L168.746 131.923L160.686 111.079C160.686 111.079 163.564 92.9214 161.303 88.3988C159.042 83.8761 157.597 83.8761 157.597 83.8761Z"
                    fill="#36344E"
                  />
                  <Path
                    d="M163.797 84.5827H144.002L149.941 59.0028H158.565L163.797 84.5827Z"
                    fill="#353267"
                  />
                  <Path
                    d="M139.087 58.501C138.77 56.9448 139.35 55.5232 140.377 55.327C141.407 55.1307 142.495 56.2326 142.812 57.7888C142.947 58.4084 142.927 59.0505 142.751 59.6646L144.002 66.2733L140.767 66.7836L139.878 60.2141C139.477 59.7122 139.204 59.1262 139.087 58.501Z"
                    fill="#F2A7AA"
                  />
                  <Path
                    d="M158.355 59.0028H150.749L145.621 69.251L143.688 61.5712L139.437 62.0226C139.437 62.0226 140.442 77.029 144.838 76.5215C149.234 76.014 159.482 62.4937 158.355 59.0028Z"
                    fill="#353267"
                  />
                  <Path
                    d="M166.85 97.9824C167.167 99.5386 166.586 100.96 165.559 101.156C164.529 101.353 163.441 100.251 163.124 98.6946C162.989 98.075 163.009 97.4329 163.186 96.8188L161.934 90.2101L165.169 89.6998L166.058 96.2693C166.46 96.7712 166.732 97.3572 166.85 97.9824Z"
                    fill="#F2A7AA"
                  />
                  <Path
                    d="M154.02 59.0028C154.02 59.0028 158.343 58.8206 158.568 59.0028C159.746 59.9674 166.667 94.7075 166.667 94.7075H162.285L154.023 59.0028H154.02Z"
                    fill="#353267"
                  />
                </G>
              </Svg>
            </View>
            <View style={styles.topBoxPart2}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <Path
                  d="M10 5C9.38193 5 8.77775 5.18328 8.26384 5.52666C7.74994 5.87004 7.3494 6.3581 7.11288 6.92911C6.87635 7.50013 6.81447 8.12847 6.93505 8.73466C7.05562 9.34085 7.35325 9.89767 7.79029 10.3347C8.22733 10.7717 8.78415 11.0694 9.39034 11.19C9.99653 11.3105 10.6249 11.2486 11.1959 11.0121C11.7669 10.7756 12.255 10.3751 12.5983 9.86116C12.9417 9.34725 13.125 8.74307 13.125 8.125C13.125 7.2962 12.7958 6.50134 12.2097 5.91529C11.6237 5.32924 10.8288 5 10 5ZM10 10C9.62916 10 9.26665 9.89003 8.95831 9.68401C8.64996 9.47798 8.40964 9.18514 8.26773 8.84253C8.12581 8.49992 8.08868 8.12292 8.16103 7.75921C8.23337 7.39549 8.41195 7.0614 8.67417 6.79917C8.9364 6.53695 9.27049 6.35837 9.63421 6.28603C9.99792 6.21368 10.3749 6.25081 10.7175 6.39273C11.0601 6.53464 11.353 6.77496 11.559 7.08331C11.765 7.39165 11.875 7.75416 11.875 8.125C11.875 8.62228 11.6775 9.09919 11.3258 9.45083C10.9742 9.80246 10.4973 10 10 10ZM10 1.25C8.17727 1.25207 6.42979 1.97706 5.14092 3.26592C3.85206 4.55479 3.12707 6.30227 3.125 8.125C3.125 10.5781 4.25859 13.1781 6.40625 15.6445C7.37127 16.759 8.45739 17.7626 9.64453 18.6367C9.74962 18.7103 9.87482 18.7498 10.0031 18.7498C10.1314 18.7498 10.2566 18.7103 10.3617 18.6367C11.5467 17.7623 12.6307 16.7587 13.5938 15.6445C15.7383 13.1781 16.875 10.5781 16.875 8.125C16.8729 6.30227 16.1479 4.55479 14.8591 3.26592C13.5702 1.97706 11.8227 1.25207 10 1.25ZM10 17.3438C8.70859 16.3281 4.375 12.5977 4.375 8.125C4.375 6.63316 4.96763 5.20242 6.02252 4.14752C7.07742 3.09263 8.50816 2.5 10 2.5C11.4918 2.5 12.9226 3.09263 13.9775 4.14752C15.0324 5.20242 15.625 6.63316 15.625 8.125C15.625 12.5961 11.2914 16.3281 10 17.3438Z"
                  fill="#EBEBEF"
                  fill-opacity="0.7"
                />
              </Svg>
              <Text style={styles.generalText}> Atrium</Text>
              <Text> </Text>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none">
                <Path
                  d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM10 16.875C8.64026 16.875 7.31105 16.4718 6.18046 15.7164C5.04987 14.9609 4.16868 13.8872 3.64833 12.6309C3.12798 11.3747 2.99183 9.99237 3.2571 8.65875C3.52238 7.32513 4.17716 6.10013 5.13864 5.13864C6.10013 4.17716 7.32514 3.52237 8.65876 3.2571C9.99238 2.99183 11.3747 3.12798 12.631 3.64833C13.8872 4.16868 14.9609 5.04987 15.7164 6.18045C16.4718 7.31104 16.875 8.64025 16.875 10C16.8729 11.8227 16.1479 13.5702 14.8591 14.8591C13.5702 16.1479 11.8227 16.8729 10 16.875ZM15 10C15 10.1658 14.9342 10.3247 14.8169 10.4419C14.6997 10.5592 14.5408 10.625 14.375 10.625H10C9.83424 10.625 9.67527 10.5592 9.55806 10.4419C9.44085 10.3247 9.375 10.1658 9.375 10V5.625C9.375 5.45924 9.44085 5.30027 9.55806 5.18306C9.67527 5.06585 9.83424 5 10 5C10.1658 5 10.3247 5.06585 10.4419 5.18306C10.5592 5.30027 10.625 5.45924 10.625 5.625V9.375H14.375C14.5408 9.375 14.6997 9.44085 14.8169 9.55806C14.9342 9.67527 15 9.83424 15 10Z"
                  fill="#EBEBEF"
                  fill-opacity="0.7"
                />
              </Svg>
              <Text style={styles.generalText}> 1045 - 11:15</Text>
            </View>
          </View>
          <View style={styles.seperator}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="2"
              viewBox="0 0 334 2"
              fill="none">
              <Path
                d="M333 1.49997C333.276 1.49997 333.5 1.27611 333.5 0.999971C333.5 0.723828 333.276 0.499971 333 0.499971L333 1.49997ZM4.37114e-08 1.5L333 1.49997L333 0.499971L-4.37114e-08 0.5L4.37114e-08 1.5Z"
                fill="#EBEBEF"
              />
            </Svg>
            <Text style={styles.basicText}>Now</Text>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="2"
              viewBox="0 0 334 2"
              fill="none">
              <Path
                d="M333 1.49997C333.276 1.49997 333.5 1.27611 333.5 0.999971C333.5 0.723828 333.276 0.499971 333 0.499971L333 1.49997ZM4.37114e-08 1.5L333 1.49997L333 0.499971L-4.37114e-08 0.5L4.37114e-08 1.5Z"
                fill="#EBEBEF"
              />
            </Svg>
          </View>
          <View style={{marginTop: '5%'}} />
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSidebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
  },
  header: {
    color: '#EBEBEF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: RFValue(40),
    fontWeight: 'normal',
  },
  discover: {
    color: 'rgba(235, 235, 239, 0.60)',
    opacity: 0.7,
    marginLeft: '5%',
    marginTop: '7%',
    fontSize: 16,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  topBox: {
    width: '95%',
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEF',
    backgroundColor: 'rgba(235, 235, 239, 0.10)',
    shadowColor: 'rgba(170, 181, 224, 0.30)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 30,
    shadowOpacity: 1,
    marginLeft: '3%',
    marginTop: '7%',
    position: 'relative',
  },
  redCircle: {
    width: '25%',
    height: '15%',
    borderRadius: 10,
    backgroundColor: '#CD4F4F',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#EBEBEF',
    marginLeft: '0%',
    top: '-5.7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBoxHeader: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 32,
    fontWeight: '400',
  },
  topBoxPart1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginTop: '5%',
  },
  topBoxPart2: {
    flexDirection: 'row',
    marginLeft: '5%',
    position: 'absolute',
    marginTop: '28%',
  },
  generalText: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
  },
  seperator: {
    marginTop: '9%',
    flexDirection: 'row',
    display: 'inline-flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  basicText: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  eventsContainer: {
    flexDirection: 'column',
  },
  eventsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 19,
  },
  eventsDetailsBox: {
    width: '69.3%',
    height: 64,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(235, 235, 239, 0.20)',
    backgroundColor: 'rgba(235, 235, 239, 0.20)',
  },
});

export default EventsPage;
