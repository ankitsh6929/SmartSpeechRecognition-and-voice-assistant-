import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import './App.css';

function App() {
  const [textToCopy, setTextToCopy] = useState(''); // here in textToCopy , we store all the content of transcript , so that if anyone copy can have the content of transcript
  const [isCopied, setCopied] = useClipboard(textToCopy);   // setCopied checks if something has copied or not and then return a boolean value 

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {                   // Conditional Check if (transcript): This condition checks if transcript contains any text (i.e., it is not empty or null). If transcript has text, it sets textToCopy to this text.
      setTextToCopy(transcript);
    }
  }, [transcript]);

  const startListen = () => SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className='container'>
        <h2>Speech to Text Converter</h2>
        <br/>
        <div className='main-content'>
          {transcript}
        </div>
        <div className='btn-style'>
          <button onClick={() => setCopied()}>{isCopied ? 'Copied' : 'Copy to Clipboard'}</button>
          <button onClick={startListen}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
        </div>
      </div>
    </>
  );
}

export default App;
