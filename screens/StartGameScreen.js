import {StyleSheet, TextInput, View, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";


function StartGameScreen({onPickNumber}){

    const [enteredNumber, setEnteredNumber] = useState("");

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText);
    }

    function resetInputHandler(){
        setEnteredNumber('');
    }
    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid number!',
                'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
                )
            return;
        }
        onPickNumber(chosenNumber);
    }


    return <View style={styles.rootContainer}>
        <Title>Guess My Number</Title>
        <Card>
            <InstructionText>Enter A Number</InstructionText>
            <TextInput style={styles.input}
                   maxLength={2}
                   keyboardType='numeric'
                   autoCapitalize="none"
                   autoCorrect={false}
                   value={enteredNumber}
                   onChangeText={numberInputHandler}
            />
            <View style={styles.buttons}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
            </View>
        </Card>
    </View>

}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        marginTop: 100,
        alignItems: 'center'

    },
    input:{
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: "center",
    },
    buttons:{
       flexDirection: "row-reverse"
    }
});