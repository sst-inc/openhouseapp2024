import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const sigmas = [
  {
    id: 1,
    name: 'Arth Aggarwal',
    position: 'Developer',
  },
  {
    id: 2,
    name: 'Goh Min Wen, Ted',
    position: 'Developer',
  },
  {
    id: 3,
    name: 'Chace Tan Boon Keong',
    position: 'Admin',
  },
  {
    id: 4,
    name: 'Darryan Lim Yuan Sheng',
    position: 'Designer',
  },
  {
    id: 6,
    name: 'Tristan Chay Yu Hung',
    position: 'Consultant',
  },
];

const Credits = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.subContainer}>
        <Text style={styles.subjectHeader}>{item.name}</Text>
        <Text style={styles.subjectHeader}>{item.position}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Quick Links')}>
              <View style={{marginLeft: '5%'}}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="20"
                  viewBox="0 0 26 20"
                  fill="none">
                  <Path
                    d="M26.0001 19C26.0001 19.2652 25.8947 19.5196 25.7072 19.7071C25.5196 19.8947 25.2653 20 25.0001 20C24.7348 20 24.4805 19.8947 24.2929 19.7071C24.1054 19.5196 24.0001 19.2652 24.0001 19C23.9967 16.0836 22.8368 13.2877 20.7746 11.2255C18.7124 9.1633 15.9164 8.00331 13.0001 8.00001H3.4138L7.70755 12.2925C7.8952 12.4801 8.00061 12.7346 8.00061 13C8.00061 13.2654 7.8952 13.5199 7.70755 13.7075C7.51991 13.8951 7.26542 14.0006 7.00005 14.0006C6.73469 14.0006 6.48019 13.8951 6.29255 13.7075L0.292554 7.70751C0.199578 7.61463 0.125819 7.50434 0.0754943 7.38295C0.02517 7.26155 -0.000732422 7.13142 -0.000732422 7.00001C-0.000732422 6.86859 0.02517 6.73846 0.0754943 6.61707C0.125819 6.49567 0.199578 6.38538 0.292554 6.29251L6.29255 0.292507C6.48019 0.104866 6.73469 -0.000549318 7.00005 -0.000549316C7.26542 -0.000549314 7.51991 0.104866 7.70755 0.292507C7.8952 0.480147 8.00061 0.734643 8.00061 1.00001C8.00061 1.26537 7.8952 1.51987 7.70755 1.70751L3.4138 6.00001H13.0001C16.4468 6.00365 19.7512 7.37445 22.1884 9.81164C24.6256 12.2488 25.9964 15.5533 26.0001 19Z"
                    fill="#EBEBEF"
                  />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={{marginBottom: 20}} />
            <View style={styles.topSidebar}>
              <Text style={styles.header}>Credits</Text>
            </View>
            <View style={{marginLeft: '5%'}}></View>
            <View style={{marginTop: 35, flex: 1}} />
            <FlatList
              data={sigmas}
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
    gap: 10,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    color: '#EBEBEF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 40,
    fontWeight: 'normal',
  },
  sectionHeader: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
  },
  subContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEF',
    backgroundColor: 'rgba(235, 235, 239, 0.10)',
    shadowColor: 'rgba(170, 181, 224, 0.30)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 30,
    width: '93.5%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: '3%',
    marginBottom: 20,
  },
  subjectHeader: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 24,
    fontWeight: '400',
  },
  locationText: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 16,
  },
  redirectText: {
    color: '#ABABED',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

export default Credits;
