import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Linking,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Svg, {Circle, Path, Line, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const QuickLinks = ({navigation}) => {
  const data = [
    {
      id: 1,
      title: 'MOE DSA Page',
      url: 'https://www.moe.gov.sg/secondary/dsa/application',
    },
    {
      id: 2,
      title: 'SST DSA Page',
      url: 'https://www.sst.edu.sg/student-admission/dsa-selection-criteria/',
    },
    {
      id: 3,
      title: 'SST Open House Website',
      url: 'https://sites.google.com/sst.edu.sg/2024sstopenhouse/open-house-programmes',
    },
    {
      id: 4,
      title: 'Post-Event Survey Form',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLScS2uDSYRciFqyfj0ZXXHMZPUnCTD_5ztUtuvGYrZ_ri-z6dg/viewform',
    },
    {
      id: 5,
      title: 'SST INC Website',
      url: 'https://www.sstinc.org/',
    },
    {
      id: 6,
      title: 'SST Instagram',
      url: 'https://www.instagram.com/sst_edu_sg/?hl=en',
    },
    {
      id: 7,
      title: 'SST Facebook',
      url: 'https://www.facebook.com/ssts.1technologydrive/',
    },
    {
      id: 8,
      title: 'SST Corporate video',
      url: 'https://www.youtube.com/watch?v=mVQkRxVNfL8&t=1s',
    },
  ];

  const handleLinkPress = url => {
    Linking.openURL(url);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleLinkPress(item.url)}
      style={styles.ccaContainer}>
      <Text style={styles.normalText}>{item.title}</Text>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none">
        <Path
          d="M22.5301 16.53L12.5301 26.53C12.3879 26.6625 12.1999 26.7346 12.0056 26.7312C11.8113 26.7278 11.6259 26.6491 11.4885 26.5117C11.3511 26.3742 11.2723 26.1889 11.2689 25.9946C11.2655 25.8003 11.3376 25.6122 11.4701 25.47L20.9388 16L11.4701 6.53003C11.3376 6.38785 11.2655 6.19981 11.2689 6.00551C11.2723 5.81121 11.3511 5.62582 11.4885 5.48841C11.6259 5.35099 11.8113 5.27228 12.0056 5.26885C12.1999 5.26543 12.3879 5.33755 12.5301 5.47003L22.5301 15.47C22.6705 15.6107 22.7494 15.8013 22.7494 16C22.7494 16.1988 22.6705 16.3894 22.5301 16.53Z"
          fill="#EBEBEF"
          fill-opacity="0.7"
        />
      </Svg>
    </TouchableOpacity>
  );

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
              <Text style={styles.header}>Quick links</Text>
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
          <View style={{marginTop: '10%'}} />
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
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
    fontSize: 50,
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
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: '3%',
    marginLeft: '5.7%',
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
  ccaContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEF',
    backgroundColor: 'rgba(235, 235, 239, 0.10)',
    width: windowWidth * 0.9,
    height: 80,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  normalText: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
  },
  ccaTypeHeader: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '400',
    marginLeft: '5%',
    marginBottom: 20,
  },
});
export default QuickLinks;
