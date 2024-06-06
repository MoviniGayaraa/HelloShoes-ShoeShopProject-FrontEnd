//Login Action
$("#btnLogin").on('click',()=>{
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();

    var data = {
        email: email,
        password: password
    };

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/user/signin",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            localStorage.setItem("token",response.token);

            if(response.role === "USER"){
                $("#btnDashboard").hide();

                $("#signInForm").css('display','none');
                $("#sidenav-main").css('display','block');
                $("#topBar").css('display','block');
            }else{
                $("#signInForm").css('display','none');
                $("#dashboardForm").css('display','block');
                $("#employeeForm").css('display','none');
                $("#navBarFrom").css('display','block');

                $("#dashboardEmail").text(email);
                $("#sidenav-main").css('display','block');
                $("#topBar").css('display','block');
                $(".nav-link").removeClass("active bg-dark-blue");
                $(".dashboardFrom").addClass("active bg-dark-blue");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            if (xhr.status === 403){
                alert("Please check username and password (:")
            }
        }
    });

    $("#txtEmail").val(null);
    $("#txtPassword").val(null);
})

