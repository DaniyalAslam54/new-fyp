const dropdowns_ = document.querySelectorAll(".dropdown_");
dropdowns_.forEach(dropdown=>{
    const selct = dropdown.querySelector(".select_");
    const caret = dropdown.querySelector(".caret_");
    const menu = dropdown.querySelector(".menu_");
    const options = dropdown.querySelectorAll(".menu_ li");
    const selected = dropdown.querySelector(".selected_")


selct.addEventListener("click",()=>{
    selct.classList.toggle("select-clicked");
    caret.classList.toggle("caret_rotate");
    menu.classList.toggle("menu-open");
});

// options.forEach(option=>{
//     option.addEventListener("click",()=>{
//         selected.innerText = option.innerText;
//         selected.classList.remove("select-clicked");
//         caret.classList.remove("caret_rotate");
//         menu.classList.remove("menu-open");
//         options.forEach(option=>{
//             option.classList.remove("active_");

//         });
//         option.classList.add("active_")
//     })
// })


})




