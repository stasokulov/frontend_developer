const username = 'stasokulov';
let linkToMyGit = `https://api.github.com/users/${username}`;
let numRepos = '';
let reposPerPage = 10;
let pageForLoad = 1;

getRepos(pageForLoad);
goPagination();

function getRepos(pageForLoad) {

    let preloader = document.querySelector('.preloader__wrap_git');
    preloader.classList.remove('hidden');

    let linkToMyRepos = `${linkToMyGit}/repos?per_page=${reposPerPage}&page=${pageForLoad}`;
    fetch(linkToMyRepos) 
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            alert('Запрос на github.com не удался. Ошибка: ' + response.status);
        }
    })
    .then(arr => {
        arr.forEach( (element) => {
            gitItemCreator(element);
        });
    })
    .then( () => {
        preloader.classList.add('hidden');
    });
};

fetch(linkToMyGit)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            alert('Запрос на github.com не удался. Ошибка: ' + response.status);
        }
    })
    .then(json => {
        numRepos = json.public_repos;
        return numRepos;           
    })
    .then(numRepos => {
        let numPages = Math.ceil(numRepos/reposPerPage);
        for(let i = 1; i <= numPages; i++) {
            createPagination(i);
        };
    });

function gitItemCreator(element) {
    const container = document.querySelector('.git__list');

    const item = createElement('li');
    item.classList.add('git__main__item');

    const link = createElement('a');
    link.classList.add('git__item-innerWrap');
    link.classList.add('link');
    link.href = element.html_url;
    link.target = 'blank';

    const title = createElement('p');
    title.classList.add('git__item-title');
    title.innerHTML = element.name;

    const string = createElement('p');
    string.classList.add('git__item-text');

    const marker = createElement('span');
    marker.classList.add('marker');
    switch(element.language) {
        case 'HTML':
            marker.classList.add('marker_HTML');
            break;
        case 'CSS':
            marker.classList.add('marker_CSS');
            break;
        case 'JS':
            marker.classList.add('marker_JS');
            break;
    };

    const progLang = createElement('span');
    progLang.classList.add('text-element');
    progLang.classList.add('text-element_progLang');
    progLang.innerHTML = element.language;

    const starWrap = createElement('span');
    starWrap.classList.add('text-element');

    const star = createElement('span');
    star.classList.add('text-element_star');

    const forkWrap = createElement('span');
    forkWrap.classList.add('text-element');

    const fork = createElement('span');
    fork.classList.add('text-element_fork');

    const dateUpdate = createElement('span');
    dateUpdate.classList.add('text-element');
    dateUpdate.classList.add('text-element_update');
    dateUpdate.innerHTML = 'Обновлено ' + new Date(element.updated_at).toLocaleDateString('ru') + 'г.';

    starWrap.appendChild(star);
    forkWrap.appendChild(fork);

    string.appendChild(marker);
    string.appendChild(progLang);
    string.appendChild(starWrap);
    string.appendChild(forkWrap);
    string.appendChild(dateUpdate);

    link.appendChild(title);
    link.appendChild(string);

    item.appendChild(link);

    if(element.stargazers_count) {
        starWrap.appendChild( document.createTextNode(element.stargazers_count) );
    } else {
        starWrap.remove();
    };

    if(element.forks_count) {
        fork.appendChild( document.createTextNode(element.forks_count) );
    } else {
        fork.remove();
    };

    container.appendChild(item);
};

function createPagination(pageCount) {
    let paginator = document.querySelector('.paginator');
    let paginationItem = document.querySelector('.paginator__item').cloneNode(true);
    paginationItem.classList.remove('hidden');
    if(pageCount === 1) {
        paginationItem.classList.add('paginator__item_active');
    };
    paginationItem.appendChild( document.createTextNode(pageCount) );
    paginator.appendChild( paginationItem );
};

function goPagination() {
    let paginator = document.querySelector('.paginator');
    paginator.addEventListener('click', (e) => {
        if(e.target.className === 'paginator__item') {

            let allRepos = document.querySelectorAll('.git__main__item');
            allRepos = Array.from(allRepos);
            allRepos.forEach(element => {
                element.remove();
            });

            let page = e.target.innerText;
            getRepos(page);

            let paginationItems = document.querySelectorAll('.paginator__item');
            paginationItems = Array.from(paginationItems);
            paginationItems.forEach(element => {
                element.classList.remove('paginator__item_active');                    
            });

            e.target.classList.add('paginator__item_active');
        };
    });
};

function createElement(tag) {
    const element = document.createElement(tag);
    return element;
};