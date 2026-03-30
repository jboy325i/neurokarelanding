var squareLinks = {
  essential: 'https://square.link/u/tdTfNKHw',
  signature:  'https://square.link/u/Hwm4jzFP',
  elite:      'https://square.link/u/KeZ8Oqcz'
};

// ─── FORM SECTIONS ───────────────────────────────────────────────────────────

var sections = [
  {
    id: 's2',
    label: 'Section 1 of 5',
    title: 'Pain Profile',
    fields: [
      {
        id: 'pain_duration', type: 'radio', required: true,
        label: 'How long have you been experiencing chronic pain?',
        options: ['Less than 6 months','6 months to 1 year','1 to 5 years','Over 5 years']
      },
      {
        id: 'pain_scale', type: 'scale', required: true,
        label: 'Average daily pain level (0 = No pain, 10 = Worst pain imaginable)',
        min: 0, max: 10
      },
      {
        id: 'pain_type', type: 'checkbox',
        label: 'How would you describe your pain? (Check all that apply)',
        options: [
          'Aching / Deep muscle pain',
          'Burning / Tingling / Electrical (Nerve pain)',
          'Sharp / Stabbing',
          'Joint stiffness / Swelling',
          'Widespread (all over the body)'
        ]
      },
      {
        id: 'pain_location', type: 'textarea',
        label: 'Primary locations of your pain',
        placeholder: 'e.g., lower back, both knees, neck and shoulders…'
      }
    ]
  },
  {
    id: 's3',
    label: 'Section 2 of 5',
    title: 'Medical History & Associated Conditions',
    intro: 'LDN is often used off-label for specific inflammatory and autoimmune conditions. Please indicate if you have been diagnosed with any of the following:',
    fields: [
      {
        id: 'conditions', type: 'checkbox',
        label: '',
        options: [
          'Fibromyalgia',
          'Myalgic Encephalomyelitis / Chronic Fatigue Syndrome (ME/CFS)',
          'Complex Regional Pain Syndrome (CRPS)',
          'Rheumatoid Arthritis',
          'Multiple Sclerosis (MS)',
          'Hashimoto\'s Thyroiditis or other thyroid disorders',
          'Inflammatory Bowel Disease (Crohn\'s Disease or Ulcerative Colitis)',
          'Endometriosis / PCOS',
          'None of the above'
        ]
      },
      {
        id: 'other_autoimmune', type: 'text',
        label: 'Other autoimmune conditions (if any)',
        placeholder: 'Describe here…'
      }
    ]
  },
  {
    id: 's4',
    label: 'Section 3 of 5',
    title: 'Current Medications',
    intro: 'Because Naltrexone blocks opioid receptors, it can cause sudden withdrawal if taken while opioid medications are in your system.',
    fields: [
      {
        id: 'opioids', type: 'radio', required: true,
        label: 'Are you currently taking ANY prescription pain medications containing opioids? (e.g., Hydrocodone, Oxycodone, Morphine, Codeine, Tramadol, Fentanyl, Buprenorphine, Methadone)',
        options: ['Yes','No']
      },
      {
        id: 'opioids_list', type: 'textarea',
        label: 'If yes — please list them and how often you take them',
        placeholder: 'e.g., Hydrocodone 5mg, twice daily…'
      },
      {
        id: 'surgery', type: 'radio', required: true,
        label: 'Do you have any surgeries planned in the next 14 days that may require opioid pain management?',
        options: ['Yes','No']
      },
      {
        id: 'immunosuppressants', type: 'radio', required: true,
        label: 'Are you currently taking any immunosuppressants or biologic medications?',
        options: ['Yes','No']
      },
      {
        id: 'other_meds', type: 'textarea',
        label: 'Please list all other prescription medications, over-the-counter drugs, and supplements you are currently taking',
        placeholder: 'e.g., Lisinopril 10mg, Vitamin D 2000 IU, Fish Oil…'
      }
    ]
  },
  {
    id: 's5',
    label: 'Section 4 of 5',
    title: 'Quality of Life & Other Symptoms',
    intro: 'LDN can sometimes help with related symptoms or cause mild side effects like vivid dreams. This baseline helps us track your progress.',
    fields: [
      {
        id: 'fatigue_scale', type: 'scale', required: true,
        label: 'Daily fatigue level (0 = No fatigue, 10 = Exhausted / Bedbound)',
        min: 0, max: 10
      },
      {
        id: 'brain_fog', type: 'radio', required: true,
        label: 'Do you experience "Brain Fog" (difficulty concentrating, memory issues)?',
        options: ['Frequently','Sometimes','Rarely / Never']
      },
      {
        id: 'sleep', type: 'radio', required: true,
        label: 'How would you describe your sleep quality?',
        options: [
          'Good (I wake up rested)',
          'Fair (I have some trouble falling or staying asleep)',
          'Poor (Insomnia, frequent waking, unrefreshing sleep)'
        ]
      },
      {
        id: 'liver', type: 'radio', required: true,
        label: 'Do you have a history of liver disease or elevated liver enzymes?',
        options: ['Yes','No']
      }
    ]
  },
  {
    id: 's6',
    label: 'Section 5 of 5',
    title: 'Patient Goals',
    fields: [
      {
        id: 'goals', type: 'textarea',
        label: 'What are your primary goals for seeking a new pain management therapy?',
        placeholder: 'e.g., reduce pain by 50%, get back to walking, reduce use of other medications…'
      }
    ]
  }
];

// ─── STATE ───────────────────────────────────────────────────────────────────

var currentSection = 0;
var formData = {};

// ─── PAGE HELPERS ─────────────────────────────────────────────────────────────

function showPage(id) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function showQuiz() {
  currentSection = 0;
  formData = {};
  showPage('page-quiz');
  renderSection();
}

// ─── RENDER SECTION ──────────────────────────────────────────────────────────

function renderSection() {
  var pct = (currentSection / sections.length) * 100;
  document.getElementById('progress').style.width = pct + '%';

  if (currentSection >= sections.length) { showResult(); return; }

  var sec = sections[currentSection];
  var html = '<div class="question-card">';
  html += '<div class="question-num">' + sec.label + '</div>';
  html += '<div class="question-text" style="margin-bottom:8px;">' + sec.title + '</div>';
  if (sec.intro) html += '<p style="font-size:14px;color:var(--mid);line-height:1.65;margin-bottom:28px;">' + sec.intro + '</p>';

  sec.fields.forEach(function(f) {
    html += '<div class="form-field" style="margin-bottom:28px;">';
    if (f.label) html += '<div class="field-label" style="font-size:14px;font-weight:500;color:var(--dark);margin-bottom:12px;">' + f.label + (f.required ? ' <span style="color:var(--teal);">*</span>' : '') + '</div>';

    if (f.type === 'text') {
      var saved = formData[f.id] || '';
      html += '<input type="text" id="field-' + f.id + '" value="' + escHtml(saved) + '" placeholder="' + (f.placeholder||'') + '" class="form-input" style="width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:12px;font-family:\'DM Sans\',sans-serif;font-size:15px;background:var(--cream);color:var(--dark);outline:none;transition:border-color 0.2s;" onfocus="this.style.borderColor=\'var(--teal)\'" onblur="this.style.borderColor=\'var(--border)\'">';

    } else if (f.type === 'date') {
      var savedD = formData[f.id] || '';
      html += '<input type="date" id="field-' + f.id + '" value="' + savedD + '" class="form-input" style="width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:12px;font-family:\'DM Sans\',sans-serif;font-size:15px;background:var(--cream);color:var(--dark);outline:none;transition:border-color 0.2s;" onfocus="this.style.borderColor=\'var(--teal)\'" onblur="this.style.borderColor=\'var(--border)\'">';

    } else if (f.type === 'textarea') {
      var savedT = formData[f.id] || '';
      html += '<textarea id="field-' + f.id + '" placeholder="' + (f.placeholder||'') + '" rows="3" style="width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:12px;font-family:\'DM Sans\',sans-serif;font-size:15px;background:var(--cream);color:var(--dark);outline:none;resize:vertical;transition:border-color 0.2s;" onfocus="this.style.borderColor=\'var(--teal)\'" onblur="this.style.borderColor=\'var(--border)\'">' + escHtml(savedT) + '</textarea>';

    } else if (f.type === 'radio') {
      var savedR = formData[f.id] || '';
      f.options.forEach(function(opt) {
        var checked = savedR === opt ? 'selected' : '';
        html += '<button class="answer-btn ' + checked + '" data-field="' + f.id + '" data-value="' + escHtml(opt) + '" data-type="radio" style="margin-bottom:8px;">' + opt + '</button>';
      });

    } else if (f.type === 'checkbox') {
      var savedC = formData[f.id] || [];
      f.options.forEach(function(opt) {
        var checked = savedC.indexOf(opt) > -1 ? 'selected' : '';
        html += '<button class="answer-btn ' + checked + '" data-field="' + f.id + '" data-value="' + escHtml(opt) + '" data-type="checkbox" style="margin-bottom:8px;">' + opt + '</button>';
      });

    } else if (f.type === 'scale') {
      var savedS = formData[f.id] !== undefined ? formData[f.id] : -1;
      html += '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
      for (var n = f.min; n <= f.max; n++) {
        var selClass = savedS === n ? 'selected' : '';
        html += '<button class="scale-btn ' + selClass + '" data-field="' + f.id + '" data-value="' + n + '" style="width:44px;height:44px;border-radius:10px;border:1.5px solid var(--border);background:var(--cream);font-family:\'DM Sans\',sans-serif;font-size:15px;cursor:pointer;transition:all 0.2s;flex-shrink:0;">' + n + '</button>';
      }
      html += '</div>';
    }

    html += '</div>'; // .form-field
  });

  html += '</div>'; // .question-card

  var backLabel = currentSection > 0 ? 'Back' : 'Return home';
  var nextLabel = currentSection === sections.length - 1 ? 'Submit' : 'Continue';
  html += '<div class="quiz-nav"><button class="btn-back" id="btn-back">' + backLabel + '</button><button class="btn-next enabled" id="btn-next">' + nextLabel + '</button></div>';

  document.getElementById('quiz-body').innerHTML = html;

  // ── RADIO / CHECKBOX button clicks ──
  document.querySelectorAll('.answer-btn[data-type]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var field = this.getAttribute('data-field');
      var val = this.getAttribute('data-value');
      var type = this.getAttribute('data-type');
      if (type === 'radio') {
        document.querySelectorAll('.answer-btn[data-field="' + field + '"]').forEach(function(b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        formData[field] = val;
      } else {
        // checkbox — toggle
        if (!Array.isArray(formData[field])) formData[field] = [];
        var idx = formData[field].indexOf(val);
        if (idx > -1) {
          formData[field].splice(idx, 1);
          this.classList.remove('selected');
        } else {
          // "None of the above" clears others
          if (val === 'None of the above') {
            formData[field] = [val];
            document.querySelectorAll('.answer-btn[data-field="' + field + '"]').forEach(function(b) { b.classList.remove('selected'); });
          } else {
            var noneIdx = formData[field].indexOf('None of the above');
            if (noneIdx > -1) {
              formData[field].splice(noneIdx, 1);
              document.querySelectorAll('.answer-btn[data-field="' + field + '"][data-value="None of the above"]').forEach(function(b) { b.classList.remove('selected'); });
            }
            formData[field].push(val);
          }
          this.classList.add('selected');
        }
      }
    });
  });

  // ── SCALE button clicks ──
  document.querySelectorAll('.scale-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var field = this.getAttribute('data-field');
      var val = parseInt(this.getAttribute('data-value'));
      formData[field] = val;
      document.querySelectorAll('.scale-btn[data-field="' + field + '"]').forEach(function(b) {
        b.classList.remove('selected');
        b.style.background = 'var(--cream)';
        b.style.color = 'var(--dark)';
        b.style.borderColor = 'var(--border)';
      });
      this.classList.add('selected');
      this.style.background = 'var(--teal)';
      this.style.color = 'white';
      this.style.borderColor = 'var(--teal)';
    });
  });

  // ── NAV ──
  document.getElementById('btn-back').addEventListener('click', function() {
    saveTextFields();
    if (currentSection > 0) { currentSection--; renderSection(); }
    else { showPage('page-landing'); }
  });

  document.getElementById('btn-next').addEventListener('click', function() {
    saveTextFields();
    // Validate required fields in this section
    var sec = sections[currentSection];
    var missing = false;
    sec.fields.forEach(function(f) {
      if (!f.required) return;
      if (f.type === 'radio' && !formData[f.id]) missing = true;
      if (f.type === 'scale' && formData[f.id] === undefined) missing = true;
    });
    if (missing) {
      showValidationMsg();
      return;
    }
    currentSection++;
    renderSection();
  });

  // Re-apply selected styles to scale buttons already saved
  document.querySelectorAll('.scale-btn.selected').forEach(function(b) {
    b.style.background = 'var(--teal)';
    b.style.color = 'white';
    b.style.borderColor = 'var(--teal)';
  });
}

function saveTextFields() {
  var sec = sections[currentSection];
  sec.fields.forEach(function(f) {
    if (f.type === 'text' || f.type === 'date' || f.type === 'textarea') {
      var el = document.getElementById('field-' + f.id);
      if (el) formData[f.id] = el.value;
    }
  });
}

function showValidationMsg() {
  var existing = document.getElementById('validation-msg');
  if (existing) return;
  var msg = document.createElement('div');
  msg.id = 'validation-msg';
  msg.style.cssText = 'color:#c0392b;font-size:13px;text-align:center;margin-top:12px;';
  msg.textContent = 'Please answer the required questions marked with ✦ before continuing.';
  document.querySelector('.quiz-nav').appendChild(msg);
  setTimeout(function() { if (msg.parentNode) msg.parentNode.removeChild(msg); }, 3000);
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ─── RESULT ──────────────────────────────────────────────────────────────────

function showResult() {
  document.getElementById('progress').style.width = '100%';

  // Check opioid flag
  var onOpioids = formData['opioids'] === 'Yes';
  var hasSurgery = formData['surgery'] === 'Yes';

  var icon, headline, body, btnText;

  if (onOpioids || hasSurgery) {
    icon = '⚠️';
    headline = 'A Note Before Your Consultation';
    body = '<p>Thank you for completing the evaluation. Based on your responses, there are one or more factors — such as current opioid use or an upcoming surgery — that Dr. Lee will need to carefully review before LDN can be considered.</p>'
         + '<p>This does not disqualify you from the program. Dr. Lee will address these details during your comprehensive evaluation and guide you on the safest path forward.</p>'
         + '<p>If you have questions before enrolling, feel free to <a href="javascript:void(0)" onclick="document.location=\'mai\'+\'lto:info\'+\'@neurokare.com\'" style="color:var(--teal);">contact us</a>.</p>';
    btnText = 'View Program Options';
  } else {
    icon = '✓';
    headline = 'You May Be a Candidate for LDN';
    body = '<p>Based on your responses, your symptom profile is consistent with the conditions the NeuroReset Program and Low Dose Naltrexone are designed to address — including neuroinflammation, central sensitization, and associated quality-of-life impacts.</p>'
         + '<p>The next step is to choose your program tier and schedule your comprehensive evaluation with Dr. Lee, who will review your full history and confirm whether LDN is appropriate for you.</p>';
    btnText = 'View Program Options';
  }

  document.getElementById('quiz-body').innerHTML =
    '<div class="question-card quiz-result">' +
      '<div class="result-icon" style="font-size:32px;">' + icon + '</div>' +
      '<h2>' + headline + '</h2>' +
      body +
      '<button class="btn-primary" id="btn-view-pricing" style="width:100%;text-align:center;margin-top:8px;">' + btnText + '</button>' +
    '</div>';

  document.getElementById('btn-view-pricing').addEventListener('click', function() {
    showPage('page-pricing');
  });
}

// ─── WIRING ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('nav-cta-btn').addEventListener('click', showQuiz);
  document.getElementById('hero-cta-btn').addEventListener('click', showQuiz);
  document.getElementById('cta-bottom-btn').addEventListener('click', showQuiz);
  document.getElementById('btn-essential').addEventListener('click', function() { window.open(squareLinks.essential, '_blank'); });
  document.getElementById('btn-signature').addEventListener('click', function() { window.open(squareLinks.signature, '_blank'); });
  document.getElementById('btn-elite').addEventListener('click', function() { window.open(squareLinks.elite, '_blank'); });
});

function toggleFaq(btn) {
  var answer = btn.nextElementSibling;
  var icon = btn.querySelector('.faq-icon');
  var isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(function(a) { a.classList.remove('open'); });
  document.querySelectorAll('.faq-icon').forEach(function(i) { i.textContent = '+'; i.style.transform = ''; });
  if (!isOpen) {
    answer.classList.add('open');
    icon.textContent = '×';
    icon.style.transform = 'rotate(0deg)';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var stickyCta = document.getElementById('sticky-cta-btn');
  if (stickyCta) stickyCta.addEventListener('click', showQuiz);

  var observer = new MutationObserver(function() {
    var quizActive = document.getElementById('page-quiz') && document.getElementById('page-quiz').classList.contains('active');
    var pricingActive = document.getElementById('page-pricing') && document.getElementById('page-pricing').classList.contains('active');
    var sticky = document.getElementById('sticky-cta');
    if (sticky) sticky.style.display = (quizActive || pricingActive) ? 'none' : 'block';
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
});
