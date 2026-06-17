function loadOrders(){

    const orders =
        JSON.parse(
            localStorage.getItem("coffeeOrders")
        ) || [];

    const container =
        document.getElementById("orderManagement");

    container.innerHTML = "";

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

                <p>
                    ${order.status}
                </p>

            </div>
        `;
    });
}

loadOrders();

container.innerHTML += `
<div class="order-card">

    <h3>🪑 Bàn ${order.table}</h3>

    <div class="order-time">
        ${order.time}
    </div>

    <ul class="order-items">
        ${itemsHTML}
    </ul>

    <div class="order-total">
        💰 ${order.total.toLocaleString()} VNĐ
    </div>

    <div class="order-status waiting">
        ${order.status}
    </div>

    <div class="order-actions">
        <button class="btn-making">
            Đang làm
        </button>

        <button class="btn-done">
            Hoàn thành
        </button>
    </div>

</div>
`;