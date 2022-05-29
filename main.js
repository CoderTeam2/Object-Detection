var img = "";
var state = "";
var obj = [];
function preload(){
    img = loadImage("dog_cat.jpg");
}
var Obj_detector = "";

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    Obj_detector = ml5.objectDetector("cocossd", modelLoaded);
}
function modelLoaded(){
    console.log("Model Loaded");
    state = true;
    document.getElementById("status").innerHTML = "Object detection status "+ " : "+state;
    Obj_detector.detect(img, gotResults);
}
function draw(){
    image(img, 0, 0, 640, 420);
    if(state != ""){
        for(var i = 0; i < obj.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            var confidence = floor(obj[i].confidence * 100);
            fill("red");
            text(obj[i].label + " " + confidence + " % ", obj[i].x+10, obj[i].y+15);
            noFill();
            stroke("red");
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }else{
        console.log(results);
        obj = results;
    }
}
