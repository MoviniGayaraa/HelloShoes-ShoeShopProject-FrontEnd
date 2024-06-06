$("#btnDashboard").on('click',()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dashboardDatePicker").value = today;

    setTotalSale(today);
    setTotalProfit(today);
    setMostSaleItem(today);
})

$("#dashboardDatePicker").change(function() {
    setTotalSale($("#dashboardDatePicker").val());
    setTotalProfit($("#dashboardDatePicker").val());
    setMostSaleItem($("#dashboardDatePicker").val());
});


function setTotalSale(date) {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/sale/getTotalSale/" + date,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            if (response != ""){
                $("#totalSale").text(response);
            }else{
                $("#totalSale").text(0);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

function setTotalProfit(date){
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/sale/getTotalProfit/"+date,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            if (response != ""){
                $("#totalProfit").text(response);
            }else{
                $("#totalProfit").text(0);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

function setMostSaleItem(date) {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/sale/getMostSaleItem/" + date,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log(response)
            if (response != ""){
                $("#mostSaleItem").text(response.item_Desc);
                $("#mostSaleItemQty").text(response.size);
                let imageSrc = `data:image/jpeg;base64,${response.item_Pic}`;
                $("#mostSaleItemImage").attr("src", imageSrc);
            }else{
                $("#mostSaleItem").text("-");
                $("#mostSaleItemQty").text(0);
                $("#mostSaleItemImage").attr("src", 'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}