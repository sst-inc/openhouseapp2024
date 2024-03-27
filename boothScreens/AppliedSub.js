import React from 'react';
import {FlatList, View, Text, StyleSheet,ImageBackground,SafeAreaView,TouchableOpacity, Pressable} from 'react-native';
import Svg, { G, Path, Defs, ClipPath, Rect,Line } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const appliedSubjectsData =[
    {id: '1', header: 'Computing+', description: 'Lorem ipsum dolor sit amet, consectetur\n adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', location: 'SST Inc HQ', image:require('./boothImages/Level1.png'), sstLoc:'L3 Block C'},
    {id: '2', header: 'Electronics', description: 'Lorem ipsum dolor sit amet, consectetur\n adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', location: 'Electronics Lab',image:require('./boothImages/Level1.png'), sstLoc:'L3 Block C'},
    {id: '3', header: 'Biotech', description: 'Lorem ipsum dolor sit amet, consectetur\n adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', location: 'Biotech Lab',image:require('./boothImages/Level1.png'), sstLoc:'L3 Block C'},
    {id: '4', header: 'Design studies', description: 'Lorem ipsum dolor sit amet, consectetur\n adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', location: 'Maker Lab',image:require('./boothImages/Level1.png'), sstLoc:'L3 Block C'},
    {id: '5', header: 'Engineering', description: 'Lorem ipsum dolor sit amet, consectetur\n adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', location: 'Engineering Lab',image:require('./boothImages/Level1.png'), sstLoc:'L3 Block C'},
];


const AppliedSub = () => {
    const navigation = useNavigation();
    const renderItem = ({ item }) => {
        return(
            <TouchableOpacity style={styles.subContainer} onPress={() => handlePress(item)}>
            <View style={{marginLeft:20}}/>
            <View style={{marginLeft:20,marginRight:24}}>
                <Text style={styles.subjectHeader}>{item.header}</Text>
                <View style={{marginTop:15}}/>
                <Text style={styles.sectionHeader}>
                {item.description}
                </Text>
                <View style={{flexDirection:'row',marginTop:15}}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Path d="M10 5C9.38193 5 8.77775 5.18328 8.26384 5.52666C7.74994 5.87004 7.3494 6.3581 7.11288 6.92911C6.87635 7.50013 6.81447 8.12847 6.93505 8.73466C7.05562 9.34085 7.35325 9.89767 7.79029 10.3347C8.22733 10.7717 8.78415 11.0694 9.39034 11.19C9.99653 11.3105 10.6249 11.2486 11.1959 11.0121C11.7669 10.7756 12.255 10.3751 12.5983 9.86116C12.9417 9.34725 13.125 8.74307 13.125 8.125C13.125 7.2962 12.7958 6.50134 12.2097 5.91529C11.6237 5.32924 10.8288 5 10 5ZM10 10C9.62916 10 9.26665 9.89003 8.95831 9.68401C8.64996 9.47798 8.40964 9.18514 8.26773 8.84253C8.12581 8.49992 8.08868 8.12292 8.16103 7.75921C8.23337 7.39549 8.41195 7.0614 8.67417 6.79917C8.9364 6.53695 9.27049 6.35837 9.63421 6.28603C9.99792 6.21368 10.3749 6.25081 10.7175 6.39273C11.0601 6.53464 11.353 6.77496 11.559 7.08331C11.765 7.39165 11.875 7.75416 11.875 8.125C11.875 8.62228 11.6775 9.09919 11.3258 9.45083C10.9742 9.80246 10.4973 10 10 10ZM10 1.25C8.17727 1.25207 6.42979 1.97706 5.14092 3.26592C3.85206 4.55479 3.12707 6.30227 3.125 8.125C3.125 10.5781 4.25859 13.1781 6.40625 15.6445C7.37127 16.759 8.45739 17.7626 9.64453 18.6367C9.74962 18.7103 9.87482 18.7498 10.0031 18.7498C10.1314 18.7498 10.2566 18.7103 10.3617 18.6367C11.5467 17.7623 12.6307 16.7587 13.5938 15.6445C15.7383 13.1781 16.875 10.5781 16.875 8.125C16.8729 6.30227 16.1479 4.55479 14.8591 3.26592C13.5702 1.97706 11.8227 1.25207 10 1.25ZM10 17.3438C8.70859 16.3281 4.375 12.5977 4.375 8.125C4.375 6.63316 4.96763 5.20242 6.02252 4.14752C7.07742 3.09263 8.50816 2.5 10 2.5C11.4918 2.5 12.9226 3.09263 13.9775 4.14752C15.0324 5.20242 15.625 6.63316 15.625 8.125C15.625 12.5961 11.2914 16.3281 10 17.3438Z" fill="#EBEBEF"/>
                    </Svg>
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
            </View>
            <View style={{marginRight:25}}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Path d="M22.5301 16.53L12.5301 26.53C12.3879 26.6625 12.1999 26.7346 12.0056 26.7312C11.8113 26.7278 11.6259 26.6491 11.4885 26.5117C11.3511 26.3742 11.2723 26.1889 11.2689 25.9946C11.2655 25.8003 11.3376 25.6122 11.4701 25.47L20.9388 16L11.4701 6.53003C11.3376 6.38785 11.2655 6.19981 11.2689 6.00551C11.2723 5.81121 11.3511 5.62582 11.4885 5.48841C11.6259 5.35099 11.8113 5.27228 12.0056 5.26885C12.1999 5.26543 12.3879 5.33755 12.5301 5.47003L22.5301 15.47C22.6705 15.6107 22.7494 15.8013 22.7494 16C22.7494 16.1988 22.6705 16.3894 22.5301 16.53Z" fill="#EBEBEF" fill-opacity="0.7"/>
            </Svg>
            </View>
        </TouchableOpacity>
        );
    };
    const handlePress = (item) => {
        navigation.navigate('ADeets', {item});
    };
    return (
       <View style={styles.container}>
        <ImageBackground source={require('../assets/background2.png')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ marginTop: '5%' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{marginLeft:'5%'}}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" viewBox="0 0 26 20" fill="none">
                <Path d="M26.0001 19C26.0001 19.2652 25.8947 19.5196 25.7072 19.7071C25.5196 19.8947 25.2653 20 25.0001 20C24.7348 20 24.4805 19.8947 24.2929 19.7071C24.1054 19.5196 24.0001 19.2652 24.0001 19C23.9967 16.0836 22.8368 13.2877 20.7746 11.2255C18.7124 9.1633 15.9164 8.00331 13.0001 8.00001H3.4138L7.70755 12.2925C7.8952 12.4801 8.00061 12.7346 8.00061 13C8.00061 13.2654 7.8952 13.5199 7.70755 13.7075C7.51991 13.8951 7.26542 14.0006 7.00005 14.0006C6.73469 14.0006 6.48019 13.8951 6.29255 13.7075L0.292554 7.70751C0.199578 7.61463 0.125819 7.50434 0.0754943 7.38295C0.02517 7.26155 -0.000732422 7.13142 -0.000732422 7.00001C-0.000732422 6.86859 0.02517 6.73846 0.0754943 6.61707C0.125819 6.49567 0.199578 6.38538 0.292554 6.29251L6.29255 0.292507C6.48019 0.104866 6.73469 -0.000549318 7.00005 -0.000549316C7.26542 -0.000549314 7.51991 0.104866 7.70755 0.292507C7.8952 0.480147 8.00061 0.734643 8.00061 1.00001C8.00061 1.26537 7.8952 1.51987 7.70755 1.70751L3.4138 6.00001H13.0001C16.4468 6.00365 19.7512 7.37445 22.1884 9.81164C24.6256 12.2488 25.9964 15.5533 26.0001 19Z" fill="#EBEBEF"/>
            </Svg>
            </View>
            </TouchableOpacity>
            <View style={{marginBottom:20}}/>
            <View style={styles.topSidebar}>
              <Text style={styles.header}>Booth Info</Text>
              <TouchableOpacity>
                <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style={{marginTop:10}}>
                    <Path d="M26.8333 13.6667C26.8333 20.9384 20.9384 26.8333 13.6667 26.8333C6.39492 26.8333 0.5 20.9384 0.5 13.6667C0.5 6.39492 6.39492 0.5 13.6667 0.5C20.9384 0.5 26.8333 6.39492 26.8333 13.6667Z" stroke="#EBEBEF"/>
                    <Line x1="23.0203" y1="23.6464" x2="31.0203" y2="31.6464" stroke="#EBEBEF"/>
                </Svg>
              </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.sectionHeader}>     Applied Subjects</Text>
            </View>
            <View style={{marginTop:35, flex:1 }}/>
                <FlatList
                    data={appliedSubjectsData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
        alignItems: 'center'
    },
    topSidebar:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginLeft: '5%',
      gap: 10,
  },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    header: {
        color: '#EBEBEF',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 40,
        fontWeight: 'normal',
    },
    sectionHeader:{
        color: 'rgba(235, 235, 239, 0.70)',
        fontFamily: 'Lato',
        fontSize: 16,
        fontWeight: '400',  
    },
    subContainer:{
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EBEBEF',
        backgroundColor: 'rgba(235, 235, 239, 0.10)',
        shadowColor: 'rgba(170, 181, 224, 0.30)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 30,
        width: '93.5%',
        height: 170,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
        marginLeft:'3%',
        marginBottom: 20,
    },
    subjectHeader:{
        color: '#EBEBEF',
        fontFamily: 'Lato',
        fontSize: 24,
        fontWeight: '400',
    },
    locationText:{
        color: '#EBEBEF',
        fontFamily: 'Lato',
        fontSize: 16,
    },
    redirectText:{
        color: '#ABABED',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 16,
        fontWeight: '400',
        textDecorationLine: 'underline',
    }
});

export default AppliedSub;