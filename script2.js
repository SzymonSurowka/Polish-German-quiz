const slownik2 = {
  "pracować": "arbeiten",
  "pracownik": "der Arbeitnehmer",
  "pracownik fizyczny": "der Arbeiter",
  "pradziadek": "der Urgroßvater",
  "pralnia": "die Wäscherei",
  "prawnuk": "der Urenkel",
  "prawy brzeg": "das rechte Ufer",
  "program antywirusowy": "das Antivirenprogramm",
  "program komputerowy": "das Computerprogram",
  "prom": "die Fähre",
  "promocja": "Sonderangebot",
  "proszek do prania": "das Waschpulver",
  "prysznic": "die Dusche",
  "przecena": "die Preisreduzierung",
  "przedmieście": "der Vorort",
  "przedsiębiorca": "der Unternehmer",
  "przedsiębiorstwo": "das Unternehmen",
  "przedstawiciel": "der Vertreter",
  "przedstawienie": "die Vorstellung",
  "przedział": "das Abteil",
  "przeglądarka": "die Suchmaschine"
};

let currentWord2 = "";
let correctAnswers2 = 0;
let totalAnswers2 = 0;

let wordCounts2 = {};
Object.keys(slownik2).forEach(word => {
  wordCounts2[word] = 0;
});

let mistakes2 = [];

function nextWord2() {
  const available = Object.keys(slownik2).filter(word => wordCounts2[word] < 2);

  if (available.length === 0) {
    showSummary2();
    return;
  }

  currentWord2 = available[Math.floor(Math.random() * available.length)];

  document.getElementById("question2").innerText = "Przetłumacz: " + currentWord2;
  document.getElementById("answer2").value = "";
  document.getElementById("result2").innerText = "";
  document.getElementById("wrong2").innerText = "";
}

function checkAnswer2() {
  const userAnswer = document.getElementById("answer2").value.trim();
  const correct = slownik2[currentWord2];

  totalAnswers2++;

  if (userAnswer.toLowerCase() === correct.toLowerCase()) {
    correctAnswers2++;
    document.getElementById("result2").innerText = "✅ Dobrze!";
    document.getElementById("wrong2").innerText = "";
    delete slownik2[currentWord2];
  } else {
    document.getElementById("result2").innerText = `❌ Źle. Poprawna odpowiedź: ${correct}`;
    document.getElementById("wrong2").innerText = `Twoja odpowiedź: ${userAnswer}`;
    mistakes2.push({
      word: currentWord2,
      correct: correct,
      wrong: userAnswer
    });
    wordCounts2[currentWord2]++;
  }

  document.getElementById("score2").innerText = 
    `Wynik: ${correctAnswers2} / ${totalAnswers2} ( ${Math.round((correctAnswers2 / totalAnswers2) * 100)}% )`;
}

function showSummary2() {
  document.getElementById("question2").innerText = "🎉 Koniec quizu!";
  document.getElementById("answer2").style.display = "none";
  document.querySelector("button[onclick='checkAnswer2()']").style.display = "none";
  document.querySelector("button[onclick='nextWord2()']").style.display = "none";

  let summary = "📌 Twoje błędy:\n";
  if (mistakes2.length === 0) {
    summary += "Brak błędów – super robota! 🎉";
  } else {
    mistakes2.forEach(m => {
      summary += `\n👉 ${m.word}\n❌ Twoja odpowiedź: ${m.wrong}\n✅ Poprawna odpowiedź: ${m.correct}\n`;
    });
  }

  const summaryElement = document.createElement("pre");
  summaryElement.innerText = summary;
  document.body.appendChild(summaryElement);
}

window.onload = nextWord2;
