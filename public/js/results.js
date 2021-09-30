const createCards = (allResults) => {
    allResults.forEach(result => {
        console.log(result)
        let item='<div class="card col l4">'+
      '<div class="card-content">'+
        '<span class="card-title grey-text text-darken-4">'+result.productName+'</span>'+
        '<p>'+result.date+'</p>'+
        '<p>'+result.sugars+'</p>'+
        '<button id='+result._id+'class="btn waves-effect waves-red btn-large">Delete</button>'+
        '<button id='+result._id+'class="btn waves-effect waves-red btn-large">Update</button>'+
      '</div>'+
    '</div>'          
    
    $('#resultCards').append(item)
    });
};

const getAllResults = () => {
    $.ajax({
        url: '/api/sugars/',
        type: 'GET',
        success: (result) => {
            console.log(result.data)
            createCards(result.data)
        },
        error: (err) => {
            alert(err.message);
        }
    });
};

const getLatestResult = () => {
    $.ajax({
        url: '/api/sugars/latest/',
        type: 'GET',
        success: (result) => {
            console.log(result.data)
            $('#result').html(result.data.sugars)
        },
        error: (err) => {
            alert(err.message);
        }
    });
};


$(document).ready(function(){
    console.log('Ready');
    getAllResults()
    getLatestResult()
  });