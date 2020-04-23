import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) =>{
	
		if(isSignedIn){
			return(
			<nav style={{display:'flex' ,justifyContent:'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className='pa2 f3 llink dim black underline pointer'>Sign Out</p>
			</nav>
			)
		}
		else{
			return(
			<nav style={{display:'flex' ,justifyContent:'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='pa2 f3 llink dim black underline pointer'>Sign In</p>
				<p onClick={() => onRouteChange('Register')} className='pa2 f3 llink dim black underline pointer'>Register</p>
			</nav>
			)
		}

}

export default Navigation;