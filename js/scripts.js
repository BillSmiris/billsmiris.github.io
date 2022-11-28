var projects = [
    {
        "id":"smart-home-thesis",
        "title": "Smart Home University Thesis",
        "summary": "This is my university thesis. The topic is smart home systems. The system of the project consist of a smart home hub web app and a protype RGB light smart device.",
        "get": "<b>Github</b>: <a href=\"https://github.com/BillSmiris/University-Thesis-Smart-Home\">https://github.com/BillSmiris/University-Thesis-Smart-Home</a>",
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
        "get": "<b>Github</b>: <a href=\"https://github.com/BillSmiris/ParKing\">https://github.com/BillSmiris/ParKing</a>",
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
        "get": "<b>Github</b>: <a href=\"https://github.com/BillSmiris/Educational-Application\">https://github.com/BillSmiris/Educational-Application</a>",
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

var projects_container = document.querySelector('.project-card-container .carousel-inner');
var carousel_item_no = Math.ceil(projects.length / 3);

for (let i = 0; i < carousel_item_no; i++) {
    let html_to_add = '';
    if (i > 0) {
        html_to_add += '<div class="carousel-item h100p">';
    }
    else {
        html_to_add += '<div class="carousel-item h100p active">';
    }
    html_to_add += '<div class="row row-cols-1 row-cols-md-3 h100p">';
    for (let j = 0 + 3 * i; j < 3 * (i + 1); j++) {
        if(typeof projects[j] == 'undefined'){
            break;
        }
        let project = projects[j];
        html_to_add += '<div class="col"><div class="card"><img src="media/images/backgrounds/default.png" class="card-img-top" alt="..."><div class="card-body"><div class="content"><h5 class="card-title">' + project.title + '</h5><p class="card-text">' + project.summary + '</p></div><button href="#" class="btn btn-dark" onClick="openProjectModal(' + j + ')">Read more</button></div></div></div>';
    }
    html_to_add += '</div></div>';
    console.log(html_to_add);
    projects_container.innerHTML += html_to_add;
}

var active_tab = false;

document.getElementById('summary-tab-btn').addEventListener('click', function() {
    if(active_tab){
        document.getElementById('skills-tab-btn').classList.remove('active');
        this.classList.add('active');
        document.getElementById('about-skills').classList.add('d-none');
        document.getElementById('about-summary').classList.remove('d-none');
        active_tab = false;
    }
});

document.getElementById('skills-tab-btn').addEventListener('click', function() {
    if(!active_tab){
        document.getElementById('summary-tab-btn').classList.remove('active');
        this.classList.add('active');
        document.getElementById('about-summary').classList.add('d-none');
        document.getElementById('about-skills').classList.remove('d-none');
        active_tab = true;
    }
});

var openModalBtn = document.getElementById('openModalBtn');

function openProjectModal(i){
    document.getElementById('project-title').innerHTML = projects[i].title;
    document.getElementById('project-get').innerHTML = projects[i].get;
    document.getElementById('project-technologies').innerHTML = projects[i].technologies;
    document.getElementById('project-summary').innerHTML = projects[i].summary;
    let points = document.getElementById('project-points');
    points.innerHTML = '';
    for(let j = 0; j < projects[i].points.length; j++){
        points.innerHTML += '<li>' + projects[i].points[j] + '</li>';
    }
    openModalBtn.click();
}
