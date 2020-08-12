
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity, Dimensions, FlatList, Image, ActivityIndicator
} from 'react-native'
import { getServicecenter } from './apiService';
import styles from './servicePageStyle';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Carousel, Picker, Colors } from 'react-native-ui-lib';
console.disableYellowBox = true
const serviceCenter: React.FC<servicerops> = (servicerops: any) => {
    const dispatch = useDispatch();
    const [totalservice, setTotalservice] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [brandSource, setBrandSource] = useState([]);
    const [stateSource, setStateSource] = useState([]);
    const [ciySource, setCiySource] = useState([]);
    const [areaSource, setAreaSource] = useState([]);
    const [nearAreasource, setNearAreasource] = useState([]);
    const [displaySource, setDisplaySource] = useState([]);
    const [brand, setBrand] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [nearArea, setNearArea] = useState('');
    useEffect(() => {
        console.log('log status1 servicerops ', servicerops);
        fetchBook();
    }, []);
    const fetchBook = async () => {
        const response = await getServicecenter();
        console.log('service response', response);
        if (response.success) {
            setTotalservice(response.servicecentercount)
            setDataSource(response.data);
            var uniq = {};
            let branddata = response.data.filter(obj => !uniq[obj.brand_id] && (uniq[obj.brand_id] = true));
            setBrandSource(branddata)
            setStateSource([]);
            setCiySource([]);
            setAreaSource([]);
            setNearAreasource([]);
        } else {
        }
    }
    const _onItemSelect = (item: servicetypes) => {
        //  console.log('Brand click', item);
        let state = dataSource.filter((arr: servicetypes, index, self) =>
            index === self.findIndex((t: servicetypes) => (t.state_id === arr.state_id && t.brand_id === item.value)));
        setBrand(item);
        setStateSource(state);
        setCiySource([]);
        setState('');
        setCity('');
        setArea('');
        setNearArea('')
        setNearAreasource([]);
        setAreaSource([]);
        setDisplaySource([]);
    }
    const _onCitychange = (item: servicetypes) => {
        let regiondata = dataSource.filter((arr: servicetypes, index, self) =>
            index === self.findIndex((t: servicetypes) => (t.region_id === arr.region_id && t.state_id == item.value
                && t.brand_id == brand.value)));
        // console.log(regiondata, 'showroomareadata showroomareadata', brand);

        setDisplaySource([]);
        setState(item);
        setCiySource(regiondata);
        setCity('');
        setArea('');
        setNearArea('')
        setNearAreasource([]);
        setAreaSource([]);
        // setAreaSource(showroomareadata);
    }
    const _onArea = (item: servicetypes) => {
        let areadata = dataSource.filter((arr: servicetypes, index, self) =>
            index === self.findIndex((t: servicetypes) => (t.area_id === arr.area_id && t.region_id == item.value
                && t.brand_id == brand.value)));
        // console.log("areadata", areadata);
        setAreaSource(areadata);
        setDisplaySource([]);
        setCity(item);
        setArea('');
        setNearArea('')
        setNearAreasource([]);
    }
    const _onnearArea = (item: servicetypes) => {
        let sercenterdata = dataSource.filter((arr: servicetypes, index: number, self: any) =>
            index === self.findIndex((t: servicetypes) => (t.centerName == arr.centerName && t.area_id === item.value && t.brand_id == brand.value)));
        // console.log("areadata sercenterdata sercenterdata", sercenterdata);
        setDisplaySource([]);
        setArea(item);
        setNearArea('')
        setNearAreasource(sercenterdata);
    }
    const _onfinalArea = (item: { value: string, }) => {
        setNearArea(item);
        let arealast = dataSource.filter((arr: { service_id: string, }) => arr.service_id == item.value);
        console.log('_onfinalArea', item, arealast);
        setDisplaySource(arealast);
    }
    const _renderData = (item: serviceRender) => {
        return (
            <Card marginB-5 enableShadow={true} borderRadius-6>
                <View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Center Name</Text>
                        <Text>{item.centerName}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Address</Text>
                        <Text>{item.centerAddress}</Text>
                        <Text>Area :{item.area}</Text>
                        <Text>city :{item.region}</Text>
                        <Text>Phone num: {item.phone_number}</Text>
                    </View>
                </View>
            </Card>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
                {
                    (dataSource.length != 0) ? (<>
                        <View>
                            <Text style={{ textAlign: 'center', letterSpacing: .7 }}>Total Number of Services:<Text style={{ color: '#e9590c' }}>{totalservice}</Text></Text>
                        </View>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'BRAND'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={brand}
                            onChange={_onItemSelect}
                            showSearch
                            searchPlaceholder={'BRAND'}
                        //
                        >
                            {brandSource.map((item: { brand: string, brand_id: string }, key) => (
                                <Picker.Item label={item.brand} value={item.brand_id} key={key} />)
                            )}
                        </Picker>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'STATE'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={state}
                            onChange={_onCitychange}
                            showSearch
                            searchPlaceholder={'STATE'}
                        //
                        >
                            {stateSource.map((item: { state: string, state_id: string }, key) => (
                                <Picker.Item label={item.state} value={item.state_id} key={key} />)
                            )}
                        </Picker>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'CITY'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={city}
                            onChange={_onArea}
                            showSearch
                            searchPlaceholder={'CITY'}
                        //
                        >
                            {ciySource.map((item: { region: string, region_id: string }, key) => (
                                <Picker.Item label={item.region} value={item.region_id} key={key} />)
                            )}
                        </Picker>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'AREA'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={area}
                            onChange={_onnearArea}
                            showSearch
                            searchPlaceholder={'AREA'}
                        //
                        >
                            {areaSource.map((item: { area: string, area_id: string }, key) => (
                                <Picker.Item label={item.area} value={item.area_id} key={key} />)
                            )}
                        </Picker>
                        <Picker
                            containerStyle={{ width: '90%', height: 50, margin: 10, }}
                            placeholder={'AREA'}
                            underlineColor={{ focus: Colors.THEME, error: Colors.RED }}
                            floatingPlaceholderColor={Colors.THEME}
                            floatingPlaceholder
                            value={nearArea}
                            onChange={_onfinalArea}
                            showSearch
                            searchPlaceholder={'AREA'}
                        //
                        >
                            {nearAreasource.map((item: { centerName: string, service_id: string }, key) => (
                                <Picker.Item label={item.centerName} value={item.service_id} key={key} />)
                            )}
                        </Picker>
                        {
                            (displaySource.length != 0) ? (<>
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
export default serviceCenter;
