function getStoredOrders(){
    return JSON.parse(
        localStorage.getItem("coffeeOrders")
    ) || [];
}

function getStoredTables(){
    return JSON.parse(
        localStorage.getItem("tables")
    ) || [];
}

function getStoredEmployees(){
    return JSON.parse(
        localStorage.getItem("employees")
    ) || [];
}

function loadDashboard(){
    updateRevenue();
    updateOrderCount();
    updateTableCount();
    updateEmployeeCount();
}

function updateRevenue(){
    const orders = getStoredOrders();

    const revenue = orders.reduce(
        (sum, order) => sum + (Number(order.total) || 0),
        0
    );

    const element = document.getElementById("revenueValue");

    if(element){
        element.textContent =
            revenue.toLocaleString("vi-VN") + " ₫";
    }
}

function updateOrderCount(){
    const orders = getStoredOrders();
    const element = document.getElementById("orderCount");

    if(element){
        element.textContent = orders.length;
    }
}

function updateTableCount(){
    const tables = getStoredTables();
    const element = document.getElementById("tableCount");

    if(element){
        element.textContent = tables.length;
    }
}

function updateEmployeeCount(){
    const employees = getStoredEmployees();
    const element = document.getElementById("employeeCount");

    if(element){
        element.textContent = employees.length;
    }
}