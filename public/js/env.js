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

const takePhoto = () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    context.drawImage(video, 0, 0, 640, 480);
    var img = canvas.toBlob()
}

const uploadImage = (bootData) => {
    $.ajax({
        enctype:'multipart/form-data',
        url: '/api/boots',
        data: bootData,
        type: 'POST',
        contentType:false,
        processData:false,
        success: (result) => {
            $('#modal1').modal('close')
            $('#queryBoot').attr("src", result.imgURL).toggle(true);
            showResults(result.preds);
        },
        error: (err) => {
            alert(err.message);
            // location.reload();
        }
    })
}

const submitImg = () => {
    // let labelImg = $('#canvas')canvas.toBlob;
    var formData = new FormData();
    formData.append("bootImg", bootImg);

    console.log("Form Data Submitted: ", formData);
    uploadBoot(formData);
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