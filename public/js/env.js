const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.getElementById('video');

const allowCamera = () => {
    // var video = document.getElementById('video'); // Keep DOM reference, jquery doesn't work
    // Get access to the camera
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
    };
}

const takePhoto = () => {
    context.drawImage(video, 0, 0, 640, 480);
}

const uploadImg = (formData) => {
    $.ajax({
        enctype:'multipart/form-data',
        url: '/api/vision',
        data: formData,
        type: 'POST',
        contentType:false,
        processData:false,
        success: (result) => {
            alert(result.message)
            location.reload();
        },
        error: (err) => {
            alert(err.message);
        }
    })
}

const submitImg = () => {
    canvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append('label', blob, 'label.jpg');
        console.log(formData);
        uploadImg(formData);
    }, 
    'image/jpeg');
}

$(document).ready(function(){
    console.log('Ready');
    $('.modal').modal();

    $("#labelForm").click(()=>{
        $('.modal').modal('open');
        allowCamera();
    })

    $('#snap').click(()=>{
        takePhoto()
    });

    $('#formSubmit').click(()=>{
        submitImg();
    });
  
    
  });