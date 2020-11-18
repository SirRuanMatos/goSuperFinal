
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const { IamAuthenticator } = require('ibm-watson/auth');
var path = require("path");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: 'yslqNuSQ1oJO13DAXRiLZhfeuZ7qS1aCAhq2zO73IzSH' }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/c6e407a1-e356-4ef9-afb8-ab0d64e8d940'
});

module.exports = {
  async home(req, resp) {
    console.log(req.file);




    ffmpeg(req.file.path)
      .toFormat("wav")
      .on("error", (err) => {
        console.log("An error occurred: " + err.message);
      })
      .on("end", () => {
        console.log("Processing finished !");

        const params = {
          // From file
          audio: fs.createReadStream(req.file.path + ".wav"),
          contentType: 'audio/l16; rate=44100',
          model: "pt-BR_NarrowbandModel"
        };
        speechToText.recognize(params)
          .then(response => {
            console.log(JSON.stringify(response.result, null, 2));
            try {
              fs.unlinkSync(req.file.path);
              fs.unlinkSync("./src/upload/" + req.file.filename + ".wav");
            } catch (err) {
              console.log('Houve algum erro!', err);
            }
            resp.status(200).send(response.result.results[0].alternatives[0]);
          })
          .catch(err => {
            console.log(err);
            resp.status(500).send();
          });
      })
      .save("./src/upload/" + req.file.filename + ".wav");

    /**/



  },

};