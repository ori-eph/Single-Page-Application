document.getElementById("counter-btn").addEventListener("click", pop);
const counterTag = document.getElementById("counter");
let counter = 0;
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", []);
}
function pop() {
    counter++;
    counterTag.innerText = counter;
    img = document.getElementById("cat-img");
    img.src = "./media/pop-open.jpeg";
    setTimeout(setPictureBack, 100);
    function setPictureBack() {
        img.src = "./media/pop-closed.jpeg";
    }
}
