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

// id	id_name	name	name_full	surname	name_sec	card_format
var requestURL = 'js/data.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    // через const объявляеем переменную, которую больше нельзя изменять.
    const student = request.response;
    console.log(student);

    // коэффициент для считывания события клика на карточки участников
    // если он равен 0 - значит клика еще не было
    // больше 0 - был клик
    k = 0;

    // находим объект с классом circle
    circle = document.querySelector('.circle');

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
            if (student[i]['id_name'] == elem) {
                format = student[i]['card_format'];
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
                person.style.transform = 'scale(1.04) translate(0px, -8px)';
                person_name.style.color = '#D64646';
                person_name.style.fontSize = '28px';
                person_img.style.fill = '#D64646';
            } else {
                person.style.transform = 'scale(1)';
                person_name.style.color = '#111111';
                person_name.style.fontSize = '24px';
                person_img.style.fill = '#111111';
            }
        } else {
            let person_img = document.querySelector(id + ' > div.person__img > img');
            if (x == 1) {
                person.style.transform = 'scale(1.04) translate(0px, -8px)';
                person_name.style.color = '#D64646';
                person_name.style.fontSize = '28px';
                // для изменения цвета растровых изображений применяются css-фильтры
                person_img.style.filter = 'saturate(2.75) brightness(2.75) hue-rotate(125deg) contrast(1)';
            } else {
                person.style.transform = 'scale(1)';
                person_name.style.color = '#111111';
                person_name.style.fontSize = '24px';
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

        // событие при наведении курсора на объект - mouseover
        document.getElementById(id).addEventListener("mouseover",
            function() {
                // вызываем функцию для активации объектов
                over(id, 1);
                if (k == 0) {
                    // setTimeout(function() {
                    //     // скроллим по горизотали до объекта, на которую указываем
                    //     // пытаемся задать плавную прокрутку - smooth
                    //     document.getElementById(id).scrollIntoView({
                    //         inline: "center",
                    //         behavior: "smooth"
                    //     });
                    // }, 600);
                }
            }, false);

        // событие при отводе курсора на объекта - mouseout
        document.getElementById(id).addEventListener("mouseout",
            function() {
                // вызываем функцию для очищения активации объекта
                over(id, 0)
            }, false);

        // если кликнем на объект,
        // то активация объекта при наведении на него курсора мыши не бцдет срабатывать
        document.getElementById(id).addEventListener("click",
            function() {
                // создаем события для карточек, с помощью addEventListener
                let persons = document.querySelectorAll('.person__card');
                // изменяем коэффициент, который сообщает о том, что сработал клик
                k = 1;
                for (var n = 0; n < persons.length; n++) {
                    let personName = document.querySelector('div#' + persons[n].id + ' > div.person__name');
                    if (persons[n].id != id) {
                        persons[n].style.opacity = 0.2;
                        personName.style.opacity = 0;
                    } else {
                        persons[n].style.opacity = 1;
                        personName.style.opacity = 1;
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

                        let personBtn = document.querySelector('.content__desc');
                        personBtn.innerHTML = '<div>узнать больше</div>';
                        let personBtnClick = document.querySelector('.content__desc > div');
                        personBtnClick.addEventListener("click",
                            function() {
                                divPerson.style.padding = '0';
                                divPerson.style.justifyContent = 'center';
                                circle.style.width = '480vw';
                                circle.style.height = '480vh';
                                circle.style.background = 'white';
                                for (let z = 0; z < persons.length; z++) {
                                    if (persons[z].id != id) {
                                        persons[z].style.display = 'none';
                                    } else {
                                        let divPersonBlockImgLight = document.createElement('img');
                                        divPersonBlockImgLight.src = 'img/animation/light.svg';
                                        divPersonBlockImgLight.className = 'person__img_light';
                                        persons[z].append(divPersonBlockImgLight);
                                        setTimeout(function() {
                                            divPersonBlockImgLight.style.transform = 'rotateX(180deg)';
                                        }, 600);
                                        setTimeout(function() {
                                            divPersonBlockImgLight.style.transform = 'rotateY(180deg)';
                                        }, 1200);
                                    }
                                }
                            });
                    }
                }
            }, false);

    }

    // создаем все карточки с помощью перебора элементов массива и
    // вызова функции createPerson(...)
    for (var i = 0; i < student.length; i++) {
        createPerson(student[i]['id_name'], student[i]['card_format'], student[i]['name']);
    }

    // при загрузке страницы первый объект оказывается по центру
    // в данном случае - объект с идентификатором michael
    document.getElementById('michael').scrollIntoView({
        inline: "center",
        behavior: "smooth"
    });

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

}
