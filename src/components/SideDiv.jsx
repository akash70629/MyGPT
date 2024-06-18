import React from 'react'
const SideDiv = () => {
  return (
    <>
      <div className='sideDiv pt-4'>
        <div className='firstSideDiv'>
            <div className='d-flex firstSide align-items-center'>
                <img src="chatLogo.png" width="40px" className='me-1' alt=""/>
                <h5 className="text-dark">MyGPT</h5>
            </div>
            <div className='mt-3 me-3 ms-2'>
                <button className="newChatBtn text-light p-1">+ New Chat</button>
                <div className='questionDiv mt-4'>
                    <span className='text-dark'>What is programming</span>
                </div>
                <div className='questionDiv mt-2'>
                    <span className='text-dark'>How to use API</span>
                </div>
            </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default SideDiv
