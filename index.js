const flags = ['nsfw', 'religious', 'political', 'racist', 'sexist'];
const url = 'https://sv443.net/jokeapi/v2/joke/Any';
const tagContainer = document.querySelector('.tag-container');
const textEl = document.querySelector('.text');
const btn = document.querySelector('.btn');

let selectedFlag = [];

function getFlags () {
    return selectedFlag.map(el => el).reduce((a,b) => a += `,${b}`);
}

flags.forEach(el => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = el;
    tagContainer.appendChild(tagEl);
})

const getData = async () => {
    if(selectedFlag.length > 0) {
        const res = await fetch(`${url}/?blacklistFlags=${getFlags()}`);
        const data = await res.json();
        console.log(`${url}/?blacklistFlags=${getFlags()}`);
        renderJoke(data);
    }else{
        const res = await fetch(`${url}`);
        const data = await res.json();
        renderJoke(data);
    }
    
}

const renderJoke = (data) => {
    console.log(data);
    let a = Object.keys(data.flags);
    let b = Object.values(data.flags);
    let c = a.map(el => ({name: el, status: data.flags[el]}));
    c = c.filter(el => el.status == true);
    console.log(c);
    if(data.type === "twopart") {
        textEl.innerHTML = `
                             <small><strong>Set up:</strong> ${data.setup}</small>
                             <small><strong>Delivery:</strong> ${data.delivery}</small>
                             <div class="joke-flag">
                             ${c.length > 0 ? `${c.map(el => `<span>${el.name}</span>`)}` : 'Neutral'}
                             </div>
                           `
    }else{
        textEl.innerHTML = `<small>${data.joke}</small>
                             <div class="joke-flag">
                               ${c.length > 0 ? `${c.map(el => `<span>${el.name}</span>`)}` : 'Neutral'}
                             </div>

        `
    }
}

window.addEventListener('click', (e) => {
    if(e.target.classList.contains('tag')) {
        if(!e.target.classList.contains('active')) {
            selectedFlag.push(e.target.innerText);
            getData();
        }else{
            const index = selectedFlag.indexOf(e.target.innerText);
            selectedFlag.splice(index, 1);
            getData();
        }
        console.log(selectedFlag);
        e.target.classList.toggle('active');
    }

    if(e.target.classList.contains('active')) {
        
    }
})

btn.addEventListener('click', (e) => {
    getData();
})

getData();