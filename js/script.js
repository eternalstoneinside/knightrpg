// Початкові характеристики лицаря
let knight = {
   health: 100,
   attack: 10,
   armor: 5
};

// Функція для оновлення характеристик на екрані
function updateStats() {
   document.getElementById("health").innerText = knight.health;
   document.getElementById("attack").innerText = knight.attack;
   document.getElementById("armor").innerText = knight.armor;

   const knightImage = document.getElementById("knight-image");

   // Логіка для вибору зображення
   if (knight.health > 150 && knight.armor > 10 && knight.attack > 20) {
      knightImage.src = "img/knightattack1andarmor1andhealth1.png"; // Зображення з апгрейдом і атаки, і броні, і HP
   } else if (knight.health > 150 && knight.armor > 10) {
      knightImage.src = "img/knightarmor1andhealth1.png"; // Зображення з апгрейдом броні і HP
   } else if (knight.health > 150 && knight.attack > 20) {
      knightImage.src = "img/knightattack1andhealth1.png"; // Зображення з апгрейдом атаки і HP
   } else if (knight.health > 150) {
      knightImage.src = "img/knighthealth1.png"; // Зображення з апгрейдом тільки HP
   } else if (knight.armor > 10 && knight.attack > 20) {
      knightImage.src = "img/knightattack1andarmor1.png"; // Зображення з апгрейдом і броні, і атаки
   } else if (knight.armor > 10) {
      knightImage.src = "img/knightarmor1.png"; // Зображення з апгрейдом броні
   } else if (knight.attack > 20) {
      knightImage.src = "img/knightattack1.png"; // Зображення з апгрейдом атаки
   } else {
      knightImage.src = "img/knightbased.png"; // Базове зображення
   }
}



// Функція для збільшення характеристик
function increaseStat(stat) {
   if (stat === "health") knight.health += 10;
   if (stat === "attack") knight.attack += 2;
   if (stat === "armor") knight.armor += 1;

   updateStats();
}

// Початкове оновлення характеристик на екрані
updateStats();



// Функція для обробки кліку по лицарю
document.getElementById("knight-image").addEventListener("click", function () {
   // Додаємо ефект трясіння
   this.classList.add("shake");

   // Після завершення анімації видаляємо клас, щоб можна було знову застосувати
   setTimeout(() => {
      this.classList.remove("shake");
   }, 500); // Час анімації (0.5s)
});
