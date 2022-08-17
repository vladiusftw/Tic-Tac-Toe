import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Box from '../Components/Box'
import { onSnapshot, doc, updateDoc, increment, deleteDoc } from 'firebase/firestore'
import { db } from '../Firebase'

const Game = ({route, navigation}) => {
    const gameCode = route.params.gameCode
    const playerNum = route.params.playerNum
    const char = playerNum == 1 ? "X" : "O"
    const [gameBoard,setGameBoard] = useState(["","","","","","","","",""])
    const [player1Name, setPlayer1Name] = useState("")
    const [player2Name,setPlayer2Name] = useState("")
    const [player1Score,setPlayer1Score] = useState(0)
    const [player2Score,setPlayer2Score] = useState(0)
    const [playerTurn,setPlayerTurn] = useState()

    const interstitialId = Platform.OS === 'ios' ? 'ca-app-pub-6997156054138330/8793573442' : 'ca-app-pub-6997156054138330/5014110536'
   
    useEffect(() => {
        const unsub = onSnapshot(doc(db,"games",gameCode), (doc) => {
            setPlayer1Name(doc.data().names[0])
            setPlayer2Name(doc.data().names[1])
            setPlayer1Score(doc.data().scores[0])
            setPlayer2Score(doc.data().scores[1])
            setGameBoard(doc.data().arr)
            setPlayerTurn(doc.data().playerTurn)
        })
        return unsub
    },[])


    const play = async(index) => {
        if(gameBoard[index] == "" && playerTurn == playerNum){
            var temp = gameBoard
            temp[index] = char
            await updateDoc(doc(db,"games",gameCode),{
                arr:temp,
                playerTurn: playerNum == 1 ? 2 : 1,
                timer: 10
            })
            checkWinner()
        }
    }

    const player1Won = async() => {
        await updateDoc(doc(db,"games",gameCode),{
            arr: ["","","","","","","","",""],
            scores: [player1Score+1,player2Score]
        })
    }

    const player2Won = async() => {
        await updateDoc(doc(db,"games",gameCode),{
            arr: ["","","","","","","","",""],
            scores: [player1Score,player2Score+1]
        })
    }

    const tie = async() => {
        await updateDoc(doc(db,"games",gameCode),{
            arr: ["","","","","","","","",""]
        })
    }

    const checkWinner = () => {
        if(gameBoard[0] != "" && gameBoard[0] == gameBoard[1] && gameBoard[0] == gameBoard[2]){
            if(gameBoard[0] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[3] != "" && gameBoard[3] == gameBoard[4] && gameBoard[3] == gameBoard[5]){
            if(gameBoard[3] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[6] != "" && gameBoard[6] == gameBoard[7] && gameBoard[6] == gameBoard[8]){
            if(gameBoard[6] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[0] != "" && gameBoard[0] == gameBoard[3] && gameBoard[0] == gameBoard[6]){
            if(gameBoard[0] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[1] != "" && gameBoard[1] == gameBoard[4] && gameBoard[1] == gameBoard[7]){
            if(gameBoard[1] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[2] != "" && gameBoard[2] == gameBoard[5] && gameBoard[2] == gameBoard[8]){
            if(gameBoard[2] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[0] != "" && gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8]){
            if(gameBoard[0] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[2] != "" && gameBoard[2] == gameBoard[4] && gameBoard[2] == gameBoard[6]){
            if(gameBoard[2] == "X") player1Won()
            else player2Won()
        }
        else if(gameBoard[0] != "" && gameBoard[1] != "" && gameBoard[2] != "" && gameBoard[3] != "" && gameBoard[4] != "" && gameBoard[5] != ""
        && gameBoard[6] != "" && gameBoard[7] != "" && gameBoard[8] != "") 
            tie()
    }

    const finishGame = async() => {
        navigation.popToTop()
    }


    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{fontSize: 15}}>Game Code:</Text>
                <Text style={{fontSize: 15}}>{gameCode}</Text>
            </View>

            <View style={styles.names}>
                <View style={{alignItems: "center", justifyContent: "center", width:84, height: 53}}>
                    <Text style={{fontSize: 20, fontWeight:playerTurn == 1 ? "bold" : "normal"}}>{player1Name}</Text>
                </View>
                <View style={{alignItems: "center", justifyContent: "center", width:84, height: 54}}>
                    <Text style={{fontSize: 20, fontWeight: playerTurn == 2 ? "bold" : "normal"}}>{player2Name}</Text>
                </View>
            </View>

            <View style={styles.scoreTimer}>
                <View style={styles.score1}>
                    <Text style={{fontSize: 20}}>{player1Score}</Text>
                </View>

                <View style={styles.score2}>
                    <Text style={{fontSize: 20}}>{player2Score}</Text>
                </View>
            </View>

            <View style={styles.board}>
                <View style={styles.row}>
                    <Box text={gameBoard[0]} press={() => play(0)}/>
                    <Box text={gameBoard[1]} press={() => play(1)}/>
                    <Box text={gameBoard[2]} press={() => play(2)}/>
                </View>

                <View style={styles.row}>
                    <Box text={gameBoard[3]} press={() => play(3)}/>
                    <Box text={gameBoard[4]} press={() => play(4)}/>
                    <Box text={gameBoard[5]} press={() => play(5)}/>
                </View>

                <View style={styles.row}>
                    <Box text={gameBoard[6]} press={() => play(6)}/>
                    <Box text={gameBoard[7]} press={() => play(7)}/>
                    <Box text={gameBoard[8]} press={() => play(8)}/>
                </View>
            </View>

            <TouchableOpacity style={styles.endGame} onPress={finishGame}>
                <Text style={{fontSize: 20}}>End Game</Text>
            </TouchableOpacity>

        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D4F1F4",
        justifyContent: 'center'
    },
    title: {
        marginLeft: 24,
        bottom: '8%'
    },
    names: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 17,
        marginRight: 18,
        bottom: '10%'
        
    },
    scoreTimer: {
        flexDirection: "row",
        justifyContent: "space-between",
        bottom: '10%'
    },
    score1: {
        width: 67,
        height: 51,
        backgroundColor: "#189AB4",
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginLeft: 26
    },
    score2: {
        width: 67,
        height: 51,
        backgroundColor: "#189AB4",
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 27
    },
    timer: {
        justifyContent: "center"
    },
    board: {
        marginTop: 0,
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    endGame: {
        width: 133,
        height: 44,
        top: '10%',
        backgroundColor: "#75E6DA",
        borderRadius: 30,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }

})

export default Game


