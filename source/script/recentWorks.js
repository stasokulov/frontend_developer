let viewAll = document.querySelectorAll('.recentWorks__title-side');
let hiddenWorks = document.querySelector('.recentWorks__example').querySelectorAll('.hidden');

viewAll = Array.from(viewAll);
viewAll.forEach(button => {
    button.addEventListener('click', () => {
        hiddenWorks.forEach(element => {
            element.classList.toggle('hidden');
        });
        viewAll.forEach(button => {
            button.classList.toggle('hidden');
        });
    });
});