"use strict";

const form = document.querySelector("#quiz-form");
const feedback = document.querySelector("#feedback");
const expectedOrder = ["1", "3", "4", "2", "5"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let score = 0;

  form.querySelectorAll("fieldset[data-correct]").forEach((question) => {
    const selected = question.querySelector("input:checked");
    const correct = selected && selected.value === question.dataset.correct;
    question.classList.toggle("correct", correct);
    question.classList.toggle("incorrect", !correct);
    if (correct) score += 1;
  });

  const sequence = [...form.querySelectorAll(".order-select")];
  const orderedCorrectly = sequence.every((select, index) => select.value === expectedOrder[index]);
  sequence[0].closest("fieldset").classList.toggle("correct", orderedCorrectly);
  sequence[0].closest("fieldset").classList.toggle("incorrect", !orderedCorrectly);
  if (orderedCorrectly) score += 1;

  feedback.textContent = `Výsledek: ${score} ze 4 bodů.${orderedCorrectly ? " Algoritmus je správně seřazený." : " Správné pořadí kroků je 1, 4, 2, 3, 5."}`;
});

form.addEventListener("reset", () => {
  form.querySelectorAll(".correct, .incorrect").forEach((question) => {
    question.classList.remove("correct", "incorrect");
  });
  feedback.textContent = "";
});
