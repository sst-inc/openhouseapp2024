import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Animated,Text,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Stamps, QRCodeScanner } from './Stamps';
import Svg, { Circle,Path, Line, Image, G } from 'react-native-svg';
import BoothInfo from './BoothInfo';
import EventsPage from './Events';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ fontSize: 30, margin: 10,color:'white', fontWeight:'600' }}>  SST{'\n'}  Open House</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const App = () => {
  return (
<NavigationContainer>
  <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props} />}
    initialRouteName="Home"
    screenOptions={{
      drawerPosition: "back",
      drawerType: "front",
      title: 'SST Open House',
      overlayColor: 'rgba(0, 0, 0, 0.7)',
      drawerActiveBackgroundColor: 'transparent',
      drawerStyle: {
        backgroundColor: 'rgba(64, 64, 64, 0.5)', // Darker grey with more opacity
        width: Dimensions.get('window').width * 0.55, // 75% of the screen's width
        borderLeftWidth: 1,
        borderColor:'white',
      },
      headerShown: false,
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{ drawerLabel: 'Home', drawerItemStyle: { height: 0 }, headerShown: false }}
    />
    <Drawer.Screen
      name="Stamps"
      component={Stamps}
      options={{
        drawerLabel: ({ focused, color }) => (
          <LinearGradient
            colors={['#CD4F4F', 'rgba(103, 39, 39, 0.00)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, justifyContent:'center', width: 300, height: 60, padding: 2,marginLeft:-17 }}
          >
            <View style={{flexDirection:'row', gap:7, marginLeft:10}}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path d="M17.5 17.5C17.5 17.6658 17.4342 17.8247 17.3169 17.9419C17.1997 18.0592 17.0408 18.125 16.875 18.125H3.125C2.95924 18.125 2.80027 18.0592 2.68306 17.9419C2.56585 17.8247 2.5 17.6658 2.5 17.5C2.5 17.3342 2.56585 17.1753 2.68306 17.0581C2.80027 16.9408 2.95924 16.875 3.125 16.875H16.875C17.0408 16.875 17.1997 16.9408 17.3169 17.0581C17.4342 17.1753 17.5 17.3342 17.5 17.5ZM17.5 11.25V14.375C17.5 14.7065 17.3683 15.0245 17.1339 15.2589C16.8995 15.4933 16.5815 15.625 16.25 15.625H3.75C3.41848 15.625 3.10054 15.4933 2.86612 15.2589C2.6317 15.0245 2.5 14.7065 2.5 14.375V11.25C2.5 10.9185 2.6317 10.6005 2.86612 10.3661C3.10054 10.1317 3.41848 10 3.75 10H8.15859L6.93125 4.27422C6.85309 3.90976 6.85742 3.53243 6.94391 3.16986C7.03041 2.80729 7.19689 2.46865 7.43117 2.17872C7.66544 1.8888 7.96158 1.65493 8.29791 1.49424C8.63425 1.33355 9.00225 1.2501 9.375 1.25H10.625C10.9978 1.24998 11.3659 1.33335 11.7023 1.49399C12.0388 1.65463 12.335 1.88848 12.5694 2.17842C12.8037 2.46836 12.9703 2.80704 13.0568 3.16967C13.1434 3.5323 13.1477 3.90969 13.0695 4.27422L11.8414 10H16.25C16.5815 10 16.8995 10.1317 17.1339 10.3661C17.3683 10.6005 17.5 10.9185 17.5 11.25ZM9.43672 10H10.5633L11.8469 4.01172C11.8859 3.82952 11.8837 3.6409 11.8404 3.45966C11.7971 3.27842 11.7139 3.10915 11.5967 2.96424C11.4796 2.81932 11.3316 2.70243 11.1634 2.62211C10.9953 2.54178 10.8113 2.50006 10.625 2.5H9.375C9.1886 2.49995 9.00455 2.54158 8.83632 2.62185C8.66809 2.70213 8.51995 2.81901 8.40273 2.96394C8.28551 3.10887 8.20219 3.27818 8.15887 3.45947C8.11555 3.64076 8.11332 3.82945 8.15234 4.01172L9.43672 10ZM16.25 14.375V11.25H3.75V14.375H16.25Z" fill="#EBEBEF"/>
            </Svg>
            <Text style={{ color: 'white', fontSize: 16 }}>Stamps</Text>
            </View>
          </LinearGradient>
        ),
        headerShown: false,
        drawerItemStyle: {
          width: '100%',
          marginVertical: -13, // Adjust vertical margin
        },
      }}
    />
    <Drawer.Screen
      name="QRCode"
      component={QRCodeScanner}
      options={{ drawerLabel: 'QR Code', drawerItemStyle: { height: 0 }, headerShown: false }}
    />
    <Drawer.Screen
      name="BoothInfo"
      component={BoothInfo}
      options={{
        drawerLabel: ({ focused, color }) => (
          <LinearGradient
            colors={['#4665D2', 'rgba(103, 39, 39, 0.00)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, justifyContent: 'center', width: 300, height: 60, padding: 2,marginLeft:-17 }}
          >
          <View style={{flexDirection:'row', gap:7, marginLeft:10}}>
          <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path d="M18.125 7.5C18.1253 7.44189 18.1174 7.38403 18.1016 7.32812L16.9805 3.40625C16.9051 3.14603 16.7476 2.91716 16.5315 2.75382C16.3153 2.59049 16.0522 2.50145 15.7812 2.5H4.21875C3.94784 2.50145 3.68467 2.59049 3.46853 2.75382C3.25239 2.91716 3.09488 3.14603 3.01953 3.40625L1.89922 7.32812C1.88308 7.38399 1.87493 7.44185 1.875 7.5V8.75C1.875 9.23514 1.98795 9.71362 2.20492 10.1475C2.42188 10.5815 2.73689 10.9589 3.125 11.25V16.25C3.125 16.5815 3.2567 16.8995 3.49112 17.1339C3.72554 17.3683 4.04348 17.5 4.375 17.5H15.625C15.9565 17.5 16.2745 17.3683 16.5089 17.1339C16.7433 16.8995 16.875 16.5815 16.875 16.25V11.25C17.2631 10.9589 17.5781 10.5815 17.7951 10.1475C18.012 9.71362 18.125 9.23514 18.125 8.75V7.5ZM4.21875 3.75H15.7812L16.6734 6.875H3.32891L4.21875 3.75ZM8.125 8.125H11.875V8.75C11.875 9.24728 11.6775 9.72419 11.3258 10.0758C10.9742 10.4275 10.4973 10.625 10 10.625C9.50272 10.625 9.02581 10.4275 8.67418 10.0758C8.32254 9.72419 8.125 9.24728 8.125 8.75V8.125ZM6.875 8.125V8.75C6.875 9.24728 6.67746 9.72419 6.32583 10.0758C5.9742 10.4275 5.49728 10.625 5 10.625C4.50272 10.625 4.02581 10.4275 3.67418 10.0758C3.32254 9.72419 3.125 9.24728 3.125 8.75V8.125H6.875ZM15.625 16.25H4.375V11.8125C4.58075 11.854 4.79011 11.8749 5 11.875C5.48514 11.875 5.96362 11.762 6.39754 11.5451C6.83147 11.3281 7.20892 11.0131 7.5 10.625C7.79109 11.0131 8.16854 11.3281 8.60246 11.5451C9.03638 11.762 9.51486 11.875 10 11.875C10.4851 11.875 10.9636 11.762 11.3975 11.5451C11.8315 11.3281 12.2089 11.0131 12.5 10.625C12.7911 11.0131 13.1685 11.3281 13.6025 11.5451C14.0364 11.762 14.5149 11.875 15 11.875C15.2099 11.8749 15.4192 11.854 15.625 11.8125V16.25ZM15 10.625C14.5027 10.625 14.0258 10.4275 13.6742 10.0758C13.3225 9.72419 13.125 9.24728 13.125 8.75V8.125H16.875V8.75C16.875 9.24728 16.6775 9.72419 16.3258 10.0758C15.9742 10.4275 15.4973 10.625 15 10.625Z" fill="#EBEBEF"/>
            </Svg>
            <Text style={{ color: 'white', fontSize: 16 }}>Booth Info</Text>
          </View>
          </LinearGradient>
        ),
        headerShown: false,
        drawerItemStyle: {
          width: '100%',
          marginVertical: -9, // Adjust vertical margin
        },
      }}
    />
    <Drawer.Screen
      name="Events"
      component={EventsPage}
      options={{
        drawerLabel: ({ focused, color }) => (
          <LinearGradient
            colors={['#9D9DAF', 'rgba(103, 39, 39, 0.00)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, justifyContent: 'center', width: 300, height: 60, padding: 2,marginLeft:-17 }}
          >
          <View style={{flexDirection:'row', gap:7, marginLeft:10}}>
          <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <Path d="M14.25 1.5H12.375V0.875C12.375 0.70924 12.3092 0.550268 12.1919 0.433058C12.0747 0.315848 11.9158 0.25 11.75 0.25C11.5842 0.25 11.4253 0.315848 11.3081 0.433058C11.1908 0.550268 11.125 0.70924 11.125 0.875V1.5H4.875V0.875C4.875 0.70924 4.80915 0.550268 4.69194 0.433058C4.57473 0.315848 4.41576 0.25 4.25 0.25C4.08424 0.25 3.92527 0.315848 3.80806 0.433058C3.69085 0.550268 3.625 0.70924 3.625 0.875V1.5H1.75C1.41848 1.5 1.10054 1.6317 0.866116 1.86612C0.631696 2.10054 0.5 2.41848 0.5 2.75V15.25C0.5 15.5815 0.631696 15.8995 0.866116 16.1339C1.10054 16.3683 1.41848 16.5 1.75 16.5H14.25C14.5815 16.5 14.8995 16.3683 15.1339 16.1339C15.3683 15.8995 15.5 15.5815 15.5 15.25V2.75C15.5 2.41848 15.3683 2.10054 15.1339 1.86612C14.8995 1.6317 14.5815 1.5 14.25 1.5ZM3.625 2.75V3.375C3.625 3.54076 3.69085 3.69973 3.80806 3.81694C3.92527 3.93415 4.08424 4 4.25 4C4.41576 4 4.57473 3.93415 4.69194 3.81694C4.80915 3.69973 4.875 3.54076 4.875 3.375V2.75H11.125V3.375C11.125 3.54076 11.1908 3.69973 11.3081 3.81694C11.4253 3.93415 11.5842 4 11.75 4C11.9158 4 12.0747 3.93415 12.1919 3.81694C12.3092 3.69973 12.375 3.54076 12.375 3.375V2.75H14.25V5.25H1.75V2.75H3.625ZM14.25 15.25H1.75V6.5H14.25V15.25ZM6.75 8.375V13.375C6.75 13.5408 6.68415 13.6997 6.56694 13.8169C6.44973 13.9342 6.29076 14 6.125 14C5.95924 14 5.80027 13.9342 5.68306 13.8169C5.56585 13.6997 5.5 13.5408 5.5 13.375V9.38594L5.15469 9.55938C5.00633 9.63355 4.83459 9.64576 4.67723 9.59331C4.51988 9.54086 4.3898 9.42804 4.31562 9.27969C4.24145 9.13133 4.22924 8.95959 4.28169 8.80223C4.33414 8.64488 4.44696 8.5148 4.59531 8.44062L5.84531 7.81562C5.94063 7.76793 6.04657 7.7454 6.15305 7.75018C6.25954 7.75497 6.36303 7.7869 6.45369 7.84296C6.54435 7.89902 6.61916 7.97733 6.67103 8.07045C6.72289 8.16357 6.75008 8.26841 6.75 8.375ZM11.3719 10.7539L9.875 12.75H11.125C11.2908 12.75 11.4497 12.8158 11.5669 12.9331C11.6842 13.0503 11.75 13.2092 11.75 13.375C11.75 13.5408 11.6842 13.6997 11.5669 13.8169C11.4497 13.9342 11.2908 14 11.125 14H8.625C8.50893 14 8.39515 13.9677 8.29642 13.9067C8.19768 13.8456 8.11789 13.7583 8.06598 13.6545C8.01408 13.5507 7.9921 13.4345 8.00252 13.3189C8.01295 13.2033 8.05536 13.0929 8.125 13L10.3734 10.0023C10.4246 9.93426 10.4613 9.85644 10.4813 9.77367C10.5012 9.69089 10.5041 9.60491 10.4897 9.52098C10.4752 9.43707 10.4438 9.35698 10.3973 9.28565C10.3508 9.21431 10.2902 9.15324 10.2192 9.10616C10.1483 9.05909 10.0684 9.02701 9.98464 9.01189C9.90084 8.99678 9.81483 8.99895 9.7319 9.01828C9.64897 9.0376 9.57086 9.07366 9.50236 9.12426C9.43387 9.17485 9.37644 9.23891 9.33359 9.3125C9.29377 9.38585 9.23965 9.45047 9.17444 9.50256C9.10923 9.55466 9.03425 9.59316 8.95392 9.61581C8.87359 9.63845 8.78954 9.64478 8.70673 9.63441C8.62391 9.62405 8.54401 9.5972 8.47174 9.55545C8.39947 9.51371 8.33629 9.45791 8.28593 9.39135C8.23557 9.3248 8.19906 9.24883 8.17853 9.16793C8.15801 9.08703 8.1539 9.00284 8.16644 8.92033C8.17899 8.83781 8.20793 8.75865 8.25156 8.6875C8.45802 8.33022 8.77656 8.05103 9.15782 7.8932C9.53908 7.73537 9.96176 7.70772 10.3603 7.81453C10.7589 7.92133 11.1111 8.15664 11.3624 8.48397C11.6136 8.8113 11.7499 9.21236 11.75 9.625C11.7513 10.0326 11.6184 10.4293 11.3719 10.7539Z" fill="#EBEBEF"/>
          </Svg>

            <Text style={{ color: 'white', fontSize: 16 }}>Events</Text>
          </View>
          </LinearGradient>
        ),
        headerShown: false,
        drawerItemStyle: {
          width: '100%',
          marginVertical: -3, // Adjust vertical margin
        },
      }}
    />
  </Drawer.Navigator>
</NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0
  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  function whereToGo() {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }
    ).start(() => navigation.navigate('Events'));  // Navigate after the animation completes
  }

  return (
    <View style={styles.container}>
      <AnimatedImageBackground
        source={require('./assets/startingPage.png')}
        style={[styles.imageBackground, { opacity: fadeAnim }]}
      >
        <TouchableOpacity style={{ width:"100%",height:'100%'}} onPress={whereToGo} />
      </AnimatedImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
});

export default App;