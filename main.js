Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
Webcam.attach("#camera");
function take_pic(){
    Webcam.snap(function(cam_pic){
        document.getElementById("result").innerHTML='<img id="pic"src="'+cam_pic+'">';
    });
    
}
p1="";
p2="";
function texttospeach(){
    speak_text="prediction 1 is "+p1+" and prediction 2 is "+p2;
    speak_audio= new SpeechSynthesisUtterance(speak_text);
    window.speechSynthesis.speak(speak_audio);
}
emoji_model=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/snYL9jW3h/model.json",model_loaded);
function model_loaded(){
    console.log("model loadded sucsusfully");
}
function check(){
    pic=document.getElementById("pic");
    emoji_model.classify(pic,get_result)
}
function get_result(e,r){
    if(e){
        console.error(e);
    }
    else{
        console.log(r);
        p1=r[0].label;
        p2=r[1].label;
        texttospeach();
        document.getElementById("emotion_1").innerHTML=p1;
        document.getElementById("emotion_2").innerHTML=p2;
        if(p1=="hi"){
            document.getElementById("emoji_1").innerHTML="&#128075;"
        }
        else if(p1=="good"){
            document.getElementById("emoji_1").innerHTML="&#128077;"
        }
        else if(p1=="peace"){
            document.getElementById("emoji_1").innerHTML="&#9996;"
        }
        
        if(p2=="hi"){
            document.getElementById("emoji_2").innerHTML="&#128075;"
        }
        else if(p2=="good"){
            document.getElementById("emoji_2").innerHTML="&#128077;"
        }
        else if(p2=="peace"){
            document.getElementById("emoji_2").innerHTML="&#9996;"
        }
        
    }
}