// DOM SELECTORS============================================================
const imgInput = document.querySelector('#imgInput'),
    userImage = document.querySelector('#userImage'),
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
//IMAGE FILE FUNCTION

// START FUNCTIONS===========================================================
// ADD USER
addBtn.addEventListener('click', () => {
    addUser();
})

let image = '';
imgInput.onchange = (e) => {
    if (imgInput.files[0].size <= 1000000) {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            image = e.target.result;
            userImage.src = e.target.result;
        }
        fileReader.readAsDataURL(imgInput.files[0])
    }
    else {
        console.log('wrong img');
    }
}


// ADD USERS
addUser = () => {
    let user = {
        userImage: image ? image : '../images/default img.png',
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
    clear();
    console.log(userList);
    console.log(user.userImage);

}


// DISPLAY USERS
displayUsers = (array) => {
    let cartona = ``;
    for (let i = 0; i < array.length; i++) {
        cartona += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td data-bs-toggle="modal" data-bs-target="#userModal"><img
                                src="${array[i].userImage}" alt=""></td>
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

//CLEAR FORM
clear = () => {
    image = '';
    userImage.src = '../images/default img.png';
    userName.value = null;
    userAge.value = null;
    userCity.value = null;
    userEmail.value = null;
    userPhone.value = null;
    userPost.value = null;
    userStartDate.value = null;
}
