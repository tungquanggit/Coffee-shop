let currentOrder = [];

let orders =
JSON.parse(
    localStorage.getItem("orders")
) || [];

function renderOrderMenu(){

    const container =
    document.getElementById(
        "menuOrderList"
    );

    if(!container) return;

    container.innerHTML="";

    menuList.forEach(item=>{

        container.innerHTML += `
        <div
            class="menu-order-item"
            onclick="addToOrder(${item.id})">

            <h3>${item.name}</h3>

            <p>
                ${item.price.toLocaleString("vi-VN")}
                ₫
            </p>

        </div>
        `;
    });
}

function addToOrder(id){

    const item =
    menuList.find(
        m=>m.id===id
    );

    currentOrder.push(item);

    renderCurrentOrder();
}

function renderCurrentOrder(){

    const container =
    document.getElementById(
        "currentOrder"
    );

    if(!container) return;

    let total = 0;

    let html =
    `
    <h3>Đơn hàng hiện tại</h3>
    <ul>
    `;

    currentOrder.forEach(item=>{

        total += item.price;

        html += `
        <li>

            ${item.name}
            -
            ${item.price.toLocaleString("vi-VN")} ₫

        </li>
        `;
    });

    html += `
    </ul>

    <h2>
        Tổng:
        ${total.toLocaleString("vi-VN")}
        ₫
    </h2>
    `;

    container.innerHTML = html;
}

function checkout(){

    if(currentOrder.length===0){

        alert(
            "Chưa có món nào."
        );

        return;
    }

    let total = 0;

    currentOrder.forEach(item=>{

        total += item.price;

    });

    const order = {

        id: Date.now(),

        date:
        new Date()
        .toLocaleString("vi-VN"),

        items: currentOrder,

        total

    };

    orders.push(order);

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    alert(
        "Thanh toán thành công\n\nTổng tiền: "
        +
        total.toLocaleString("vi-VN")
        +
        " ₫"
    );

    currentOrder=[];

    renderCurrentOrder();

    loadDashboard();
}