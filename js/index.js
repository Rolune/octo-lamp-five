/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1.X Calculate the score as the total of the number of correct answers

      2.X Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3.X Add 2 more questions to the app (each question must have 4 options).

      4.X Reload the page when the reset button is clicked (hint: search window.location)

      5.X Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  const submit = document.querySelector('#btnSubmit');
  const reset = document.querySelector('#btnReset');
  const timer = document.querySelector('#time');
  let timeVal = 10;
  let timeRun = false;
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    timeRun = true;
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the final frontier',
      o: ['Backyard', 'I dunno', 'SPAAAAACE', 'Under the Sea', 'can i?'],
      a: 2,
    },
    {
      q: "I'll think of something later, read my mind",
      o: ['7', '4', '9', '8'],
      a: 1,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      // if I get the time, make it so number of answer doesn't have to be 4
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };
  
  function disableBtns() {
    for (let i = 0; i < quizArray.length; i++) {
      submit.disabled = true;
      // pretty sure I could do this with query selector and wild card... later
      const elems0 = document.getElementById(`radio_${i}_0`).disabled = true;
      const elems1 = document.getElementById(`radio_${i}_1`).disabled = true;
      const elems2 = document.getElementById(`radio_${i}_2`).disabled = true;
      const elems3 = document.getElementById(`radio_${i}_3`).disabled = true;
    }
  }

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    console.log('calc score');
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          if (radioElement.checked) {
            //change background color of li element here
            liElement.style.background = 'lightblue';
            // code for task 1 goes here
            // moved it here since we already checked if it was the right answer there
            score++;
            console.log('score added', score);
          } else {
            liElement.style.background = 'red';
          }
        }
      }
    });
    // also should be disabling the radio buttons
    disableBtns()
    // could do this more cleanly, but oh well
    const disSco = document.querySelector('#score');
    disSco.textContent = `Score: ${score}/${quizArray.length}`; // using this instead of innerHTML since I'm not adding tag
  };

  // guessing event listener for submit has to be added here? since I wouldn't be able to reference calculateScore() outside this block
  submit.addEventListener('click', calculateScore);
  // event for refresh could be done outside, but since submit is already here
  // ok, just dumping reload ends in a inifinite loop, whoops
  reset.addEventListener('click', () => {window.location.reload()});

  // I'll just add the timer functions here, make it easier to see
  // function to start timer, think just count down on set interval?
  setInterval(() => {
    // pretty sure I should be doing this outside, so setInterval doesn't get called when timer doesn't run
    // also display time should be a seperate function so I can change the timer without the 01:00 flashing for breif second
    if (timeRun){
      timeVal--;
      let tMin = Math.floor(timeVal / 60);
      // I'll get back to you...
      // tMin = "00" + tMin;
      // tMin = tMin.rig
      let tSec = timeVal % 60;
      timer.textContent = `${tMin}:${tSec}`;
      // when timer runs out, including when it goes 00:00
      if (timeVal <= 0) {
        timeRun = false;
        calculateScore();
      }
    }
  }, 1000);
  // function to end timer, since submit also has to
  // trigger when timer goes


  // call the displayQuiz function
  /*
  dom element added at start,
  but not visible until start button changes display from none -> block
  */
  displayQuiz();
});
