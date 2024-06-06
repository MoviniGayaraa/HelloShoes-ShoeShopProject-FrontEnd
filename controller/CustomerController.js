$("#btnCusSave").on('click', () => {
    let name = $("#customerName").val();
    let level = "NEW";
    let gender = $("input[name='gender']:checked").val();
    let dob = $("#cusDob").val();
    let joinDate = $("#cusJoinDate").val();
    let totalPoint = $("input[name='cutTotalPoint']").val();
    let address1 = $("input[name='cusAddress1']").val();
    let address2 = $("input[name='cusAddress2']").val();
    let address3 = $("input[name='cusAddress3']").val();
    let address4 = $("input[name='cusAddress4']").val();
    let address5 = $("input[name='cusAddress5']").val();
    let contactNo = $("#cusContactNo").val();
    let email = $("#cusEmail").val();
    let recent_purchase_date_and_time = $("#recent_purchase_date_and_time").val();

    if (!name){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Name Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (level==="Select Level") {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Level Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!gender) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Gender Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!dob){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Date Of Birthday Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!joinDate){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Join Date Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!totalPoint) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Total Point Field',
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

    if (!contactNo){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Contact No Field',
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

    if (!recent_purchase_date_and_time) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Recent Purchase Date And Time Field',
            text: 'Something went wrong!'
        });
        return;
    }

    let customerData = {
        name: name,
        level: level,
        gender: gender,
        dob: dob,
        join_date_as_a_loyalty_customer: joinDate,
        total_points: totalPoint,
        address_line_1: address1,
        address_line_2: address2,
        address_line_3: address3,
        address_line_4: address4,
        address_line_5: address5,
        contact_no: contactNo,
        email: email,
        recent_purchase_date_and_time: recent_purchase_date_and_time
    };

    let jsonData = JSON.stringify(customerData);

    $.ajax({
        url: 'http://localhost:8080/Scope/api/v1/customer/save',
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log(">>>>>> "+response);
            if (response === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email is already registered. Please use a different email.'
                });
            } else if (response === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Customer added successfully.'
                });
                loadCustomerData();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while saving customer data.'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while saving customer data. Please try again.'
            });
        }
    });
    loadCustomerData();
})

//Load Data
function loadCustomerData() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/customer",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setValue(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

const setValue = (response) => {
    $("#customer-tbl-body").empty();
    response.map((response) => {

        let recode = `<tr>
                        <td>
                            <div class="d-flex px-2 py-1">
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">${response.name}</h6>
                                    <p id="email" class="text-xs text-secondary mb-0">${response.email}</p>
                                    <p class="text-xs text-secondary mb-0">${response.level}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="text-xs text-secondary mb-0">${response.address_line_1}</p>
                            <p class="text-xs text-secondary mb-0">${response.address_line_2}</p>
                            <p class="text-xs text-secondary mb-0">${response.address_line_3}</p>
                            <p class="text-xs text-secondary mb-0">${response.address_line_4}</p>
                            <p class="text-xs text-secondary mb-0">${response.address_line_5}</p>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${response.gender}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${response.total_points}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${response.dob}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${response.join_date_as_a_loyalty_customer}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${response.contact_no}</span>
                        </td>
                        <td class="align-middle text-center">
                            <span class="text-secondary text-xs font-weight-bold">${response.recent_purchase_date_and_time}</span>
                        </td>
                        <td>
                            <i id="delteCustomerIcon" class="fa-solid fa-trash fa-xl hand-cursor ms-2" onclick="deleteCustomer(event)"></i>
                        </td>
                    </tr>`

        $("#customer-tbl-body").append(recode);
    })
}

//Delete Employee
function deleteCustomer(event) {
    event.stopPropagation();
    let email = $(event.target).closest("tr").find("#email").text();

    var formData = new FormData();
    formData.append('email', email);

    Swal.fire({
        title: 'Are you sure?',
        text: "You want delete row?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#807f80',
        cancelButtonColor: '#ea0a03',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:8080/Scope/api/v1/customer/delete",
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
                    loadCustomerData();
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
    loadCustomerData();
}

//Row Click
let index;
$("#customer-tbl-body").on("click","tr", function () {
    index = $(this).index();
    let email = $(this).find("#email").text();
    console.log(email);

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/customer/getSelectCustomer",
        type: "GET",
        data: { email: email },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setCustomerData(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
});

function setCustomerData(response) {
    $("select[name='level']").val(response.level);
    $("input[name='gender']").val([response.gender]);
    $("#cusDob").val(response.dob);
    $("#cusJoinDate").val(response.join_date_as_a_loyalty_customer);

    $("input[name='cutTotalPoint']").focus();
    $("input[name='cutTotalPoint']").val(response.total_points);

    $("#recent_purchase_date_and_time").focus();
    $("#recent_purchase_date_and_time").val(response.recent_purchase_date_and_time);

    $("#customerName").focus()
    $("#customerName").val(response.name);

    $("#cusEmail").focus();
    $("#cusEmail").val(response.email);

    $("input[name='cusAddress1']").focus();
    $("input[name='cusAddress1']").val(response.address_line_1);

    $("input[name='cusAddress2']").focus();
    $("input[name='cusAddress2']").val(response.address_line_2);

    $("input[name='cusAddress3']").focus();
    $("input[name='cusAddress3']").val(response.address_line_3);

    $("input[name='cusAddress4']").focus();
    $("input[name='cusAddress4']").val(response.address_line_4);

    $("input[name='cusAddress5']").focus();
    $("input[name='cusAddress5']").val(response.address_line_5);

    $("#cusContactNo").focus();
    $("#cusContactNo").val(response.contact_no);
}



window.loadCustomerData=loadCustomerData;
window.deleteCustomer=deleteCustomer;