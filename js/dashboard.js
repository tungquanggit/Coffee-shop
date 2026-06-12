function loadDashboard(){

    updateRevenue();

    updateOrderCount();

    updateTableCount();

    updateEmployeeCount();

}

function updateRevenue(){

    const revenue =
    orders.reduce(

        (sum,order)=>
        sum+order.total,

        0

    );

    const element =
    document.getElementById(
        "revenueValue"
    );

    if(element){

        element.textContent =
        revenue.toLocaleString("vi-VN")
        + " ₫";

    }
}

function updateOrderCount(){

    const element =
    document.getElementById(
        "orderCount"
    );

    if(element){

        element.textContent =
        orders.length;

    }
}

function updateTableCount(){

    const element =
    document.getElementById(
        "tableCount"
    );

    if(element){

        element.textContent =
        tables.length;

    }
}

function updateEmployeeCount(){

    const element =
    document.getElementById(
        "employeeCount"
    );

    if(element){

        element.textContent =
        employees.length;

    }
}