// DOM SELECTORS============================================================
const imgInput = document.querySelector("#imgInput"),
    userImage = document.querySelector("#userImage"),
    userDataRows = document.querySelector("#userDataRows"),
    userName = document.querySelector("#userName"),
    userAge = document.querySelector("#userAge"),
    userCity = document.querySelector("#userCity"),
    userEmail = document.querySelector("#userEmail"),
    userPhone = document.querySelector("#userPhone"),
    userPost = document.querySelector("#userPost"),
    userStartDate = document.querySelector("#userStartDate"),
    updateBtn = document.querySelector("#updateBtn"),
    updateDoneBtn = document.querySelector("#updateDoneBtn"),
    deleteBtn = document.querySelector("#deleteBtn"),
    addBtn = document.querySelector("#addBtn"),
    newUserBtn = document.querySelector("#newUserBtn"),
    closeBtn = document.querySelector(".btn-close"),
    userModal = new bootstrap.Modal(document.getElementById("userModal")),
    userModalShow = new bootstrap.Modal(document.getElementById("userModalShow")),
    userModalInputs = document.querySelectorAll("#userModalShow .inputs input"),
    userModalElement = document.querySelector(".modal");

let globalIndex,
    globalId,
    userList = [];

if (localStorage.getItem("Users") != null) {
    userList = JSON.parse(localStorage.getItem("Users"));
    displayUsers(userList);
}

// MODIFY MODAL TO SUIT USER INFO DISPLAY
for (let i = 0; i < userModalInputs.length; i++) {
    userModalInputs[i].disabled = true;
}

// CLEAR MODAL IF CLICKED OUTSIDE
userModalElement.addEventListener("hidden.bs.modal", () => {
    clear();
});

//IMAGE FILE FUNCTION
let image = "";
imgInput.onchange = (e) => {
    if (imgInput.files[0].size <= 1000000) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            image = e.target.result;
            userImage.src = e.target.result;
        };
        fileReader.readAsDataURL(imgInput.files[0]);
    } else {
        alert("Image size must be 1MB or less.");
    }
};

// ADD USER BTN
addBtn.addEventListener("click", () => {
    addUser();
});
// NEW USER BTN
newUserBtn.addEventListener("click", () => {
    userModal.show();
});
// CLOSE BTN
closeBtn.addEventListener("click", () => {
    userModal.hide();
    clear();
});

// ADD USERS
function addUser() {
    let user = {
        id: Math.random().toString(16).slice(2),
        image: image,
        userImage: image || "../images/default img.png",
        userName: userName.value,
        userAge: userAge.value,
        userCity: userCity.value,
        userEmail: userEmail.value,
        userPhone: userPhone.value,
        userPost: userPost.value,
        userStartDate: userStartDate.value,
    };
    console.log(user.id);

    userList.push(user);
    localStorage.setItem("Users", JSON.stringify(userList));
    console.log(localStorage.getItem("Users"));
    displayUsers(userList);
    clear();
    customSuccessAlert("Added is successfully");
    scrollToBottom();
}

// DISPLAY USERS
function displayUsers(array) {
    let cartona = ``;
    for (let i = 0; i < array.length; i++) {
        cartona += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td class="table-image" onclick="showStaticModel('${array[i].id
            }');" data-bs-toggle="modal" data-bs-target="#userModalInputs"><img
                                src="${array[i].userImage}" alt=""></td>
                        <td>${array[i].userName}</td>
                        <td>${array[i].userAge}</td>
                        <td>${array[i].userCity}</td>
                        <td>${array[i].userEmail}</td>
                        <td>${array[i].userPhone}</td>
                        <td>${array[i].userPost}</td>
                        <td>${array[i].userStartDate}</td>
                        <td>
                            <button type="button" onclick="setForm('${array[i].id
            }');" class="btn btn-warning mb-1" id="updateBtn"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button type="button" onclick="deleteUser('${array[i].id
            }');" class="btn btn-danger mb-1" id="deleteBtn"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `;
    }
    userDataRows.innerHTML = cartona;
}

//CLEAR FORM
function clear() {
    console.log("clear");
    image = "";
    userImage.src = "../images/default img.png";
    userName.value = null;
    userAge.value = null;
    userCity.value = null;
    userEmail.value = null;
    userPhone.value = null;
    userPost.value = null;
    userStartDate.value = null;
    document.documentElement.style.setProperty(
        "--main-color",
        "rgb(21, 83, 255)"
    );
    addBtn.classList.remove("d-none");
    updateDoneBtn.classList.replace("d-block", "d-none");
}

//SCROLL TO BUTTOM
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
}

// DELETE
function deleteUser(id) {
    console.log("delete");
    console.log(id);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-success me-3",
        },
        buttonsStyling: false,
    });
    swalWithBootstrapButtons
        .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
                for (let i = 0; i < userList.length; i++) {
                    if (userList[i].id === id) {
                        userList.splice(i, 1);
                        localStorage.setItem("Users", JSON.stringify(userList));
                        displayUsers(userList);
                    }
                }
                customSuccessAlert("The user has been deleted.");
            } else {
                customSuccessAlert("The user data is safe.");
            }
        });
}

//UPDATE USER
function setForm(id) {
    let userIndex = userList.findIndex((user) => {
        return user.id === id;
    });
    console.log(userIndex);
    globalIndex = userIndex;
    globalId = id;
    userModal.show();
    showData(userIndex);
    document.documentElement.style.setProperty("--main-color", "#ce9d0c");
    addBtn.classList.add("d-none");
    updateDoneBtn.classList.replace("d-none", "d-block");
}

// SHOW STATIC MODAL
function showStaticModel(id) {
    let userIndex = userList.findIndex((user) => user.id === id);
    console.log(userIndex);
    globalIndex = userIndex;
    globalId = id;
    userModalShow.show();
    const inputs = userModalInputs;
    inputs[0].value = userList[userIndex].userName;
    inputs[1].value = userList[userIndex].userAge;
    inputs[2].value = userList[userIndex].userCity;
    inputs[3].value = userList[userIndex].userEmail;
    inputs[4].value = userList[userIndex].userPhone;
    inputs[5].value = userList[userIndex].userPost;
    inputs[6].value = userList[userIndex].userStartDate;

    document.querySelector("#userModalShow img").src =
        userList[userIndex].userImage || "../images/default img.png";
}

// SHOW DATA IN THE STATIC MODAL
function showData(index) {
    console.log("iam here");
    userImage.src = userList[index].userImage;
    userName.value = userList[index].userName;
    userAge.value = userList[index].userAge;
    userCity.value = userList[index].userCity;
    userEmail.value = userList[index].userEmail;
    userPhone.value = userList[index].userPhone;
    userPost.value = userList[index].userPost;
    userStartDate.value = userList[index].userStartDate;
}

// UPDATE USER
function updateUser() {
    let user = {
        id: globalId,
        userImage: image || userList[globalIndex].userImage,
        userName: userName.value,
        userAge: userAge.value,
        userCity: userCity.value,
        userEmail: userEmail.value,
        userPhone: userPhone.value,
        userPost: userPost.value,
        userStartDate: userStartDate.value,
    };
    userList.splice(globalIndex, 1, user);
    localStorage.setItem("Users", JSON.stringify(userList));
    userModal.hide();
    displayUsers(userList);
    clear();
}

// SEARCH
function search(keyword) {
    console.log(`Searching for: "${keyword}"`);
    let arr = [],
        found = false;
    if (keyword.length === 0) {
        console.log("hii");
        displayUsers(userList);
    } else {
        for (var i = 0; i < userList.length; i++) {
            if (
                userList[i].userName
                    .toLowerCase()
                    .trim()
                    .includes(keyword.toLowerCase().trim())
            ) {
                found = true;
                arr.push(userList[i]);
            }
            displayUsers(arr);
        }
        if (!found) {
            displayUsers([]);
        }
    }
}

// ALERT
function customSuccessAlert(message) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });
    Toast.fire({
        icon: "success",
        title: `${message}`,
    });
}

// DARK MODE
// DARK MODE DOM SELECTORS
const themeToggle = document.getElementById("themeToggle"),
    themeIcon = document.getElementById("themeIcon"),
    table = document.querySelector(".table"),
    navbar = document.querySelector(".navbar"),
    modalContent = document.querySelectorAll(".modal-content");

let isDarkMode = localStorage.getItem("dark-mode") === "true";
darkMode(isDarkMode);

// DARK MODE FUNCTION
function darkMode(isDarkMode) {
    themeIcon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#ffffff";
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000";

    // add/remove dark mode class
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        table.classList.add("table-dark");
        modalContent.forEach(element => {
            element.classList.add('dark-theme');
        });
        navbar.setAttribute("data-bs-theme", "dark");
    } else {
        document.body.classList.remove('dark-mode');
        table.classList.remove("table-dark");
        modalContent.forEach(element => {
            element.classList.remove('dark-theme');
        });
        navbar.removeAttribute("data-bs-theme");
    }

}

// DARK MODE DOM EVENT
themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('dark-mode', isDarkMode);
    darkMode(isDarkMode);
});


// SORT

const sortBtn = document.querySelector("#sort");
sortBtn.addEventListener('click', (e) => {
    const targetValue = e.target.closest('li').getAttribute('data-value');
    sorting(targetValue);

})

function sorting(targetValue) {
    console.log(typeof (targetValue));
    if (targetValue === 'userName' || targetValue === 'userEmail' || targetValue === 'userCity' || targetValue === 'userPost') {
        userList.sort((a, b) => {

            const nameA = a[targetValue];
            const nameB = b[targetValue]; // ignore upper and lowercase

            console.log(nameA, nameB);
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
    else if (targetValue === 'userStartDate') {
        console.log('date');
        userList.sort((a, b) => {
            return new Date(a[targetValue]) - new Date(b[targetValue]);
        });

    }
    else if (targetValue === 'userAge') {
        console.log('age');
        userList.sort((a, b) => {
            return a[targetValue] - b[targetValue];
        });
    }

    localStorage.setItem("Users", JSON.stringify(userList));
    displayUsers(userList);
}

