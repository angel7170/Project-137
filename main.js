function setup()
{
canvas = createCanvas(400,400);
canvas.center();

video = createCapture(VIDEO);
video.hide();
}

status1 = "";
object_name = "";
object = [];
name_object_new = "";

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    name_object_new = document.getElementById("Input").value;
    object_name = name_object_new.toLowerCase();
}

function modelLoaded()
{
    console.log("Model is Loaded!");
    status1 = true;
    
}

function draw()
{
    image(video,0,0,400,400);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects are" + object.length;
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " %", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak();
             }
             else{
                 document.getElementById("object_status").innerHTML = object_name + " not found";
             }
        }
    }
}

/*function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Dectecting Object";
}*/

function gotResult(error, results)
{
 if(error)
 {
     console.log(error);
 }
 else{
     console.log(results);
     object = results;
 }
}
