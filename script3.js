const slownik3 = {
  "pokład": "das Deck",
  "pokój": "das Zimmer",
  "policja": "die Polizei",
  "połączenie": "die Verbindung",
  "połączenie bezpośrednie": "direkte Verbindung",
  "połówka (ze zniżką)": "das Ticket zum halben Preis",
  "pomnik": "das Denkmal",
  "pomoc drogowa": "der Pannendienst",
  "port": "der Hafen",
  "portier": "der Portier",
  "posada": "die Stelle",
  "postój taksówek": "die Taxihaltestelle",
  "pośrednictwo": "die Vermittlung",
  "powiat, dzielnica": "Kreis, Stadtteil",
  "powołanie": "die Berufung",
  "powódź": "die Überflutung",
  "powrót": "die Rückkehr",
  "pożar": "der Brand",
  "pożegnanie": "der Abschied",
  "pożyczka": "die Anleihe",
  "prababcja": "die Urgroßmutter",
  "praca": "die Arbeit",
  "praca, robota, chałtura": "der Job"
};

let currentWord3 = "";
let correctAnswers3 = 0;
let totalAnswers3 = 0;

let wordCounts3 = {};
Object.keys(slownik3).forEach(word => {
  wordCounts3[word] = 0;
});

let mistakes3 = [];

function nextWord3() {
  const available = Object.keys(slownik3).filter(word => wordCounts3[word] < 2);

  if (available.length === 0) {
    showSummary3();
    return;
  }

  currentWord3 = available[Math.floor(Math.random() * available.length)];

  document.getElementById("question3").innerText = "Przetłumacz: " + currentWord3;
  document.getElementById("answer3").value = "";
  document.getElementById("result3").innerText = "";
  document.getElementById("wrong3").innerText = "";
}

function checkAnswer3() {
  const userAnswer = document.getElementById("answer3").value.trim();
  const correct = slownik3[currentWord3];

  totalAnswers3++;

  if (userAnswer.toLowerCase() === correct.toLowerCase()) {
    correctAnswers3++;
    document.getElementById("result3").innerText = "✅ Dobrze!";
    document.getElementById("wrong3").innerText = "";
    delete slownik3[currentWord3];
  } else {
    document.getElementById("result3").innerText = `❌ Źle. Poprawna odpowiedź: ${correct}`;
    document.getElementById("wrong3").innerText = `Twoja odpowiedź: ${userAnswer}`;
    mistakes3.push({
      word: currentWord3,
      correct: correct,
      wrong: userAnswer
    });
    wordCounts3[currentWord3]++;
  }

  document.getElementById("score3").innerText = 
    `Wynik: ${correctAnswers3} / ${totalAnswers3} ( ${Math.round((correctAnswers3 / totalAnswers3) * 100)}% )`;
}

function showSummary3() {
  document.getElementById("question3").innerText = "🎉 Koniec quizu!";
  document.getElementById("answer3").style.display = "none";
  document.querySelector("button[onclick='checkAnswer3()']").style.display = "none";
  document.querySelector("button[onclick='nextWord3()']").style.display = "none";

  let summary = "📌 Twoje błędy:\n";
  if (mistakes3.length === 0) {
    summary += "Brak błędów – super robota! 🎉";
  } else {
    mistakes3.forEach(m => {
      summary += `\n👉 ${m.word}\n❌ Twoja odpowiedź: ${m.wrong}\n✅ Poprawna odpowiedź: ${m.correct}\n`;
    });
  }

  const summaryElement = document.createElement("pre");
  summaryElement.innerText = summary;
  document.body.appendChild(summaryElement);
}

window.onload = nextWord3;
