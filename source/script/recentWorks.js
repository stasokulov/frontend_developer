const setClickListenerForToggleHidden = (buttonClass, cardsClass) => {
    let viewAllButtons = document.querySelectorAll(`${buttonClass}`);
    let hiddenWorks = document.querySelector(`${cardsClass}`).querySelectorAll('.hidden');
    
    viewAllButtons = Array.from(viewAllButtons);
    viewAllButtons.forEach(button => {
        button.addEventListener('click', () => {
            hiddenWorks.forEach(element => {
                element.classList.toggle('hidden');
            });
            viewAllButtons.forEach(button => {
                button.classList.toggle('hidden');
            });
        });
    });
};

setClickListenerForToggleHidden('.js-commercial-project-button', '.js-commercial-project-cards');
setClickListenerForToggleHidden('.js-test-task-button', '.js-test-task-cards');
setClickListenerForToggleHidden('.js-pet-project-button', '.js-pet-project-cards');

