
/************************************************

    файл с скриптами и функциями
    на языке программирования JavaScript (JS).

    в наличии:
    массив student, постоянная k.

    описание функций:
    - over(elem, x);
    - createPerson(id, format, name).

    добавление события для карточек.

************************************************/

// через const объявляеем переменную, которую больше нельзя изменять.
// список всех личностей кружка в виде многомерного массива:
// первое значение - id объекта,
// второе значение - формат изображения на главном экране,
// третье значение - имя человека
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

// коэффициент для считывания события клика на карточки участников
// если он равен 0 - значит клика еще не было
// больше 0 - был клик
k = 0;

// функция для изменения css-стиля карточек, где:
// elem - id объекта,
// x - коэффициент изменения объекта: 1 - на активный, 0 - не активный
function over(elem, x) {

    // поиск формата изображения через массив student
    let format = '';
    // перебор массива student для поиска формата изображения для карточки
    for (var i = 0; i < student.length; i++) {
        // условие ->
        // если elem равно первому значению элемента из массива student,
        // то переменная format будет равна второму значению текущего элемента из массива
        if (student[i][0] == elem) {
            format = student[i][1];
        }
    }
    let id = '#' + elem;
    // ищем контейнер с изображением
    // знак > сообщает о том, что ищем объект внутри контейнера с селектором, указанным первее
    // в данном случае структура следующая:
    // div#id>(div.person__img+div.person__name) ,
    // что одинаково с написанием кода как:
    // <div id="id">
    //     <div class="person__img"></div>
    //     <div class="person__name"></div>
    // </div>
    let person = document.querySelector(id + ' > div.person__img');
    // ищем контейнер с именем человека
    let person_name = document.querySelector(id + ' > div.person__name');

    if (format == 'svg') {
        // находим объекты по подчинении и тегам
        let person_img = document.querySelector(id + ' > div.person__img > svg > path');
        // режим активации объекта
        if (x == 1) {
            // изменяем css-параметры объектов
            // применяем трансформацию для объекта, которая изменит только визуальный вид,
            // не затрагивая реальные границы объекта
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
            // для изменения цвета растровых изображений применяются css-фильтры
            person_img.style.filter = 'saturate(2.75) brightness(2.75) hue-rotate(125deg) contrast(1)';
        } else {
            person.style.transform = 'scale(1)';
            person_name.style.color = '#111111';
            person_img.style.filter = 'none';
        }
    }
}

// функция для автоматического создания объектов внутри index.html по данным в массиве student
// переменные функции дублируются с значениями в массиве
function createPerson(id, format, name) {
    // находим основной койтейнер для загрузки новых объектов
    var divPerson = document.querySelector('.person');
    // создаются новые блоки с указанием классв и идентификатора
    let divPersonBlock = document.createElement('div');
    // задаем класс новому контейнеру
    divPersonBlock.className = 'person__card';
    divPersonBlock.id = id;

    let divPersonBlockImg = document.createElement('div');
    divPersonBlockImg.className = 'person__img';

    // в зависимости от формата
    if (format == 'svg') {
        let link = 'img/person/' + id + '.svg';
        // благодаря ajax имеем возможность считать код с svg-файла и вставить его в html, что позволит создавать интерактив с svg-изображенями
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

    // включаем блок в состав родительского блока (последним элементом) с помощью append
    divPersonBlock.append(divPersonBlockImg);
    divPersonBlock.append(divPersonBlockName);
    // включаем карточки в состав основного блока
    divPerson.append(divPersonBlock);
}

// создаем все карточки с помощью перебора элементов массива и
// вызова функции createPerson(...)
for (var i = 0; i < student.length; i++) {
    createPerson(student[i][0], student[i][1], student[i][2]);
}

// создаем события для карточек, с помощью addEventListener
var persons = document.querySelectorAll('.person__card');
// перебор объектов для создания событий для каждого из них
for (var i = 0; i < persons.length; i++) {
    // находим id объектов
    let id = persons[i].id;
    // если объекты имеют идентификаторы start и finish,
    // то события не добавляем
    if ((id != 'start') || (id != 'finish')) {
        // событие для наведения курсора на объект - mouseover
        document.getElementById(id).addEventListener("mouseover",
            function() {
                // вызываем функцию для активации объектов
                over(id, 1);
                if (k == 0) {
                    setTimeout(function() {
                        // скроллим по горизотали до объекта, на которую указываем
                        // пытаемся задать плавную прокрутку - smooth
                        document.getElementById(id).scrollIntoView({
                            inline: "center",
                            behavior: "smooth"
                        });
                    }, 200);
                }
            }, false);
        document.getElementById(id).addEventListener("mouseout",
            function() {
                // вызываем функцию для очищения активации объекта
                over(id, 0) }, false);
        // если кликнем на объект,
        // то активация объекта при наведении на него курсора мыши не бцдет срабатывать
        document.getElementById(id).addEventListener("click",
            function() {
                // коэффициент, который сообщает о том, что сработал клик
                k = 1;
                for (var n = 0; n < persons.length; n++) {
                    if (persons[n].id != id) {
                        persons[n].style.opacity = 0.1;
                    } else {
                        persons[n].style.opacity = 1;
                        // задержка по времени
                        // задается в миллисекундах
                        setTimeout(function() {
                            // скроллим по горизотали до объекта, на которую кликнули
                            // пытаемся задать плавную прокрутку - smooth
                            document.getElementById(id).scrollIntoView({
                                inline: "center",
                                behavior: "smooth"
                            });
                        }, 200);
                    }

                }
            }, false);
    }
}

// при загрузке страницы первый объект оказывается по центру
// в данном случае - объект с идентификатором michael
document.getElementById('michael').scrollIntoView({
    inline: "center",
    behavior: "smooth"
});

// находим объект с классом circle
circle = document.querySelector('.circle');

// объект с селектором .circle начинает отслеживание за курсором
document.body.addEventListener("mouseover",
    function(event) {
        // event.pageX - координаты курсора от края окна по горизонтали
        // event.pageY - координаты курсора от края окна по вертикали
        let circleLeft = event.pageX - (circle.clientWidth / 2);
        let circleTop = event.pageY - (circle.clientHeight / 2);
        circle.style.top = circleTop + 'px';
        circle.style.left = circleLeft + 'px';
    }, false);
