Status="";
Input_text= "";
objects = [];

function setup() {
    canvas = createCanvas(480 ,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480 ,380);
    if (Status !="") 
    {
        objectDetector.detect(video , gotResults);
        for (i = 0;  i < objects.length; i++) 
        {
           document.getElementById("Status").innerHTML = "Status :  Objects Detected";
           console.log(objects.length);
           fill("#FF0000");
           percent = floor(objects[i].cofidence * 100);
           text(objects[i].label +""+ percent+"%"+ objects[i].x + 15 + objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x , objects[i].y ,objects[i].width ,objects[i].height);
           if(object[i].label == Input_text)
           {
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("object_found").innerHTML = Input_text+"Found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(Input_text+"found");
           }
           else
           {
            document.getElementById("object_found").innerHTML = Input_text+"Not Found";
           } 
        }
    }
}

function Start() {
    objectDetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Objects";
    Input_text = document.getElementById("Input_id").value;

}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
}

function gotResults(error ,results) {
    if (error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}