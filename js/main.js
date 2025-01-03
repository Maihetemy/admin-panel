
// DOM SELECTORS============================================================
const userImage = document.querySelector('#userImage'),
    userDataRows = document.querySelector('#userDataRows'),
    userName = document.querySelector('#userName'),
    userAge = document.querySelector('#userAge'),
    userCity = document.querySelector('#userCity'),
    userEmail = document.querySelector('#userEmail'),
    userPhone = document.querySelector('#userPhone'),
    userPost = document.querySelector('#userPost'),
    userStartDate = document.querySelector('#userStartDate'),
    updateBtn = document.querySelector('#updateBtn'),
    deleteBtn = document.querySelector('#deleteBtn'),
    addBtn = document.querySelector('#addBtn'),
    userModal = document.querySelectorAll('#userModal .inputs input');

let userList = [];

//modify modal to suit user info display=====================================
for (let i = 0; i < userModal.length; i++) {
    userModal[i].disabled = true;
}

// START FUNCTIONS===========================================================
// ADD USER
addBtn.addEventListener('click', () => {
    console.log('hi form add btn');
    addUser();
})

// ADD USERS
addUser = () => {
    let user = {
        userImage: userImage.value,
        userName: userName.value,
        userAge: userAge.value,
        userCity: userCity.value,
        userEmail: userEmail.value,
        userPhone: userPhone.value,
        userPost: userPost.value,
        userStartDate: userStartDate.value,
    }
    userList.push(user);
    displayUsers(userList);
    console.log(userList);

}


// DISPLAY USERS
displayUsers = (array) => {
    let cartona = ``;
    for (let i = 0; i < array.length; i++) {
        cartona += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td data-bs-toggle="modal" data-bs-target="#userModal"><img
                                src="images/WhatsApp Image 2024-12-25 at 23.11.23_755fa539.jpg" alt=""></td>
                        <td>${array[i].userName}</td>
                        <td>${array[i].userAge}</td>
                        <td>${array[i].userCity}</td>
                        <td>${array[i].userEmail}</td>
                        <td>${array[i].userPhone}</td>
                        <td>${array[i].userPost}</td>
                        <td>${array[i].userStartDate}</td>
                        <td>
                            <button type="button" class="btn btn-warning" id="updateBtn"><i
                                    class="fa-solid fa-pen-to-square"></i></button>
                            <button type="button" class="btn btn-danger" id="deleteBtn"><i
                                    class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `;
    }
    userDataRows.innerHTML = cartona;

}
// console.log(deleteBtn, updateBtn, userStartDate, userPost, userPhone, userEmail, userCity, userAge, userName, userImage, index);
