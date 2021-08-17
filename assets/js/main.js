// Lo que voy a necesitar para hacer que cuando realice scroll abajo se muestren mas cards
let pag = 2;
let result = [];
let frag;
let containerCards;

// Esta es la función para hacer la peticion para cada pagina
const createXhttps = (url) =>{
    let xhttps = new XMLHttpRequest();
    xhttps.addEventListener('load',(data)=>{
            let dataJson = JSON.parse(data.target.response);
            result = dataJson.results;
            frag = document.createDocumentFragment();
            containerCards  = document.querySelector('.section__cards');
    })
    xhttps.open('GET',url);
    xhttps.send()
}

// Y esta seria la función para que las cards se vayan mostrando
const scroll = () =>{
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let windowsHeight = scrollHeight - clientHeight;
    let porcentaje = scrollTop / windowsHeight * 100;
    if(porcentaje <= 100 && pag <= 36){
        pag++
        createXhttps(`https://rickandmortyapi.com/api/character/?page=${pag}`)
        createCards(result, frag, containerCards)
    }
}

window.addEventListener('scroll',scroll);