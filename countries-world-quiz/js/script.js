//initialize quiz data start
const countries = [
    {
        code:"AF",
        aliases:[
            "Afghanistan"
        ]
    },
    {
        code:"AL",
        aliases:[
            "Albania"
        ]
    },
    {
        code:"DZ",
        aliases:[
            "Algeria"
        ]
    },
    {
        code:"AD",
        aliases:[
            "Andorra"
        ]
    },
    {
        code:"AO",
        aliases:[
            "Angola"
        ]
    },
    {
        code:"AG",
        aliases:[
            "Antigua and Barbuda",
            "Antigua"
        ]
    },
    {
        code:"AR",
        aliases:[
            "Argentina"
        ]
    },
    {
        code:"AM",
        aliases:[
            "Armenia"
        ]
    },
    {
        code:"AU",
        aliases:[
            "Australia"
        ]
    },
    {
        code:"AT",
        aliases:[
            "Austria"
        ]
    },
    {
        code:"AZ",
        aliases:[
            "Azerbaijan"
        ]
    },
    {
        code:"BS",
        aliases:[
            "Bahamas"
        ]
    },
    {
        code:"BH",
        aliases:[
            "Bahrain"
        ]
    },
    {
        code:"BD",
        aliases:[
            "Bangladesh"
        ]
    },
    {
        code:"BB",
        aliases:[
            "Barbados"
        ]
    },
    {
        code:"BY",
        aliases:[
            "Belarus"
        ]
    },
    {
        code:"BE",
        aliases:[
            "Belgium"
        ]
    },
    {
        code:"BZ",
        aliases:[
            "Belize"
        ]
    },
    {
        code:"BJ",
        aliases:[
            "Benin"
        ]
    },
    {
        code:"BT",
        aliases:[
            "Bhutan"
        ]
    },
    {
        code:"BO",
        aliases:[
            "Bolivia"
        ]
    },
    {
        code:"BA",
        aliases:[
            "Bosnia and Herzegovina", "Bosnia"
        ]
    },
    {
        code:"BW",
        aliases:[
            "Botswana"
        ]
    },
    {
        code:"BR",
        aliases:[
            "Brazil"
        ]
    },
    {
        code:"BN",
        aliases:[
            "Brunei"
        ]
    },
    {
        code:"BG",
        aliases:[
            "Bulgaria"
        ]
    },
    {
        code:"BF",
        aliases:[
            "Burkina Faso"
        ]
    },
    {
        code:"BI",
        aliases:[
            "Burundi"
        ]
    },
    {
        code:"KH",
        aliases:[
            "Cambodia"
        ]
    },
    {
        code:"CM",
        aliases:[
            "Cameroon"
        ]
    },
    {
        code:"CA",
        aliases:[
            "Canada"
        ]
    },
    {
        code:"CV",
        aliases:[
            "Cape Verde"
        ]
    },
    {
        code:"CF",
        aliases:[
            "Central African Republic",
            "CAR",
            "C.A.R."
        ]
    },
    {
        code:"TD",
        aliases:[
            "Chad"
        ]
    },
    {
        code:"CL",
        aliases:[
            "Chile"
        ]
    },
    {
        code:"CN",
        aliases:[
            "China"
        ]
    },
    {
        code:"CO",
        aliases:[
            "Colombia"
        ]
    },
    {
        code:"KM",
        aliases:[
            "Comoros"
        ]
    },
    {
        code:"CR",
        aliases:[
            "Costa Rica"
        ]
    },
    {
        code:"HR",
        aliases:[
            "Croatia",
            "Hrvatska"
        ]
    },
    {
        code:"CU",
        aliases:[
            "Cuba"
        ]
    },
    {
        code:"CY",
        aliases:[
            "Cyprus"
        ]
    },
    {
        code:"CZ",
        aliases:[
            "Czech Republic",
            "Czechia"
        ]
    },
    {
        code:"CD",
        aliases:[
            "Democratic Republic of the Congo", 
            "DR Congo", 
            "Congo", 
            "D.R. Congo"
        ]
    },
    {
        code:"DK",
        aliases:[
            "Denmark"
        ]
    },
    {
        code:"DJ",
        aliases:[
            "Djibouti"
        ]
    },
    {
        code:"DM",
        aliases:[
            "Dominica"
        ]
    },
    {
        code:"DO",
        aliases:[
            "Dominican Republic"
        ]
    },
    {
        code:"TL",
        aliases:[
            "East Timor", 
            "Timor-Leste", 
            "Timor Leste"
        ]
    },
    {
        code:"EC",
        aliases:[
            "Ecuador"
        ]
    },
    {
        code:"EG",
        aliases:[
            "Egypt"
        ]
    },
    {
        code:"SV",
        aliases:[
            "El Salvador"
        ]
    },
    {
        code:"GQ",
        aliases:[
            "Equatorial Guinea"
        ]
    },
    {
        code:"ER",
        aliases:[
            "Eritrea"
        ]
    },
    {
        code:"EE",
        aliases:[
            "Estonia"
        ]
    },
    {
        code:"ET",
        aliases:[
            "Ethiopia"
        ]
    },
    {
        code:"FJ",
        aliases:[
            "Fiji"
        ]
    },
    {
        code:"FI",
        aliases:[
            "Finland"
        ]
    },
    {
        code:"FR",
        aliases:[
            "France"
        ]
    },
    {
        code:"GA",
        aliases:[
            "Gabon"
        ]
    },
    {
        code:"GM",
        aliases:[
            "Gambia",
            "The Gambia"
        ]
    },
    {
        code:"GE",
        aliases:[
            "Georgia"
        ]
    },
    {
        code:"DE",
        aliases:[
            "Germany"
        ]
    },
    {
        code:"GH",
        aliases:[
            "Ghana"
        ]
    },
    {
        code:"GR",
        aliases:[
            "Greece"
        ]
    },
    {
        code:"GD",
        aliases:[
            "Grenada"
        ]
    },
    {
        code:"GT",
        aliases:[
            "Guatemala"
        ]
    },
    {
        code:"GN",
        aliases:[
            "Guinea"
        ]
    },
    {
        code:"GW",
        aliases:[
            "Guinea-Bissau",
            "Guinea-Bassau",
            "Guinea Bissau",
            "Guinea Bassau"
        ]
    },
    {
        code:"GY",
        aliases:[
            "Guyana"
        ]
    },
    {
        code:"HT",
        aliases:[
            "Haiti"
        ]
    },
    {
        code:"HN",
        aliases:[
            "Honduras"
        ]
    },
    {
        code:"HU",
        aliases:[
            "Hungary"
        ]
    },
    {
        code:"IS",
        aliases:[
            "Iceland"
        ]
    },
    {
        code:"IN",
        aliases:[
            "India"
        ]
    },
    {
        code:"ID",
        aliases:[
            "Indonesia"
        ]
    },
    {
        code:"IR",
        aliases:[
            "Iran"
        ]
    },
    {
        code:"IQ",
        aliases:[
            "Iraq"
        ]
    },
    {
        code:"IE",
        aliases:[
            "Ireland"
        ]
    },
    {
        code:"IL",
        aliases:[
            "Israel"
        ]
    },
    {
        code:"CI",
        aliases:[
            "Ivory Coast",
            "Côte d'Ivoire",
            "Cote d'Ivoire"
        ]
    },
    {
        code:"IT",
        aliases:[
            "Italy"
        ]
    },
    {
        code:"JM",
        aliases:[
            "Jamaica"
        ]
    },
    {
        code:"JP",
        aliases:[
            "Japan"
        ]
    },
    {
        code:"JO",
        aliases:[
            "Jordan"
        ]
    },
    {
        code:"KZ",
        aliases:[
            "Kazakhstan"
        ]
    },
    {
        code:"KE",
        aliases:[
            "Kenya"
        ]
    },
    {
        code:"KI",
        aliases:[
            "Kiribati"
        ]
    },
    {
        code:"XK",
        aliases:[
            "Kosovo"
        ]
    },
    {
        code:"KW",
        aliases:[
            "Kuwait"
        ]
    },
    {
        code:"KG",
        aliases:[
            "Kyrgyzstan"
        ]
    },
    {
        code:"LA",
        aliases:[
            "Laos"
        ]
    },
    {
        code:"LV",
        aliases:[
            "Latvia"
        ]
    },
    {
        code:"LB",
        aliases:[
            "Lebanon"
        ]
    },
    {
        code:"LS",
        aliases:[
            "Lesotho"
        ]
    },
    {
        code:"LR",
        aliases:[
            "Liberia"
        ]
    },
    {
        code:"LY",
        aliases:[
            "Libya"
        ]
    },
    {
        code:"LI",
        aliases:[
            "Liechtenstein"
        ]
    },
    {
        code:"LT",
        aliases:[
            "Lithuania"
        ]
    },
    {
        code:"LU",
        aliases:[
            "Luxembourg"
        ]
    },
    {
        code:"MK",
        aliases:[
            "North Macedonia",
            "Macedonia",
            "FYROM",
            "F.Y.R.O.M.",
            "Former Yugoslav Republic of Macedonia"
        ]
    },
    {
        code:"MG",
        aliases:[
            "Madagascar"
        ]
    },
    {
        code:"MW",
        aliases:[
            "Malawi"
        ]
    },
    {
        code:"MY",
        aliases:[
            "Malaysia"
        ]
    },
    {
        code:"MV",
        aliases:[
            "Maldives"
        ]
    },
    {
        code:"ML",
        aliases:[
            "Mali"
        ]
    },
    {
        code:"MT",
        aliases:[
            "Malta"
        ]
    },
    {
        code:"MH",
        aliases:[
            "Marshall Islands"
        ]
    },
    {
        code:"MR",
        aliases:[
            "Mauritania"
        ]
    },
    {
        code:"MU",
        aliases:[
            "Mauritius"
        ]
    },
    {
        code:"MX",
        aliases:[
            "Mexico"
        ]
    },
    {
        code:"FM",
        aliases:[
            "Micronesia"
        ]
    },
    {
        code:"MD",
        aliases:[
            "Moldova"
        ]
    },
    {
        code:"MC",
        aliases:[
            "Monaco"
        ]
    },
    {
        code:"MN",
        aliases:[
            "Mongolia"
        ]
    },
    {
        code:"ME",
        aliases:[
            "Montenegro"
        ]
    },
    {
        code:"MA",
        aliases:[
            "Morocco"
        ]
    },
    {
        code:"MZ",
        aliases:[
            "Mozambique"
        ]
    },
    {
        code:"MM",
        aliases:[
            "Myanmar",
            "Burma"
        ]
    },
    {
        code:"NA",
        aliases:[
            "Namibia"
        ]
    },
    {
        code:"NR",
        aliases:[
            "Nauru"
        ]
    },
    {
        code:"NP",
        aliases:[
            "Nepal"
        ]
    },
    {
        code:"NL",
        aliases:[
            "Netherlands"
        ]
    },

    {
        code:"NZ",
        aliases:[
            "New Zealand"
        ]
    },
    {
        code:"NI",
        aliases:[
            "Nicaragua"
        ]
    },
    {
        code:"NE",
        aliases:[
            "Niger"
        ]
    },
    {
        code:"NG",
        aliases:[
            "Nigeria"
        ]
    },
    {
        code:"KP",
        aliases:[
            "North Korea"
        ]
    },
    {
        code:"NO",
        aliases:[
            "Norway"
        ]
    },
    {
        code:"OM",
        aliases:[
            "Oman"
        ]
    },
    {
        code:"PK",
        aliases:[
            "Pakistan"
        ]
    },
    {
        code:"PW",
        aliases:[
            "Palau"
        ]
    },
    {
        code:"PA",
        aliases:[
            "Panama"
        ]
    },
    {
        code:"PG",
        aliases:[
            "Papua New Guinea"
        ]
    },
    {
        code:"PY",
        aliases:[
            "Paraguay"
        ]
    },
    {
        code:"PE",
        aliases:[
            "Peru"
        ]
    },
    {
        code:"PH",
        aliases:[
            "Philippines"
        ]
    },
    {
        code:"PL",
        aliases:[
            "Poland"
        ]
    },
    {
        code:"PT",
        aliases:[
            "Portugal"
        ]
    },
    {
        code:"QA",
        aliases:[
            "Qatar"
        ]
    },  
    {
        code:"CG",
        aliases:[
            "Republic of the Congo", 
            "Congo"
        ]
    },
    {
        code:"RO",
        aliases:[
            "Romania"
        ]
    },
    {
        code:"RU",
        aliases:[
            "Russia"
        ]
    },
    {
        code:"RW",
        aliases:[
            "Rwanda"
        ]
    },
    {
        code:"KN",
        aliases:[
            "Saint Kitts and Nevis",
            "Saint Kitts",
            "St Kitts and Nevis",
            "St Kitts",
            "St. Kitts and Nevis",
            "St. Kitts"
        ]
    },
    {
        code:"LC",
        aliases:[
            "Saint Lucia",
            "St Lucia",
            "St. Lucia"
        ]
    },
    {
        code:"VC",
        aliases:[
            "Saint Vincent and the Grenadines",
            "Saint Vincent",
            "St Vincent and the Grenadines",
            "St Vincent",
            "St. Vincent and the Grenadines",
            "St. Vincent"
        ]
    },
    {
        code:"WS",
        aliases:[
            "Samoa"
        ]
    },
    {
        code:"SM",
        aliases:[
            "San Marino"
        ]
    },
    {
        code:"ST",
        aliases:[
            "Sao Tome and Principe",
            "São Tomé and Príncipe",
            "Sao Tome",
            "São Tomé"
        ]
    },
    {
        code:"SA",
        aliases:[
            "Saudi Arabia"
        ]
    },
    {
        code:"SN",
        aliases:[
            "Senegal"
        ]
    },
    {
        code:"RS",
        aliases:[
            "Serbia"
        ]
    },
    {
        code:"SC",
        aliases:[
            "Seychelles"
        ]
    },
    {
        code:"SL",
        aliases:[
            "Sierra Leone"
        ]
    },
    {
        code:"SG",
        aliases:[
            "Singapore"
        ]
    },
    {
        code:"SK",
        aliases:[
            "Slovakia"
        ]
    },
    {
        code:"SI",
        aliases:[
            "Slovenia"
        ]
    },
    {
        code:"SB",
        aliases:[
            "Solomon Islands"
        ]
    },
    {
        code:"SO",
        aliases:[
            "Somalia"
        ]
    },
    {
        code:"ZA",
        aliases:[
            "South Africa"
        ]
    },
    {
        code:"KR",
        aliases:[
            "South Korea"
        ]
    },
    {
        code:"SS",
        aliases:[
            "South Sudan"
        ]
    },
    {
        code:"ES",
        aliases:[
            "Spain"
        ]
    },
    {
        code:"LK",
        aliases:[
            "Sri Lanka"
        ]
    },
    {
        code:"SD",
        aliases:[
            "Sudan"
        ]
    },
    {
        code:"SR",
        aliases:[
            "Suriname"
        ]
    },
    {
        code:"SZ",
        aliases:[
            "Swaziland",
            "eSwatini"
        ]
    },
    {
        code:"SE",
        aliases:[
            "Sweden"
        ]
    },
    {
        code:"CH",
        aliases:[
            "Switzerland"
        ]
    },
    {
        code:"SY",
        aliases:[
            "Syria"
        ]
    },
    {
        code:"TW",
        aliases:[
            "Taiwan"
        ]
    },
    {
        code:"TJ",
        aliases:[
            "Tajikistan"
        ]
    },
    {
        code:"TZ",
        aliases:[
            "Tanzania"
        ]
    },
    {
        code:"TH",
        aliases:[
            "Thailand"
        ]
    },
    {
        code:"TG",
        aliases:[
            "Togo"
        ]
    },
    {
        code:"TO",
        aliases:[
            "Tonga"
        ]
    },
    {
        code:"TT",
        aliases:[
            "Trinidad and Tobago",
            "Trinidad"
        ]
    },
    {
        code:"TN",
        aliases:[
            "Tunisia"
        ]
    },
    {
        code:"TR",
        aliases:[
            "Turkey",
            "Türkiye",
            "Turkiye"
        ]
    },
    {
        code:"TM",
        aliases:[
            "Turkmenistan"
        ]
    },
    {
        code:"TV",
        aliases:[
            "Tuvalu"
        ]
    },
    {
        code:"UG",
        aliases:[
            "Uganda"
        ]
    },
    {
        code:"UA",
        aliases:[
            "Ukraine"
        ]
    },
    {
        code:"AE",
        aliases:[
            "United Arab Emirates",
            "UAE",
            "U.A.E."
        ]
    },
    {
        code:"UK",
        aliases:[
            "United Kingdom",
            "UK",
            "U.K."
        ]
    },
    {
        code:"US",
        aliases:[
            "United States",
            "United States of America",
            "US",
            "U.S.",
            "USA",
            "U.S.A."
        ]
    },  
    {
        code:"UY",
        aliases:[
            "Uruguay"
        ]
    },
    {
        code:"UZ",
        aliases:[
            "Uzbekistan"
        ]
    },
    {
        code:"VU",
        aliases:[
            "Vanuatu"
        ]
    },
    {
        code:"VA",
        aliases:[
            "Vatican City",
            "Vatican",
            "The Vatican"
        ],
    },
    {
        code:"VE",
        aliases:[
            "Venezuela"
        ]
    },
    {
        code:"VN",
        aliases:[
            "Vietnam"
        ]
    },
    {
        code:"YE",
        aliases:[
            "Yemen"
        ]
    },
    {
        code:"ZM",
        aliases:[
            "Zambia"
        ]
    },
    {
        code:"ZW",
        aliases:[
            "Zimbabwe"
        ]
    },
]

let foundArray = [];

let numberOfFound = 0;

const INIT_TIME = 1500000;

let currentTime = 0;

let timer = undefined;

const timerSpan = document.querySelector("#timer-span");
timerSpan.innerHTML = formatTime(INIT_TIME);

const targetScore = document.querySelector("#target-score");
const currentScore = document.querySelector("#current-score");
targetScore.innerHTML = countries.length;
currentScore.innerHTML = '0';
//initialize quiz data end

let inputMessage = document.querySelector("#input-message");

let answersTable = document.querySelector('#answer-table');

let isRight = false;
let isBottom = false;
const cols = 7;
for(let i = 0; i < countries.length; i++){
    if((i + 1) % cols == 0 || i + 1  == countries.length){
        isRight = true;
    }
    if(countries.length - i <= cols){
        isBottom = true;
    }

    if(isRight && isBottom){
        answersTable.innerHTML += `<div id="${countries[i].code}" class="right bottom"></div>`;
    }
    else if(isRight){
        answersTable.innerHTML += `<div id="${countries[i].code}" class="right"></div>`;
    }
    else if(isBottom){
        answersTable.innerHTML += `<div id="${countries[i].code}" class="bottom"></div>`;
    }
    else{
        answersTable.innerHTML += `<div id="${countries[i].code}"></div>`;
    }

    isRight = false;
    isBottom = false;
}

//set event listeners start
document.querySelector('#answer-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if(checkAnswer(e.target.country.value)){
        e.target.country.value = "";
    }

    if(numberOfFound == foundArray.length){
        endGame();
    }
});

const countryInput = document.querySelector('#country');
countryInput.addEventListener('input', e => {
    inputMessage.innerHTML = "";
});

const playBtn = document.querySelector('#play-btn');
const stopBtn = document.querySelector('#stop-btn');
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', endGame);
//set event listeners end

function checkAnswer(answer){
    answer = answer.toLowerCase();
    let lastFoundIndex = 0;
    let found = false;

    for(let i = 0; i < countries.length; i++){ //for each country
        for(let j = 0; j < countries[i].aliases.length; j++){ //for each alias of the country
            if(answer === countries[i].aliases[j].toLowerCase()){ //if answer matches
                if(foundArray[i]){ //if already found end search
                    setInputMessage("Country already found!", "red");
                    return false;
                }
                foundArray[i] = true; //if not found mark as found and paint map and continue to find other with same alias
                lastFoundIndex = i;
                found = true;
                numberOfFound++;
                currentScore.innerHTML = numberOfFound;
                markCountryOnMap(countries[i].code, "green");
                showCountryOnTable(i, 'green');
                break;
            }
        }
    }

    if(found){
        return foundArray[lastFoundIndex];
    }
    setInputMessage("Invalid country!", "red");
}

function markCountryOnMap(countryCode, color){
    let paths = document.querySelectorAll(`path[name="${countryCode}"]`);
    for(let i = 0; i < paths.length; i++){
        paths[i].style.fill = color;
    }
}

function showCountryOnTable(index, color){
    let cell = document.querySelector(`div#${countries[index].code}`);
    cell.innerHTML = `<span style="color:${color};">${countries[index].aliases[0]}</span>`;
}

function setInputMessage(text, color){
    inputMessage.innerHTML = `<span style="color:${color}">${text}</span>`;
}

function startGame(){
    playBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    foundArray = Array(countries.length).fill(false);
    numberOfFound = 0;
    currentScore.innerHTML = 0;
    const paths = document.querySelectorAll("#map path");
    for(let i = 0; i < paths.length; i++){
        paths[i].style.fill = "#ececec";
    }
    document.querySelector('path[name="PS"]').style.fill = "#666";
    document.querySelector('path[name="EH"]').style.fill = "#666";
    let cells = document.querySelectorAll("#answer-table div");
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
    }
    countryInput.disabled = false;
    currentTime = INIT_TIME;
    timerSpan.innerHTML = formatTime(INIT_TIME);
    timer = setInterval(timerFunction, 1000);
}

function endGame(){
    clearInterval(timer);
    stopBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
    countryInput.disabled = true;
    countryInput.value = "";
    for(let i = 0; i < countries.length; i++){
        let code = countries[i].code;
        if(document.querySelector(`div#${code}`).innerHTML === ''){
            markCountryOnMap(code, 'red');
            showCountryOnTable(i, 'red');
        }
    }
    inputMessage.innerHTML="";
}

function formatTime(time){
    let seconds = 0;
    let minutes = 0;

    minutes = Math.floor(time / 60000);
    time = time - minutes * 60000;
    seconds = Math.floor(time / 1000);

    return `${minutes > 10 ? "" + minutes : "0" + minutes}:${seconds > 10 ? "" + seconds : "0" + seconds}`;
}

function timerFunction(){
    currentTime -= 1000;
    timerSpan.innerHTML = formatTime(currentTime);
    if(currentTime == 0){
        endGame();
    }
}