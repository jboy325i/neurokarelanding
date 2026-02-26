var squareLinks = {
  essential: 'https://square.link/u/tdTfNKHw',
  signature:  'https://square.link/u/Hwm4jzFP',
  elite:      'https://square.link/u/KeZ8Oqcz'
};

var questions = [
  {
    text: "Do you feel like your body is constantly in a state of 'fight or flight,' even when you are trying to relax?",
    options: ["Yes, almost always", "Sometimes", "Rarely", "No, not really"]
  },
  {
    text: "Have you noticed that your physical pain seems to 'flare up' more intensely during times of emotional stress or poor sleep?",
    options: ["Yes, consistently", "Often", "Occasionally", "I haven't noticed a connection"]
  },
  {
    text: "Does it feel like your brain is 'foggy' or that your processing speed has slowed down since your pain became chronic?",
    options: ["Yes, significantly", "Somewhat", "Mildly", "No, not at all"]
  },
  {
    text: "Do you often feel like you're spending a massive amount of your daily energy just trying to 'act normal' for the people around you?",
    options: ["Yes, it's exhausting", "Often", "Sometimes", "Rarely or never"]
  }
];

var current = 0;
var answers = [];

function showPage(id) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function showQuiz() {
  current = 0;
  answers = [];
  showPage('page-quiz');
  renderQuestion();
}

function renderQuestion() {
  document.getElementById('progress').style.width = ((current / questions.length) * 100) + '%';
  if (current >= questions.length) { showResult(); return; }
  var q = questions[current];
  var optionsHTML = '';
  for (var i = 0; i < q.options.length; i++) {
    optionsHTML += '<button class="answer-btn" data-idx="' + i + '">' + q.options[i] + '</button>';
  }
  var backLabel = current > 0 ? 'Back' : 'Return home';
  document.getElementById('quiz-body').innerHTML =
    '<div class="question-card">' +
      '<div class="question-num">Question ' + (current + 1) + ' of ' + questions.length + '</div>' +
      '<div class="question-text">' + q.text + '</div>' +
      '<div class="answer-options">' + optionsHTML + '</div>' +
    '</div>' +
    '<div class="quiz-nav">' +
      '<button class="btn-back" id="btn-back">' + backLabel + '</button>' +
      '<button class="btn-next" id="btn-next">Continue</button>' +
    '</div>';

  var answerBtns = document.querySelectorAll('.answer-btn');
  for (var j = 0; j < answerBtns.length; j++) {
    answerBtns[j].addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-idx'));
      answers[current] = idx;
      var btns = document.querySelectorAll('.answer-btn');
      for (var k = 0; k < btns.length; k++) { btns[k].classList.remove('selected'); }
      this.classList.add('selected');
      document.getElementById('btn-next').classList.add('enabled');
    });
  }

  document.getElementById('btn-back').addEventListener('click', function() {
    if (current > 0) { current--; renderQuestion(); }
    else { showPage('page-landing'); }
  });

  document.getElementById('btn-next').addEventListener('click', function() {
    if (answers[current] === undefined) return;
    current++;
    renderQuestion();
  });
}

function showResult() {
  document.getElementById('progress').style.width = '100%';
  document.getElementById('quiz-body').innerHTML =
    '<div class="question-card quiz-result">' +
      '<div class="result-icon">&#10003;</div>' +
      '<h2>You May Be a Candidate</h2>' +
      '<p>Based on your responses, your symptoms are consistent with central nervous system hypersensitization. This is the core pattern the NeuroReset Program is designed to address.</p>' +
      '<p>The next step is to choose your program tier and schedule your comprehensive evaluation with Dr. Lee.</p>' +
      '<button class="btn-primary" id="btn-view-pricing" style="width:100%;text-align:center;">View Program Options</button>' +
    '</div>';
  document.getElementById('btn-view-pricing').addEventListener('click', function() {
    showPage('page-pricing');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('nav-cta-btn').addEventListener('click', showQuiz);
  document.getElementById('hero-cta-btn').addEventListener('click', showQuiz);
  document.getElementById('cta-bottom-btn').addEventListener('click', showQuiz);
  document.getElementById('btn-essential').addEventListener('click', function() { window.open(squareLinks.essential, '_blank'); });
  document.getElementById('btn-signature').addEventListener('click', function() { window.open(squareLinks.signature, '_blank'); });
  document.getElementById('btn-elite').addEventListener('click', function() { window.open(squareLinks.elite, '_blank'); });
});
