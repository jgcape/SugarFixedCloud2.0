//Global var latestID is included in all latest product functions.
var latestID

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

        let item = '<div class="card col l4">' +
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
            M.toast({ html: err.message });
        }
    });
};

const getLatestResult = () => {
    $.ajax({
        url: '/api/sugars/latest/',
        type: 'GET',
        success: (result) => {
            latestID = result.data._id

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
            $('#result').html(str);
        },
        error: (err) => {
            M.toast({ html: err.message });
        }
    });
};

const updateProduct = (obj) => {
    var objID = $(obj).parent().attr("id");
    var newName = $(obj).siblings('#updateForm').val()

    if (newName != "") {
        var patchData = {
            newName: newName
        }
        $.ajax({
            contentType: 'application/json',
            url: `/api/sugars/${objID}`,
            data: JSON.stringify(patchData),
            type: 'PATCH',
            success: (result) => {
                M.toast({ html: "Product updated" });
                location.reload();
            },
            error: (err) => {
                M.toast({ html: err.message });
            }
        });
    }
    else {
        M.toast({ html: "Please enter a valid product name" });
    }
};

const updateLatestProduct = () => {
    if (latestID) {
        var patchData = {
            newName: $('#productName').val()
        }
        $.ajax({
            contentType: 'application/json',
            url: `/api/sugars/${latestID}`,
            data: JSON.stringify(patchData),
            type: 'PATCH',
            success: (result) => {
                M.toast({ html: "Product updated" });
                location.reload();
            },
            error: (err) => {
                M.toast({ html: err.message });
            }
        });
    }
};

const deleteLatestProduct = () => {
    if (latestID) {
        $.ajax({
            url: `/api/sugars/${latestID}`,
            type: 'DELETE',
            success: (result) => {
                M.toast({ html: "Product deleted" });
                location.reload();
            },
            error: (err) => {
                M.toast({ html: err.message });
            }
        });
    }
};

const deleteProduct = (obj) => {
    var objID = $(obj).parent().attr("id");

    $.ajax({
        url: `/api/sugars/${objID}`,
        type: 'DELETE',
        success: (result) => {
            M.toast({ html: "Product deleted" });
            location.reload();
        },
        error: (err) => {
            M.toast({ html: err.message });
        }
    });
};

$(document).ready(function () {
    $('.modal').modal();
    console.log('Ready');
    getAllResults()
    getLatestResult()
    
    $('#deleteLatest').click(() => {
        deleteLatestProduct()
    });
    $('#updateLatest').click(() => {
        updateLatestProduct()
    });
    $('#editLatest').click(() => {
        $('.modal').modal('open');
    });
});
