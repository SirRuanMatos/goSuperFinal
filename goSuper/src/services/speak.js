
import Tts from 'react-native-tts';

Tts.setDefaultLanguage('pt-BR');

var assistandOn = false;

function speak(text) {
   if (assistandOn) {
       Tts.speak(text, {
           androidParams: {
               KEY_PARAM_PAN: -1,
               KEY_PARAM_VOLUME: 0.5,
               KEY_PARAM_STREAM: 'STREAM_MUSIC',
           },
       });
       
       return
   }
}


function setAssistandOn(val){
    assistandOn = val;
}




export {speak, setAssistandOn }; 