import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import Title from "../components/ui/Title";
import {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";



function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}
let max = 100;
let min = 1;
function GameScreen({chosenNumber, onGameOver}){
    const initialGuess = generateRandomBetween(1,100, chosenNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    useEffect(() => {
        if(currentGuess === chosenNumber){
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, chosenNumber, onGameOver]);

    useEffect(()=>{
        min = 1;
        max = 100;
    },[])

    function nextGuessHandler(direction){
        if((direction === 'lower' && currentGuess < chosenNumber) || (direction === 'great' && currentGuess > chosenNumber)){
            Alert.alert("Don't lie!", "why the fuck you lying, why you always lying",
                [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }
        if(direction === 'lower'){
            max = currentGuess;
        }else{
            min = currentGuess + 1;
        }
        console.log(min, max);
        const newRndNumber = generateRandomBetween(min, max, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds =>[newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;
    console.log(guessRoundsListLength);

    return(<View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        {/*GUESS*/}
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>

            <View style={styles.buttons}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color="white"/>
                </PrimaryButton>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color="white"/>
                </PrimaryButton>

            </View>
        </Card>
        <View style={styles.listContainer}>
            {/*{guessRounds.map((guessRound)=><Text key={guessRound}>{guessRound}</Text>)}*/}
            <FlatList data={guessRounds} renderItem={(itemData) =><GuessLogItem
                guess={itemData.item}
                roundNumber={guessRoundsListLength - itemData.index}

            />}
            keyExtractor={(item) => item}
            />


        </View>
        {/*+*/}
        {/*-*/}
        {/*<View>LOG ROUNDS</View>*/}
    </View>)
}
export default GameScreen;

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 24,

    },
    buttons:{
        flexDirection:'row',
        padding: 10,

    },
    instructionText:{
        marginBottom: 12,

    },
    listContainer:{
        flex: 1,
        padding: 16,
    }
})