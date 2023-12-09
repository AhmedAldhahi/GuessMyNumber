import {StyleSheet, Text} from "react-native";
import Colors from "../../constants/colors";

function Title({children}){
    return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title:{
        fontFamily:'open-sans-bold',
        fontSize: 24,
        color: 'white',
        textAlign:'center',
        padding: 12,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'white',
    },
})