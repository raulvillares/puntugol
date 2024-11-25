export default class extends Stimulus.Controller {
  static targets = [
    "team", "player", "opponent", "difficulty",
    "saves", "keySaves", "goodPlays",
    "effort", "attitude",
    "modal", "scoreCircle", "resultPlayer", "resultComment"
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

    const score = 76; // Aquí va el cálculo real
    const commentIndex = Math.max(0, Math.floor(score / 10) - 5);

    this.resultPlayerTarget.innerText = "Jugador: Ferran";
    this.resultCommentTarget.innerText = comments[commentIndex] || "Mejorable";

    let bgColor = "bg-red-500";
    if (score >= 50 && score < 70) bgColor = "bg-yellow-500";
    if (score >= 70 && score < 90) bgColor = "bg-green-500";
    if (score >= 90) bgColor = "bg-blue-500";
    this.scoreCircleTarget.className = `w-40 h-40 flex items-center justify-center rounded-full text-white font-bold text-5xl ${bgColor}`;
    this.scoreCircleTarget.innerText = Math.round(score);

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
