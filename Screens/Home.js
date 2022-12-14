import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { addDoc, doc, setDoc, collection, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db} from '../Firebase'
import { AntDesign } from '@expo/vector-icons'; 

const Home = ({navigation}) => {
  const [isPressed,setPressed] = useState(false)
  const [name,setName] = useState("")
  const [code,setCode] = useState("")

  const bannerId = Platform.OS === 'ios' ? 'ca-app-pub-6997156054138330/2747039842' : 'ca-app-pub-6997156054138330/2579518889'
  const interstitialId = Platform.OS === 'ios' ? 'ca-app-pub-6997156054138330/8793573442' : 'ca-app-pub-6997156054138330/5014110536'

  const createGame = async() => {
    if(name === "") {
      alert("Name can't be empty")
      return
    }
    let id = Math.random().toString(16).slice(7)
    let game = {
      names:[name,""],
      scores:[0,0],
      arr:["","","","","","","","",""],
      playerTurn: 1
    }
    await setDoc(doc(db,"games",id),game)
    navigation.navigate("Game",{
      gameCode: id,
      playerNum: 1
    })
    
  }

  const joinGame = async() => {
    if(name === "") {
      Alert.alert('Error',"Name can't be empty")
      return
    }
    if(code === ""){
      Alert.alert('Error',"Code can't be empty")
      return
    }
    const d = await getDoc(doc(db,"games",code))
    if(d.exists()){
      if(d.data().names[1] == ""){
        await updateDoc(doc(db,"games",code),{
          names:[d.data().names[0],name]
        })
        navigation.navigate("Game",{
          gameCode: code,
          playerNum: 2
        })
      }
      else alert("Game is full")
    }
    else alert("Invalid Game Code")
  }

  return (
    <View style={styles.container}>
      
      <View style={{flex:9,justifyContent: 'center'}}>
        <View style={styles.topPart}>
          <View style={styles.titleView}>
            <Text style={{fontSize: 20}}>Enter your name:</Text>
          </View>
          <TextInput style={styles.nameInput} placeholder={"Name..."} maxLength={10} onChangeText={newText => setName(newText)}/>
        </View>
        
        <View style={styles.midPart}>
          
          <TouchableOpacity style={styles.createButton} onPress={createGame}>
            <Text style={{fontSize: 20}}>Create Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.joinButton} onPress={() => setPressed(true)}>
            <Text style={{fontSize: 20}}>Join Game</Text>
          </TouchableOpacity>
        </View>
        
        <KeyboardAvoidingView style={{position:"absolute", bottom:50}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{marginTop: 40, flexDirection: "row", justifyContent: "center",alignItems: "center", marginLeft:40, display: isPressed ? "flex" : "none"}}>
            <TextInput style={{width:200,height:40,borderRadius: 30, borderWidth: 2, textAlign:"center",fontSize: 20,backgroundColor:"black",color:"white"}} placeholder={"Code..."} placeholderTextColor={"white"} onChangeText={newText => setCode(newText)}/>
            <TouchableOpacity style={{marginLeft: 10}} onPress={joinGame}>
              <AntDesign name="play" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#D4F1F4',
    alignItems: "center",
    justifyContent: 'center'
  },
  titleView: {
    width: 232,
    height: 37,
    alignItems: "center"
  },
  midPart: {
    alignItems: 'center'
  },  
  topPart: {
    alignItems: 'center'
  },
  nameInput: {
    width: 120,
    height: 40,
    textAlign: "center",
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    fontSize: 20,
    marginTop: 12
  },
  createButton: {
    width: 187,
    height: 52,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "#75E6DA"
  },
  joinButton: {
    width: 187,
    height: 52,
    marginTop: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "#189AB4"
  }
});

export default Home
