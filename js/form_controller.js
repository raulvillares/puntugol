export default class extends Stimulus.Controller {
  static targets = [
    "team", "player", "opponent", "difficulty",
    "saves", "keySaves", "goodPlays",
    "effort", "attitude", "date",
    "resultModal", "scoreCircle", "resultPlayer", "resultComment", "matchDetails"
  ];

  calculateScore(event) {
    event.preventDefault();

    const comments = [
      "Mejorable 😟",
      "Normal 🙂",
      "Bien 👍",
      "Muy Bien 🌟",
      "Excelente 🎉",
      "Impresionante 💪",
      "¡Increíble! 🏆"
    ];

    const team = this.teamTarget.value;
    const opponent = this.opponentTarget.value;
    const date = this.dateTarget.value || "Fecha no especificada";

    const difficultyWeights = {
      weaker: 10,
      even: 20,
      slightly_superior: 30,
      superior: 40,
      much_superior: 50
    };

    const effortWeights = {
      low: 5,
      normal: 10,
      high: 20,
      very_high: 30
    };

    const attitudeWeights = {
      needs_improvement: 10,
      normal: 20,
      good: 30,
      very_good: 40,
      excellent: 50
    };

    const difficulty = difficultyWeights[this.difficultyTarget.value] || 0;
    const saves = parseInt(this.savesTarget.value || 0, 10);
    const keySaves = parseInt(this.keySavesTarget.value || 0, 10);
    const goodPlays = parseInt(this.goodPlaysTarget.value || 0, 10);
    const effort = effortWeights[this.effortTarget.value] || 0;
    const attitude = attitudeWeights[this.attitudeTarget.value] || 0;

    const score = Math.min(
      100,
      difficulty * 0.8 + saves * 1.6 + keySaves * 4 + goodPlays * 3 +
        effort * 0.8 + attitude * 0.7
    );

    let commentIndex = 0;
    if (score >= 100) {
      commentIndex = 6;
    } else if (score >= 90) {
      commentIndex = 5;
    } else if (score >= 80) {
      commentIndex = 4;
    } else if (score >= 70) {
      commentIndex = 3;
    } else if (score >= 60) {
      commentIndex = 2;
    } else if (score >= 50) {
      commentIndex = 1;
    } else {
      commentIndex = 0;
    }

    // Update the result modal content
    this.matchDetailsTarget.innerText = `${team} vs ${opponent} - ${date}`;
    this.resultPlayerTarget.innerText = `Jugador: ${this.playerTarget.value}`;
    this.resultCommentTarget.innerText = comments[commentIndex] || "Mejorable";

    // Change the circle color based on the score
    let bgColor = "bg-red-500";
    if (score >= 50 && score < 70) bgColor = "bg-yellow-500";
    if (score >= 70 && score < 90) bgColor = "bg-green-500";
    if (score >= 90) bgColor = "bg-blue-500";
    this.scoreCircleTarget.classList.remove("bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500");
    this.scoreCircleTarget.classList.add(bgColor);
    this.scoreCircleTarget.innerText = Math.round(score);

    // Show the result modal
    this.resultModalTarget.classList.remove("hidden");

    if (score >= 90) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }

  closeResultModal() {
    this.resultModalTarget.classList.add("hidden");
  }

  printResultModal() {
    const originalContent = document.body.innerHTML;
    const resultModalContent = this.resultModalTarget.innerHTML;

    document.body.innerHTML = resultModalContent;
    window.print();

    document.body.innerHTML = originalContent;
  }
}