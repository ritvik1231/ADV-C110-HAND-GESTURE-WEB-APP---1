var prediction_1=""
var prediction_2=""

Webcam.set(
    {
        width:350,
        height:300,
        image_format:"png",
        png_quality:90
    }
);

var camera=document.getElementById("camera")
Webcam.attach("#camera")

function takesnapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    }
    )
}

console.log("ml5 version=",ml5.version)
var classifier=ml5.imageClassifier("",modelLoaded)//https://teachablemachine.withgoogle.com/models/jiU6ruSSR/

function modelLoaded(){
    console.log("model is Loaded")

}

function speak(){
    var synth=window.speechSynthesis()
    var speak_data1="The first prediction is"+prediction_1
    var speak_data2="And the second prediction is"+prediction_2
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterThis)
}

function check(){
img=document.getElementById("capture_image")
classifier.classify(img,gotResult)
}

function gotResult(error,results)
{
   if(error){
    console.error(error)
   }
   else{
      console.log(results)
      document.getElementById("result_emotion_name1").innerHTML=results[0].label
      document.getElementById("result_emotion_name2").innerHTML=results[1].label
      prediction_1=results[0].label
      prediction_2=results[1].label
      speak()

      if(results[0].label=="happy"){
        document.getElementById("update_emoji1").innerHTML=&#128522;
      }

      if(results[0].label=="sad"){
        document.getElementById("update_emoji1").innerHTML=&#128532;
      }

      if(results[0].label=="angry"){
        document.getElementById("update_emoji1").innerHTML=&#128548;
      }



      if(results[1].label=="happy"){
        document.getElementById("update_emoji2").innerHTML=&#128522;
      }

      if(results[1].label=="sad"){
        document.getElementById("update_emoji2").innerHTML=&#128532;
      }

      if(results[1].label=="angry"){
        document.getElementById("update_emoji2").innerHTML=&#128548;
      }


   }
}


