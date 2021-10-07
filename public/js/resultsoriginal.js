const createCards = (allResults) => {
    allResults.slice(1).forEach(result => {

        let list = result.sugars

        if (list == 'No sugars detected') {
            str = "We couldn't find any sugar in your food!"
        }
        else {
            str = '<p>We found the following sugars in your food: </p><ol>'
            list.forEach(function (list) {
                str += '<li>' + list + '</li>';
            });
            str += '</ol>';
        }

        if (result.productName == "") {
            result.productName = "You haven't entered a name for your product!"
        }
        date = new Date(result.date)

        let item = '<div class="card medium col l4">' +
            '<div id="' + result._id + '" class="card-content">' +
            '<span class="card-title grey-text text-darken-4"><p>Product name: </p> ' + result.productName + '</span>' +
            '<p>Date scanned: ' + date.toDateString() + '</p><br>' +
            '<p>' + str + '</p><br>' +
            '<button class="btn btn-small button activator">Edit Product</span></div>' +
            '<div id="' + result._id + '" class = "card-reveal input-field">' +
            '<span class = "card-title">Edit Product<i class="material-icons right">close</i></span>' +

            '<input id="updateForm" class = "input-field" type = "text" placeholder="Enter new product name.">Current name: ' + result.productName + '</input><br>' +
            '<button onclick=updateProduct(this) class="btn waves-effect button waves-white btn-small update-btn">Update name</button>' +
            '<button onclick=deleteProduct(this) class="btn waves-effect button waves-white btn-small delete-btn"><i class="material-icons right">delete</i>Delete</button><br>' +
            

            '</div>' +
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
            if (result.data.productName == "") {
                result.data.productName = "You haven't entered a name for your product!"
            }
            str = '<p>Product name: ' + result.data.productName + '</p>';
            if (list == 'No sugars detected') {
                str += "We couldn't find any sugar in your food!"
            }
            else {
                str += '<p>We found the following sugars in your food: </p><ol>'
                list.forEach(function (list) {
                    str += '<li>' + list + '</li>';
                });
                str += '</ol><br>';
            }
            str += '<br><button onclick=deleteLatestProduct("' + result.data._id + '") class="btn waves-effect waves-white button btn-small delete-btn"><i class="material-icons right">delete</i>Delete result</button>'
            $('#result').html(str);
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

const deleteLatestProduct = (objID) => {

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

$(document).ready(function () {
    
    console.log('Ready');
    getAllResults()
    getLatestResult()

});
