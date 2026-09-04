
let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = localStorage.getItem("currentUser");

function goRegister() {
window.location.href = "register.html";
}

function goLogin() {
window.location.href = "index.html";
}

function register() {
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

if (email === "" || password === "") {
    alert("Please enter email and password");
    return;
}

users = JSON.parse(localStorage.getItem("users")) || {};

if (users[email]) {
    alert("This email is already registered");
    return;
}

users[email] = {
    password: password,
    balance: 0,
    history: []
};

localStorage.setItem("users", JSON.stringify(users));

alert("Register successful");

window.location.href = "index.html";

}

function login() {
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

users = JSON.parse(localStorage.getItem("users")) || {};

let user = users[email];

if (user && user.password === password) {
    localStorage.setItem("currentUser", email);

    alert("Login success");

    window.location.href = "dashboard.html";
} else {
    alert("Wrong email or password");
}
}

function logout() {
localStorage.removeItem("currentUser");
window.location.href = "index.html";
}

function load() {
users = JSON.parse(localStorage.getItem("users")) || {};
currentUser = localStorage.getItem("currentUser");

if (!currentUser || !users[currentUser]) {
    window.location.href = "index.html";
    return;
}

let user = users[currentUser];

document.getElementById("balance").innerText = user.balance;

let historyList = document.getElementById("history");

historyList.innerHTML = "";

user.history.forEach(function(item, index) {
    let li = document.createElement("li");
    li.innerHTML = item;

    let editButton = document.createElement("button");

    editButton.innerText = "Edit";
    editButton.onclick = function() {
        edit(index);
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function() {
        del(index);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    historyList.appendChild(li);
});

}

function save() {
localStorage.setItem("users", JSON.stringify(users));
load();
}

function deposit() {
let amount = Number(
document.getElementById("depositAmount").value
);

let description =
    document.getElementById("depositDesc").value;

let user = users[currentUser];

if (amount <= 0 || isNaN(amount)) {
    alert("Enter a valid amount");
    return;
}

user.balance += amount;

user.history.push(
    "Deposit: " + amount + " | " + description
);

save();

}

function withdraw() {
let amount = Number(
document.getElementById("withdrawAmount").value
);

let description =
    document.getElementById("withdrawDesc").value;

let user = users[currentUser];

if (amount <= 0 || isNaN(amount)) {
    alert("Enter a valid amount");
    return;
}

if (amount > user.balance) {
    alert("Not enough money");
    return;
}

user.balance -= amount;

user.history.push(
    "Withdraw: " + amount + " | " + description
);

save();

}

function transfer() {
let to =
document.getElementById("transferTo").value;

let amount = Number(
    document.getElementById("transferAmount").value
);

let description =
    document.getElementById("transferDesc").value;

let sender = users[currentUser];

if (amount <= 0 || isNaN(amount)) {
    alert("Enter a valid amount");
    return;
}

if (!users[to]) {
    alert("User not found");
    return;
}

if (to === currentUser) {
    alert("You cannot transfer to yourself");
    return;
}

if (amount > sender.balance) {
    alert("Not enough balance");
    return;
}

let receiver = users[to];

sender.balance -= amount;
receiver.balance += amount;

sender.history.push(
    "To " + to + ": " + amount + " | " + description
);

receiver.history.push(
    "From " + currentUser + ": " + amount + " | " + description
);

save();

}

function del(index) {
users[currentUser].history.splice(index, 1);
save();
}

function Edit(index) {
let oldText = users[currentUser].history[index];

let newText = prompt("Edit:", oldText);

if (newText !== null && newText.trim() !== "") {
    users[currentUser].history[index] = newText.trim();
    save();
}

}

function searchHistory() {
let value =
document.getElementById("search").value.toLowerCase();

let items =
    document.querySelectorAll("#history li");

items.forEach(function(item) {
    if (item.innerText.toLowerCase().includes(value)) {
        item.style.display = "block";
    } else {
        item.style.display = "none";
    }
});

}
let historyList=document.getElementById("history")


if (document.getElementById("balance")) {
load();
}