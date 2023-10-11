
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:4dde5580-2d7f-458e-ad2a-a6ded9722df4'});

//AWS.config.region = 'eu-north-1';
//AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'eu-north-1:0f78664b-7e27-4251-a9c2-619dacc1400b'});

function awsHelper ( speechText , callBackFun) {

    var speechParams = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: "",
        TextType: "text",
        VoiceId: "Matthew",
        Text: speechText
    };

    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    signer.getSynthesizeSpeechUrl(speechParams, callBackFun)    
}
