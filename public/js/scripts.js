if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get this party started")
}

//Request camera access from user.
navigator.mediaDevices.getUserMedia({ video: true })
$('#PhotoButton').click(function () {
    $('#PhotoPicker').trigger('click');
    return false;
});

$('#PhotoPicker').on('change', function (e) {
    e.preventDefault();
    if (this.files.length === 0) return;
    var imageFile = this.files[0];
    
  });