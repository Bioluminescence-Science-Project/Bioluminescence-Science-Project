const animals = [
  {
    id: "firefly",
    name: "Firefly",
    emoji: "🪲",
    habitat: "Habitat: warm forests, meadows, and wetlands",
    purpose: "Why it glows: attracting mates with blinking patterns",
    description:
      "Fireflies control oxygen inside their lantern organ, which lets the luciferin reaction flash on and off with great timing.",
    color: "yellow-green",
    use: "communication",
    caption:
      "In fireflies, luciferase helps turn chemical energy into a cool yellow-green flash that is used like a coded signal.",
  },
  {
    id: "anglerfish",
    name: "Angler Fish",
    emoji: "🐟",
    habitat: "Habitat: deep ocean where sunlight does not reach",
    purpose: "Why it glows: luring prey close enough to catch",
    description:
      "The angler fish uses a glowing lure near its mouth. In many species, light comes from glowing bacteria living in the lure.",
    color: "blue-green",
    use: "hunting",
    caption:
      "Deep-sea animals often produce blue-green light because those wavelengths travel well underwater and stand out in darkness.",
  },
  {
    id: "jellyfish",
    name: "Jellyfish",
    emoji: "🪼",
    habitat: "Habitat: open ocean and coastal waters",
    purpose: "Why it glows: defense and startling predators",
    description:
      "Some jellyfish glow when disturbed. Their light can confuse predators or attract even larger animals that chase the attacker away.",
    color: "cyan",
    use: "defense",
    caption:
      "In glowing jellyfish, bioluminescence can act like an underwater alarm system, turning danger into a bright distraction.",
  },
  {
    id: "glowworm",
    name: "Glowworm",
    emoji: "🐛",
    habitat: "Habitat: caves, damp banks, and forest floors",
    purpose: "Why it glows: attracting insects into sticky traps",
    description:
      "Glowworms hang glowing threads in dark places, making them look like tiny stars so insects fly toward the trap.",
    color: "blue-green",
    use: "trapping prey",
    caption:
      "Glowworms use the luciferin reaction as bait, turning a simple chemical glow into a hunting strategy.",
  },
];

const animalList = document.getElementById("animal-list");
const animalName = document.getElementById("animal-name");
const animalEmoji = document.getElementById("animal-emoji");
const animalHabitat = document.getElementById("animal-habitat");
const animalPurpose = document.getElementById("animal-purpose");
const animalDescription = document.getElementById("animal-description");
const animalColor = document.getElementById("animal-color");
const animalUse = document.getElementById("animal-use");
const reactionCaption = document.getElementById("reaction-caption");
const reactionArrow = document.getElementById("reaction-arrow");
const reactionStage = document.getElementById("reaction-stage");
const lightProduct = document.getElementById("light-product");
const heroVisual = document.getElementById("hero-visual");
const triggerButton = document.getElementById("trigger-reaction");
const autoPulseToggle = document.getElementById("auto-pulse");

let selectedAnimalId = "firefly";
let autoPulseInterval = null;
let reactionTimeout = null;

function renderAnimalButtons() {
  animalList.innerHTML = "";

  animals.forEach((animal) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "animal-card";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(animal.id === selectedAnimalId));
    button.dataset.id = animal.id;
    button.innerHTML = `
      <strong>${animal.emoji} ${animal.name}</strong>
      <span>${animal.use}</span>
    `;

    if (animal.id === selectedAnimalId) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectedAnimalId = animal.id;
      updateSelectedAnimal();
      triggerReaction();
    });

    animalList.appendChild(button);
  });
}

function updateSelectedAnimal() {
  const animal = animals.find((entry) => entry.id === selectedAnimalId);
  if (!animal) return;

  animalName.textContent = animal.name;
  animalEmoji.textContent = animal.emoji;
  animalHabitat.textContent = animal.habitat;
  animalPurpose.textContent = animal.purpose;
  animalDescription.textContent = animal.description;
  animalColor.textContent = animal.color;
  animalUse.textContent = animal.use;
  reactionCaption.textContent = animal.caption;

  document.querySelectorAll(".animal-card").forEach((card) => {
    const isActive = card.dataset.id === selectedAnimalId;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-selected", String(isActive));
  });
}

function triggerReaction() {
  reactionArrow.classList.remove("active");
  reactionStage.classList.remove("active");
  lightProduct.classList.remove("active");
  heroVisual.classList.remove("active");
  triggerButton.classList.remove("active");

  window.requestAnimationFrame(() => {
    reactionArrow.classList.add("active");
    reactionStage.classList.add("active");
    lightProduct.classList.add("active");
    heroVisual.classList.add("active");
    triggerButton.classList.add("active");
    triggerButton.textContent = "Reaction Triggered";
  });

  if (reactionTimeout) {
    window.clearTimeout(reactionTimeout);
  }

  reactionTimeout = window.setTimeout(() => {
    reactionStage.classList.remove("active");
    lightProduct.classList.remove("active");
    heroVisual.classList.remove("active");
    triggerButton.classList.remove("active");
    triggerButton.textContent = "Trigger Reaction";
  }, 1000);
}

function syncAutoPulse() {
  if (autoPulseInterval) {
    window.clearInterval(autoPulseInterval);
    autoPulseInterval = null;
  }

  if (autoPulseToggle.checked) {
    autoPulseInterval = window.setInterval(triggerReaction, 2600);
  }
}

triggerButton.addEventListener("click", triggerReaction);
autoPulseToggle.addEventListener("change", syncAutoPulse);

renderAnimalButtons();
updateSelectedAnimal();
syncAutoPulse();
