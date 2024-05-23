//Save
$("#btnSupplierSave").on('click', () => {
    let name = $("#supplierName").val();
    let category = $("select[name='category']").val();
    let address1 = $("input[name='supplierAddress1']").val();
    let address2 = $("input[name='supplierAddress2']").val();
    let address3 = $("input[name='supplierAddress3']").val();
    let address4 = $("input[name='supplierAddress4']").val();
    let address5 = $("input[name='supplierAddress5']").val();
    let address6 = $("input[name='supplierAddress6']").val();
    let contact1 = $("input[name='supplierContact1']").val();
    let contact2 = $("input[name='supplierContact2']").val();
    let email = $("input[name='supplierEmail']").val();

    if (!name) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Name Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (category === "Select Category") {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Category Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address1) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 1 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address2) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 2 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address3) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 3 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address4) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 4 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address5) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 5 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address6) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 6 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!contact1) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Contact 1 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!contact2) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Contact 2 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Email Field',
            text: 'Something went wrong!'
        });
        return;
    }

    let supplierData = {
        supplier_name: name,
        category: category,
        address_line_01: address1,
        address_line_02: address2,
        address_line_03: address3,
        address_line_04: address4,
        address_line_05: address5,
        address_line_06: address5,
        contact_no_1: contact1,
        contact_no_2: contact2,
        email: email
    };

    let jsonData = JSON.stringify(supplierData);

    $.ajax({
        url: 'http://localhost:8080/Scope/api/v1/supplier/save',
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Supplier data saved successfully.'
            })
            loadSupplierData();
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while saving supplier data. Please try again.'
            });
        }
    });
});


let supplier_id;
//Update
$("#btnSupplierUpdate").on('click', () => {
    let name = $("#supplierName").val();
    let category = $("select[name='category']").val();
    let address1 = $("input[name='supplierAddress1']").val();
    let address2 = $("input[name='supplierAddress2']").val();
    let address3 = $("input[name='supplierAddress3']").val();
    let address4 = $("input[name='supplierAddress4']").val();
    let address5 = $("input[name='supplierAddress5']").val();
    let address6 = $("input[name='supplierAddress6']").val();
    let contact1 = $("input[name='supplierContact1']").val();
    let contact2 = $("input[name='supplierContact2']").val();
    let email = $("input[name='supplierEmail']").val();

    if (!name) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Name Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (category === "Select Category") {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Category Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address1) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 1 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address2) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 2 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address3) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 3 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address4) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 4 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address5) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 5 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!address6) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Address 6 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!contact1) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Contact 1 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!contact2) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Contact 2 Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Email Field',
            text: 'Something went wrong!'
        });
        return;
    }

    let supplierData = {
        supplier_id: supplier_id,
        supplier_name: name,
        category: category,
        address_line_01: address1,
        address_line_02: address2,
        address_line_03: address3,
        address_line_04: address4,
        address_line_05: address5,
        address_line_06: address5,
        contact_no_1: contact1,
        contact_no_2: contact2,
        email: email
    };

    let jsonData = JSON.stringify(supplierData);

    $.ajax({
        url: 'http://localhost:8080/Scope/api/v1/supplier/update',
        type: 'PUT',
        contentType: 'application/json',
        data: jsonData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Supplier data updated successfully.'
            })
            loadSupplierData();
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while updating supplier data. Please try again.'
            });
        }
    });
});

function loadSupplierData() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/supplier",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setValue(response);
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while loading supplier data. Please try again.'
            });
        }
    });
}

const setValue = (response) => {
    $("#supplier-tbl-body").empty();
    response.map((response) => {

        let recode = `<tr>
                                <td>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.supplier_name}</p>
                                </td>
                                <td>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.category}</p>
                                </td>
                                <td>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.address_line_01}</p>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.address_line_02}</p>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.address_line_03}</p>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.address_line_04}</p>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.address_line_05}</p>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.address_line_06}</p>
                                </td>
                                <td>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.contact_no_1}</p>
                                    <p class="text-xs text-secondary mb-0 font-weight-bold">${response.contact_no_2}</p>
                                </td>
                                <td>
                                    <p id="email" class="text-xs text-secondary mb-0 font-weight-bold">${response.email}</p>
                                </td>
                                <td>
                                    <i id="delteIcon" class="fa-solid fa-trash fa-xl hand-cursor ms-2" onclick="deleteSupplier(event)"></i>
                                </td>
                            </tr>`

        $("#supplier-tbl-body").append(recode);
    })
}


function deleteSupplier(event) {
    event.stopPropagation();
    let email = $(event.target).closest("tr").find("#email").text();
    console.log(email);

    var formData = new FormData();
    formData.append('email', email);

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
                url: "http://localhost:8080/Scope/api/v1/supplier/delete",
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
                        `${email} has been deleted.`,
                        'success'
                    )
                    loadSupplierData();
                },
                error: function (xhr, status, error) {
                    console.error("Error:", xhr.status);
                    if (xhr.status === 403) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Only an Admin has access to delete employees (:',
                            text: 'Something went wrong!'
                        })
                    }
                }
            });
        }
    });
    loadSupplierData();
}

let index;
$("#supplier-tbl-body").on("click","tr", function () {
    index = $(this).index();
    let email = $(this).find("#email").text();
    console.log(email);

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/supplier/selectSupplier",
        type: "GET",
        data: { email: email },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            supplier_id = response.supplier_id;
            setSupplierData(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
});

function setSupplierData(response) {
    $("#supplierName").focus();
    $("#supplierName").val(response.supplier_name);

    $("select[name='category']").focus();
    $("select[name='category']").val(response.category);

    $("input[name='supplierAddress1']").focus();
    $("input[name='supplierAddress1']").val(response.address_line_01);

    $("input[name='supplierAddress2']").focus();
    $("input[name='supplierAddress2']").val(response.address_line_02);

    $("input[name='supplierAddress3']").focus();
    $("input[name='supplierAddress3']").val(response.address_line_03);

    $("input[name='supplierAddress4']").focus();
    $("input[name='supplierAddress4']").val(response.address_line_04);

    $("input[name='supplierAddress5']").focus();
    $("input[name='supplierAddress5']").val(response.address_line_05);

    $("input[name='supplierAddress6']").focus();
    $("input[name='supplierAddress6']").val(response.address_line_06);

    $("input[name='supplierContact1']").focus();
    $("input[name='supplierContact1']").val(response.contact_no_1);

    $("input[name='supplierContact2']").focus();
    $("input[name='supplierContact2']").val(response.contact_no_2);

    $("input[name='supplierEmail']").focus();
    $("input[name='supplierEmail']").val(response.email);
}



// $("#btnSupplierReset").on('click', () => {
//     $("#supplierName").val(null);

//     var ctrlKeyEvent = $.Event("keydown", { keyCode: 17, which: 17, ctrlKey: true });
//     $("#supplierName").focus().trigger(ctrlKeyEvent);
//     $("#supplierName").focus().trigger(ctrlKeyEvent);
//     $("#supplierName").focus().trigger(ctrlKeyEvent);
// });







window.loadSupplierData=loadSupplierData;
window.deleteSupplier=deleteSupplier;