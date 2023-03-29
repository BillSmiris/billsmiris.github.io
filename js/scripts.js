var projects = [
    {
        "id":"smart-home-thesis",
        "title": "Smart Home University Thesis",
        "summary": "This is my university thesis. The topic is smart home systems. The system of the project consist of a smart home hub web app and a protype RGB light smart device.",
        "get": "<b>Github:</b> <a href=\"https://github.com/BillSmiris/University-Thesis-Smart-Home\">https://github.com/BillSmiris/University-Thesis-Smart-Home</a>",
        "technologies": "Blazor Webassembly, C#, Python, Raspberry Pi, HTML5, CSS3, JS, PostgreSQL",
        "points": [
            "Smart home application developed for my university thesis.",
            "Application consists of a Blazor Webassembly web application, that serves as the smart home hub, and a prototype smart RGB light device.",
            "Application is designed to be deployed on a local network and be used through the web browser of any device to control a smart device ecomsystem.",
            "Prototype smart device consits of a Raspberry Pi computer running a Python script containing the behavior of the device and a basic RGB lamp circuit connected to it.",
            "The smart device script is designed to serve as a blueprint to create scripts for other types of device.",
            "Smart home hub is designed to allow for the control of a variable number of devices.",
            "Smart home hub displays controls for the device based on the properties of the deviceand its supported property types.",
            "Communication between the devices and the smart home hub is facilitated through the use of the WebSockets protocol.",
            "Features, like user accounts and switching between a light and a dark theme, are included."
        ]
    },
    {
        "id":"parking",
        "title": "ParKing",
        "summary": "Parking android application. Through the application, users can quickly view parking facilities that are near them and information about them, allowing them to compare the facilities quckly and fine the one that best suits them.",
        "get": "<b>Github:</b> <a href=\"https://github.com/BillSmiris/ParKing\">https://github.com/BillSmiris/ParKing</a>",
        "technologies": "Android Studio, Java, Google Firebase",
        "points": [
            "Parking Android application made for a university project.",
            "Users can see parking facilities around them on a map or in list format.",
            "Users can quickly check and compare price, sercives and availability of parking facilities.",
            "Application utilizes google services and smartphone sensors like Google Maps, Google Firebase and GPS."
        ]
    },
    {
        "id":"sandbox",
        "title": "Unity Scripting Demo",
        "summary": "Small demo made to get familiar with Unity scripting. In the demo, players can control a first-person character and interact with various objects in the environment.",
        "get": "Demo available <a href=\"https://drive.google.com/file/d/1_4Cv_sLoWSC2ogZUZnQPO2hfmqGqB20G/view?usp=share_link\">here</a>",
        "technologies": "Unity, C#",
        "points": [
            "Small project made to get familiar with scripting in the Unity game engine.",
            "Demo consists of a small environment with a first-person player controller and various interactions.",
            "First-person controller has various standard functionalities, like moving and looking around, sprinting, changing stance(standing, crouching, prone) and interacting with various objects in the environment.",
            "Interactions are facilitated through a generalized interaction framework that consists of showing an interaction prompt to the player and the ability to trigger the interaction.",
            "Generalized interaction framework can be expanded upon, to facilitate the needs of each interaction.",
            "Interactions implemented include teleporters, doors and elevators.",
            "Interaction scripts can take a number of parameters that affect the behavior of the interaction."
        ]
    },
    {
        "id":"edu1821",
        "title": "Educational App",
        "summary": "Educational application made for university project.Through the application, users can learn about the faces of the Greek War of Independence and evaluate their knowledge throgh tests. Desktop and web version available.",
        "get": "<b>Github:</b> <a href=\"https://github.com/BillSmiris/Educational-Application\">https://github.com/BillSmiris/Educational-Application</a>",
        "technologies": "WPF, ASP.NET, C#, HTML5, CSS3, JS, PostgreSQL",
        "points": [
            "Educational application made for a university project.",
            "Through the application, users can learn about the faces of the Greek War of Independence.",
            "Application contains multiple-choice excercises, through which users can evaluate their knowledge.",
            "Application has a desktop and a web version.",
            "Application is designed so its content can be easily expanded upon and be adapted to other topics."
        ]
    },
    {
        "id":"cslab",
        "title": "CSLab Website",
        "summary": "Informational website made for the computer labs of the Department of Informatics of the University of Piraeus. Through the website, students can get informed about the operation of the labs and get access to university digital services.",
        "get": "<b>URL:</b> <a href=\"https://cslab.unipi.gr\">https://cslab.unipi.gr</a>",
        "technologies": "HTML5, CSS3, JS, Bootstrap4, Python, Django",
        "points": [
            "Website made by the Computer Labs Administrator Team of the Department of Informatics of the University of Piraeus.",
            "Website used as an information point for the students of the Department of Informatics, through which they can be informed about the digital services that the university provides, the sevices of the department’s computer labs, the courses of the department and get updates on the operation of the computer labs.",
            "Designed the front-end of the main and wiki pages of the website using Photoshop.",
            "Developed the front-end using HTML, CSS, JS and Bootstrap4.",
            "Performed various update and maintainance tasks after deployment."
        ]
    }
];

var langs = [
    {
        'code':'enUS',
        'dropDownHTML':'English(US)'
    },
    {
        'code':'enUK',
        'dropDownHTML':'English(UK)'
    },
    {
        'code':'el',
        'dropDownHTML':'Ελληνικά'
    }
]

//build projects carousel start
const projectsContainer = document.querySelector('.project-card-container .carousel-inner');
const carouselItemNo = Math.ceil(projects.length / 3);

for (let i = 0; i < carouselItemNo; i++) {
    let htmlToAdd = '';
    if (i > 0) {
        htmlToAdd += '<div class="carousel-item h100p">';
    }
    else {
        htmlToAdd += '<div class="carousel-item h100p active">';
    }
    htmlToAdd += '<div class="row row-cols-1 row-cols-md-3 h100p">';
    for (let j = 0 + 3 * i; j < 3 * (i + 1); j++) {
        if(typeof projects[j] == 'undefined'){
            break;
        }
        let project = projects[j];
        htmlToAdd += `<div class="col"><div class="card"><img src="media/images/projects/${project.id}.jpg" class="card-img-top" alt="..."><div class="card-body"><div class="content"><h5 class="card-title">${project.title}</h5><p class="card-text">${project.summary}</p></div><button href="#" class="btn btn-dark translatable" data-translationTag="readMore" onClick="openProjectModal(${j})">Read more</button></div></div></div>`;
    }
    htmlToAdd += '</div></div>';
    projectsContainer.innerHTML += htmlToAdd;
}
//build projects carousel end

//about section tabs start
const aboutTabBtns = document.querySelectorAll(".about-tabs .nav-link");
const scrollableDiv = document.querySelector('.about-scrollable-div .scrollable-div-content');

var activeTab = document.getElementById(aboutTabBtns[0].dataset.target);
var activeTabBtn = aboutTabBtns[0];

for(let i = 0; i < aboutTabBtns.length; i++){
    aboutTabBtns[i].addEventListener('click', toggleTab);
}

function toggleTab(e){
    activeTabBtn.classList.remove('active');
    activeTab.classList.add('d-none');

    activeTabBtn = e.target;
    activeTab = document.getElementById(activeTabBtn.dataset.target);
    
    activeTabBtn.classList.add('active');
    scrollableDiv.scrollTop = 0;
    activeTab.classList.remove('d-none');
}

//about section tabs end

//handle project modal content start
const openModalBtn = document.getElementById('openModalBtn');

const projectTitle = document.getElementById('project-title');
const projectImg = document.getElementById('project-img');
const projectGet = document.getElementById('project-get');
const projectTechnologies = document.getElementById('project-technologies');
const projectSummary = document.getElementById('project-summary');
const projectPoints = document.getElementById('project-points');

function openProjectModal(i){
    projectTitle.innerHTML = projects[i].title;
    projectImg.src = 'media/images/projects/' + projects[i].id + '.jpg';
    projectGet.innerHTML = projects[i].get;
    projectTechnologies.innerHTML = projects[i].technologies;
    projectSummary.innerHTML = projects[i].summary;
    projectPoints.innerHTML = '';
    for(let j = 0; j < projects[i].points.length; j++){
        projectPoints.innerHTML += `<li>${projects[i].points[j]}</li>`;
    }
    openModalBtn.click();
}
//handle project modal content end

//build lang list start
const langDropDownBtn = document.getElementById('langDropDownBtn');

const langList = document.getElementById('lang-list');

const translatables = document.querySelectorAll('.translatable');

for(let i = 0; i < langs.length; i++){
    let newLi = document.createElement('li');

    let newSpan = document.createElement('span');
    newSpan.classList.add('dropdown-item', 'lang-item');
    newSpan.innerHTML = langs[i].dropDownHTML;
    newSpan.dataset["lang"] = langs[i].code;
    newSpan.addEventListener('click', setLang);

    let newImg = document.createElement('img');
    newImg.src = `media/images/langs/${langs[i].code}.png`;
    newImg.classList.add('lang-flag');

    newSpan.appendChild(newImg);

    newLi.appendChild(newSpan);
    langList.appendChild(newLi);
    if(i == 0){
        newSpan.click();
    }
}

async function setLang(e){
    langDropDownBtn.innerHTML = e.target.innerHTML;
    let lang = e.target.dataset.lang;
    let translation = await getTranslationFile(lang);
    for(let i = 0; i < translatables.length; i++){
        let t = translation[translatables[i].dataset.translationtag];
        if(t){
            translatables[i].innerHTML = t;
        }
    }
}

async function getTranslationFile(code){
    let response = await fetch(`translations/${code}.json`);
    let json =  await response.json();
    return json;
}
//build lang list end
