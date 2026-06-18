function loadOrders(){

    const orders =
        JSON.parse(
            localStorage.getItem("coffeeOrders")
        ) || [];

    const container =
        document.getElementById("orderManagement");

    if(!container) return;

    container.innerHTML = "";

    if(orders.length === 0){
        container.innerHTML = `
            <div class="card">
                <p>Chưa có đơn hàng nào.</p>
            </div>
        `;
        loadDashboard();
        return;
    }

    orders.forEach(order=>{

        let itemsHTML = "";

        order.items.forEach(item=>{

            itemsHTML += `
                <li>
                    ${item.name}
                    x${item.qty}
                </li>
            `;
        });

        container.innerHTML += `
            <div class="card">

                <h3>
                    🪑 Bàn ${order.table}
                </h3>

                <p>
                    ${order.time}
                </p>

                <ul>
                    ${itemsHTML}
                </ul>

                <p>
                    💰
                    ${order.total.toLocaleString()}
                    VNĐ
                </p>

                <div class="order-actions">
                    <button class="view-btn" onclick="viewOrderDetail('${order.id}')">
                        Xem chi tiết
                    </button>
                    <button class="delete-btn" onclick="deleteOrder('${order.id}')">
                        Xóa
                    </button>
                </div>

            </div>
        `;
    });

    loadDashboard();
}

function viewOrderDetail(orderId){

    const orders =
        JSON.parse(
            localStorage.getItem("coffeeOrders")
        ) || [];

    const order =
        orders.find(
            item => item.id === orderId
        );

    if(!order) return;

    const modal =
        document.getElementById("orderDetailModal");

    const title =
        document.getElementById("orderDetailTitle");

    const content =
        document.getElementById("orderDetailContent");

    title.textContent =
        `Đơn hàng ${order.id}`;

    let itemsHTML = "";

    order.items.forEach(item=>{
        itemsHTML += `
            <li>
                <span>${item.name}</span>
                <span>x${item.qty}</span>
                <span>${(item.price * item.qty).toLocaleString()} VNĐ</span>
            </li>
        `;
    });

    content.innerHTML = `
        <div class="detail-row">
            <strong>Bàn:</strong>
            <span>${order.table}</span>
        </div>
        <div class="detail-row">
            <strong>Thời gian:</strong>
            <span>${order.time}</span>
        </div>
        <ul>
            ${itemsHTML}
        </ul>
        <div class="detail-row">
            <strong>Tổng tiền:</strong>
            <span>${order.total.toLocaleString()} VNĐ</span>
        </div>
    `;

    modal.classList.remove("hidden");
}

function deleteOrder(orderId){

    if(!confirm("Bạn có chắc muốn xóa đơn hàng này?")){
        return;
    }

    let orders =
        JSON.parse(
            localStorage.getItem("coffeeOrders")
        ) || [];

    orders = orders.filter(
        item => item.id !== orderId
    );

    localStorage.setItem(
        "coffeeOrders",
        JSON.stringify(orders)
    );

    loadOrders();
    loadDashboard();
}

function closeOrderDetail(){
    document
        .getElementById("orderDetailModal")
        .classList.add("hidden");
}

window.addEventListener("storage", () => {
    loadOrders();
    loadDashboard();
});

loadOrders();