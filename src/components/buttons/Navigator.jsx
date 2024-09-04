
import useSpeechrecognition from "../../hooks/speechrecognition/useSpeechrecognition";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Navigator = () => {
    const { text, startListening, isListening } = useSpeechrecognition();
    const navigate = useNavigate();

    useEffect(() => {
        if (text) {
            const lowerText = text.toLowerCase();

            if (lowerText.includes('home')) {
             navigate('/view/welcome');
            }
             else if (lowerText.includes('birthday')) {
        navigate('/view/birthdays');
            } 
            else if (lowerText.includes('admin')) {
        navigate('/admin');
      } 
        }
    },[text, navigate])
  return (
    <>

      
      
          <div>
              <button onClick={startListening}>Speak</button>
              {/* <button onClick={stopListening}>Stop</button> */}
          </div>
          {isListening ? <div>Currently listening</div> : null}
        
    
    </>
  );
};

export default Navigator;
