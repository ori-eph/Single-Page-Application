
const popGameApp = {
    users: [],
    start() {
        if (!localStorage.getItem("users")) {
            localStorage.setItem("users", JSON.stringify([]));
            this.users = JSON.parse(localStorage.getItem("users"));
            this.users.push({ email: "test@pop-cat.com", password: "meow123", counter: 0 });
            localStorage.setItem("users", JSON.stringify(users));
        }
        const loginTemp = document.getElementById("loginTemp").cloneNode(true);
        document.getElementById("page").appendChild(loginTemp.content);
        document.querySelector('.style-form2').onsubmit = function (event) {
            popGameApp.validationLogin(event)
        };
        if (localStorage.getItem("currentUser")) {
            popGameApp.logInUser();
        }
    },

    validationLogin(event) {
        event.preventDefault();
        const password = document.getElementById('pwrd').value;
        const email = document.getElementById('email').value;
        this.users = JSON.parse(localStorage.getItem("users"));

        for (let i = 0; i < this.users.length; i++) {
            if (email === this.users[i]["email"] && password === this.users[i]["password"]) {
                this.users[i]["index"] = i;
                localStorage.setItem("currentUser", JSON.stringify(this.users[i]));
                popGameApp.logInUser();
                return true;
            }
        }
        document.getElementById("validateLogin").innerText = "email or pass not correct";
        return false;
    },

    logInUser() {
        console.log("in");
        const page = document.getElementById("page");
        page.replaceChildren();
        const game = document.getElementById("game").cloneNode(true);
        page.appendChild(game.content);
        popGameApp.gameStart();
        document.getElementById("log-out").addEventListener("click", popGameApp.logout);
    },

    gameStart() {
        document.getElementById("counter-btn").addEventListener("click", popGameApp.popGameOperator);
        const user = JSON.parse(localStorage.getItem("currentUser"));
        let counter = user["counter"];
        const counterTag = document.getElementById("counter");
        counterTag.innerText = counter;
    },

    popGameOperator() {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        user["counter"] += 1;
        localStorage.setItem("currentUser", JSON.stringify(user));
        let counterTag = document.getElementById('counter');
        counterTag.style.transition = "all 200ms";
        counterTag.style.fontSize = "1.5em";
        counterTag.innerText = user["counter"];
        setTimeout(() => { counterTag.style.fontSize = "1em"; }, 200);
        img = document.getElementById("cat-img");
        img.src = "./media/pop-open.jpeg";
        document.getElementById("pop-sound").play();
        document.getElementById("pop-sound").playBackRate = 5;
        setTimeout(setPictureBack, 150);
        function setPictureBack() {
            img.src = "./media/pop-closed.jpeg";
        }
    },

    logout() {
        let indexOfCurrentUser = JSON.parse(localStorage.getItem("currentUser")).index;
        const users = JSON.parse(localStorage.getItem("users"));
        users[indexOfCurrentUser] = JSON.parse(localStorage.getItem("currentUser"));
        delete users[indexOfCurrentUser].index;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem("currentUser");
        document.getElementById("page").replaceChildren();
        const loginTemp = document.getElementById("loginTemp").cloneNode(true);
        document.getElementById("page").appendChild(loginTemp.content);
        document.querySelector('.style-form2').onsubmit = function (event) {
            popGameApp.validationLogin(event)
        };
    }
}

window.onload = popGameApp.start;