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
  Image,
} from 'react-native';
import Svg, {Circle, Path, Line, G} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const Layout = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const images = [
    {
      id: 1,
      url: require('./assets/layoutPics/Level1.png'),
    },
    {
      id: 2,
      url: require('./assets/layoutPics/Level2.png'),
    },
    {
      id: 3,
      url: require('./assets/layoutPics/Level3.png'),
    },
    {
      id: 4,
      url: require('./assets/layoutPics/Level4.png'),
    },
    {
      id: 5,
      url: require('./assets/layoutPics/Level5.png'),
    },
    {
      id: 6,
      url: require('./assets/layoutPics/Atrium.png'),
    },
    {
      id: 7,
      url: require('./assets/layoutPics/MakerLab.png'),
    },
    {
      id: 8,
      url: require('./assets/layoutPics/AdmtStudio.png'),
    },
    {
      id: 9,
      url: require('./assets/layoutPics/LO1.png'),
    },
    {
      id: 10,
      url: require('./assets/layoutPics/LO2.png'),
    },
  ];

  const carouselItems = images.map(image => ({
    id: image.id,
    image: image.url,
  }));

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
              <Text style={styles.header}>Layout</Text>
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
          <View style={{flex: 1, marginTop: '20%'}}>
            <Text style={styles.basicText}>Swipe to view the layouts!</Text>
            <Carousel
              loop
              width={windowWidth}
              style={{bottom: '40%'}}
              autoPlay={false}
              data={carouselItems}
              scrollAnimationDuration={1000}
              onSnapToItem={index => console.log('current index:', index)}
              renderItem={({item}) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={item.image}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </View>
              )}
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
});

export default Layout;
