let employees =
JSON.parse(
    localStorage.getItem("employees")
) || [

    {
        id:1,
        name:"Nguyễn Văn A",
        role:"Barista"
    },

    {
        id:2,
        name:"Trần Thị B",
        role:"Thu ngân"
    }

];

function saveEmployees(){

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    renderEmployees();
}

function renderEmployees(){

    const table =
    document.getElementById(
        "employeeTable"
    );

    if(!table) return;

    table.innerHTML="";

    employees.forEach(emp=>{

        table.innerHTML += `
        <tr>

            <td>${emp.name}</td>

            <td>${emp.role}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editEmployee(${emp.id})">

                    Sửa

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${emp.id})">

                    Xóa

                </button>

            </td>

        </tr>
        `;
    });
}

function openEmployeeModal(){

    const name =
    prompt(
        "Tên nhân viên:"
    );

    if(!name) return;

    const role =
    prompt(
        "Chức vụ:"
    );

    employees.push({

        id:Date.now(),
        name,
        role

    });

    saveEmployees();
}

function editEmployee(id){

    const emp =
    employees.find(
        e=>e.id===id
    );

    const newName =
    prompt(
        "Tên mới:",
        emp.name
    );

    const newRole =
    prompt(
        "Chức vụ:",
        emp.role
    );

    emp.name=newName;
    emp.role=newRole;

    saveEmployees();
}

function deleteEmployee(id){

    if(
        confirm(
            "Xóa nhân viên?"
        )
    ){

        employees =
        employees.filter(
            e=>e.id!==id
        );

        saveEmployees();
    }
}

renderEmployees();