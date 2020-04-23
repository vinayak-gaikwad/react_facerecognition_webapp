import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './Component/Navigation/Navigation';
import SignIn from './Component/signIn/signIn';
import Register from './Component/Register/Register';
import Logo from './Component/Logo/Logo';
import Rank from './Component/Rank/Rank';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
 apiKey: '8520106bbd9d4aa7a3e8567d5d4de672'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: true,

        }
    }

    calculateFaceLocation = (data) => {
        const face = data.outputs[0].data.regions[0].region_info.bounding_box ;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
    
        return{
            leftcol:face.left_col * width,
            toprow:face.top_row * height,
            rightcol: width -(face.right_col * width),
            bottomrow:height - (face.bottom_row * height),
        }


    }

    displayFace = (box) => {
        console.log(box);
        this.setState({box: box});
    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => this.displayFace(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if(route === 'signout'){
            this.setState({isSignedIn: false})
        }
        else if(route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }


    render() {

        return (
        <div className="App">
         <Particles
            className='particle' 
              params={{
                    particles: {
                        number: {
                            value:50,
                            density: {
                                enable: true,
                                value_area: 500
                            }
                        }
                    }
                }}
              
            />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange= {this.onRouteChange} />
        {
            (this.state.route === 'home')?
                <div>
                    <Logo/>
                    <Rank />
                    <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                    <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
                </div>
           :(this.state.route === 'signin'?
                <SignIn onRouteChange= {this.onRouteChange} />
            :
                <Register onRouteChange= {this.onRouteChange} />



            ) 
             
        }

    </div>
  );
}

}

export default App;
