import React, {useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchBar from 'react-native-search-bar';
import MainStream from './MainStream';
import CCA from './CCA';
import AppliedSub from './AppliedSub';
import AppliedDetails from './AppliedDetails';

const Stack = createNativeStackNavigator();

const BoothInfo = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={BoothInfoParentPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainStream"
        component={MainStream}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CCA" component={CCA} options={{headerShown: false}} />
      <Stack.Screen
        name="AppliedSub"
        component={AppliedSub}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ADeets"
        component={AppliedDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const data = [
  {
    id: '1',
    type: 'CCA',
    header: 'Athletics',
    description:
      'SST Athletics offers focused training in long-distance and short-distance events, fostering athletic growth and excellence. Athletes gain resilience and sportsmanship through national competitions. Alongside physical training, they develop intellectual and interpersonal skills for their future.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '2',
    type: 'CCA',
    header: 'Fencing',
    description:
      "SST Fencing offers engaging sessions with dedicated teachers and coaches to learn fundamental fencing skills. We prepare fencers for lifelong excellence in the sport and provide opportunities for competition at Zonal and National levels. Fencing instils values like teamwork, respect, perseverance, and self-discipline. Contrary to misconceptions, fencing is a physically demanding sport akin to a fast-paced chess game. In Olympic fencing, movements are lightning-fast, requiring strength and quick thinking. If you're up for the challenge, join us and discover the intensity and skill of fencing!",
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '3',
    type: 'CCA',
    header: 'Astronomy',
    description:
      "The Astronomy Club, founded in 2013, has become a popular CCA at SST. It focuses on activities like talks, trips, competitions, and teaching to foster leadership and skills like collaboration, communication, curiosity, and critical, and creative thinking. 'Ad Astra' and 'See the BIG picture' embody the club's goals.",
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '4',
    type: 'CCA',
    header: 'Singapore Youth Flying Club',
    description:
      'The SYFC offers aviation programs to cultivate passion and develop members as problem-solvers and leaders in aviation. Despite COVID-19, sessions continued through eCCA and physical formats from 2020 to early 2022. Members honed Flight Simulation skills and participated in competitions like Flight Simulation@HQ, Singapore Amazing Flying Machine, and Drone Odyssey Challenge, adapting to the new normal.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '5',
    type: 'CCA',
    header: 'Media Club',
    description:
      'The SST Media Club is a vibrant platform for students passionate about multimedia. Explore journalism, photography, videography, and more. Develop skills through workshops, projects, and collaborations. Learn from experts and peers, honing camera work, editing, storytelling, and creativity. Whether experienced or new, the Media Club offers a space to grow in multimedia and technology. Join us to unleash your creativity and skills!',
    location: 'Atrium',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '6',
    type: 'CCA',
    header: 'Robotics@APEX',
    description:
      'Robotics @APEX began in 2010, guided by Effective, Efficient, and Exemplary values. With dedicated students and staff, the club earned recognition in local and international robotics communities. Members work with LEGO, Arduino, and OpenCV systems, applying their skills in competitions like the First Lego League Cityshaper, iCooL Challenge, and IDE Robotics Challenge. Creative projects solve real-world issues. Competing and research develop resilience, critical thinking, communication, and project management skills for life.',
    location: 'Robotics room',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '7',
    type: 'CCA',
    header: 'Scouts',
    description:
      "The Scout programme at SST focuses on aviation, outdoor education, and developing discipline, leadership, and teamwork. Scouts are empowered to take charge of their development using the Scout Method, becoming self-reliant, supportive, responsible, and committed. Activities encourage personal involvement and responsibility, supporting SST's values and character education.",
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '8',
    type: 'CCA',
    header: 'Guitar Ensemble',
    description:
      'Formed in 2010, the Guitar Ensemble is a full-fledged Niibori guitar ensemble comprising a close-knitted community of young, passionate musicians. Under the guidance of established guitar conductors, we work towards excellence and continue to be exposed to various song genres, from classical to jazz and modern music.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '9',
    type: 'CCA',
    header: 'Show Choir',
    description:
      'Show Choir and Dance, founded in 2011, became an official performing arts CCA in 2013. It comprises a show choir, blending choral singing with choreography, and a dance crew, focusing on street dance. Both arms collaborate on musical productions, earning peer recognition. Despite COVID-19, the group adapted with music video productions for events. With the return of live performances, members continue to develop artistic skills and confidence, fostering dynamic and unconventional leaders.',
    location: 'Atrium',
    image: require('../assets/layoutPics/Atrium.png'),
    sstLoc: 'L1 Block A',
  },
  {
    id: '10',
    type: 'Applied Subjects',
    header: 'Computing+',
    description:
      "SST's Computing+ course teaches computational thinking for problem-solving and creativity. Students develop programs to tackle complex issues using analysis, pattern finding, abstraction, and algorithms. These skills are applicable across subjects and in real-world scenarios. They also learn data handling and ethics in computing. The " +
      ' modules expose students to current tech trends, preparing them for advanced studies in Informatics.',
    location: 'SST Inc HQ',
    image: require('../assets/layoutPics/Level3.png'),
    sstLoc: 'L3 Block C',
  },
  {
    id: '11',
    type: 'Applied Subjects',
    header: 'Electronics',
    description:
      'Electronics engineers solve problems and improve lives by applying their knowledge and skills in electronics. Their solutions often come in the form of electronic systems. Join our hands-on activity to experience the work of an electronic engineer! You will learn how a computer simulation is used in circuit design and build an automatic lighting system.',
    location: 'Electronics Lab',
    image: require('../assets/layoutPics/Level2.png'),
    sstLoc: 'L2 Block C',
  },
  {
    id: '12',
    type: 'Applied Subjects',
    header: 'Biotechnology',
    description:
      "Ever wondered how science and technology join forces to make the world a better place? Get ready to dive into the fascinating world of biotechnology! In this session, we'll uncover the secrets of genetic engineering and how it helps create genetically modified food. Plus, you won't want to miss our hands-on activity, where we'll explore agarose gel electrophoresis together. Join us for an unforgettable journey of discovery and fun!",
    location: 'Biotech Lab',
    image: require('../assets/layoutPics/Level1.png'),
    sstLoc: 'L1 Block C',
  },
  {
    id: '13',
    type: 'Applied Subjects',
    header: 'Design studies',
    description:
      "The Design Studies Applied Subject explores design thinking and processes, focusing on visual communication, interior and exhibition space, and architectural design. Performance tasks foster awareness of design's connection to various disciplines. Through practical activities, students develop creative mindsets, critical thinking, and analytical skills. They also gain competencies in visual and oral communication, digital design techniques, project management, and time management, building confidence and purpose in resolving design briefs.",
    location: 'Maker Lab',
    image: require('../assets/layoutPics/MakerLab.png'),
    sstLoc: 'L3 Block C',
  },
];

const BoothInfoParentPage = ({navigation}) => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = text => {
    setSearchTerm(text);
  };

  const handlePress = () => {
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
        return Object.values(item).some(val =>
          String(val).toLowerCase().includes(trimmedQuery),
        );
      });

      if (results.length > 0) {
        navigation.navigate('ADeets', {item: results[0]});
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background2.png')}
        style={styles.imageBackground}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%'}} />
          <View>
            <View style={styles.topSidebar}>
              <Text style={styles.header}>Booth Info</Text>
              <TouchableOpacity onPress={handlePress}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  fill="none"
                  style={{marginLeft: 30, marginTop: 12}}>
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
              <TouchableOpacity
                style={styles.hamburgerIconPress}
                onPress={() => navigation.openDrawer()}>
                <Svg width="48" height="52" viewBox="0 0 48 52" fill="none">
                  <LinearGradient
                    colors={['#D9D9D9', 'transparent']}
                    style={{borderRadius: 24}}></LinearGradient>
                  <Line x1="12" y1="16.5" x2="36" y2="16.5" stroke="#EBEBEF" />
                  <Line x1="12" y1="24.5" x2="36" y2="24.5" stroke="#EBEBEF" />
                  <Line x1="12" y1="32.5" x2="36" y2="32.5" stroke="#EBEBEF" />
                </Svg>
              </TouchableOpacity>
            </View>
            {isSearchBarVisible && (
              <View
              style={{
                marginTop: 20,
                height: 41,
                width: '90%',
                marginLeft: '5%',
                borderRadius:20,
                overflow:'hidden'
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
            <View style={{marginTop: 80, padding: '1%'}}>
              <Text style={styles.standardText}>
                Access information about the booths and subjects. There are many exciting things to explore!
              </Text>
            </View>
            <View style={{margin: '30%'}} />
            <View style={{marginTop: 80}}></View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Button pressed');
                  navigation.navigate('MainStream');
                }}
                style={{width: '100%', marginLeft: '12%', height: 140}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    'rgba(205, 79, 79, 0.70)',
                    'rgba(205, 79, 79, 0.05)',
                  ]}
                  style={styles.box}>
                  <View>
                    <Text style={styles.boxHeader}>Mainstream Subjects</Text>
                    <Text style={styles.moreInfoText}> Tap to view more...</Text>
                  </View>
                  <View>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      style={{
                        width: 32,
                        height: 32,
                        marginLeft: 40,
                      }}>
                      <Path
                        d="M28.4138 9.17122L22.8288 3.58497C22.643 3.39921 22.4225 3.25185 22.1799 3.15131C21.9372 3.05077 21.6771 2.99902 21.4144 2.99902C21.1517 2.99902 20.8916 3.05077 20.6489 3.15131C20.4062 3.25185 20.1857 3.39921 20 3.58497L4.58626 19C4.39973 19.185 4.25185 19.4053 4.15121 19.648C4.05057 19.8907 3.99917 20.151 4.00001 20.4137V26C4.00001 26.5304 4.21072 27.0391 4.5858 27.4142C4.96087 27.7893 5.46958 28 6.00001 28H11.5863C11.849 28.0008 12.1093 27.9494 12.352 27.8488C12.5947 27.7481 12.815 27.6002 13 27.4137L28.4138 12C28.5995 11.8142 28.7469 11.5937 28.8474 11.3511C28.948 11.1084 28.9997 10.8483 28.9997 10.5856C28.9997 10.3229 28.948 10.0628 28.8474 9.82012C28.7469 9.57744 28.5995 9.35695 28.4138 9.17122ZM11.5863 26H6.00001V20.4137L17 9.41372L22.5863 15L11.5863 26ZM24 13.585L18.4138 7.99997L21.4138 4.99997L27 10.585L24 13.585Z"
                        fill="#EBEBEF"
                      />
                    </Svg>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      style={{
                        width: 39.005,
                        height: 39.005,
                        position: 'relative',
                        transform: [{rotate: '-15deg'}],
                        flexShrink: 0,
                        marginRight: 60,
                        marginBottom: 10,
                      }}>
                      <G clip-path="url(#clip0_263_796)">
                        <Path
                          d="M31.4966 19.3227C31.5802 19.635 31.5364 19.9677 31.3748 20.2477C31.2132 20.5276 30.9469 20.7319 30.6347 20.8156L21.2156 23.3394C20.9033 23.4231 20.5706 23.3793 20.2906 23.2176C20.0107 23.056 19.8064 22.7898 19.7227 22.4775C19.639 22.1652 19.6828 21.8325 19.8445 21.5526C20.0061 21.2726 20.2723 21.0683 20.5846 20.9846L30.0037 18.4608C30.316 18.3771 30.6487 18.4209 30.9286 18.5826C31.2086 18.7442 31.4129 19.0105 31.4966 19.3227ZM31.2656 23.1704L21.8465 25.6942C21.5343 25.7779 21.268 25.9821 21.1064 26.2621C20.9448 26.5421 20.901 26.8748 20.9846 27.1871C21.0683 27.4993 21.2726 27.7656 21.5526 27.9272C21.8325 28.0888 22.1652 28.1326 22.4775 28.049L31.8966 25.5251C32.2088 25.4415 32.4751 25.2372 32.6367 24.9572C32.7984 24.6772 32.8422 24.3445 32.7585 24.0323C32.6748 23.72 32.4705 23.4538 32.1906 23.2921C31.9106 23.1305 31.5779 23.0867 31.2656 23.1704ZM34.8597 8.32623L41.1692 31.8739C41.3366 32.4985 41.249 33.1639 40.9257 33.7238C40.6024 34.2838 40.07 34.6923 39.4454 34.8597L15.8977 41.1693C15.2732 41.3366 14.6078 41.249 14.0478 40.9257C13.4879 40.6025 13.0793 40.07 12.912 39.4455L6.60239 15.8977C6.43505 15.2732 6.52266 14.6078 6.84594 14.0479C7.16921 13.4879 7.70168 13.0794 8.32621 12.912L31.8739 6.60242C32.4985 6.43508 33.1639 6.52268 33.7238 6.84596C34.2837 7.16924 34.6923 7.70171 34.8597 8.32623ZM15.2668 38.8145L18.7989 37.8681L12.4893 14.3203L8.95717 15.2668L15.2668 38.8145ZM38.8145 32.5049L32.5049 8.95719L14.8441 13.6894L21.1537 37.2371L38.8145 32.5049Z"
                          fill="#EBEBEF"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_263_796">
                          <Rect
                            width="39.0054"
                            height="39.0054"
                            fill="white"
                            transform="translate(0 10.0953) rotate(-15)"
                          />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('AppliedSub')}
                style={{width: '100%', marginLeft: '12%', height: 140}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    'rgba(70, 101, 210, 0.50)',
                    'rgba(70, 101, 210, 0.05)',
                  ]}
                  style={styles.box}>
                  <View>
                    <Text style={styles.boxHeader}> Applied subjects</Text>
                    <Text style={styles.moreInfoText}> Tap to view more...</Text>
                  </View>
                  <View>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 52 52"
                      fill="none"
                      style={{
                        marginRight: 60,
                      }}>
                      <G clip-path="url(#clip0_263_815)">
                        <Path
                          d="M34.9411 8.65742L9.58556 15.4514C8.57685 15.7217 7.71683 16.3816 7.19468 17.286C6.67254 18.1904 6.53104 19.2651 6.80133 20.2739L11.5571 38.0227C11.8274 39.0314 12.4873 39.8915 13.3917 40.4136C14.2961 40.9358 15.3709 41.0773 16.3796 40.807L27.7896 37.7497L28.469 40.2852L24.6656 41.3043C24.3294 41.3944 24.0427 41.6144 23.8687 41.9159C23.6946 42.2173 23.6475 42.5756 23.7375 42.9118C23.8276 43.248 24.0476 43.5347 24.3491 43.7088C24.6505 43.8828 25.0088 43.93 25.345 43.8399L35.4872 41.1223C35.8235 41.0322 36.1102 40.8122 36.2842 40.5108C36.4583 40.2093 36.5054 39.851 36.4153 39.5148C36.3252 39.1786 36.1053 38.8919 35.8038 38.7178C35.5023 38.5438 35.1441 38.4966 34.8078 38.5867L31.0045 39.6058L30.3251 37.0703L41.7351 34.013C42.7438 33.7427 43.6038 33.0828 44.126 32.1784C44.6481 31.274 44.7896 30.1992 44.5193 29.1905L39.7635 11.4417C39.4933 10.4329 38.8333 9.57292 37.929 9.05078C37.0246 8.52863 35.9498 8.38714 34.9411 8.65742ZM10.265 17.987L35.6205 11.193C35.9567 11.1029 36.315 11.15 36.6165 11.3241C36.9179 11.4981 37.1379 11.7848 37.228 12.1211L40.625 24.7988L12.7339 32.2722L9.33688 19.5945C9.24679 19.2582 9.29395 18.9 9.468 18.5985C9.64205 18.297 9.92872 18.0771 10.265 17.987ZM41.0557 31.4774L15.7002 38.2714C15.3639 38.3615 15.0057 38.3143 14.7042 38.1403C14.4027 37.9662 14.1828 37.6796 14.0927 37.3433L13.4133 34.8078L41.3044 27.3344L41.9838 29.8699C42.0739 30.2062 42.0267 30.5644 41.8527 30.8659C41.6786 31.1674 41.3919 31.3873 41.0557 31.4774Z"
                          fill="#EBEBEF"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_263_815">
                          <Rect
                            width="42"
                            height="42"
                            fill="white"
                            transform="translate(0.280396 11.1508) rotate(-15)"
                          />
                        </ClipPath>
                      </Defs>
                    </Svg>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      style={{
                        marginLeft: 40,
                      }}>
                      <G clip-path="url(#clip0_263_819)">
                        <Path
                          d="M25.8143 31.162L24.9246 34.4823C24.856 34.7385 24.6884 34.9569 24.4587 35.0896C24.229 35.2222 23.956 35.2581 23.6999 35.1895C23.4437 35.1208 23.2253 34.9532 23.0927 34.7235C22.96 34.4938 22.9241 34.2209 22.9928 33.9647L23.8824 30.6443C24.272 29.2094 24.2518 27.694 23.8242 26.27C23.3965 24.846 22.5785 23.5702 21.4628 22.5873L16.4016 18.1007C15.0071 16.8722 13.9846 15.2775 13.4501 13.4975C12.9157 11.7176 12.8905 9.82344 13.3775 8.0299L14.2672 4.70953C14.3359 4.45335 14.5035 4.23493 14.7332 4.10233C14.9628 3.96972 15.2358 3.93378 15.492 4.00242C15.7482 4.07107 15.9666 4.23867 16.0992 4.46835C16.2318 4.69803 16.2677 4.97099 16.1991 5.22717L15.3094 8.54754C14.9198 9.98247 14.94 11.4978 15.3677 12.9219C15.7953 14.3459 16.6134 15.6217 17.729 16.6046L22.7903 21.0911C24.1848 22.3197 25.2072 23.9144 25.7417 25.6943C26.2762 27.4743 26.3013 29.3684 25.8143 31.162ZM21.1303 29.3245L10.5256 26.483C10.7484 25.8375 11.0534 25.2233 11.4332 24.6557L20.2123 27.008C20.4685 27.0767 20.7414 27.0407 20.9711 26.9081C21.2008 26.7755 21.3684 26.5571 21.437 26.3009C21.5057 26.0447 21.4697 25.7718 21.3371 25.5421C21.2045 25.3124 20.9861 25.1448 20.7299 25.0762L12.924 22.9846C13.5965 22.4138 14.3591 21.9586 15.1808 21.6378C15.3033 21.5902 15.4153 21.5189 15.5103 21.4279C15.6052 21.337 15.6814 21.2283 15.7344 21.108C15.7873 20.9877 15.8161 20.8581 15.819 20.7266C15.8219 20.5952 15.7989 20.4644 15.7512 20.3419C15.7036 20.2194 15.6323 20.1074 15.5414 20.0124C15.4505 19.9174 15.3418 19.8413 15.2214 19.7883C15.1011 19.7353 14.9715 19.7066 14.8401 19.7037C14.7086 19.7008 14.5779 19.7238 14.4553 19.7714C12.9942 20.344 11.6877 21.2513 10.6408 22.4204C9.59394 23.5895 8.83591 24.9879 8.42763 26.5032L7.53794 29.8236C7.4693 30.0798 7.50523 30.3527 7.63784 30.5824C7.77045 30.8121 7.98887 30.9797 8.24505 31.0483C8.50123 31.117 8.77418 31.0811 9.00387 30.9484C9.23355 30.8158 9.40115 30.5974 9.46979 30.3412L9.98743 28.4094L20.6126 31.2564C20.8688 31.325 21.1418 31.2891 21.3714 31.1565C21.6011 31.0239 21.7687 30.8055 21.8374 30.5493C21.906 30.2931 21.8701 30.0202 21.7375 29.7905C21.6049 29.5608 21.3864 29.3932 21.1303 29.3245ZM30.9468 8.14353C30.6906 8.07489 30.4177 8.11082 30.188 8.24343C29.9583 8.37604 29.7907 8.59446 29.722 8.85064L29.2044 10.7825L18.5792 7.93548C18.323 7.86684 18.0501 7.90277 17.8204 8.03538C17.5907 8.16799 17.4231 8.38641 17.3545 8.64259C17.2858 8.89876 17.3218 9.17172 17.4544 9.4014C17.587 9.63109 17.8054 9.79869 18.0616 9.86733L28.6662 12.7088C28.4435 13.3544 28.1384 13.9686 27.7586 14.5362L18.9796 12.1839C18.7234 12.1152 18.4504 12.1511 18.2207 12.2838C17.9911 12.4164 17.8235 12.6348 17.7548 12.891C17.6862 13.1471 17.7221 13.4201 17.8547 13.6498C17.9873 13.8795 18.2057 14.0471 18.4619 14.1157L26.2678 16.2073C25.5953 16.7781 24.8327 17.2332 24.0111 17.5541C23.8887 17.6018 23.7769 17.6731 23.6821 17.764C23.5872 17.8548 23.5112 17.9635 23.4584 18.0838C23.4056 18.204 23.377 18.3335 23.3742 18.4648C23.3714 18.5961 23.3945 18.7267 23.4422 18.8491C23.5384 19.0963 23.729 19.2951 23.9718 19.4018C24.0921 19.4546 24.2216 19.4832 24.3529 19.486C24.4842 19.4888 24.6148 19.4657 24.7372 19.418C26.1979 18.8457 27.5041 17.9387 28.5509 16.77C29.5976 15.6013 30.3557 14.2034 30.7642 12.6886L31.6539 9.36827C31.7225 9.11209 31.6866 8.83914 31.554 8.60946C31.4214 8.37977 31.203 8.21217 30.9468 8.14353Z"
                          fill="#EBEBEF"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_263_819">
                          <Rect
                            width="32"
                            height="32"
                            fill="white"
                            transform="translate(8.28223) rotate(15)"
                          />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CCA')}
                style={{width: '100%', marginLeft: '12%', height: 140}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    'rgba(157, 157, 175, 0.50)',
                    'rgba(157, 157, 175, 0.05) ',
                  ]}
                  style={styles.box}>
                  <View>
                    <Text style={styles.boxHeader}> CCAS</Text>
                    <Text style={styles.moreInfoText}> Tap to view more...</Text>
                  </View>
                  <View>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 52 52"
                      fill="none"
                      style={{
                        marginRight: 60,
                      }}>
                      <G clip-path="url(#clip0_263_821)">
                        <Path
                          d="M21.3035 9.23844C18.0438 10.1119 15.1164 11.9323 12.8913 14.4695C10.6663 17.0067 9.24356 20.1467 8.80308 23.4924C8.3626 26.8382 8.92415 30.2395 10.4167 33.2661C11.9093 36.2927 14.2658 38.8088 17.1884 40.4961C20.1109 42.1834 23.4681 42.9662 26.8355 42.7455C30.203 42.5248 33.4293 41.3105 36.1066 39.2561C38.7839 37.2018 40.7919 34.3997 41.8766 31.2041C42.9613 28.0086 43.0741 24.5631 42.2007 21.3034C41.0253 16.935 38.1648 13.2113 34.2471 10.9495C30.3294 8.68756 25.6744 8.07221 21.3035 9.23844ZM12.5728 19.7595C14.9293 21.4367 16.7221 23.7889 17.7146 26.5057L11.493 28.1728C10.9977 25.3236 11.374 22.3912 12.5728 19.7595ZM26.6477 24.1121L23.2664 11.4929C26.1775 10.9888 29.1733 11.3942 31.8458 12.6539C30.3002 15.8979 29.8283 19.5499 30.4986 23.0802L26.6477 24.1121ZM24.1121 24.7915L20.2613 25.8233C19.0765 22.4309 16.8419 19.5041 13.8814 17.4675C15.5659 15.0403 17.9576 13.1913 20.7308 12.1723L24.1121 24.7915ZM18.394 29.0412C18.8928 31.8903 18.5163 34.8237 17.3142 37.4545C14.9601 35.7747 13.168 33.4234 12.1724 30.7083L18.394 29.0412ZM20.9407 28.3589L24.7915 27.327L28.1728 39.9462C25.2617 40.4503 22.2659 40.0449 19.5934 38.7852C21.1387 35.5411 21.6105 31.8892 20.9407 28.3589ZM27.3271 26.6476L31.178 25.6158C32.363 29.0081 34.5976 31.9348 37.5578 33.9716C35.8733 36.3988 33.4816 38.2478 30.7084 39.2668L27.3271 26.6476ZM33.7246 24.9334L39.9462 23.2663C40.4415 26.1155 40.0652 29.0479 38.8664 31.6796C36.5099 30.0024 34.7172 27.6502 33.7246 24.9334ZM33.0452 22.3979C32.5464 19.5488 32.9229 16.6154 34.125 13.9846C36.4791 15.6644 38.2712 18.0157 39.2668 20.7308L33.0452 22.3979Z"
                          fill="#EBEBEF"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_263_821">
                          <Rect
                            width="42"
                            height="42"
                            fill="white"
                            transform="translate(0 10.8704) rotate(-15)"
                          />
                        </ClipPath>
                      </Defs>
                    </Svg>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      style={{
                        marginLeft: 40,
                      }}>
                      <G clip-path="url(#clip0_263_823)">
                        <Path
                          d="M30.9976 19.5452L17.244 15.8599L31.1949 15.9112C31.3269 15.9117 31.4577 15.8861 31.5798 15.8358C31.7019 15.7856 31.8128 15.7116 31.9062 15.6182C31.9995 15.5249 32.0735 15.4139 32.1237 15.2918C32.174 15.1697 32.1996 15.0389 32.199 14.9068L32.1843 11.0206C32.1793 10.497 31.9682 9.99637 31.5967 9.62724C31.2252 9.25812 30.7233 9.0502 30.1996 9.0485L10.5115 8.97533C10.2496 8.97328 9.98997 9.0235 9.74776 9.12303C9.50555 9.22256 9.28562 9.36942 9.10087 9.555C8.91613 9.73769 8.77 9.95566 8.67116 10.1959C8.57231 10.4362 8.52278 10.6939 8.52549 10.9537L8.5367 14.5051C8.53217 14.5221 8.52732 14.5402 8.52247 14.5583L5.67546 25.1835C5.53817 25.6958 5.61004 26.2417 5.87526 26.7011C6.14047 27.1605 6.57731 27.4957 7.08967 27.6329L26.4082 32.8093C26.9205 32.9466 27.4665 32.8747 27.9258 32.6095C28.3852 32.3443 28.7204 31.9075 28.8577 31.3951L31.7047 20.7699C31.7733 20.5138 31.7374 20.2408 31.6048 20.0111C31.4722 19.7814 31.2538 19.6138 30.9976 19.5452ZM30.1897 11.0465L30.2001 13.9054L27.2748 13.898L24.405 11.0274L30.1897 11.0465ZM21.5681 11.014L24.4379 13.8845L19.6623 13.8667L16.7918 10.9985L21.5681 11.014ZM10.5377 13.8326L10.5276 10.9726L13.9537 10.9847L16.8229 13.8577L10.5377 13.8326ZM26.9258 30.8775L7.60731 25.7011L10.1955 16.0418L29.514 21.2182L26.9258 30.8775Z"
                          fill="#EBEBEF"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_263_823">
                          <Rect
                            width="32"
                            height="32"
                            fill="white"
                            transform="translate(8.28223) rotate(15)"
                          />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <View style={{marginTop: '32%'}} />
            </View>
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
    marginTop: '1%',
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
    marginLeft: '2%',
  },
  box: {
    width: '88%',
    height: 118,
    flexShrink: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBEBEF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxHeader: {
    color: '#EBEBEF',
    fontFamily: 'Lato',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: '5%',
  },
  standardText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  moreInfoText: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    padding: 10,
    marginLeft: '1%',
  },
});

export {BoothInfo, data};
