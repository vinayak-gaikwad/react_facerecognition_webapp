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

const initialstate = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: true,
            user:{
                id:'',
                name:'',
                email:'',
                entries: 0,
                joined: '',
            }
        }

class App extends Component {
    constructor() {
        super();
        this.state = initialstate;

        
    }

    loadUser= (data) =>{
        this.setState({user:{
            id:data.id,
            name:data.name,
            email:data.email,
            entries: data.entries,
            joined: data.joined,
        }
    }
        )
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
        
        this.setState({box: box});
    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
            if(response){
                fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                id:this.state.user.id
            })
            })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries:count}))
                })
            }
            this.displayFace(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if(route === 'signout'){
            this.setState(initialstate)
            this.setState({isSignedIn: false})
        }
        else if(route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }


    render() {

        return (
        // <div className="App">
        //  <Particles
        //     className='particle' 
        //       params={{
        //             particles: {
        //                 number: {
        //                     value:50,
        //                     density: {
        //                         enable: true,
        //                         value_area: 500
        //                     }
        //                 }
        //             }
        //         }}
              
        //     />
        <div>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange= {this.onRouteChange} />
        {
            (this.state.route === 'home')?
                <div>
                    <Logo/>
                    <Rank name= {this.state.user.name} entries={this.state.user.entries}/>
                    <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                    <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
                </div>
           :(this.state.route === 'signin'?
                <SignIn loadUser={this.loadUser} onRouteChange= {this.onRouteChange} />
            :
                <Register loadUser={this.loadUser} onRouteChange= {this.onRouteChange} />



            ) 
             
        }

    </div>
  );
}

}

export default App;
