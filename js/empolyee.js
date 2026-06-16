let employees =
JSON.parse(
    localStorage.getItem("employees")
) || [

    {
        id:1,
        name:"Tống Quang Tùng",
        role:"Quản Lý",
        shift:"Full time",
        salary:100000000
    },

    {
        id:2,
        name:"Lê Quang Linh",
        role:"Oder",
        shift:"Full time",
        salary:5000000
    },

    {
        id:3,
        name:"Lê Duy Phong",
        role:"Pha chế",
        shift:"Sáng (7h-14h)",
        salary:6000000
    },
    
    {
        id:3,
        name:"Đặng Tuấn Anh",
        role:"Pha chế",
        shift:"Chiều (14h-21h)",
        salary:6000000
    }

];

let currentEditingId = null;

function saveEmployeesToStorage(){

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

            <td>${emp.shift}</td>

            <td>${emp.salary.toLocaleString('vi-VN')} ₫</td>

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

    currentEditingId = null;
    
    document.getElementById("modalTitle").textContent = "Thêm nhân viên";
    document.getElementById("employeeForm").reset();
    document.getElementById("empName").value = "";
    document.getElementById("empRole").value = "";
    document.getElementById("empShift").value = "";
    document.getElementById("empSalary").value = "";
    
    const modal = document.getElementById("employeeModal");
    if(modal) modal.classList.remove("hidden");
}

function closeEmployeeModal(){

    const modal = document.getElementById("employeeModal");
    if(modal) modal.classList.add("hidden");
}

function saveEmployee(event){

    event.preventDefault();

    const name = document.getElementById("empName").value;
    const role = document.getElementById("empRole").value;
    const shift = document.getElementById("empShift").value;
    const salary = parseInt(document.getElementById("empSalary").value);

    if(!name || !role || !shift || !salary){
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if(currentEditingId){
        
        const emp = employees.find(e=>e.id===currentEditingId);
        if(emp){
            emp.name = name;
            emp.role = role;
            emp.shift = shift;
            emp.salary = salary;
        }
    } else {
        
        employees.push({
            id: Date.now(),
            name,
            role,
            shift,
            salary
        });
    }

    saveEmployeesToStorage();
    closeEmployeeModal();
}

function editEmployee(id){

    const emp = employees.find(e=>e.id===id);
    
    if(!emp) return;

    currentEditingId = id;
    
    document.getElementById("modalTitle").textContent = "Chỉnh sửa nhân viên";
    document.getElementById("empName").value = emp.name;
    document.getElementById("empRole").value = emp.role;
    document.getElementById("empShift").value = emp.shift;
    document.getElementById("empSalary").value = emp.salary;
    
    const modal = document.getElementById("employeeModal");
    if(modal) modal.classList.remove("hidden");
}

function deleteEmployee(id){

    if(
        confirm(
            "Xóa nhân viên này?"
        )
    ){

        employees =
        employees.filter(
            e=>e.id!==id
        );

        saveEmployeesToStorage();
    }
}

renderEmployees();