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
    // var video = document.getElementById('video'); // Keep DOM reference, jquery doesn't work       
    counter = 0;
    scanBtn.innerText = "scan label";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia(captureOptions).then(function (stream) {
            video.srcObject = stream;
            video.play();
            context.clearRect(0, 0, canvas.width, canvas.height); 
        })
    };
}
//Takes a photo for verification prior to sending, !!!relabels buttons!!! MAKE ICONS CHANGE WITH TEXT
const takePhoto = () => {
    if (counter == 0) {
        counter = 1;        
        openCameraBtn.innerText = "retake photo";  
        openCameraIcon.innerText = "camera";

        scanBtn.innerText = "process label";
        canvas.height = $('video').innerHeight();
        canvas.width = $('video').innerWidth();
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    else  {        
        $('.modal').modal('open');
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

// (function (i, s, o, g, r, a, m) {
//     i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
//         (i[r].q = i[r].q || []).push(arguments)
//     }, i[r].l = 1 * new Date(); a = s.createElement(o),
//         m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
// })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
// ga('create', 'UA-60673008-2', 'auto');
// ga('send', 'pageview');