var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 100 + "px";
        }
    });
}

var menuItens = document.querySelectorAll(".menu-item");
var sectionItens = document.querySelectorAll(".section-item");

menuItens.forEach((e, i) => {
    e.addEventListener('click', () => {
        sectionItens[i].scrollIntoView();
        document.getElementById("nav-bar-btn").classList.toggle("active");
        document.getElementById("nav-bar").style.maxHeight = null;
    });
});