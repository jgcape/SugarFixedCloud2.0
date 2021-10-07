const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const video = document.getElementById('video');
const scanBtn = document.getElementById('takePhoto');
const openCameraBtn = document.getElementById('openCamera');
const openCameraIcon = document.getElementById('openCameraIcon');
const captureOptions = {
    audio: false,
    video: true,
    video: { facingMode: "environment" },
};
var counter = 0;

//Requests camera access from user and begins video stream. 
const openCamera = () => {      
    counter = 1;
    scanBtn.innerText = "scan label";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia(captureOptions).then(function (stream) {
            video.srcObject = stream;
            video.play();
            context.clearRect(0, 0, canvas.width, canvas.height);
        })
    };
}
//Takes a photo for verification prior to sending.
const takePhoto = () => {
    if (counter != 0) {
        if (counter == 1) {
            counter = 2;
            openCameraBtn.innerText = "retake photo";
            openCameraIcon.innerText = "camera";

            scanBtn.innerText = "process label";
            canvas.height = $('video').innerHeight();
            canvas.width = $('video').innerWidth();
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        else {
            $('.modal').modal('open');
        }
    }
}

const uploadImg = (formData) => {
    $.ajax({
        enctype: 'multipart/form-data',
        url: '/api/vision',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        success: (result) => {
            if (result.statusCode == 200) {
                location.href = '/result';
            }
            else {
                alert(result.message)
                location.reload();
            }
        },
        error: (err) => {
            alert(err.message);
        }
    })
}

const submitImg = (productName) => {
    canvas.toBlob(function (blob) {
        const formData = new FormData();
        formData.append('label', blob, 'label.jpg');
        formData.append('product', productName);
        console.log(formData);
        uploadImg(formData);
    },
        'image/jpeg');
}

$(function () {
    $('.modal').modal();
    $('#takePhoto').click(() => {
        takePhoto()
    });
    $('#openCamera').click(() => {
        openCamera()
    });

    $('#formSubmit').click(() => {
        var productName = $('#productName').val();
        if (productName == '') {
            alert("Please provide a product name")
        }
        else {
            submitImg(productName);
        }
    });
});
