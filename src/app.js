import axios from 'axios';

console.log('Hallo daar!');
const ulElement = document.getElementById('countries');

async function getAll() {
    try {
        const response = await axios.get('https://restcountries.com/v2/all');
        // console.log(response.data);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

function doListOfCountries(){
    getAll()
        .then((result) => {
            sortLandsByPopulation(result);
            result.map((land) => {
                const listElement = document.createElement('li');
                const spanElement = document.createElement('span');
                spanElement.setAttribute('class', 'flag-land-name');

                const flagElement = document.createElement('img');
                flagElement.src = land.flags.png;
                flagElement.alt = `Flag of ${land.name}`;
                flagElement.setAttribute('class', 'flag');
                spanElement.appendChild(flagElement);

                const landNameElement =document.createElement('h3');
                landNameElement.textContent = land.name;
                landNameElement.setAttribute('class', regioColor(land.region));
                spanElement.appendChild(landNameElement);
                listElement.appendChild(spanElement);

                const population = document.createElement('p');
                population.textContent = `Has a population of ${land.population} people`;
                listElement.setAttribute('class', `list`)
                listElement.appendChild(population);
                ulElement.appendChild(listElement);
            });
        })
        .catch(() => {
            console.error('Not found');
        });
}

function sortLandsByPopulation(listOfLands) {
    listOfLands.sort((a, b) => {
        if (a.population > b.population) {
            return 1;
        }
        if (a.population< b.population) {
            return -1
        }
        return 0;
    });
    return listOfLands;
}

function regioColor (regioName){
    switch (regioName) {
        case 'Europe':
            return 'yellow';
        case 'Americas':
            return 'green';
        case 'Africa':
            return 'blue'
        case 'Asia':
            return 'red';
        case 'Oceania':
            return 'paars';
        default:
            return 'black' ;
    }
}

doListOfCountries();

try {
    const about = document.getElementById('about-btn');
    about.addEventListener('click',
        () => {
            URL = 'search.html';
            window.open(URL);
        });
} catch (e) {
    console.error('Not this page');
}

const  countryInfo = document.getElementById('info');

async function getCountry(countryName) {
    try {
        const response = await axios.get(`https://restcountries.com/v2/name/${countryName}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

const countryName = document.getElementById('country');

function printInfo(){

    const textInfo = document.createElement('p');
    const textInfo2 = document.createElement('p');
    const textInfo3 = document.createElement('p');
    const cName = document.createElement('h3');
    const flag = document.createElement('img');
    const flagPlusNameSpan = document.createElement('span');
    flagPlusNameSpan.setAttribute('class', 'span-class');

    removeChildren(countryInfo);
    countryName.focus();

    getCountry(countryName.value)
        .then((result) => {
            const  [{name, population, region, flags}] = result;
            //  removeChildren(countryInfo);
            cName.innerText = name;
            flagPlusNameSpan.appendChild(cName);
            flag.src = flags.png;
            flag.alt = `Flag of ${name}`;
            flag.setAttribute('class', 'flag');
            flagPlusNameSpan.appendChild(flag);

            countryInfo.appendChild(flagPlusNameSpan);

            textInfo.innerText = `${name} is situated in ${region}. It has a population of ${population} people`;
            countryInfo.appendChild(textInfo);
            textInfo2.innerText = valuta(result[0]);
            countryInfo.appendChild(textInfo2);
            textInfo3.innerText = listOfLanguages(result[0]);
            countryInfo.appendChild(textInfo3);
            countryInfo.setAttribute('class', 'info');
            //  countryName.value = null;
            //  countryName.focus();

            // console.log(name, population);
            // console.log( `${name} is situated in ${region}. It has a population of ${population} people`);
            // console.log(valuta(result[0]));
            // console.log(listOfLanguages(result[0]));
        })
        .catch(() => {
            console.error('Not found');
            //  removeChildren(countryInfo);
            const errorItem = document.createElement('h1');
            errorItem.innerText = 'Not found';
            countryInfo.appendChild(errorItem);
            //  countryName.value = null;
            //  countryName.focus();
        });
    countryName.value = null;
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function valuta(land) {
    const {capital, currencies} = land;
    let list = `The capital is ${capital} and you can pay with ${currencies[0].name}'s`;
    if(currencies.length > 1 ) {
        for (let i = 1; i < currencies.length; i++){
            list += ` and ${currencies[i].name}'s`;
        }
    }
    return list;
}

function listOfLanguages(land){
    const {languages} = land;
    let listOfLanguages = `They speak ${languages[0].name}`;
    if (languages.length > 1) {
        for (let i = 1; i < languages.length; i++) {
            if (i === languages.length - 1) {
                listOfLanguages += ` and ${languages[i].name}`;
            } else {
                listOfLanguages += `, ${languages[i].name}`;
            }
        }
    }
    return listOfLanguages;
}

try {
    countryName.focus();
    const search = document.getElementById('search-btn');
    search.addEventListener('click', printInfo);

    countryName.addEventListener('keydown', function(event) {
    if ( event.key === 'Enter') {
        printInfo();
    }
    });

} catch (e) {
    console.error('Not this page');
}