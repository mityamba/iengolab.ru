k = 0;

function over(elem, x) {

    let format = '';
    for (var i = 0; i < student.length; i++) {
        if (student[i][0] == elem) {
            format = student[i][1];
        }
    }
    let id = '#' + elem;
    let person = document.querySelector(id + ' > div.person__img');
    let person_name = document.querySelector(id + ' > div.person__name');

    if (format == 'svg') {
        let person_img = document.querySelector(id + ' > div.person__img > svg > path');
        if (x == 1) {
            person.style.transform = 'scale(1.04) translate(0px, -16px)';
            person_name.style.color = '#D64646';
            person_img.style.fill = '#D64646';
        } else {
            person.style.transform = 'scale(1)';
            person_name.style.color = '#111111';
            person_img.style.fill = '#111111';
        }
    } else {
        let person_img = document.querySelector(id + ' > div.person__img > img');
        if (x == 1) {
            person.style.transform = 'scale(1.04) translate(0px, -16px)';
            person_name.style.color = '#D64646';
            person_img.style.filter = 'saturate(2.75) brightness(2.75) hue-rotate(125deg) contrast(1)';
        } else {
            person.style.transform = 'scale(1)';
            person_name.style.color = '#111111';
            person_img.style.filter = 'none';
        }
    }
}

const student = [
                    ['michael', 'svg', 'Михаил'],
                    ['danil', 'png', 'Данил'],
                    ['luba', 'png', 'Люба'],
                    ['sergey', 'svg', 'Сергей'],
                    ['stepan', 'png', 'Степан'],
                    ['tuskul', 'svg', 'Тускул'],
                    ['venera', 'svg', 'Венера'],
                    ['sakhaya', 'svg', 'Сахаайа'],
                    ['valeria', 'svg', 'Валерия']
                ];

function createPerson(id, format, name) {
    var divPerson = document.querySelector('.person');

    let divPersonBlock = document.createElement('div');
    divPersonBlock.className = 'person__card';
    divPersonBlock.id = id;

    let divPersonBlockImg = document.createElement('div');
    divPersonBlockImg.className = 'person__img';

    if (format == 'svg') {
        let link = 'img/person/' + id + '.svg';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', link, false);
        xhr.send();
        let list = xhr.responseText;
        divPersonBlockImg.innerHTML = list;
    } else {
        let link = 'img/person/' + id + '.' + format;
        let list = '<img src="' + link + '" />';
        divPersonBlockImg.innerHTML = list;
    }

    let divPersonBlockName = document.createElement('div');
    divPersonBlockName.className = 'person__name';
    divPersonBlockName.innerHTML = name;

    divPersonBlock.append(divPersonBlockImg);
    divPersonBlock.append(divPersonBlockName);

    divPerson.append(divPersonBlock);
}

for (var i = 0; i < student.length; i++) {
    createPerson(student[i][0], student[i][1], student[i][2]);
}


var persons = document.querySelectorAll('.person__card');
console.log(persons.length);

for (var i = 0; i < persons.length; i++) {

    let id = persons[i].id;
    if ((id != 'start') || (id != 'finish')) {
        document.getElementById(id).addEventListener("mouseover",
            function() {
                over(id, 1);
                if (k == 0) {
                    setTimeout(function() {
                        document.getElementById(id).scrollIntoView({
                            inline: "center", behavior: "smooth"
                        });
                    }, 200);
                }
            }, false);
        document.getElementById(id).addEventListener("mouseout",
            function() {
                over(id, 0) }, false);
        document.getElementById(id).addEventListener("click",
            function() {
                k = 1;
                for (var n = 0; n < persons.length; n++) {
                    if (persons[n].id != id) {
                        persons[n].style.opacity = 0.1;
                    } else {
                        persons[n].style.opacity = 1;
                        setTimeout(function() {
                            document.getElementById(id).scrollIntoView({
                                inline: "center", behavior: "smooth"
                            });
                        }, 200);
                    }

                }
            }, false);
    }
}

document.getElementById('michael').scrollIntoView({
    inline: "center", behavior: "smooth"
});

circle = document.querySelector('.circle');

document.body.addEventListener("mouseover",
    function(event) {
        // console.log(event);
        // console.log(event.pageX);
        // console.log(event.pageY);
        let circleLeft = event.pageX - (circle.clientWidth / 2);
        let circleTop = event.pageY - (circle.clientHeight / 2);
        circle.style.top = circleTop + 'px';
        circle.style.left = circleLeft + 'px';
    }, false);
