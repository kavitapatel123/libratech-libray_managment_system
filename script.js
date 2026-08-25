let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");

const totalStudents = document.getElementById("totalStudents");
const maleStudents = document.getElementById("maleStudents");
const femaleStudents = document.getElementById("femaleStudents");

const submitBtn = document.getElementById("submitBtn");
const noData = document.getElementById("noData");


// Add / Update Student

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        course: document.getElementById("course").value,
        semester: document.getElementById("semester").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value
    };

    if (editIndex === -1) {

        students.push(student);

        alert("Student added successfully!");

    } else {

        students[editIndex] = student;

        alert("Student updated successfully!");

        editIndex = -1;
        submitBtn.textContent = "Add Student";
    }

    saveData();

    form.reset();

    displayStudents();
});


// Display Students

function displayStudents(data = students) {

    table.innerHTML = "";

    if (data.length === 0) {

        noData.style.display = "block";

    } else {

        noData.style.display = "none";

        data.forEach(function(student, index) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.course}</td>
                <td>${student.semester}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>

                <td>
                    <button class="edit-btn"
                        onclick="editStudent(${students.indexOf(student)})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteStudent(${students.indexOf(student)})">
                        Delete
                    </button>
                </td>
            `;

            table.appendChild(row);
        });
    }

    updateDashboard();
}


// Edit Student

function editStudent(index) {

    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("course").value = student.course;
    document.getElementById("semester").value = student.semester;
    document.getElementById("gender").value = student.gender;
    document.getElementById("dob").value = student.dob;

    editIndex = index;

    submitBtn.textContent = "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Delete Student

function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

        students.splice(index, 1);

        saveData();

        displayStudents();

        alert("Student deleted successfully!");
    }
}


// Search Student

search.addEventListener("input", function() {

    const searchValue = search.value.toLowerCase();

    const filteredStudents = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchValue) ||
            student.roll.toLowerCase().includes(searchValue) ||
            student.email.toLowerCase().includes(searchValue) ||
            student.course.toLowerCase().includes(searchValue)
        );

    });

    displayStudents(filteredStudents);
});


// Dashboard Update

function updateDashboard() {

    totalStudents.textContent = students.length;

    const male = students.filter(
        student => student.gender === "Male"
    ).length;

    const female = students.filter(
        student => student.gender === "Female"
    ).length;

    maleStudents.textContent = male;
    femaleStudents.textContent = female;
}


// Save Data in LocalStorage

function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// Initial Display

displayStudents();