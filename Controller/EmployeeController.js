//Image to base64
let base64String = "";
function imageUploaded() {
    let file = document.querySelector('input[type=file]')['files'][0];
    let reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    }
    reader.readAsDataURL(file);
}

//Delete Employee
function deleteEmployee(event) {
    event.stopPropagation(); // Stop event propagation
    let email = $(event.target).closest("tr").find("#email").text();
    console.log(email);
    console.log("Deleted");

    var formData = new FormData();
    formData.append('email', email); // Append email to FormData object

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
                url: "http://localhost:8080/Scope/api/v1/employee/delete",
                type: "DELETE",
                processData: false,
                contentType: false,
                data: formData, // Pass formData instead of just email
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response) {
                    Swal.fire(
                        'Deleted!',
                        `${email} has been deleted.`,
                        'success'
                    )
                    loadData();
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
    loadData();
}

//Load Data
function loadData() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/employee",
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

//set Data for table
const setValue = (response) => {
    $("#employee-tbl-body").empty();
    response.map((response) => {

        let imageSrc = `data:image/jpeg;base64,${response.employeeProfilePic}`;

        let recode = `<tr>
                            <td>
                                <div class="d-flex px-2 py-1">
                                    <div id="imageContainer">
                                        <img src="${imageSrc}" class="avatar avatar-xl me-3 border-radius-lg" alt="user1">
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 class="mb-0 text-sm">${response.employeeName}</h6>
                                        <p id="email" class="text-xs text-secondary mb-0">${response.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-xs text-secondary mb-0">${response.employeeAddress1}</p>
                                <p class="text-xs text-secondary mb-0">${response.employeeAddress2}</p>
                                <p class="text-xs text-secondary mb-0">${response.employeeAddress3}</p>
                                <p class="text-xs text-secondary mb-0">${response.employeeAddress4}</p>
                                <p class="text-xs text-secondary mb-0">${response.employeeAddress5}</p>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.gender}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.status}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.role}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.designation}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.dob}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.joinDate}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.attachedBranch}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.contactNo}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.informInCaseOfEmergency}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">${response.emergencyContactNo}</span>
                            </td>
                            <td>
                                <i id="delteIcon" class="fa-solid fa-trash fa-xl hand-cursor ms-2" onclick="deleteEmployee(event)"></i>
                            </td>
                        </tr>`

        $("#employee-tbl-body").append(recode);
    })
}

//Employee Save
$("#btnSave").on('click', () => {
    if ($("input[name='password']").val() === $("#rePassword").val()) {
        let name = $("#name").val();
        let pic = $("#pic").val();
        let gender = $("input[name='gender']:checked").val();
        let status = $("input[name='status']:checked").val();
        let designation = $("input[name='designation']").val();
        let role = $("select[name='role']").val();
        let dob = $("#dob").val();
        let joinDate = $("#joinDate").val();
        let attachedBranch = $("input[name='attachedBranch']").val();
        let address1 = $("input[name='address1']").val();
        let address2 = $("input[name='address2']").val();
        let address3 = $("input[name='address3']").val();
        let address4 = $("input[name='address4']").val();
        let address5 = $("input[name='address5']").val();
        let contactNo = $("#employeeContactNo").val();
        let email = $("#employeeEmail").val();
        let emergencyContact = $("input[name='emergencyContact']").val();
        let informInCaseOfEmergency = $("#informInCaseOfEmergency").val();
        let password = $("input[name='password']").val();

        var formData = new FormData();

        formData.append('employeeName', name);
        formData.append('employeeProfilePic', base64String);
        formData.append('gender', gender);
        formData.append('status', status);
        formData.append('designation', designation);
        formData.append('role', role);
        formData.append('dob', dob);
        formData.append('joinDate', joinDate);
        formData.append('attachedBranch', attachedBranch);
        formData.append('employeeAddress1', address1);
        formData.append('employeeAddress2', address2);
        formData.append('employeeAddress3', address3);
        formData.append('employeeAddress4', address4);
        formData.append('employeeAddress5', address5);
        formData.append('contactNo', contactNo);
        formData.append('email', email);
        formData.append('emergencyContactNo', emergencyContact);
        formData.append('informInCaseOfEmergency', informInCaseOfEmergency);
        formData.append('password', password);

        if (!name){
            Swal.fire({
                icon: 'error',
                title: 'Please Check Name Field',
                text: 'Something went wrong!'
            })
        }else {
            if (!pic){
                Swal.fire({
                    icon: 'error',
                    title: 'Please Check Picture Field',
                    text: 'Something went wrong!'
                })
            }else {
                if (!gender){
                    Swal.fire({
                        icon: 'error',
                        title: 'Please Check Gender Field',
                        text: 'Something went wrong!'
                    })
                }else {
                    if (!status){
                        Swal.fire({
                            icon: 'error',
                            title: 'Please Check Status Field',
                            text: 'Something went wrong!'
                        })
                    }else {
                        if (!designation){
                            Swal.fire({
                                icon: 'error',
                                title: 'Please Check Designation Field',
                                text: 'Something went wrong!'
                            })
                        }else {
                            if (role === "Select Role"){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Please Check Role Field',
                                    text: 'Something went wrong!'
                                })
                            }else {
                                if (!dob){
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Please Check Date Of Birthday Field',
                                        text: 'Something went wrong!'
                                    })
                                }else {
                                    if (!joinDate){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Please Check join Date Field',
                                            text: 'Something went wrong!'
                                        })
                                    }else {
                                        if (!attachedBranch){
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Please Check Attached Branch Field',
                                                text: 'Something went wrong!'
                                            })
                                        }else {
                                            if (!address1){
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Please Check Address 1 Field',
                                                    text: 'Something went wrong!'
                                                })
                                            }else {
                                                if (!address2) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Please Check Address 2 Field',
                                                        text: 'Something went wrong!'
                                                    })
                                                }else {
                                                    if (!address3) {
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Please Check Address 3 Field',
                                                            text: 'Something went wrong!'
                                                        })
                                                    }else {
                                                        if (!address4) {
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'Please Check Address 4 Field',
                                                                text: 'Something went wrong!'
                                                            })
                                                        }else {
                                                            if (!address5) {
                                                                Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Please Check Address 5 Field',
                                                                    text: 'Something went wrong!'
                                                                })
                                                            }else {
                                                                if (!contactNo) {
                                                                    Swal.fire({
                                                                        icon: 'error',
                                                                        title: 'Please Check Contact No Field',
                                                                        text: 'Something went wrong!'
                                                                    })
                                                                }else {
                                                                    if (!email) {
                                                                        Swal.fire({
                                                                            icon: 'error',
                                                                            title: 'Please Check Email Field',
                                                                            text: 'Something went wrong!'
                                                                        })
                                                                    }else {
                                                                        if (!emergencyContact) {
                                                                            Swal.fire({
                                                                                icon: 'error',
                                                                                title: 'Please Check Emergency Contact Field',
                                                                                text: 'Something went wrong!'
                                                                            })
                                                                        }else {
                                                                            if (!emergencyContact) {
                                                                                Swal.fire({
                                                                                    icon: 'error',
                                                                                    title: 'Please Check Emergency Contact Field',
                                                                                    text: 'Something went wrong!'
                                                                                })
                                                                            }else {
                                                                                if (!informInCaseOfEmergency) {
                                                                                    Swal.fire({
                                                                                        icon: 'error',
                                                                                        title: 'Please Check Inform In Case Of Emergency Field',
                                                                                        text: 'Something went wrong!'
                                                                                    })
                                                                                }else {
                                                                                    if (!password) {
                                                                                        Swal.fire({
                                                                                            icon: 'error',
                                                                                            title: 'Please Check Password Field',
                                                                                            text: 'Something went wrong!'
                                                                                        })
                                                                                    }else {
                                                                                        $.ajax({
                                                                                            url: "http://localhost:8080/Scope/api/v1/employee/save",
                                                                                            type: "POST",
                                                                                            processData: false,
                                                                                            contentType: false,
                                                                                            data: formData,
                                                                                            headers: {
                                                                                                "Authorization": "Bearer " + localStorage.getItem("token")
                                                                                            },
                                                                                            success: function (response) {
                                                                                                console.log("Success:", response);
                                                                                                Swal.fire({
                                                                                                    icon: 'success',
                                                                                                    title: 'Employee Saved Successful',
                                                                                                    showConfirmButton: false,
                                                                                                    timer: 2000
                                                                                                })
                                                                                                loadData();
                                                                                                $("#reset").click();
                                                                                            },
                                                                                            error: function (xhr, status, error) {
                                                                                                console.error("Error:", xhr.responseText);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Not match Password and Re-password Fields',
            text: 'Something went wrong!'
        })
        loadData();
    }
});

//Row Click
let index;
$("#employee-tbl-body").on("click","tr", function () {
    index = $(this).index();
    let email = $(this).find("#email").text();

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/employee/selectEmployee",
        type: "GET",
        data: { email: email },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setData(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
});


function setData(employee) {
    $("#name").focus();
    $("#name").val(employee.employeeName);

    $("input[name='gender']").val([employee.gender]);
    $("input[name='status']").val([employee.status]);

    $("input[name='designation']").focus();
    $("input[name='designation']").val(employee.designation);

    $("select[name='role']").val(employee.role);
    $("#dob").val(employee.dob);
    $("#joinDate").val(employee.joinDate);

    $("input[name='attachedBranch']").focus();
    $("input[name='attachedBranch']").val(employee.attachedBranch);

    $("input[name='address1']").focus();
    $("input[name='address1']").val(employee.employeeAddress1);

    $("input[name='address2']").focus();
    $("input[name='address2']").val(employee.employeeAddress2);

    $("input[name='address3']").focus();
    $("input[name='address3']").val(employee.employeeAddress3);

    $("input[name='address4']").focus();
    $("input[name='address4']").val(employee.employeeAddress4);

    $("input[name='address5']").focus();
    $("input[name='address5']").val(employee.employeeAddress5);

    $("#employeeContactNo").focus();
    $("#employeeContactNo").val(employee.contactNo);

    $("#employeeEmail").focus();
    $("#employeeEmail").val(employee.email);

    $("input[name='emergencyContact']").focus();
    $("input[name='emergencyContact']").val(employee.emergencyContactNo);

    $("#informInCaseOfEmergency").focus();
    $("#informInCaseOfEmergency").val(employee.informInCaseOfEmergency);

    $("#password").focus();
    $("#password").val(employee.password);

    $("#rePassword").focus();
    $("#rePassword").val(employee.password);
}

window.loadData=loadData;
window.deleteEmployee=deleteEmployee;
window.reset=reset;
window.imageUploaded=imageUploaded;