var projects = [
    {
        "id":"smart-home-thesis",
        "title": "Smart Home Thesis",
        "summary": "Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home.Thesis about smart home."
    },
    {
        "id":"parking",
        "title": "ParKing",
        "summary": "Parking android app."
    },
    {
        "id":"sandbox",
        "title": "Unity Scripting Demo",
        "summary": "Small unity script demo."
    },
    {
        "id":"EDU",
        "title": "Educational App",
        "summary": "edu app text"
    },
    {
        "id":"cslab",
        "title": "cslab",
        "summary": "cslab text"
    },
    {
        "id":"cslab",
        "title": "cslab",
        "summary": "cslab text"
    },
    {
        "id":"cslab",
        "title": "cslab",
        "summary": "cslab text"
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
        html_to_add += '<div class="col"><div class="card"><img src="media/images/backgrounds/default.png" class="card-img-top" alt="..."><div class="card-body"><div class="content"><h5 class="card-title">' + project.title + '</h5><p class="card-text">' + project.summary + '</p></div><a href="#" class="btn btn-primary">Read more</a></div></div></div>';
    }
    html_to_add += '</div></div>';
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