const getResult = () => {
    // console.log("Querying", userID);
    $.ajax({
        url: '/api/sugars/latest',
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
    getResult()
  });