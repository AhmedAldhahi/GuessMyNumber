import {Text, View, Pressable, StyleSheet} from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({children, onPress}){
    function pressHandler(){
        onPress();
    }
    return<View style={styles.buttonOuterContainer}>
        <Pressable onPress={pressHandler}
                   android_ripple={{color:Colors.primary600}}
                   style={({pressed})=>
                   pressed ? [styles.buttonInnerContainer, styles.pressed]
                       :styles.buttonInnerContainer}
        >
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
        </View>

}

export default PrimaryButton;

const styles = StyleSheet.create({
   buttonInnerContainer:{
       backgroundColor:Colors.primary500,
       paddingVertical: 8,
       paddingHorizontal: 16,
       elevation: 2,

   },
    buttonText:{
       color: 'white',
       textAlign: 'center',
    },
    buttonOuterContainer:{
        flexDirection:"column",
        borderRadius: 28,
        margin: 4,
        overflow:'hidden',
        width: "45%"
    },
    pressed: {
       opacity: 0.75
    }
});