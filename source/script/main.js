(function copyTelNumber() {
    const body = document.querySelector('body');
    body.addEventListener('click', (event) => {
        if ( event.target.classList.contains('telNum') ) {
            const telNumber = event.target.innerText;
            const input = document.createElement('input');
            input.value = telNumber; 
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        };
    });
})();