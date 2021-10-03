const createCards = (allResults) => {
    allResults.forEach(result => {
        let item='<div class="card col l4">'+
      '<div id="' + result._id +'" class="card-content">'+
        '<span class="card-title grey-text text-darken-4">'+result.productName+'</span>'+
        '<p>'+result.date+'</p>'+
        '<p>'+result.sugars+'</p>'+
        '<button onclick=deleteProduct(this) class="btn waves-effect waves-red btn-large delete-btn">Delete</button>'+
        '<button onclick=updateProduct(this) class="btn waves-effect waves-red btn-large update-btn">Update</button>'+
      '</div>'+
    '</div>'          
    
    $('#resultCards').append(item)
    });
};

const updateName = (obj) => {
    var id = $(obj).parent().attr("id");
}

// const addClickFxn = () => {
//     $('.update-btn').click(() => {
//         var id = $(this).parent().attr("id");
//         updateName(id);
//     });

//     $('.delete-btn').click(() => {
//         var id = $(this).parent().attr("id");
//         console.log($(this))
//     });
// };

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
            let list = result.data.sugars
            $('#result').html(list.join())
        },
        error: (err) => {
            alert(err.message);
        }
    });
};

const deleteProduct = (obj) => {
    var objID = $(obj).parent().attr("id");

    $.ajax({
        url: `/api/sugars/${objID}`,
        type: 'DELETE',
        success: (result) => {
            alert("Product deleted");
            location.reload();
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