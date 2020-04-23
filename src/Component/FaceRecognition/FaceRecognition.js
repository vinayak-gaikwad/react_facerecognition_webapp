import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, box }) =>{
	return(
		<div className='flex justify-center'>
			<div className='mt2 absolute '>
				
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
				<div className ='bounding-box' style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}></div>
			</div>
		</div>
		

	)
}

export default FaceRecognition;