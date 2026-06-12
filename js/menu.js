let menuList =
JSON.parse(
    localStorage.getItem("menuList")
) || [

    {
        id:1,
        name:"Cà phê sữa",
        price:35000
    },

    {
        id:2,
        name:"Matcha Latte",
        price:55000
    },

    {
        id:3,
        name:"Cold Brew",
        price:45000
    }

];

function saveMenu(){

    localStorage.setItem(
        "menuList",
        JSON.stringify(menuList)
    );

    renderMenu();
}

function renderMenu(){

    const table =
    document.getElementById("menuTable");

    if(!table) return;

    table.innerHTML="";

    menuList.forEach(item=>{

        table.innerHTML += `
        <tr>

            <td>${item.name}</td>

            <td>
                ${item.price.toLocaleString("vi-VN")} ₫
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editMenu(${item.id})">

                    Sửa

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMenu(${item.id})">

                    Xóa

                </button>

            </td>

        </tr>
        `;
    });

    renderOrderMenu();
}

function openMenuModal(){

    const name =
    prompt("Tên món:");

    if(!name) return;

    const price =
    Number(
        prompt("Giá bán:")
    );

    if(!price) return;

    menuList.push({

        id:Date.now(),
        name,
        price

    });

    saveMenu();
}

function editMenu(id){

    const item =
    menuList.find(
        m=>m.id===id
    );

    const newName =
    prompt(
        "Tên mới:",
        item.name
    );

    const newPrice =
    Number(
        prompt(
            "Giá mới:",
            item.price
        )
    );

    if(newName){

        item.name=newName;
        item.price=newPrice;

        saveMenu();
    }
}

function deleteMenu(id){

    if(
        confirm(
            "Xóa món này?"
        )
    ){

        menuList =
        menuList.filter(
            m=>m.id!==id
        );

        saveMenu();
    }
}

function searchMenu(){

    const keyword =
    document
        .getElementById("menuSearch")
        .value
        .toLowerCase();

    const rows =
    document.querySelectorAll(
        "#menuTable tr"
    );

    rows.forEach(row=>{

        row.style.display =
        row.innerText
            .toLowerCase()
            .includes(keyword)

        ? ""

        : "none";
    });
}

renderMenu();