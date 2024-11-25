export default class extends Stimulus.Controller {
  static targets = [
    "team", "player", "opponent", "difficulty",
    "saves", "keySaves", "goodPlays",
    "effort", "attitude", "date",
    "modal", "scoreCircle", "resultPlayer", "resultComment", "matchDetails"
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

    // Capturar valores de los campos del formulario
    const team = this.teamTarget.value;
    const opponent = this.opponentTarget.value;
    const date = this.dateTarget.value || "Fecha no especificada";

    const difficultyWeights = {
      inferior: 10,
      parejo: 20,
      ligeramente_superior: 30,
      superior: 40,
      muy_superior: 50
    };

    const effortWeights = {
      bajas: 5,
      normales: 10,
      altas: 20,
      muy_altas: 30
    };

    const attitudeWeights = {
      mejorable: 10,
      normal: 20,
      buena: 30,
      muy_buena: 40,
      excelente: 50
    };

    // Calcular valores individuales
    const difficulty = difficultyWeights[this.difficultyTarget.value] || 0;
    const saves = parseInt(this.savesTarget.value || 0, 10);
    const keySaves = parseInt(this.keySavesTarget.value || 0, 10);
    const goodPlays = parseInt(this.goodPlaysTarget.value || 0, 10);
    const effort = effortWeights[this.effortTarget.value] || 0;
    const attitude = attitudeWeights[this.attitudeTarget.value] || 0;

    // Calcular el puntaje final
    const score = Math.min(
      100,
      difficulty * 0.8 + saves * 1.6 + keySaves * 4 + goodPlays * 3 +
        effort * 0.8 + attitude * 0.7
    );
    const commentIndex = Math.max(0, Math.floor(score / 10) - 5);

    // Actualizar el contenido del modal
    this.matchDetailsTarget.innerText = `${team} vs ${opponent} - ${date}`;
    this.resultPlayerTarget.innerText = `Jugador: ${this.playerTarget.value}`;
    this.resultCommentTarget.innerText = comments[commentIndex] || "Mejorable";

    // Cambiar el color del círculo según el puntaje
    let bgColor = "bg-red-500";
    if (score >= 50 && score < 70) bgColor = "bg-yellow-500";
    if (score >= 70 && score < 90) bgColor = "bg-green-500";
    if (score >= 90) bgColor = "bg-blue-500";
    this.scoreCircleTarget.className = `w-40 h-40 flex items-center justify-center rounded-full text-white font-bold text-5xl ${bgColor}`;
    this.scoreCircleTarget.innerText = Math.round(score);

    // Mostrar el modal
    this.modalTarget.classList.remove("hidden");
  }

  closeModal() {
    this.modalTarget.classList.add("hidden");
  }

  printModal() {
    const originalContent = document.body.innerHTML;
    const modalContent = this.modalTarget.innerHTML;

    document.body.innerHTML = modalContent;
    window.print();

    document.body.innerHTML = originalContent;
    location.reload();
  }
}