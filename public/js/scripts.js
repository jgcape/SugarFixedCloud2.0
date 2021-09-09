/*if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get this party started")
}

Request camera access from user.
navigator.mediaDevices.getUserMedia({ video: true })
$('#PhotoButton').click(function () {
    $('#PhotoPicker').trigger('click');
    return false;
});

$('#PhotoPicker').on('change', function (e) {
    e.preventDefault();
    if (this.files.length === 0) return;
    var imageFile = this.files[0];

}); */

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.getElementById('video');

const allowCamera = () => {
    // var video = document.getElementById('video'); // Keep DOM reference, jquery doesn't work
    // Get access to the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
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
    console.log('Ready');
    $("#loadCamera").click(() => {
        allowCamera();
    })
    $('.modal').modal();






    $('#snap').click(() => {
        takePhoto()
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


