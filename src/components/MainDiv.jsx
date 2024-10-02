import React, { useState,useEffect,useRef} from 'react'
const MainDiv = () => {
    const [value,setValue]=useState("");
    const [ans,setAns]=useState([]);
    const [loader, setLoader] = useState(false)
    const { GoogleGenerativeAI } = require('@google/generative-ai');

    const genAi = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    // console.log(process.env.Gemini_key);
    const messagesEndRef = useRef(null);
    let r;
    const sendMsg=async (value) => {
      try {
    const model = await genAi.getGenerativeModel({
      model: "gemini-1.5-pro",
    })
    r = await model.generateContent(`${value}`);
    // console.log(r.response.text());
    return r.response.text();
  } catch (error) {
    console.error('Error:', error);
  }
}
    const handleSubmit=async(val)=>{
      setAns(prevAns => [...prevAns, { id:"user",text: val, img: "icons8-user-64.png" }]);
      setValue("");
      setLoader(true)
        await sendMsg(value).then((result)=>{
      setLoader(false)
          setAns(prevAns => [...prevAns, { id:"ai",text:result, img: "chatBotAns.png" }]);
        })
        .catch((err)=>{
          console.log(err.message);
        })
            
      console.log(ans);
    }

    useEffect(() => {
      scrollToBottom();
  }, [ans,loader]);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(value); 
    }
  };

  return (
    <>
     <div className='mainDiv'>
                <div className="answerMainDiv d-flex flex-column align-items-center">
                    {
                        ans.map((e, index) => {
                            return (
                              <div 
                                    key={index} 
                                    className={`answer ${e.id === 'user' ? 'userAnswer' : 'aiAnswer'}`} 
                                >
                                    <img width="38px" height="38px" src={e.img} alt="" className="avatar" />
                                    <div className={`message ${e.id === 'user' ? 'userMessage' : 'aiMessage'}`}>
                                        <span className="text text-justify">{e.text}</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                     {loader && (
                       <div  
                       className={`answer aiAnswer}`} 
                   >
                        <div className={`loader message aiMessage}`}>Loading...</div>
                        </div>
                    )}
                <div ref={messagesEndRef} />
                </div>
                <div className='questionMainDiv d-flex flex-column justify-content-center align-items-center'>
                    <div className="inputFieldDiv d-flex">
                        <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} onKeyDown={handleKeyDown}  placeholder='Send a message' className='inputField' />
                        <button onClick={() => { handleSubmit(value) }} className='sendButton'>
                            <img width="20px" src="send.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default MainDiv
