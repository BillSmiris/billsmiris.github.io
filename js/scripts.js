var loadingScreen = document.getElementById('loading-screen');

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        loadingScreen.style.visibility = "visible";
    } else {
        loadingScreen.style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};

var projects = null;

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

//build education section start

const eduDiv = document.querySelector('.edu-container');

function buildEduList(eduList = null){
    eduDiv.innerHTML = '';
    let htmlToAdd = '';
    let devMode = false;
    if(!devMode && eduList){
        for(let i = 0; i < eduList.length; i++){
            let edu  = eduList[i];
            htmlToAdd = `
            <div class="edu-element">
                <div class="row">
                    <div class="logo-col">
                        <a href="${edu.orgLink}" target="_blank">
                            <img class="logo-img" src="media/images/logos/${edu.logo}" alt="${edu.logoAlt}">
                        </a>
                    </div>
                    <div class="info-col">
                        ${edu.html}
                    </div>
                </div>
            </div>
            `
            eduDiv.innerHTML += htmlToAdd;
        }
    }
    else{
        for(let i = 0; i < 4; i++){
            htmlToAdd = `
            <div class="edu-element">
                <div class="row">
                    <div class="logo-col">
                        <a href="https://www.unipi.gr/unipi/en/home-cs.html" target="_blank">
                            <img class="logo-img" src="media/images/logos/unipi.jpg" alt="UNIPI_LOGO">
                        </a>
                    </div>
                    <div class="info-col">
                        <h2>University of Piraeus</h2>
                        <h4>Department of Informatics</h4>
                        <h5>Bachelor's Degree in Computer Science</h5>
                        Grade: 8.20/10
                    </div>
                </div>
            </div>
            `
            eduDiv.innerHTML += htmlToAdd;
        }
    }
}

//build education section end

//build work section start
const workDiv = document.querySelector(".work-scrollable-div > .scrollable-div-content");

function buildWorkList(workList){
    let htmlToAdd = "";
    let work = null;
    for(let i = 0; i < workList.length; i++){
        work = workList[i];
        console.warn(work);
        htmlToAdd += 
        `<span class="work-organization">${work.organization} <span class="work-yr">(${work.yr}</span></span>
        <span class="work-position">${work.position}</span>
        <ul>`
        for(let j = 0; j < work.tasks.length; j++){
            htmlToAdd += `<li>- ${work.tasks[j]}</li>`
        }
        if(i < workList.length - 1){
            htmlToAdd += `</ul><hr />`;
        }
        else{
            htmlToAdd += `</ul>`;
        }
    }
    workDiv.innerHTML = htmlToAdd;
}
//build work section start

//build projects carousel start
const projectsContainer = document.querySelector('.project-card-container .carousel-inner');

function buildProjectCarousel(translation = null){
    projectsContainer.innerHTML = '';
    let readMore = translation ? translation.readMore : "Read more";
    let carouselItemNo = Math.ceil(projects.length / 3);
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
            htmlToAdd += `<div class="col"><div class="card"><img src="media/images/projects/${project.id}.jpg" class="card-img-top" alt="..."><div class="card-body"><div class="content"><h5 class="card-title">${project.title}</h5><p class="card-text">${project.summary}</p></div><button href="#" class="btn btn-dark translatable" data-translationTag="readMore" onClick="openProjectModal(${j})">${readMore}</button></div></div></div>`;
        }
        htmlToAdd += '</div></div>';
        projectsContainer.innerHTML += htmlToAdd;
    }
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
    if(translation){
        for(let i = 0; i < translatables.length; i++){
            translatables[i].innerHTML = translation[translatables[i].dataset.translationtag];
        }
        translationExtension(translation);
    }
}

async function getTranslationFile(code){
    let response = await fetch(`translations/${code}.json`);
    let json =  await response.json();
    return json;
}

function translationExtension(translation){
    projects = translation.projectsList;
    buildEduList(translation.eduList);
    buildWorkList(translation.workList);
    buildProjectCarousel(translation);
}
//build lang list end
