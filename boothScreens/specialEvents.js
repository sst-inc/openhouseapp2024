import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import {data} from './BoothInfo';
import SearchBar from 'react-native-search-bar';
import {useNavigation} from '@react-navigation/native';
import {LogBox} from 'react-native';

const specialData = [
  {
    id: '24',
    type: 'Special',
    header: 'DSA booth',
    description:
      'Please approach us here if you have any questions regarding the DSA selection process!',
    location: 'Infohub',
    image: require('../assets/layoutPics/Level5.png'),
    sstLoc: 'L5 Block A',
  },
  {
    id: '25',
    type: 'Special',
    header: 'Academic panel',
    description:
      'Join our School Leaders and various academic staff in a conversation to find out more about the SST curriculum and opportunities that students are presented with!',
    location: 'Auditorium',
    image: require('../assets/layoutPics/Level4.png'),
    sstLoc: 'L4 Block A',
  },
  {
    id: '26',
    type: 'Special',
    header: 'Alumni panel',
    description:
      'Explore the post-secondary experience with our past students! Here, you can speak to our alumni who are at various stages of their post-secondary journey and find out more on how the SST experience has influenced them in the various pathways that they are currently on. ',
    location: 'MPR3',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '27',
    type: 'Special',
    header: 'PforSST',
    description:
      'Hear about the SST experience from the perspective of a parent! Come and speak to our friendly PforSST members and join our panel discussion where you can gain some insights on various aspects of the school and have some of your questions answered!',
    location: 'LO1',
    image: require('../assets/layoutPics/LO1.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '28',
    type: 'Special',
    header: 'Student life panel',
    description:
      'Take the chance to speak with and ask students about student life @ SST.',
    location: 'LO1',
    image: require('../assets/layoutPics/LO2.png'),
    sstLoc: 'L3 Block c',
  },
  {
    id: '29',
    type: 'Special',
    header: 'SST Inc',
    description:
      'SST Inc. is part of SST’s technology talent development programme. It aims to be locally and globally recognised as an incubator that fosters a deep interest in Infocomm Technology among our students and nurtures their app development and entrepreneurship talents to impact their community positively.',
    location: 'SST Inc HQ',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '30',
    type: 'Special',
    header: 'IDP',
    description:
      'The SST-Ngee Ann Polytechnic Integrated Diploma Programme (SST-NP IDP) offers a first-of-its-kind STEAM (Science, Technology, Engineering, Aesthetics, and Mathematics) - related through-train programme, providing Secondary Three students with a direct pathway to NP. This programme emphasises applied learning and engages students in a wide range of STEM fields via capstone projects with start-ups, industry partners and the community. Furthermore, students gain valuable 21st century skills, becoming innovative problem solvers and active contributors to society.',
    location: 'ADMT Studio',
    image: require('../assets/layoutPics/AdmtStudio.png'),
    sstLoc: 'L2 Block C',
  },
];

const special = () => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = text => {
    setSearchTerm(text);
  };

  const handlePress1 = () => {
    setSearchBarVisible(!isSearchBarVisible);
  };

  const search = query => {
    const trimmedQuery = query.trim().toLowerCase();

    if (['applied', 'applied subjects'].includes(trimmedQuery)) {
      navigation.navigate('AppliedSub');
    } else if (['mainstream', 'mainstream subjects'].includes(trimmedQuery)) {
      navigation.navigate('MainStream');
    } else if (
      ['cca', 'co-curricular activities', 'co curricular activities'].includes(
        trimmedQuery,
      )
    ) {
      navigation.navigate('CCA');
    } else {
      const results = data.filter(item => {
        return (
          item.header &&
          String(item.header).toLowerCase().includes(trimmedQuery)
        );
      });

      if (results.length > 0) {
        navigation.navigate('ADeets', {item: results[0]});
      }
    }
  };

  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity
          style={styles.ccaContainer}
          onPress={() => handlePress(item)}>
          <Text style={styles.normalText}>{item.header}</Text>
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
      </View>
    );
  };
  const handlePress = item => {
    navigation.navigate('ADeets', {item});
  };
  LogBox.ignoreAllLogs();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background2.png')}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView>
          <View style={{marginTop: '5%'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
              <Text style={styles.header}>Booth Info</Text>
              <TouchableOpacity onPress={handlePress1}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  style={{marginTop: 10}}>
                  <Path
                    d="M26.8333 13.6667C26.8333 20.9384 20.9384 26.8333 13.6667 26.8333C6.39492 26.8333 0.5 20.9384 0.5 13.6667C0.5 6.39492 6.39492 0.5 13.6667 0.5C20.9384 0.5 26.8333 6.39492 26.8333 13.6667Z"
                    stroke="#EBEBEF"
                  />
                  <Line
                    x1="23.0203"
                    y1="23.6464"
                    x2="31.0203"
                    y2="31.6464"
                    stroke="#EBEBEF"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.sectionHeader}>Special booths</Text>
            </View>
            {isSearchBarVisible && (
              <View
                style={{
                  marginTop: 20,
                  height: Platform.OS === 'ios' ? 51 : 41,
                  width: '90%',
                  marginLeft: '5%',
                  borderRadius: 20,
                  overflow: 'hidden',
                }}>
                <SearchBar
                  placeholder="Search"
                  onChangeText={handleChange}
                  onSearchButtonPress={() => {
                    const results = search(searchTerm);
                    console.log('Search results:', results);
                  }}
                  onCancelButtonPress={() => setSearchBarVisible(false)}
                  tintColor="white"
                  textColor="white"
                  textFieldBackgroundColor="rgba(169, 169, 169, 0.6)" // grey, slightly transparent
                  hideBackground={true}
                />
              </View>
            )}
            <View
              style={{
                width: '100%',
                height: 160,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.normalText}>
                Fun booths and activities for you to explore!
              </Text>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                <Text style={styles.locationText}> (come sst inc)</Text>
              </View>
            </View>
            <ScrollView style={{marginBottom: '135%'}}>
              <View>
                <FlatList
                  data={specialData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  nestedScrollEnabled={false}
                />
              </View>
            </ScrollView>
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
    textAlign: 'left',
    marginLeft: '5%',
  },
  normalText: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
  },
  locationText: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 10,
  },
  ccaContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEF',
    backgroundColor: 'rgba(235, 235, 239, 0.10)',
    width: '90%',
    height: 70,
    marginBottom: 20,
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

export default special;
