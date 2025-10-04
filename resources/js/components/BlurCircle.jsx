import React from 'react'

const BlurCircle = ({top="auto",left="auto",bottom="auto",right="auto"}) => {
  return (
    <div
    style={{top:top,left:left,bottom:bottom,right:right}}  
    className='absolute -z-50 h-58 w-58 aspect-square rounded-full bg-primary/30 blur-3xl'>

    </div>
  )
}

export default BlurCircle;