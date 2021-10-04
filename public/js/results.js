const createCards = (allResults) => {
    allResults.forEach(result => {
        let item='<div class="card col l4">'+
      '<div id="' + result._id +'" class="card-content">'+
        '<span class="card-title grey-text text-darken-4">'+result.productName+'</span>'+
        '<input id="updateForm">'+result.productName+'</input>'+
        '<p>'+result.date+'</p>'+
        '<p>'+result.sugars+'</p>'+
        '<button onclick=deleteProduct(this) class="btn waves-effect waves-red btn-large delete-btn">Delete</button>'+
        '<button onclick=updateProduct(this) class="btn waves-effect waves-red btn-large update-btn">Update</button>'+
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
            let list = result.data.sugars
            $('#result').html(list.join())
        },
        error: (err) => {
            alert(err.message);
        }
    });
};

const updateProduct = (obj) => {
    var objID = $(obj).parent().attr("id");
    var patchData = {
        newName: $(obj).siblings('#updateForm').val()
    }
    $.ajax({
        contentType: 'application/json',
        url: `/api/sugars/${objID}`,
        data: JSON.stringify(patchData),
        type: 'PATCH',
        success: (result) => {
            alert("Product updated");
            location.reload();
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
