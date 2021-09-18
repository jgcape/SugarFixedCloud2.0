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

//Requests camera access from user and begins video stream. 
const openCamera = () => {
    // var video = document.getElementById('video'); // Keep DOM reference, jquery doesn't work       
        
   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
       
        navigator.mediaDevices.getUserMedia(captureOptions).then(function (stream) {
            video.srcObject = stream;
            video.play();
            context.clearRect(0, 0, canvas.width, canvas.height); //!!!!!!!!!!!!!Find a way to clear the canvas without it flickering!!!!!!!!
        })
    };
}
//Takes a photo for verification prior to sending, !!!relabels buttons!!! ADD FUNCTIONALITY.
const takePhoto = () => {
    // //$("#openCameraIcon").html('<i id="save" class="material-icons">check</i>');
    // openCameraIcon.innerHTML = '<i id="openCameraIcon" class="material-icons">photo_camera</i>';
    // openCameraIcon.innerText = "retake photo";  

    // scanBtn.innerHtml = "<i>class='material-icons left'>poll</i>analyse";
    canvas.height = $('video').innerHeight();
    canvas.width = $('video').innerWidth();
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

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
            alert(result.message)
            location.reload();
        },
        error: (err) => {
            alert(err.message);
        }
    })
}

const submitImg = () => {
    canvas.toBlob(function (blob) {
        const formData = new FormData();
        formData.append('label', blob, 'label.jpg');
        console.log(formData);
        uploadImg(formData);
    },
        'image/jpeg');
}

$(document).ready(function () {
    $('.sidenav').sidenav();
    console.log('Ready');
    $('.modal').modal();
    $("#myModal").click(() => {
        $('.modal').modal('open');
    })
    $('#takePhoto').click(() => {
        takePhoto()
    });
    $('#openCamera').click(() => {
        openCamera()
    });

    $('#formSubmit').click(() => {
        submitImg();
    });
});

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-60673008-2', 'auto');
ga('send', 'pageview');


