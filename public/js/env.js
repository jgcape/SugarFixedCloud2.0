const allowCamera = () => {
    var video = document.getElementById('video'); // Keep DOM reference, jquery doesn't work

    // Get access to the camera
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
    };
}

const cameraPreview = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
}


const takePhoto =() => {
    var video = document.getElementById('video');
    context.drawImage(video, 0, 0, 640, 480);
}


$(document).ready(function(){
    console.log('Ready');
    $('.modal').modal();

    $("#labelForm").click(()=>{
        $('.modal').modal('open');
        allowCamera();
        cameraPreview();
    })

    $('#snap').click(()=>{
        takePhoto()
    });
  
    
  });