function over(elem, x) {

    let id = '#' + elem;
    let person = document.querySelector(id + '> div.person__img');
    let person_name = document.querySelector(id + '> div.person__name');
    let person_img = document.querySelector(id + '> div.person__img > svg > path');
    if (x == 1) {
        person.style.transform = 'scale(1.04) translate(0px, -24px)';
        person_name.style.color = '#D64646';
        person_img.style.fill = '#D64646';
    } else {
        person.style.transform = 'scale(1)';
        person_name.style.color = '#111111';
        person_img.style.fill = '#111111';
    }

}

let persons = document.querySelectorAll('.person__card');
console.log(persons.length);
for (var i = 0; i < persons.length; i++) {

    let id = persons[i].id;
    if ((id != 'start') || (id != 'finish')) {
        document.getElementById(id).addEventListener("mouseover",
        function() {
            over(id, 1);
            setTimeout(function() {
                document.getElementById(id).scrollIntoView({inline: "center", behavior: "smooth"});
            }, 200);

        }, false);
        document.getElementById(id).addEventListener("mouseout",
        function() {
            over(id, 0) }, false);
    }
}

document.getElementById('michael').scrollIntoView({inline: "center", behavior: "smooth"});
