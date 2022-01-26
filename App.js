import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
    }
  }
  async useEffect() {
    const { status } = await Camera.requestCameraPermissionsAsync();
      this.setState ({hasPermission: status === 'granted'})
  };
  async prendrePhoto() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
    } else {
      console.log("marche pas...")
    }
  };

    render(){
      this.useEffect();
      if (this.state.hasPermission == null) {return(<View><Text>Vous devez accepter les droits pour utiliser la caméra</Text></View>)} 
      if (this.state.hasPermission == false) {return(<View><Text>Vous devez accepter les droits pour utiliser la caméra</Text></View>)}
      if (this.state.hasPermission == true) {
        return (

        <View style={styles.container}>
          <Camera style={styles.camera} type={this.state.type} ef={ref => {this.camera = ref;}}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {this.setState({type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back})}}
              >
              <Text style={styles.text}> Retourner </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {this.prendrePhoto()}}
            >
              <Text style={styles.text}> Photo </Text>
            </TouchableOpacity>
            </View>
          </Camera>
        </View>



        );
      }
    }

}
  

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    marginTop: 50,
  },
  camera: {
    display: 'flex',
    width: '100%',
    height: '50%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 0,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    color: 'black',
    width: '100%',
  },
});


export default App;