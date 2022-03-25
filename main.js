song="";
scoreleftwrist=0;
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
function setup()
{ 
    
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
    fill("#00ff6e");
    stroke("#05ff1a");
    if(scoreleftwrist>0.2)
    {
        
    circle(leftwristx,leftwristy,25);
    InNumberleftwristy=Number(leftwristy);
     remove_decimals=floor(InNumberleftwristy);
     volume=remove_decimals/500;
     document.getElementById("volume").innerHTML="volume="+ volume;
     song.setVolume(volume);
    }

     
   
}

function preload()
{
    song=loadSound("music.mp3");
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded()
{
    console.log('poseNet is initialized');
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keyPoint[9].score;
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;

    }

}
