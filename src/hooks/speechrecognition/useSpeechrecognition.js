import { useEffect, useState } from "react";

 let recognition = null;
    if ("webkitSpeechRecognition" in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-us";
    }


const useSpeechrecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            console.log('onresult', event);
             setText(event.results[0][0].transcript);
            // console.log(event.results[0][0].transcript);
            recognition.stop();
            setIsListening(false);
        }
    }, []);
    const startListening = ()=> {
        setText('');
        setIsListening(true);
        recognition.start();

    }
    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    }
    
    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport : !! recognition
    }
}
export default useSpeechrecognition;
