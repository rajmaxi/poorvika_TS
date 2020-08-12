import{ StyleSheet } from 'react-native';
import COLOR from 'utils/Color';

export const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor:COLOR.WHITE
    },
    icon: { 
        width: 200, 
        height: 100, 
        marginTop: 10,
        marginBottom:10
    },
    aligncenter: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems:'center'
    },
    headview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:15
    },
    headfont: {
        fontSize: 18,
        fontWeight: '600',
        color: COLOR.GRAY
    },
    forgotform: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 15,
    },
    input: {
        fontSize: 15,
    },
    forminput: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLOR.THEME,
        marginHorizontal: 10,
    },
    inputerror : { 
        color: 'red', 
        marginHorizontal: 30,
        fontSize:15,
        marginBottom:15
    },
    forgotbuttoncontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    forgotbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonwidth: {
        width: '60%'
    },
    buttonlabel: {
        fontSize: 17,
        fontWeight: '600'
    },
});