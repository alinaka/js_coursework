var counter=0; // счетчик, храним номер вопроса
var result = 0; //счетчик, храним количество правильных ответов
var questionsArray = [];
var answersArray=[];

function QuestionTest (question, arr, answerIndex, imgURL) {
    this.imgURL = imgURL;
    this.question = question;
    this.variants = arr;
    this.answerIndex = answerIndex;
    this.type = 'test';
    answersArray.push(this.answerIndex);
    questionsArray.push(this);
}

function QuestionNoOpt (question, answer, imgURL) {
    this.imgURL = imgURL;
    this.question = question;
    this.answer = answer;
    this.type = 'no-option';
    answersArray.push(this.answer);
    questionsArray.push(this);
}

var question1 = new QuestionTest('Угадайте актера.', 
                                 ['Джейк Джилленхол', 'Пол Беттани', 'Саймон Пегг', 'Райан Гослинг'], 
                                 2,
                                 'images/1.gif');
    
var question2 = new QuestionTest('Угадайте фильм по кадру.', 
                                 ['Кловерфилд, 10', 'Тихое место', 'Оно', 'Дорога'], 
                                 1,
                                 'images/2.jpg');
    
var question3 = new QuestionTest('Угадайте, русского сериала с каким названием не существует в природе.', 
                                 ['Саша + Даша + Глаша', 'Краткий курс счастливой жизни', 'Первый раз прощается', 'Любовь без оружия'], 
                                 3,
                                 'images/3.jpg');
    
var question4 = new QuestionTest('На самом деле есть актер, который номинировался на Оскар больше раз, чем ДиКаприо, но так его и не получил. Это Питер О`Тул. Угадайте сколько раз он был номинирован на Оскар?', 
                                 ['Восемь', 'Семь', 'Шесть', 'Десять'], 
                                 0, 
                                 'images/4.jpg');
var question5 = new QuestionNoOpt('Угадайте фильм по альтернативному постеру к нему.', 
                                  'малыш на драйве', 
                                  'images/5.jpg');
    
var question6 = new QuestionTest('Угадайте мультфильм по кадру.', 
                                 ['Остров собак', 'Труп невесты', 'Семейка монстров', 'Кубо. Легенда о самурае'], 
                                 2,
                                 'images/6.jpg');
        
var question7 = new QuestionTest('Из какого сериала кадр?', 
                                 ['Убийство', 'Очень странные дела', 'ОА', 'Тьма'], 
                                 3,
                                 'images/7.jpg');
    
var question8 = new QuestionNoOpt('Угадайте фильм по составным частям на постере.', 
                                  'назад в будущее', 
                                  'images/8.jpg');
    
var question9 = new QuestionTest('Фото со съемок какого фильма?', 
                                 ['Восстание планеты обезьян: Революция', 'Хоббит: Пустошь Смауга', 'Варкрафт', 'Игра престолов'], 
                                 1,
                                 'images/9.jpg');

function startGame (num) {
    startPage.style.display='none';
    aside.style.display='block';   
    interactive.style.display='none';      
    $('.option').prop('disabled', false);
    document.querySelector('.inputForm').style.display='none';
    
    if ( questionsArray[num] && questionsArray[num].__proto__ === QuestionTest.prototype) { //4 варианта ответа
        boxAnswers.style.display='flex';
        boxQuestion.style.display='block';
        $('.option').css('background-color', 'white');
        
        document.querySelector('.questionImage').setAttribute('src', questionsArray[num].imgURL);
        document.querySelector('.question').innerHTML = questionsArray[num].question;	

        option1.innerHTML =  questionsArray[num].variants[0];
        option2.innerHTML = questionsArray[num].variants[1];
        option3.innerHTML = questionsArray[num].variants[2];
        option4.innerHTML = questionsArray[num].variants[3];

        counter++;
    } else if ( questionsArray[num] && questionsArray[num].__proto__ === QuestionNoOpt.prototype) {  // ввод строки 
        boxAnswers.style.display='none';
        document.querySelector('.inputForm').style.display='block';
        
        document.querySelector('.questionImage').setAttribute('src', questionsArray[num].imgURL);
        document.querySelector('.question').innerHTML = questionsArray[num].question;	
        
        counter++;
    } else if ( num===9 ) { //draggable
        boxAnswers.style.display='none';
        boxQuestion.style.display='none';
        document.querySelector('.inputForm').style.display='none';
        aside.style.display='none'; 
        interactive.style.display='block';   
        firstRow.style.display='flex';
        secondRow.style.display='flex';

        var resultPulp = 0;
        
        $("#modal").dialog({buttons: {"Все понятно": function() {$("#modal").dialog('close');} } }, {minWidth: 600});
        $('#showPulp').button();
        
        $(".blank").droppable({
            drop: function(event, ui) { 
                if ( event.target.innerHTML === ui.draggable.context.id.slice(4) ) {
                    ui.draggable.context.style.border ="2px solid green";
                    ui.draggable.draggable("disable");

                    resultPulp++;

                    if (resultPulp ===7) {
                        result++;
                    endMessage();
                    };
                }
            }
        });
        
        $(".dragPics").draggable({ snap:true }, { snapMode:'both' });
        $("#showPulp").on('click', function() {$("#modal").dialog('open');} );
    }      
}

$('.option').on('click', function(e, option) {
    e.target.style.backgroundColor = 'yellow';
    $('.option').prop('disabled', true);
    $(e.target).fadeTo('slow', 0);
    $(e.target).fadeTo('slow', 1);

    setTimeout (function() {
        $(e.target).fadeTo('slow', 0);
        $(e.target).fadeTo('slow', 1);
    }, 1000);

    setTimeout( function () {
        if (answersArray[counter - 1] === parseInt(e.target.name)) {
           e.target.style.backgroundColor = 'green';
           result++;
        } else {
            e.target.style.backgroundColor = 'red';
            var answerOptions = document.querySelectorAll('.option');
            for (var i = 0; i < 4; i++) {
                if (answerOptions[i].name == answersArray[counter - 1])
                    answerOptions[i].style.backgroundColor='green';
            }                    
        }
    }, 2000);		

    setTimeout(startGame, 4000, counter);
}); 

function checkNoOpt () {
    if (!answer.value){
        alert('Введите ответ или нажмите Пропустить');
    } else if ( (answer.value).toLowerCase() === answersArray[counter - 1] ) {
        result++;
        answer.value = '';
        checkAnswer(1);
        setTimeout(startGame, 3000, counter);
    } else {
        answer.value = '';
        checkAnswer(0);
        setTimeout(startGame, 3000, counter);
    }	
}

function skip() {
    startGame(counter);
}

function exit() {
    counter = 0;
    result = 0;
    aside.style.display='none';   
    interactive.style.display='none';  
    boxAnswers.style.display='none';
    boxQuestion.style.display='none';
    document.querySelector('.inputForm').style.display='none';
    startPage.style.display='block';
}

function checkAnswer(r) {
    if(r) {
        resultsModal.innerHTML = '<img src="images/emma-stone-thumbs-up.gif" style="width: 418px; height: auto">'
    } else {
        resultsModal.innerHTML = '<img src="images/tarantino.gif" style="width: 418px; height: auto">'
    }
    $('#resultsModal').dialog( {title: "Результат"}, {minWidth: 600});
}

function endMessage() {
    var end = _.template('<div>Поздравляем, у Вас <%-result%> верных ответов из 10 возможных!</div>');
    var str = '<img src="images/emma-stone-thumbs-up.gif" style="width: 418px; height: auto">';
    if (result===10) {str = '<img src="images/BigLebowskiDance.gif" width="384" height="auto">'};
    resultsModal.innerHTML = end() + str;
    $('#resultsModal').dialog({title: "Спасибо за игру!"}, {buttons: {"Попробовать еще": exit() } }, {minWidth: 600});
}

function getInfo() {
    var info = _.template('<div id="infoModal">Все просто - нужно отвечать на вопросы. Всего вопросов 10. Игра подготовлена в качестве курсовой работы по модулю Javascript. Написана буквально за неделю. Возможно, что-то не работает, но вообще - должно. Хоть что-то</div>');
    resultsModal.innerHTML = info();
    $('#resultsModal').dialog({title: "Что это такое"}, {buttons: {"Очень хорошо": function() {$("#resultsModal").dialog('close');} } }, {minWidth: 600});
}

function showResult() {
    var tmpl = _.template(document.getElementById('results-template').innerHTML);
    var tres = tmpl();
    resultsModal.innerHTML = tres;
    $('#resultsModal').dialog({title: "Ваш текущий результат"}, {buttons: {"Очень хорошо": function() {$("#resultsModal").dialog('close');} } }, {minWidth: 600});
}

function changeFocus (event) {
    var focused = document.activeElement;
    if(event.keyCode === 39 && focused.nextElementSibling) {
        focused.nextElementSibling.focus();			
    } else if (event.keyCode===40 && focused.nextElementSibling && focused.nextElementSibling.nextElementSibling) {
        focused.nextElementSibling.nextElementSibling.focus();
    } else if (event.keyCode===38 && focused.previousElementSibling && focused.previousElementSibling.previousElementSibling) {
        focused.previousElementSibling.previousElementSibling.focus();
    } else if (event.keyCode===37 && focused.previousElementSibling) {
        focused.previousElementSibling.focus();
    } 
}

document.addEventListener('keydown', changeFocus);

$('#aside__exit').on('click', exit);
$('#aside__showResult').on('click', showResult); 
$('.checkButton').on('click', checkNoOpt);
$('.skipButton').on('click', skip);