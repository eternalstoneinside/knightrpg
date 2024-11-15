// Початкові характеристики лицаря
let knight = {
   health: 100,
   attack: 10,
   armor: 5,
   power: 0
};


document.body.addEventListener('click', function (event) {
   // Перевіряємо, чи натиснуто кнопку або елемент всередині кнопки
   if (event.target.closest('button')) {
      const buttonClickSound = new Audio('sounds/touch.mp3'); // Вказати правильний шлях до аудіофайлу
      buttonClickSound.play();
   }
});

const soundUpgrade = new Audio('sounds/newlvl.wav'); // Один звук для всіх апгрейдів

// Функція для вмикання/вимикання фонової музики
function toggleMusic() {
   const music = document.getElementById("background-music");
   const musicIcon = document.getElementById("music-icon");  // Зберігаємо посилання на іконку

   // Спочатку змінюємо іконку
   if (music.paused) {
      music.play();  // Вмикаємо музику
      musicIcon.src = "img/musicon.svg"; // Змінюємо іконку на "вмикнуто"
   } else {
      music.pause(); // Припаємо музику
      musicIcon.src = "img/musicoff.svg"; // Змінюємо іконку на "вимкнуто"
   }
}

// Додаємо кнопку для перемикання музики (якщо потрібно)
document.getElementById("toggle-music").addEventListener("click", toggleMusic);
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





// Функція для обчислення загальної сили
function calculatePower() {
   knight.power = Math.round(knight.health + (knight.attack * 2) + (knight.armor * 1.5));
}

// Функція для оновлення характеристик на екрані
function updateStats() {
   calculatePower(); // Оновлюємо силу кожного разу, коли оновлюємо характеристики

   document.getElementById("health").innerText = knight.health;
   document.getElementById("attack").innerText = knight.attack;
   document.getElementById("armor").innerText = knight.armor;
   document.getElementById("power").innerText = knight.power;

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

   // Оновлюємо зображення лише якщо воно змінилось
   if (newImageSrc !== prevImageSrc) {
      prevImageSrc = newImageSrc; // Оновлюємо попереднє зображення
      knightImage.src = newImageSrc; // Оновлюємо зображення лицаря

      // Показуємо феєрверк, якщо зображення змінилось
      showFireworks();

      // Додаємо анімацію (тільки після зміни зображення)
      knightImage.classList.add("fade-in-out");

      // Після завершення анімації видаляємо клас, щоб можна було знову застосувати
      setTimeout(() => {
         knightImage.classList.remove("fade-in-out");
      }, 500); // Тривалість анімації

      soundUpgrade.play();
   }
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
   calculatePower(); // Оновлюємо силу кожного разу, коли оновлюємо характеристики

   // Оновлюємо характеристики без виклику феєрверку
   document.getElementById("health").innerText = knight.health;
   document.getElementById("attack").innerText = knight.attack;
   document.getElementById("armor").innerText = knight.armor;
   document.getElementById("power").innerText = knight.power;

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

const upgradeButton = document.querySelector('.upgrade__btn')

upgradeButton.addEventListener('click', () => {
   document.querySelector('.characteristic').classList.toggle('active');
})
const settingsButton = document.querySelector('.settings_btn')

settingsButton.addEventListener('click', () => {
   settingsButton.classList.toggle('active');
   document.querySelector('.settings').classList.toggle('active');
})









const translations = {
   ua: {
      title: "РПГ Лицар",
      health: "Здоров'я:",
      attack: "Атака:",
      armor: "Броня:",
      power: "Сила:",
      increaseHealth: "Збільшити здоров'я",
      increaseAttack: "Збільшити атаку",
      increaseArmor: "Збільшити броню",
      upgrade: "Покращити",
      changeName: "Змінити ім'я",
      saveName: "Зберегти ім'я",
      cancel: "Скасувати",
      enterName: "Будь ласка, введіть ім'я!",
      enterNewName: "Введіть нове ім'я",  // Плейсхолдер
      changeNameTitle: "Введіть нове ім'я"  // Заголовок
   },
   en: {
      title: "Knight RPG",
      health: "Health:",
      attack: "Attack:",
      armor: "Armor:",
      power: "Power:",
      increaseHealth: "Increase Health",
      increaseAttack: "Increase Attack",
      increaseArmor: "Increase Armor",
      upgrade: "Upgrade",
      changeName: "Change Name",
      saveName: "Save Name",
      cancel: "Cancel",
      enterName: "Please enter a name!",
      enterNewName: "Enter new name",  // Плейсхолдер
      changeNameTitle: "Enter new name"  // Заголовок
   }
};


// Початково встановлюємо українську мову
let currentLang = 'en';

// Функція для оновлення тексту на сторінці
// Функція для оновлення тексту на сторінці
function updateLanguage() {
   const lang = translations[currentLang];
   document.title = lang.title;
   document.querySelector('.power strong').textContent = lang.power;
   document.querySelector('.characteristic .stats p:nth-child(1) strong').textContent = lang.health;
   document.querySelector('.characteristic .stats p:nth-child(2) strong').textContent = lang.attack;
   document.querySelector('.characteristic .stats p:nth-child(3) strong').textContent = lang.armor;
   document.querySelector('.controls button:nth-child(1)').textContent = lang.increaseHealth;
   document.querySelector('.controls button:nth-child(2)').textContent = lang.increaseAttack;
   document.querySelector('.controls button:nth-child(3)').textContent = lang.increaseArmor;
   document.querySelector('.menu .upgrade__btn').textContent = lang.upgrade;
   document.getElementById('change-name-btn').textContent = lang.changeName;
   document.getElementById('save-name-btn').textContent = lang.saveName;
   document.getElementById('cancel-name-btn').textContent = lang.cancel;

   // Оновлюємо плейсхолдер для вводу імені
   document.getElementById('new-name').setAttribute('placeholder', lang.enterNewName);

   // Оновлюємо заголовок модального вікна
   document.querySelector('#name-change-modal h3').textContent = lang.changeNameTitle;

   // Оновлюємо текст на кнопці в залежності від поточної мови
   document.getElementById('toggle-lang').textContent = currentLang === 'ua' ? 'UA' : 'EN';
}


// Функція для зміни мови
function toggleLanguage() {
   // Перемикаємо мову між 'en' та 'ua'
   currentLang = currentLang === 'ua' ? 'en' : 'ua';
   updateLanguage();
}

// Додаємо обробник для кнопки перемикання мови
document.getElementById('toggle-lang').addEventListener('click', toggleLanguage);

// Оновлюємо текст при завантаженні сторінки
updateLanguage();

// Змінити ім'я лицаря
document.getElementById('change-name-btn').addEventListener('click', function () {
   // Відкриваємо модальне вікно
   document.getElementById('name-change-modal').style.transform = 'translate(-50%, -50%)';
   document.getElementById('name-change-modal').style.opacity = 1;  // Показуємо модальне вікно
   document.getElementById('overlay').style.display = 'block';  // Показуємо оверлей
   document.getElementById('overlay').style.opacity = '0.5';  // Додаємо прозорість оверлею
});

// Зберегти нове ім'я
document.getElementById('save-name-btn').addEventListener('click', function () {
   const newName = document.getElementById('new-name').value;  // Отримуємо нове ім'я
   if (newName.trim()) {  // Перевірка, щоб ім'я не було порожнім
      document.querySelector('h1').textContent = newName;  // Оновлюємо ім'я лицаря на сторінці
      // Закриваємо модальне вікно
      document.getElementById('name-change-modal').style.transform = 'translate(-50%, -300%)';
      document.getElementById('name-change-modal').style.opacity = 0;  // Приховуємо модальне вікно
      document.getElementById('overlay').style.display = 'none';  // Закриваємо оверлей
      document.getElementById('overlay').style.opacity = '0';  // Прозорість оверлею 0
   } else {
      alert(translations[currentLang].enterName);  // Використовуємо повідомлення залежно від мови
   }
});

// Закрити модальне вікно без збереження
document.getElementById('cancel-name-btn').addEventListener('click', function () {
   // Закриваємо модальне вікно
   document.getElementById('name-change-modal').style.transform = 'translate(-50%, -300%)';
   document.getElementById('name-change-modal').style.opacity = 0;  // Приховуємо модальне вікно
   document.getElementById('overlay').style.display = 'none';  // Закриваємо оверлей
   document.getElementById('overlay').style.opacity = '0';  // Прозорість оверлею 0
});

// Закрити модальне вікно при натисканні на оверлей
document.getElementById('overlay').addEventListener('click', function () {
   // Закриваємо модальне вікно
   document.getElementById('name-change-modal').style.transform = 'translate(-50%, -300%)';
   document.getElementById('name-change-modal').style.opacity = 0;  // Приховуємо модальне вікно
   document.getElementById('overlay').style.display = 'none';  // Закриваємо оверлей
   document.getElementById('overlay').style.opacity = '0';  // Прозорість оверлею 0
});


