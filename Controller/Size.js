//Save
$("#btnSizeSave").on('click', () => {
    let itemID = $("select[name='itemID']").val();
    let itemQuantity = $("input[name='itemQuantity']").val();
    let itemSize = $("input[name='itemSize']").val();
    let itemStatus = $("#itemStatus").val();
    let itemProfitMargin = $("input[name='itemProfitMargin']").val();
    let itemUnitPriceSale = $("input[name='itemUnitPrice-Sale']").val();
    let itemUnitPriceBuy = $("input[name='itemUnitPrice-Buy']").val();
    let itemExpectedProfit = $("input[name='itemExpectedProfit']").val();


    if (itemID==="Select Item") {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item ID Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemSize) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Size Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemQuantity) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Quantity Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (itemStatus === "Select Status") {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Status Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemProfitMargin) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Profit Margin Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemUnitPriceSale) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Unit Price Sale Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemUnitPriceBuy) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Unit Price Buy Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemExpectedProfit) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Expected Profit Field',
            text: 'Something went wrong!'
        });
        return;
    }


    let sizeDate = {
        item_code: itemID,
        quantity: itemQuantity,
        size: itemSize,
        status: itemStatus,
        profit_margin: itemProfitMargin,
        unit_price_sale: itemUnitPriceSale,
        unit_price_buy: itemUnitPriceBuy,
        expected_profit: itemExpectedProfit
    };

    let jsonData = JSON.stringify(sizeDate);

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/size/save",
        type: "POST",
        contentType: 'application/json',
        data: jsonData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log("Success:", response);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Size Saved Successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Size Already Added',
                    showConfirmButton: false,
                    timer: 2000
                });
            }

            loadSizeData();
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });

});

//Set Data for table
function loadSizeData() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/size",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#size-tbl-body").empty();
            console.log(response);
            response.map((response) => {
                let recode = `<tr class="me-6">
                                    <td><h6 id="item-code-on-size" class="mb-0 text-sm">${response.item_code}</h6></td>
                                    <td><h6 id="size-code" class="mb-0 text-sm">${response.size}</h6></td>
                                    <td>${response.quantity}</td>
                                    <td>${response.profit_margin}</td>
                                    <td>${response.unit_price_sale}</td>
                                    <td>${response.unit_price_buy}</td>
                                    <td>${response.expected_profit}</td>
                                    <td>${response.status}</td>
                                    <td>
                                        <i id="deleteSizeIcon" class="fa-solid fa-trash fa-xl hand-cursor ms-2" onclick="deleteSize(event)"></i>
                                    </td>
                                </tr>`
                $("#size-tbl-body").append(recode);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

//Set Item ID for dropdown
$("#itemID").on('click', function () {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/size/getItemIds",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log(response);
            $("#itemID").empty();
            $("#itemID").append(`<option>Select Item</option>`);
            response.map((response) => {
                $("#itemID").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
})


//Delete Size
function deleteSize(event) {
    event.stopPropagation();
    let itemID = $(event.target).closest("tr").find("#item-code-on-size").text();
    let sizeID = $(event.target).closest("tr").find("#size-code").text();


    console.log(itemID);
    console.log(sizeID);

    var formData = new FormData();
    formData.append('item_id', itemID);
    formData.append('size_id', sizeID);

    Swal.fire({
        title: 'Are you sure?',
        text: "You want delete row?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:8080/Scope/api/v1/size/delete",
                type: "DELETE",
                processData: false,
                contentType: false,
                data: formData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response) {
                    Swal.fire(
                        'Deleted!',
                        `${itemID} ${sizeID} has been deleted.`,
                        'success'
                    )
                    loadSizeData();
                },
                error: function (xhr, status, error) {
                    console.error("Error:", xhr.status);
                    if (xhr.status === 403) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Only an Admin has access to delete size (:',
                            text: 'Something went wrong!'
                        })
                    }
                }
            });
        }
    });
    loadItemData();
}










window.deleteSize=deleteSize;
window.loadSizeData=loadSizeData;