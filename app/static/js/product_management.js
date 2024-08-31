const el = document.querySelectorAll(".action_header_container");

el.forEach((element) => {
    element.addEventListener("click", () => {
        el.forEach(elem => {
            elem.classList.remove('select_action');
        });

        element.classList.add("select_action");
    });
});
