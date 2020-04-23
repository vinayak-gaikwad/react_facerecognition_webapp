import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './Logo.png'

const Logo = () =>{
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt shadow-3" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
	 			<div className="Tilt-inner"> <img alt='Logo' src={logo}/> </div>
			</Tilt>
		</div>

	)
}

export default Logo;