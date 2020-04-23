import React from 'react';
import './ImageLinkForm.css';


const ImageLinkform = ({ onInputChange, onButtonSubmit }) =>{
	return(
		<div >
			<p className='f3'>This Robot will detect face in the image. Try it!</p>
			
				<div className='center man pa4 shadow-3'>
					<input placeholder='Enter image URL here...'  className='f4 pa2  center w-80' type='tex' onChange={onInputChange} />
					<button className='w-25 grow f4 ph3 dib link pv2 white bg-purple' onClick={onButtonSubmit}>Detect</button>
				</div>
			
			
		</div>

	)
}

export default ImageLinkform;