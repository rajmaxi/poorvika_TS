import React, { useState, useEffect } from "react";
import {SafeAreaView, Image, FlatList} from "react-native";
import { Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import { privilegeApi } from './service';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../constants/images';
import CustomHeader from '../../../src/components/customheader'

const privilege: React.FC<myprivilegeprops> = (props: myprivilegeprops) => {

    // const searchcategory: myprivilegetype = (myprivilegeprops) => {

    const [componentId, setComponentId] = useState(props.componentId);
    const [activeStatus, setactiveStatus] = useState([]);
    const [title, setTitle] = useState<string>('Privilege')

    useEffect(() => {
        fetchBook();
        console.log('testtt',props)
    }, []);

    const fetchBook = async () => {
        const response = await privilegeApi(9566228855);
        const list = response.GET_CUSTOMER_TRANS_INFOResult.output.response
        const listData = JSON.parse(list);

        let newArray = listData.CUSTOMER_DETAILS.filter(function (item) {
            return item;
        });

       // console.log("test", newArray);

        setactiveStatus(newArray)

    }

    return (
        <SafeAreaView style={styles.body}>
            <CustomHeader componentId={props.componentId} title={title}></CustomHeader>
            <View>
                <LinearGradient
                    colors={['#4b6cb7', '#182848']}
                    style={styles.head_title}
                >
                    <View> 
                        <Image source={Images.profile} style={styles.profile__img} />
                    </View>
                    <View>
                    {
                        (activeStatus.length != 0) ? (<>
                                <FlatList
                                    data={activeStatus}
                                    renderItem={({item}) => (
                                    <View>
                                        <Text marginV-15 style={[{textAlign:'center'},{color:Colors.white}]}>{item.Name}</Text>
                                        <Text style={[{textAlign:'center'},{color:Colors.white}]}>{item.EmailId}</Text>
                                    </View>
                                    )}
                                    keyExtractor={(item) => item.EmailId}
                                />
                        </>) : null
                    }
                    </View>
                </LinearGradient>
            </View>  
        </SafeAreaView>
    );

};
privilege.options = {
    topBar: {
        visible: false,
    }
}
export default privilege;

