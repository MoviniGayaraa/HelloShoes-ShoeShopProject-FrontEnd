$(document).ready(function() {
    $(".nav-link-color").click(function() {
        $(".nav-link-color").removeClass("active bg-gradient-primary");
        $(this).closest(".nav-link-color").addClass("active bg-gradient-primary");
    });
});

//Navigation Part
$("#btnDashboard").on('click',()=>{
    $("#signInForm").css('display','none');
    $("#dashboardForm").css('display','block');
    $("#employeeForm").css('display','none');
    $("#topBar").css('display','block');
    $("#customerForm").css('display','none');
    $("#sidenav-main").css('display','block');
    $("#inventoryForm").css('display','none');
    $("#suppierForm").css('display','none');
    $("#saleForm").css('display','none');
    $("#sizeForm").css('display','none');
})

$("#btnEmployee").on('click',()=>{
    $("#signInForm").css('display','none');
    $("#dashboardForm").css('display','none');
    $("#employeeForm").css('display','block');
    $("#topBar").css('display','block');
    $("#customerForm").css('display','none');
    $("#sidenav-main").css('display','block');
    $("#inventoryForm").css('display','none');
    $("#suppierForm").css('display','none');
    $("#saleForm").css('display','none');
    $("#sizeForm").css('display','none');
})

$("#btnSingOut").on('click',()=>{
    $("#signInForm").css('display','block');
    $("#dashboardForm").css('display','none');
    $("#employeeForm").css('display','none');
    $("#topBar").css('display','none');
    $("#customerForm").css('display','none');
    $("#sidenav-main").css('display','none');
    $("#inventoryForm").css('display','none');
    $("#suppierForm").css('display','none');
    $("#saleForm").css('display','none');
    $("#sizeForm").css('display','none');
})

$("#btnCustomer").on('click',()=> {
    $("#signInForm").css('display','none');
    $("#dashboardForm").css('display','none');
    $("#employeeForm").css('display','none');
    $("#topBar").css('display','block');
    $("#customerForm").css('display','block');
    $("#sidenav-main").css('display','block');
    $("#inventoryForm").css('display','none');
    $("#suppierForm").css('display','none');
    $("#saleForm").css('display','none');
    $("#sizeForm").css('display','none');
})

$("#btnInventory").on('click',()=>{
    $("#signInForm").css('display','none');
    $("#dashboardForm").css('display','none');
    $("#employeeForm").css('display','none');
    $("#topBar").css('display','block');
    $("#customerForm").css('display','none');
    $("#sidenav-main").css('display','block');
    $("#inventoryForm").css('display','block');
    $("#suppierForm").css('display','none');
    $("#saleForm").css('display','none');
    $("#sizeForm").css('display','none');
})

$("#btnSupplier").on('click',()=>{
    $("#signInForm").css('display','none');
    $("#dashboardForm").css('display','none');
    $("#employeeForm").css('display','none');
    $("#topBar").css('display','block');
    $("#customerForm").css('display','none');
    $("#sidenav-main").css('display','block');
    $("#inventoryForm").css('display','none');
    $("#suppierForm").css('display','block');
    $("#saleForm").css('display','none');
    $("#sizeForm").css('display','none');
})

$("#btnSale").on('click',()=>{
    $("#signInForm").css('display','none');
    $("#dashboardForm").css('display','none');
    $("#employeeForm").css('display','none');
    $("#topBar").css('display','block');
    $("#customerForm").css('display','none');
    $("#sidenav-main").css('display','block');
    $("#inventoryForm").css('display','none');
    $("#suppierForm").css('display','none');
    $("#saleForm").css('display','block');
    $("#sizeForm").css('display','none');
})

$("#btnSize").on('click',()=>{
    $("#signInForm").css('display','none');
    $("#dashboardForm").css('display','none');
    $("#employeeForm").css('display','none');
    $("#topBar").css('display','block');
    $("#customerForm").css('display','none');
    $("#sidenav-main").css('display','block');
    $("#inventoryForm").css('display','none');
    $("#suppierForm").css('display','none');
    $("#saleForm").css('display','none');
    $("#sizeForm").css('display','block');
})

