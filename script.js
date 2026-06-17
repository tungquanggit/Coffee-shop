const products = [
{name:"Cà phê đen",price:25000,category:"Cà phê"},
{name:"Cà phê sữa",price:30000,category:"Cà phê"},
{name:"Bạc xỉu",price:35000,category:"Cà phê"},

{name:"Trà đào",price:35000,category:"Trà"},
{name:"Trà vải",price:35000,category:"Trà"},
{name:"Trà chanh",price:25000,category:"Trà"},

{name:"Sinh tố xoài",price:45000,category:"Sinh tố"},
{name:"Sinh tố bơ",price:50000,category:"Sinh tố"},
{name:"Sinh tố dâu",price:48000,category:"Sinh tố"},

{name:"Nước ép cam",price:40000,category:"Nước ép"},
{name:"Nước ép táo",price:42000,category:"Nước ép"},
{name:"Nước ép dứa",price:38000,category:"Nước ép"},

{name:"Bánh tiramisu",price:45000,category:"Bánh"},
{name:"Bánh mousse",price:40000,category:"Bánh"},
{name:"Bánh croissant",price:35000,category:"Bánh"}
];

let cart=[];

const menu=document.getElementById("menu");

function renderMenu(list=products){

menu.innerHTML="";

list.forEach(product=>{

const div=document.createElement("div");

div.className="card";

div.innerHTML=`
<h3>${product.name}</h3>
<p>${product.category}</p>
<p>${product.price.toLocaleString()} VNĐ</p>

<button onclick="addToCart('${product.name}')">
Thêm
</button>
`;

menu.appendChild(div);

});
}

renderMenu();

function addToCart(name){

const item=products.find(p=>p.name===name);

const exist=cart.find(i=>i.name===name);

if(exist){
exist.qty++;
}
else{
cart.push({...item,qty:1});
}

renderCart();
}

function renderCart(){

const cartDiv=document.getElementById("cart");

cartDiv.innerHTML="";

let subtotal=0;

cart.forEach(item=>{

subtotal+=item.price*item.qty;

cartDiv.innerHTML+=`
<div class="cart-item">
${item.name}

<button class="qty-btn"
onclick="changeQty('${item.name}',-1)">-</button>

${item.qty}

<button class="qty-btn"
onclick="changeQty('${item.name}',1)">+</button>

= ${(item.price*item.qty).toLocaleString()} VNĐ
</div>
`;
});

const service=subtotal*0.05;
const total=subtotal+service;

document.getElementById("subtotal").innerText=
subtotal.toLocaleString();

document.getElementById("serviceFee").innerText=
service.toLocaleString();

document.getElementById("total").innerText=
total.toLocaleString();
}

function changeQty(name,value){

const item=cart.find(i=>i.name===name);

item.qty+=value;

if(item.qty<=0){
cart=cart.filter(i=>i.name!==name);
}

renderCart();
}

document.getElementById("search")
.addEventListener("input",filterProducts);

document.getElementById("categoryFilter")
.addEventListener("change",filterProducts);

function filterProducts(){

const keyword=
document.getElementById("search").value.toLowerCase();

const category=
document.getElementById("categoryFilter").value;

const filtered=products.filter(product=>{

const matchName=
product.name.toLowerCase().includes(keyword);

const matchCategory=
category==="all" ||
product.category===category;

return matchName && matchCategory;

});

renderMenu(filtered);
}
// ======================
// QUẢN LÝ BÀN
// ======================

let tables =
JSON.parse(localStorage.getItem("tables")) || [

    {id:1,status:"Trống",customer:""},
    {id:2,status:"Trống",customer:""},
    {id:3,status:"Trống",customer:""},
    {id:4,status:"Trống",customer:""},
    {id:5,status:"Trống",customer:""},
    {id:6,status:"Trống",customer:""},
    {id:7,status:"Trống",customer:""},
    {id:8,status:"Trống",customer:""},
    {id:9,status:"Trống",customer:""},
    {id:10,status:"Trống",customer:""},
    {id:11,status:"Trống",customer:""},
    {id:12,status:"Trống",customer:""}

];

localStorage.setItem(
    "tables",
    JSON.stringify(tables)
);
// ======================
// ĐẶT BÀN
// ======================

const tableSelect =
document.getElementById("tableSelect");

function loadTableOptions(){

    tableSelect.innerHTML =
    '<option value="">Chọn bàn</option>';

    tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || tables;

    tables.forEach(table=>{

        tableSelect.innerHTML += `
        <option value="${table.id}">
            Bàn ${table.id}
            (${table.status})
        </option>
        `;
    });
}

loadTableOptions();

document
.getElementById("bookingForm")
.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const customerName =
    this.querySelector(
        'input[type="text"]'
    ).value.trim();

    const tableId =
    parseInt(
        tableSelect.value
    );

    const message =
    document.getElementById(
        "bookingMessage"
    );

    const table =
    tables.find(
        t => t.id === tableId
    );

    if(!table){

        message.innerHTML =
        "❌ Vui lòng chọn bàn";

        message.style.color =
        "red";

        return;
    }

    if(table.status==="Đang dùng"){

        message.innerHTML =
        "❌ Bàn đang sử dụng, vui lòng chọn bàn khác";

        message.style.color =
        "red";

        return;
    }

    table.status =
    "Đang dùng";

    table.customer =
    customerName;

    table.bookingTime =
    new Date()
    .toLocaleString();

    localStorage.setItem(
        "tables",
        JSON.stringify(tables)
    );

    message.innerHTML =
    `✅ Đặt Bàn ${table.id} thành công`;

    message.style.color =
    "green";

    this.reset();

    loadTableOptions();
});
/* THANH TOÁN */

document.getElementById("paymentMethod")
.addEventListener("change",function(){

const info=
document.getElementById("paymentInfo");

if(this.value==="MoMo"){
info.innerHTML=
"MoMo: 0867814474";
}
else if(this.value==="Chuyển khoản"){
info.innerHTML=
`
Ngân hàng ABC<br>
STK: 123456789
`;
}
else{
info.innerHTML="";
}
});
function checkout(){

    if(cart.length === 0){
        alert("Giỏ hàng đang trống!");
        return;
    }

    const table =
        document.getElementById("tableSelect").value;

    if(!table){
        alert("Vui lòng chọn bàn!");
        return;
    }

    let orders =
        JSON.parse(localStorage.getItem("coffeeOrders")) || [];

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
    });

    const service = subtotal * 0.05;
    const total = subtotal + service;

    const orderData = {
        id: "OD" + Date.now(),
        table: table,
        time: new Date().toLocaleString(),
        status: "Chờ pha chế",
        items: [...cart],
        total: total
    };

    orders.push(orderData);

    localStorage.setItem(
        "coffeeOrders",
        JSON.stringify(orders)
    );

    document.getElementById("orderResult").innerHTML =
    `✅ Thanh toán thành công
    <br>Mã đơn: <b>${orderData.id}</b>`;

    cart = [];
    renderCart();
}