    var counter=0; // счетчик, храним номер вопроса
    var result = 0; //счетчик, храним количество правильных ответов
    var questionsArray = [];
    var answersArray=[];

    function exit() {
	    counter = 0;
	    $("button" ).button( "destroy" );
        startPage.style.display='none';
        aside.style.display='none';   
        interactive.style.display='none';  
        startPage.style.display='block';
    }

    function showResult() {
        var tmpl = _.template(document.getElementById('results-template').innerHTML);
        var tres = tmpl({result: result});
        document.body.appendChild(tres);
        $('#currentResults').dialog({buttons: {"Очень хорошо": function() {$("#currentResults").dialog('close');} } }, {minWidth: 600});
    }

    function QuestionTest (question, arr, answerIndex, imgURL) {
        this.imgURL = imgURL;
        this.question = question;
        this.variants = arr;
        this.answerIndex = answerIndex;
        answersArray.push(this.answerIndex);
        questionsArray.push(this);
    }

    function QuestionNoOpt (question, answer, imgURL) {
        this.imgURL = imgURL;
        this.question = question;
        this.answer = answer;
        answersArray.push(this.answer);
        questionsArray.push(this);
    }

    question1 = new QuestionTest('Угадайте актера.', 
                                 ['Джейк Джилленхол', 'Пол Беттани', 'Саймон Пегг', 'Райан Гослинг'], 
                                 2,
                                 'images/1.gif');

    question2 = new QuestionTest('Угадайте фильм по кадру.', 
                                 ['Кловерфилд, 10', 'Тихое место', 'Оно', 'Дорога'], 
                                 1,
                                 'images/2.jpg');

    question3 = new QuestionTest('Угадайте, русского сериала с каким названием не существует в природе.', 
                                 ['Саша + Даша + Глаша', 'Краткий курс счастливой жизни', 'Первый раз прощается', 'Любовь без оружия'], 
                                 3,
                                 'images/3.jpg');

    question4 = new QuestionTest('На самом деле есть актер, который номинировался на Оскар больше раз, чем ДиКаприо, но так его и не получил. Это Питер О`Тул. Угадайте, сколько раз он был номинирован на Оскар?', 
                                 ['Восемь', 'Семь', 'Шесть', 'Десять'], 
                                 0, 
                                 'images/4.jpg');

    question5 = new QuestionNoOpt('Угадайте фильм по альтернативному постеру.', 
                                  'малыш на драйве', 
                                  'images/5.jpg');

    question6 = new QuestionNoOpt('Угадайте фильм по составным частям на постере.', 
                                  'назад в будущее', 
                                  'images/6.jpg');

    function startGame (num) {
        startPage.style.display='none';
        aside.style.display='block';   
	    interactive.style.display='none';      
		$('.option').prop('disabled', false);
        
        if (num<=3) { // 0, 1, 2, 3 тестовые вопросы (4 варианта ответа)
            boxAnswers.style.display='flex';
            boxQuestion.style.display='block';
            $('button').css('background-color', 'white');
            document.querySelector('.questionImage').setAttribute('src', questionsArray[num].imgURL);
            document.querySelector('.question').innerHTML = questionsArray[num].question;	

            option1.innerHTML =  questionsArray[num].variants[0];
            option2.innerHTML = questionsArray[num].variants[1];
            option3.innerHTML = questionsArray[num].variants[2];
            option4.innerHTML = questionsArray[num].variants[3];
			
            counter++;
        } else if (num<=5) {  // 4, 5 вопросы без варианта - ввод строки 
                boxAnswers.style.display='none';
                document.querySelector('.inputForm').style.display='block';
                document.querySelector('.questionImage').setAttribute('src', questionsArray[num].imgURL);
                document.querySelector('.question').innerHTML = questionsArray[num].question;	
                counter++;
        } else if (num===6) {  // 6 draggable 
                boxAnswers.style.display='none';
                boxQuestion.style.display='none';
                document.querySelector('.inputForm').style.display='none';
                interactive.style.display='block';   
                firstRow.style.display='flex';
                secondRow.style.display='flex';

                $("#modal").dialog({buttons: {"Все понятно": function() {$("#modal").dialog('close');} } }, {minWidth: 600});
                $(".blank").droppable({
                    drop: function(event, ui) { 
                        if ( event.target.innerHTML === ui.draggable.context.id.slice(4) ) {
                            ui.draggable.context.style.border ="2px solid green";
                            ui.draggable( "option", "disabled", true );
                            resultPulp++;
                            if (resultPulp ===7) alert('Поздравляем, Ваш результат ' + (result + 1) );
                        }
                    }
                });
                $(".dragPics").draggable({ snap:true }, { snapMode:'both' });
                $("button").button();
                $("#showPulp").on('click', function() {$("#modal").dialog('open');} );
                var resultPulp = 0;
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
                console.log(answerOptions);
                for (var i = 0; i < 4; i++) {
                    if (answerOptions[i].name == answersArray[counter - 1])
                        answerOptions[i].style.backgroundColor='green';
                }                    
              }
         }, 2000);		

        setTimeout(startGame, 4000, counter);
    }); 

    function checkNoOpt () {
        if ( (answer.value).toLowerCase() === answersArray[counter - 1] ) {
            result++;
            answer.value = '';
            alert('Верно!');
        } else {
		    alert('Не совсем!');
	    }
	setTimeout(startGame, 2000, counter);	
    }

    function skip() {
	   startGame(++counter);
    	
    }

	document.addEventListener('keydown', changeFocus);
	
	function changeFocus (event) {
		console.log(event.keyCode);
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
	
	answer.addEventListener('keydown', function(event) {
		if (event.keyCode===13) checkNoOpt();		
	})