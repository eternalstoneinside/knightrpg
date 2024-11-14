// Початкові характеристики лицаря
let knight = {
   health: 100,
   attack: 10,
   armor: 5
};

// Змінна для зберігання попереднього зображення
let prevImageSrc = "";

// Функція для показу феєрверку
function showFireworks() {
   const fireworksContainer = document.createElement("div");
   fireworksContainer.classList.add("fireworks-container");
   document.body.appendChild(fireworksContainer);

   // Створюємо частинки феєрверку
   for (let i = 0; i < 30; i++) {
      const firework = document.createElement("div");
      firework.classList.add("firework");

      // Генеруємо випадкові кольори
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      firework.style.backgroundColor = color;

      // Генеруємо випадкові напрямки для руху
      const angle = Math.random() * 360; // Випадковий кут
      const distance = Math.random() * 150 + 50; // Випадкова відстань

      // Визначаємо координати для руху
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Передаємо значення для анімації
      firework.style.setProperty('--x', `${x}px`);
      firework.style.setProperty('--y', `${y}px`);

      fireworksContainer.appendChild(firework);
   }

   // Через 3 секунди видаляємо феєрверк
   setTimeout(() => {
      fireworksContainer.remove();
   }, 3000); // Тривалість анімації
}

// Функція для оновлення характеристик на екрані
function updateStats() {
   document.getElementById("health").innerText = knight.health;
   document.getElementById("attack").innerText = knight.attack;
   document.getElementById("armor").innerText = knight.armor;

   const knightImage = document.getElementById("knight-image");

   // Логіка для вибору зображення
   let newImageSrc = "";
   if (knight.health > 150 && knight.armor > 10 && knight.attack > 20) {
      newImageSrc = "img/knightattack1andarmor1andhealth1.png";
   } else if (knight.health > 150 && knight.armor > 10) {
      newImageSrc = "img/knightarmor1andhealth1.png";
   } else if (knight.health > 150 && knight.attack > 20) {
      newImageSrc = "img/knightattack1andhealth1.png";
   } else if (knight.health > 150) {
      newImageSrc = "img/knighthealth1.png";
   } else if (knight.armor > 10 && knight.attack > 20) {
      newImageSrc = "img/knightattack1andarmor1.png";
   } else if (knight.armor > 10) {
      newImageSrc = "img/knightarmor1.png";
   } else if (knight.attack > 20) {
      newImageSrc = "img/knightattack1.png";
   } else {
      newImageSrc = "img/knightbased.png"; // Базове зображення
   }

   // Якщо зображення змінилося, показуємо феєрверк
   if (newImageSrc !== prevImageSrc) {
      prevImageSrc = newImageSrc;
      showFireworks(); // Показуємо феєрверк, якщо зображення змінилося
   }

   // Оновлюємо зображення лицаря
   knightImage.src = newImageSrc;
}

// Функція для збільшення характеристик
function increaseStat(stat) {
   if (stat === "health") knight.health += 10;
   if (stat === "attack") knight.attack += 2;
   if (stat === "armor") knight.armor += 1;

   updateStats();
}

// Початкове оновлення характеристик на екрані, але без феєрверку
function initialUpdateStats() {
   // Оновлюємо характеристики без виклику феєрверку
   document.getElementById("health").innerText = knight.health;
   document.getElementById("attack").innerText = knight.attack;
   document.getElementById("armor").innerText = knight.armor;

   const knightImage = document.getElementById("knight-image");

   let newImageSrc = "img/knightbased.png"; // Базове зображення

   // Оновлюємо зображення лицаря
   knightImage.src = newImageSrc;
   prevImageSrc = newImageSrc; // Зберігаємо базове зображення як попереднє
}

// Початкове оновлення характеристик на екрані без феєрверку
initialUpdateStats();

// Функція для обробки кліку по лицарю
document.getElementById("knight-image").addEventListener("click", function () {
   // Додаємо ефект трясіння
   this.classList.add("shake");

   // Після завершення анімації видаляємо клас, щоб можна було знову застосувати
   setTimeout(() => {
      this.classList.remove("shake");
   }, 500); // Час анімації (0.5s)
});