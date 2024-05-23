$("#btnSale").on('click',()=>{
    loadItemIds();
    loadCustomerIds();
})

$("#saleCustomerName").prop("disabled", true);

$("#saleCustomerID").on('change',()=>{
    let customerId = $("#saleCustomerID").val();
    
    setCustomerData(customerId);

    if ($("#saleCustomerID").val() === "Select Customer") {
        
    }

    if (customerId === "Customer Not Registered") {
        $("#saleCustomerName").prop("disabled", false);
        $("#saleCustomerName").focus();
    }else{
        $("#saleCustomerName").prop("disabled", true);
    }
})


function setCustomerData(customerId) {
    $.ajax({
        url: `http://localhost:8080/Scope/api/v1/customer/getCustomer/${customerId}`,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleCustomerName").val(response.name);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}


function loadCustomerIds() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/customer/getCustomerIds",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleCustomerID").empty();
            $("#saleCustomerID").append(`<option>Select Customer</option>`);
            $("#saleCustomerID").append(`<option>Customer Not Registered</option>`);
            response.map((response) => {
                $("#saleCustomerID").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

function loadItemIds() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/sale/getItemIds",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemIDs").empty();
            $("#saleItemIDs").append(`<option>Select Item</option>`);
            response.map((response) => {
                $("#saleItemIDs").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

$("#saleItemSize").prop("disabled", true);

$("#saleItemIDs").on('change',()=>{
    let itemId = $("#saleItemIDs").val();
    setData(itemId);

    if ($("#saleItemIDs").val() === "Select Item") {
        $("#saleItemSize").prop("disabled", true);
    } else {
        $("#saleItemSize").prop("disabled", false);
    }

    setDataSize(itemId);
})


$("#saleItemSize").on('change',()=>{
    let itemId = $("#saleItemIDs").val();
    let itemSize = $("#saleItemSize").val();

    $.ajax({
        url: `http://localhost:8080/Scope/api/v1/size/getDataWithSize/${itemId}/${itemSize}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemPrice").val(response.unit_price_sale);
            $("#saleItemQuantity").val(response.quantity);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });

    $("#itemSizeQuantity").focus();
})

function setDataSize(itemId) {
    $.ajax({
        url: `http://localhost:8080/Scope/api/v1/sale/getItemSize/${itemId}`,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemSize").empty();
            $("#saleItemSize").append(`<option>Select Size</option>`);
            response.map((response) => {
                $("#saleItemSize").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}


function setData(itemId) {
    $.ajax({
        url: `http://localhost:8080/Scope/api/v1/sale/getItem/${itemId}`,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemDesc").val(response.item_desc);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

$("#itemSizeQuantity").on('keyup', () => {
    let itemQuantity = parseInt($("#itemSizeQuantity").val(), 10);
    let saleItemQuantity = parseInt($("#saleItemQuantity").val(), 10);

    if (itemQuantity > saleItemQuantity || itemQuantity <= 0) {
        $("#itemSizeQuantity").css("background-color", "red");
    } else {
        $("#itemSizeQuantity").css("background-color", "");
    }
});


$(document).ready(function() {
    function recalculateNetTotal() {
        let netTot = 0;
        $("#sale-tbl-body tr").each(function() {
            let itemTotal = parseFloat($(this).find('.itemTotalPrice').text()) || 0;
            netTot += itemTotal;
        });
        $("#saleNetTotal").text(netTot.toFixed(2));
    }

    function updateOrAddItem(itemID, itemSize, quantity, unitePrice) {
        let itemExists = false;
        $("#sale-tbl-body tr").each(function() {
            let currentItemID = $(this).find('td:eq(0)').text();
            let currentItemSize = $(this).find('td:eq(2)').text();
            if (currentItemID === itemID && currentItemSize === itemSize) {
                let currentQuantity = parseInt($(this).find('td:eq(3)').text(), 10);
                let newQuantity = currentQuantity + quantity;
                let newItemTotalPrice = newQuantity * unitePrice;
                $(this).find('td:eq(3)').text(newQuantity);
                $(this).find('td:eq(5)').text(newItemTotalPrice.toFixed(2));
                itemExists = true;
                return false;
            }
        });
        return itemExists;
    }

    function addItem() {
        let itemID = $("#saleItemIDs").val();
        let itemName = $("#saleItemDesc").val();
        let itemSize = $("#saleItemSize").val();
        let quantity = parseInt($("#itemSizeQuantity").val(), 10);
        let unitePrice = parseFloat($("#saleItemPrice").val());
        let itemTotalPrice = quantity * unitePrice;

        if (itemID === "Select Item") {
            Swal.fire({
                icon: 'error',
                title: 'Please Check Item ID Field',
                text: 'Something went wrong!'
            });
            return;
        }

        if (itemSize === "Select Size") {
            Swal.fire({
                icon: 'error',
                title: 'Please Check Size Field',
                text: 'Something went wrong!'
            });
            return;
        }

        if (!quantity) {
            Swal.fire({
                icon: 'error',
                title: 'Please Check Quantity Field',
                text: 'Something went wrong!'
            });
            return;
        }

        if (!unitePrice) {
            Swal.fire({
                icon: 'error',
                title: 'Please Check Unit Price Field',
                text: 'Something went wrong!'
            });
            return;
        }

        if (quantity <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Please Check Quantity Field',
                text: 'Something went wrong!'
            });
            return;
        }

        if (unitePrice <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Please Check Unit Price Field',
                text: 'Something went wrong!'
            });
            return;
        }


        let backgroundColor = $("#itemSizeQuantity").css("background-color");

        if (backgroundColor === "rgb(255, 0, 0)") {
            Swal.fire({
                icon: 'error',
                title: 'Please Check Quantity (:',
                text: 'Something went wrong!'
            });
            return;
        }


        if (!updateOrAddItem(itemID, itemSize, quantity, unitePrice)) {
            let recode = `<tr class="me-6">
                                <td class="text-center">${itemID}</td>
                                <td class="text-center">${itemName}</td>
                                <td class="text-center">${itemSize}</td>
                                <td class="text-center">${quantity}</td>
                                <td class="text-center">${unitePrice.toFixed(2)}</td>
                                <td class="text-center itemTotalPrice">${itemTotalPrice.toFixed(2)}</td>
                                <td class="text-center">
                                    <i class="fa-solid fa-trash fa-xl hand-cursor ms-2 deleteSizeIcon"></i>
                                </td>
                            </tr>`;
            $("#sale-tbl-body").append(recode);
        }
        recalculateNetTotal();
    }

    $("#btnAdd").on('click', addItem);

    $("#sale-tbl-body").on('click', '.deleteSizeIcon', function() {
        $(this).closest('tr').remove();
        recalculateNetTotal();
    });

    $("#saleItemIDs, #saleItemDesc, #saleItemSize, #itemSizeQuantity, #saleItemPrice").on('keypress', function(e) {
        if (e.which === 13) {
            addItem();
        }
    });
});


$("#btnSalePlaceOrder").on('click', () => {
    let customerID = $("#saleCustomerID").val();
    let customerName = $("#saleCustomerName").val();
    let netTotal = $("#saleNetTotal").text();
    let paymentType = $("#salePaymentType1").val();
    let user = $("#dashboardEmail").text();

    console.log(customerID, customerName, netTotal, paymentType, user);

    let netTotalAsFloat = parseFloat(netTotal);
    let amount = parseFloat($("#saleAmount").val());

    if(customerID === "Select Customer"){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Customer ID Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if(!customerName){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Customer Name Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if(paymentType === "Select Payment Method"){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Payment Type Field',
            text: 'Something went wrong!'
        });
        return;
    }

    let backgroundColor = $("#saleAmount").css("background-color");

    if (backgroundColor === "rgb(255, 0, 0)") {
        console.log("Error!!!!!");
        Swal.fire({
            icon: 'error',
            title: 'Please Check Amount (:',
            text: 'Something went wrong!'
        });
        return;
    }

    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    today = yyyy + '-' + mm + '-' + dd;


    let items = [];
    $("#sale-tbl-body tr").each(function() {
        let itemID = $(this).find('td:eq(0)').text();
        let itemName = $(this).find('td:eq(1)').text();
        let itemSize = $(this).find('td:eq(2)').text();
        let quantity = $(this).find('td:eq(3)').text();
        let unitePrice = $(this).find('td:eq(4)').text();
        let itemTotalPrice = $(this).find('td:eq(5)').text();

        items.push({
            "item_id": itemID,
            "item_name": itemName,
            "item_size": itemSize,
            "quantity": quantity,
            "unit_price": unitePrice,
            "total_price": itemTotalPrice
        });
    });

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/sale/placeOrder",
        type: "POST",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data: JSON.stringify({
            customer_id: customerID,
            customer_name: customerName,
            net_total: netTotal,
            purchase_date: today,
            payment_type: paymentType,
            userEmail: user,
            items: items
        }),
        
        
        success: function (response) {
            if(paymentType === "cash"){
                $("#sale-tbl-body").empty();
                $("#saleCustomerID").val("Select Customer");
                $("#saleCustomerName").val("");
                $("#saleNetTotal").text("0");
                $("#saleAmount").val("");
                $("#salePaymentType1").val("Select Payment Method");
                $("#btnSaleReset").click();

                
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Placed Order',
                    text: 'Balance Rs. '+(amount - netTotalAsFloat)
                });
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Placed Order',
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
});


$("#saleAmount").prop("disabled", true);

$("#salePaymentType1").on('change', function() {
    let paymentType = $(this).val();
    let amountLabel = $("#amountLabel");
    let saleAmountInput = $("#saleAmount");

    if (paymentType === "cash") {
        amountLabel.text('Amount');
        saleAmountInput.attr('type', 'number');
        saleAmountInput.prop("disabled", false);
    } else if (paymentType === "card") {
        amountLabel.text('CardNumber');
        saleAmountInput.attr('type', 'text');
        saleAmountInput.prop("disabled", false);
    } else if(paymentType === "Select Payment Method"){
        saleAmountInput.prop("disabled", true);
    } else {
        amountLabel.text('Amount');
        saleAmountInput.attr('type', 'number');
        saleAmountInput.prop("disabled", false);
    }
});

$("#saleAmount").on('input', function() {
    let netTotal = parseFloat($("#saleNetTotal").text());
    let amount = parseFloat($(this).val());
    let paymentType = $("#salePaymentType1").val();

    if(paymentType === "cash"){
        if(amount < netTotal){
            $(this).css("background-color", "red");
        } else {
            $(this).css("background-color", "");
        }
    }
});





window.loadItemIds=loadItemIds;