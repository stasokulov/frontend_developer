let burger = document.querySelector('.burger');
let burgerItem1 = document.querySelector('.burger__item-1');
let burgerItem2 = document.querySelector('.burger__item-2');
let mobileMenu = document.querySelector('.header__mobileMenu');
let language = document.querySelector('.header__mainMenu__language');
burger.addEventListener('click', () => {
    burgerItem1.classList.toggle('burger__item-1_active');
    burgerItem2.classList.toggle('burger__item-2_active');
    mobileMenu.classList.toggle('hidden');
});

let header = document.querySelector('body');
header.addEventListener('click', (e) => {
    if( e.target.classList.contains('scroll') ) {
        let targetClass = e.target.dataset.target;
        let aimBlock = document.querySelector('.' + targetClass);
        let finish = aimBlock.offsetTop;
        let start = window.pageYOffset;
        let numStep = 50;
        let lenghtStep = (finish-start)/numStep;
        let progress = start;
        let countStep = 0;
        
        scroll();

        function scroll() {
            progress += lenghtStep;
            setTimeout( () => {
                window.scrollTo(0, progress);
                countStep++;
                if(countStep < numStep) {
                    scroll();
                };
            }, 10);
        };
    };
});