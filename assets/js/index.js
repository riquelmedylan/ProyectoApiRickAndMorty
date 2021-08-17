// Función encargada de hacer la petición a la api, pero que nomas traiga pocas cards
let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://rickandmortyapi.com/api/character');

    xhr.addEventListener('load', (data)=>{
        const dataJson = JSON.parse(data.target.response);
        const results = dataJson.results;
        const section = document.querySelector('.section');
        const fragment = document.createDocumentFragment();
        const containerCards = document.querySelector('.section__cards');

        createCards(results, fragment, section)
        createCards(results, fragment, containerCards)
        slider()
        
    })
    xhr.send()


// Esta es la función que crea las cards
function createCards(result, frag, contain) {
    for (const {status, image, name, species, origin} of result) {
        const div = document.createElement('DIV');
        const container = document.createElement('DIV');
        if(status === 'Dead'){estado ='icon__dead'}else if(status === 'unknown'){estado = 'icon__unkown'}else{estado = 'icon__alive'}
        div.innerHTML += `
        <div class="card">
            <div class="header"></div>
            <div class="image">
                <img class="img-character" src="${image}">
            </div>
            <div class="information__character">
                <p class="text__information text__name">Name: ${name}</p>
                <div class="status">
                    <p class="text__information">Status:</p>
                    <span class="icon__status ${estado}"></span>
                    <p class="text__status text__information">${status}</p>
                </div>
                <p class="text__information text__species">Specie: ${species}</p>
                <p class="text__information text__status">World: ${origin.name}</p>
            </div>
        </div>
        `
        contain.classList.contains('section__cards') ? container.classList.add('container', 'cont-cards'): div.classList.add('container')
        frag.append(div);
        contain.append(frag);
    }
}


// Con esta función hago que se aplique el slider
function slider(){
let slider = document.querySelector('.section')
    const btnRight = document.querySelector('.btn-right');
    const btnLeft = document.querySelector('.btn-left');
    
    let sections = [...slider.children];
    let lastSection = sections[sections.length -20];
    slider.insertAdjacentElement("afterbegin", lastSection);

    const rootStyles = document.documentElement.style;
    const widthSlider = sections.length * 100 / 2;
    const sectionWidth = 100 / sections.length;

    rootStyles.setProperty('--sliderWidth', `${widthSlider}%`);
    rootStyles.setProperty('--sliderMove', `-${sectionWidth}%`);

    const time = 350;
    const nextSection = () => {
        const firstSection = document.querySelectorAll('.container')[0];
        rootStyles.setProperty('--sliderMove', `-${sectionWidth * 2}%`);
        rootStyles.setProperty('--transition', `transform ${time}ms ease-in-out`);
        setTimeout(() => {
            rootStyles.setProperty('--transition', 'none');
            slider.insertAdjacentElement('beforeend', firstSection);
            rootStyles.setProperty('--sliderMove', `-${sectionWidth}%`);
        }, time);
    }
        const prevSection = () => {
            const sections = [...slider.children];
            const lastSection = sections[sections.length - 1];
            rootStyles.setProperty('--sliderMove', '0');
            rootStyles.setProperty('--transition', `transform ${time}ms ease-in-out`);
            setTimeout(() => {
                rootStyles.setProperty('--transition', 'none');
                slider.insertAdjacentElement('afterbegin', lastSection);
                rootStyles.setProperty('--sliderMove', `-${sectionWidth}%`);
            }, time);
        }
        btnLeft.addEventListener('click', prevSection)
        btnRight.addEventListener('click',nextSection)

    setInterval(() => {
        nextSection()
    }, 5000);
}
