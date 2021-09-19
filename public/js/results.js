const uploadImg = (formData) => {
    $.ajax({
        enctype:'multipart/form-data',
        url: '/api/sugars',
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



$(document).ready(function(){
    console.log('Ready');
    $('.modal').modal();

    $("#loadCamera").click(()=>{
        allowCamera();
    })

    $('#scanLabel').click(()=>{
        takePhoto()
    });

    $('#submit').click(()=>{
        var productName = $('#productName').val();
        console.log(productName)
        if (productName == '') {
            alert("Please provide a product name")
        }
        else {
            submitImg(productName);
        }
    });  
  });