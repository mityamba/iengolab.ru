k = 0;

function over(elem, x) {

    let id = '#' + elem;
    let person = document.querySelector(id + '> div.person__img');
    let person_name = document.querySelector(id + '> div.person__name');
    let person_img = document.querySelector(id + '> div.person__img > svg > path');
    if (x == 1) {
        person.style.transform = 'scale(1.04) translate(0px, -16px)';
        person_name.style.color = '#D64646';
        person_img.style.fill = '#D64646';
    } else {
        person.style.transform = 'scale(1)';
        person_name.style.color = '#111111';
        person_img.style.fill = '#111111';
    }

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


var divPerson = document.querySelector('.person');

let divPersonBlock = document.createElement('div');
divPersonBlock.className = 'person__card';
divPersonBlock.id = 'stepan';

let divPersonBlockImg = document.createElement('div');
divPersonBlockImg.className = 'person__img';
let link = 'img/person/luba.svg';
let xhr = new XMLHttpRequest();
xhr.open('GET', link, false);
xhr.send();
let list = xhr.responseText;
console.log(list);
divPersonBlockImg.innerHTML = list;

let divPersonBlockName = document.createElement('div');
divPersonBlockName.className = 'person__name';
divPersonBlockName.innerHTML = 'Степан';

divPersonBlock.append(divPersonBlockImg);
divPersonBlock.append(divPersonBlockName);

divPerson.append(divPersonBlock);
