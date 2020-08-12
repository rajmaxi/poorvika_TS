
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity, Dimensions, FlatList, Image, Alert, ActivityIndicator
} from 'react-native'
import { showroomApi } from './searchService';
import styles from './searchStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Carousel, Picker, Colors } from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import getDirections from 'react-native-google-maps-directions';
import CustomHeader from '../../components/customheader';
console.disableYellowBox = true
export interface Props {
    name?: string;
    enthusiasmLevel?: number;
}
const searchShowroom: React.FC<Props> = (sideMenuPorps: any) => {
    const dispatch = useDispatch();
    const [totalshowroom, setTotalshowroom] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [stateSource, setStateSource] = useState([]);
    const [ciySource, setCiySource] = useState([]);
    const [areaSource, setAreaSource] = useState([]);
    const [displaySource, setDisplaySource] = useState([]);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    useEffect(() => {
        console.log('log status1', sideMenuPorps);
        fetchBook();
    }, []);
    const fetchBook = async () => {
        const response = await showroomApi();
        const showRoom = response.trim();
        const sRoom = JSON.parse(showRoom);
        setTotalshowroom(sRoom.showroomcount)
        setDataSource(sRoom.data);
        interface state {
            showroom_state_id?: string;
        }
        if (sRoom.data.length != 0) {
            //console.log('dataSource if');
            let state = sRoom.data.filter((arr: state, index: number, self: any) =>
                index === self.findIndex((t: state) => (t.showroom_state_id == arr.showroom_state_id)));
            setStateSource(state);
            setCiySource([]);
            setAreaSource([]);
        } else {
            //console.log('dataSource else');
        }
    }
    const _onItemSelect = (item: showroomtype) => {
        // console.log("city city", item);
        let city1 = dataSource.filter((arr: showroomtype, index, self) =>
            index === self.findIndex((t: showroomtype) => (t.showroom_city_id === arr.showroom_city_id
                && arr.showroom_state_id === item.value)));
        setDisplaySource([]);
        setCiySource(city1);
        setState(item);
        setCity('');
        setArea('');
        setAreaSource([]);
        // console.log("city array", this.ports)
        //   console.log(city);
    }
    const _onCitychange = (item: showroomtype) => {
        //console.log("oncity change", item);
        let showroomareadata = dataSource.filter((arr: showroomtype, index, self) =>
            index === self.findIndex((t: showroomtype) => (t.showroom_area_id == arr.showroom_area_id &&
                arr.showroom_city_id == item.value)));
        setDisplaySource([]);
        setAreaSource(showroomareadata);
        setCity(item);
        setArea('');
    }
    const _onArea = (item: showroomtype) => {
        // console.log(item);
        let showroomdetail = dataSource.filter((arr: showroomtype) => arr.showroom_area_id == item.value);
        console.log("showroom_city_id", showroomdetail);
        setDisplaySource(showroomdetail);
        setArea(item);
    }
    const _ondirectionScreen = (item: { latitude: string, longitude: string }) => {
        console.log("Direction", item);
        const data = {
            source: {
                latitude: 13.114656,
                longitude: 80.089645
            },
            destination: {
                latitude: +item.latitude,
                longitude: +item.longitude
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
        }
        if (data.destination.latitude) {
            // Alert.alert(item.latitude)
            getDirections(data)
        }
    }
    const _renderData = (item: detailsRender) => {
        return (
            <Card style={{ flexDirection: 'row' }} marginB-5 enableShadow={true} borderRadius-6>
                <View style={{ width: '100%' }}>
                    <View style={{ width: '50%' }}>
                        <Image
                            style={styles.imageRender}
                            resizeMode='contain'
                            source={{ uri: 'https://www.poorvikamobile.com/image/' + item.image }}
                        />
                    </View>
                    <View style={{ width: '50%', padding: 5 }}>
                        <TouchableOpacity onPress={() => _ondirectionScreen(item)}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.showRoomName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.showRoomText}>
                                    {item.address1}
                                </Text>
                                <Text style={styles.showRoomText}>
                                    {item.address2}
                                </Text>
                                <Text style={styles.showRoomText}>
                                    {item.showroom_area_name}
                                </Text>
                                <Text style={styles.showRoomText}>
                                    {item.showroom_state_name}  {item.pincode}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>   
            </Card>
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <CustomHeader componentId={sideMenuPorps.componentId} title='Showroom'></CustomHeader>
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
                {
                    (dataSource.length != 0) ? (<>
                        <View>
                            <Text style={{ textAlign: 'center', letterSpacing: .7 }}>Total Number of Showrooms:<Text style={{ color: '#e9590c' }}>{totalshowroom}</Text></Text>
                        </View>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'STATE'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={state}
                            onChange={_onItemSelect}
                            showSearch
                            searchPlaceholder={'STATE'}
                        // rightIconSource={Assets.icons.poorvika.dropdown}
                        >
                            {stateSource.map((item: showroomtype, key) => (
                                <Picker.Item label={item.showroom_state_name} value={item.showroom_state_id} key={key} />)
                            )}
                        </Picker>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'CITY'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={city}
                            onChange={_onCitychange}
                            showSearch
                            searchPlaceholder={'CITY'}
                        // rightIconSource={Assets.icons.poorvika.dropdown}
                        >
                            {ciySource.map((item:showroomtype, key) => (
                                <Picker.Item label={item.showroom_city_name} value={item.showroom_city_id} key={key} />)
                            )}
                        </Picker>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'AREA'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={area}
                            onChange={_onArea}
                            showSearch
                            searchPlaceholder={'AREA'}
                        // rightIconSource={Assets.icons.poorvika.dropdown}
                        >
                            {areaSource.map((item:showroomtype, key) => (
                                <Picker.Item label={item.showroom_area_name} value={item.showroom_area_id} key={key} />)
                            )}
                        </Picker>
                        {
                            (displaySource) ? (<>
                                <Card style={{ padding: 5 }} enableShadow={true}>
                                    {/* <Text>{displaySource.name}</Text> */}
                                    <FlatList
                                        data={displaySource}
                                        renderItem={({ item }) => _renderData(item)}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </Card>
                            </>) : null
                        }
                    </>) : (<>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
                            <ActivityIndicator
                                animating={true}
                                style={
                                    {
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                size="large"
                            />
                        </View>
                    </>)
                }
            </ScrollView>
        </View>
    )
}
searchShowroom.options = {
    topBar: {
        visible: false,
    }
}
export default searchShowroom;
