
const popGameApp = {
    start() {
        if (!localStorage.getItem("users")) {
            localStorage.setItem("users", JSON.stringify([]));
            const users = JSON.parse(localStorage.getItem("users"));
            users.push({ email: "test@pop-cat.com", password: "meow123" });
            localStorage.setItem("users", JSON.stringify(users));
            console.log(popGameApp.validationLogin);
            const submit = document.getElementById("submitbtn").addEventListener('click', this.validationLogin)
        }
    },

    validationLogin() {
        console.log("in!");
        const password = document.getElementById('pwrd').value;
        const email = document.getElementById('email').value;
        users = localStorage.getItem("users");
        for (let i = 0; i < users.length; i++) {
            if (email === users[i].email && password === users[i].password) {
                logInUser();
            }
            else {
                document.getElementById("validateLogin").innerText = "email or pass not correct";
            }
        }
    },

    gameStart() {
        // document.getElementById("counter-btn").addEventListener("click", popGameOperator);
        const counterTag = document.getElementById("counter");
        let counter = 0;
    },

    popGameOperator() {
        counter++;
        counterTag.innerText = counter;
        img = document.getElementById("cat-img");
        img.src = "./media/pop-open.jpeg";
        setTimeout(setPictureBack, 100);
        function setPictureBack() {
            img.src = "./media/pop-closed.jpeg";
        }
    }
}

window.onload = popGameApp.start;
