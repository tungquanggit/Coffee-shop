// ======================
// DỮ LIỆU BÀN
// ======================


let tables =
JSON.parse(localStorage.getItem("tables")) || [

    {
        id: 1,
        status: "Trống",
        customer: "",
        phone: "",
        bookingTime: ""
    },

    {
        id: 2,
        status: "Đang dùng",
        customer: "Nguyễn Văn A",
        phone: "0901234567",
        bookingTime: "03/06/2026 15:30"
    },

    {
        id: 3,
        status: "Trống",
        customer: "",
        phone: "",
        bookingTime: ""
    }

];

// ======================
// LOAD DANH SÁCH BÀN
// ======================

function loadTables() {

    const tableSelect =
    document.getElementById("tableSelect");

    if (!tableSelect) return;

    const tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || [];

    tableSelect.innerHTML =
    '<option value="">Chọn bàn</option>';

    tables.forEach(table => {

        tableSelect.innerHTML += `
        <option value="${table.id}">
            Bàn ${table.id}
            (${table.status})
        </option>
        `;
    });
}

loadTables();

document
.getElementById("bookingForm")
.addEventListener(
"submit",
function(e){

    e.preventDefault();

    let tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || [];

    const customerName =
    document.getElementById(
        "customerName"
    ).value.trim();

    const phone =
    document.getElementById(
        "customerPhone"
    ).value.trim();

    const bookingTime =
    document.getElementById(
        "bookingTime"
    ).value;

    const tableId =
    parseInt(
        document.getElementById(
            "tableSelect"
        ).value
    );

    const table =
    tables.find(
        t => t.id === tableId
    );

    const message =
    document.getElementById(
        "bookingMessage"
    );

    if(!table){

        message.innerHTML =
        "❌ Vui lòng chọn bàn";

        return;
    }

    if(table.status === "Đang dùng"){

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

    table.phone =
    phone;

    table.bookingTime =
    bookingTime;

    localStorage.setItem(
        "tables",
        JSON.stringify(tables)
    );

    message.innerHTML =
    `✅ Đặt Bàn ${table.id} thành công`;

    message.style.color =
    "green";

    this.reset();

    loadTables();
});
// ======================
// LƯU DỮ LIỆU
// ======================

function saveTables(){

    localStorage.setItem(
        "tables",
        JSON.stringify(tables)
    );

    renderTables();
    renderStats();
}

// ======================
// HIỂN THỊ THỐNG KÊ
// ======================

function renderStats() {

    const stats =
    document.getElementById("tableStats");

    if (!stats) return;

    const available =
    tables.filter(
        table => table.status === "Trống"
    ).length;

    const busy =
    tables.filter(
        table => table.status === "Đang dùng"
    ).length;

    stats.innerHTML = `
        🟢 Bàn trống: <b>${available}</b>
        |
        🔴 Đang sử dụng: <b>${busy}</b>
    `;
}

// ======================
// HIỂN THỊ DANH SÁCH BÀN
// ======================

function renderTables() {

    const grid =
    document.getElementById("tableGrid");

    if (!grid) return;

    grid.innerHTML = "";

    tables.forEach(table => {

        const statusClass =
        table.status === "Trống"
        ? "available"
        : "busy";

        grid.innerHTML += `
        <div class="table-card ${statusClass}">

            <h3>🪑 Bàn ${table.id}</h3>

            <p>
                <strong>Trạng thái:</strong>
                ${table.status}
            </p>

            ${
                table.customer
                ?
                `
                <p>
                    <strong>👤 Khách:</strong>
                    ${table.customer}
                </p>

                <p>
                    <strong>📞 SĐT:</strong>
                    ${table.phone}
                </p>

                <p>
                    <strong>⏰ Đặt lúc:</strong>
                    ${table.bookingTime}
                </p>
                `
                :
                `
                <p>
                    <strong>👤 Khách:</strong>
                    Chưa có
                </p>
                `
            }

            <button
                onclick="toggleTable(${table.id})">

                ${
                    table.status === "Trống"
                    ? "📅 Đặt bàn"
                    : "✅ Trả bàn"
                }

            </button>

        </div>
        `;
    });
}

// ======================
// THÊM BÀN
// ======================

function addTable() {

    const newId =
    tables.length > 0
    ? Math.max(...tables.map(t => t.id)) + 1
    : 1;

    tables.push({

        id: newId,
        status: "Trống",
        customer: "",
        phone: "",
        bookingTime: ""

    });

    saveTables();

    alert(
        `✅ Đã thêm Bàn ${newId}`
    );
}

// ======================
// ĐẶT/TRẢ BÀN
// ======================

function toggleTable(id) {

    const table =
    tables.find(
        t => t.id === id
    );

    if (!table) return;

    // ĐẶT BÀN
    if (table.status === "Trống") {

        const customerName =
        prompt("Nhập tên khách:");

        if (
            !customerName ||
            customerName.trim() === ""
        ) {
            return;
        }

        const phone =
        prompt("Nhập số điện thoại:");

        table.status =
        "Đang dùng";

        table.customer =
        customerName.trim();

        table.phone =
        phone || "";

        table.bookingTime =
        new Date()
        .toLocaleString("vi-VN");

        alert(
            `✅ Đã đặt Bàn ${table.id}
cho ${customerName}`
        );

    }

    // TRẢ BÀN
    else {

        const confirmCheckout =
        confirm(
            `Xác nhận trả Bàn ${table.id}?`
        );

        if (!confirmCheckout)
        return;

        table.status =
        "Trống";

        table.customer =
        "";

        table.phone =
        "";

        table.bookingTime =
        "";

        alert(
            `✅ Bàn ${table.id}
đã được trả`
        );
    }

    saveTables();
}

// ======================
// ĐẾM BÀN TRỐNG
// ======================

function countAvailableTables() {

    return tables.filter(
        table =>
        table.status === "Trống"
    ).length;
}

// ======================
// ĐỒNG BỘ DỮ LIỆU
// ======================

window.addEventListener("storage", () => {

    tables =
    JSON.parse(
        localStorage.getItem("tables")
    ) || [];

    renderTables();
    renderStats();
});