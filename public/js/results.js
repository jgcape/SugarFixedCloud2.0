const getResult = (userID) => {
    console.log("Querying", userID);
    $.ajax({
        enctype:'multipart/form-data',
        url: `/api/sugars/result/${userID}`,
        type: 'GET',
        success: (result) => {
            console.log(result)
            $('#result').html(result.data)
        },
        error: (err) => {
            alert(err.message);
        }
    })
};


$(document).ready(function(){
    console.log('Ready');
    getResult('abc123')
  });