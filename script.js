const slownik = {
  "przekaz pieniężny": "die Geldüberweisung",
  "przekaz pocztowy": "die Postanweisung",
  "przekąska": "die Vorspeise",
  "przelew": "die Überweisung",
  "przełożony": "der Vorgesetzte",
  "przenocować": "übernachten",
  "przepraszam": "Entschuldigung",
  "przerwa": "die Pause",
  "przerwa na lunch": "die Mittagspause",
  "przesiadać się": "umsteigen",
  "przesiadka": "das Umsteigen",
  "przesyłka": "die Einschreibesendung",
  "prześcieradło": "das Betttuch",
  "przewodnik": "der Reiseleiter",
  "przeziębienie": "die Erkältung",
  "przyjazd": "die Ankunft",
  "przystanek": "die Haltestelle",
  "pstrąg": "die Forelle",
  "pub": "das Pub",
  "puder": "der Puder"
};

let currentWord = "";
let correctAnswers = 0;
let totalAnswers = 0;

// licznik błędów dla słów
let wordCounts = {};
Object.keys(slownik).forEach(word => {
  wordCounts[word] = 0;
});

// lista błędnych odpowiedzi
let mistakes = [];

function nextWord() {
  const available = Object.keys(slownik).filter(word => wordCounts[word] < 2);

  if (available.length === 0) {
    showSummary();
    return;
  }

  currentWord = available[Math.floor(Math.random() * available.length)];

  document.getElementById("question").innerText = "Przetłumacz: " + currentWord;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("wrong").innerText = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  const correct = slownik[currentWord];

  totalAnswers++;

  if (userAnswer.toLowerCase() === correct.toLowerCase()) {
    correctAnswers++;
    document.getElementById("result").innerText = "✅ Dobrze!";
    document.getElementById("wrong").innerText = "";
    // słowo usuwamy, bo zostało rozwiązane poprawnie
    delete slownik[currentWord];
  } else {
    document.getElementById("result").innerText = `❌ Źle. Poprawna odpowiedź: ${correct}`;
    document.getElementById("wrong").innerText = `Twoja odpowiedź: ${userAnswer}`;
    // zapisujemy błąd do listy
    mistakes.push({
      word: currentWord,
      correct: correct,
      wrong: userAnswer
    });
    // zwiększamy licznik błędów, żeby pojawiło się ponownie (max 2 razy)
    wordCounts[currentWord]++;
  }

  document.getElementById("score").innerText = 
    `Wynik: ${correctAnswers} / ${totalAnswers} ( ${Math.round((correctAnswers / totalAnswers) * 100)}% )`;
}

function showSummary() {
  document.getElementById("question").innerText = "🎉 Koniec quizu!";
  document.getElementById("answer").style.display = "none";
  document.querySelector("button[onclick='checkAnswer()']").style.display = "none";
  document.querySelector("button[onclick='nextWord()']").style.display = "none";

  let summary = "📌 Twoje błędy:\n";
  if (mistakes.length === 0) {
    summary += "Brak błędów – super robota! 🎉";
  } else {
    mistakes.forEach(m => {
      summary += `\n👉 ${m.word}\n❌ Twoja odpowiedź: ${m.wrong}\n✅ Poprawna odpowiedź: ${m.correct}\n`;
    });
  }

  // dodaj do strony
  const summaryElement = document.createElement("pre");
  summaryElement.innerText = summary;
  document.body.appendChild(summaryElement);
}

// start od pierwszego słowa
window.onload = nextWord;
