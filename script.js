document.addEventListener('DOMContentLoaded', function() {
    // Анимация загрузки
    const animateOnLoad = () => {
        const elements = document.querySelectorAll('.item-card, .case-card, .nav-item');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };
    
    setTimeout(animateOnLoad, 500);
    
    // Навигация по секциям
    const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        const targetSection = this.getAttribute('data-section');
        
        // Убираем активный класс у всех элементов
        navItems.forEach(nav => nav.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Добавляем активный класс к выбранному элементу
        this.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
    });
});
function openCase(caseType) {
    console.log('🎯 Открытие кейса:', caseType);
    window.location.href = `case-opening.html?case=${caseType}`;
}
    
    // Поиск
    const searchInput = document.querySelector('.search-filter');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.item-card');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Эффекты при наведении на карточки
    const cards = document.querySelectorAll('.item-card, .case-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('case-card') 
                ? 'scale(1.05)' 
                : 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'none';
        });
    });
    
    // Слайдер
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем выбранный слайд
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slideCount;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(prevIndex);
    }
    
    // Обработчики для кнопок слайдера
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Автоматическое переключение слайдов
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Остановка автоматического переключения при наведении
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Видеоплеер
    const video = document.getElementById('main-video');
    const playPauseBtn = document.querySelector('.play-pause');
    const volumeBtn = document.querySelector('.volume-btn');
    const volumeSlider = document.querySelector('.volume-slider');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    
    // Форматирование времени
    function formatTime(seconds) {
        let mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Обновление времени видео
    video.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(video.duration);
        progressBar.max = video.duration;
    });
    
    video.addEventListener('timeupdate', function() {
        currentTimeEl.textContent = formatTime(video.currentTime);
        progressBar.value = video.currentTime;
    });
    
    // Перемотка видео
    progressBar.addEventListener('input', function() {
        video.currentTime = this.value;
    });
    
    // Управление воспроизведением
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Управление громкостью
    volumeBtn.addEventListener('click', function() {
        if (video.volume > 0) {
            video.volume = 0;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeSlider.value = 0;
        } else {
            video.volume = 1;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeSlider.value = 100;
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        video.volume = this.value / 100;
        if (video.volume === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Полноэкранный режим
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            video.parentElement.requestFullscreen().catch(err => {
                console.log(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
            });
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });
    
    // Горячие клавиши для видео
    document.addEventListener('keydown', function(e) {
        if (e.target === document.body) {
            switch(e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    if (video.paused) {
                        video.play();
                        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    } else {
                        video.pause();
                        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                    }
                    break;
                case 'f':
                    e.preventDefault();
                    if (!document.fullscreenElement) {
                        video.parentElement.requestFullscreen();
                        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                    } else {
                        document.exitFullscreen();
                        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                    }
                    break;
                case 'm':
                    e.preventDefault();
                    if (video.volume > 0) {
                        video.volume = 0;
                        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                        volumeSlider.value = 0;
                    } else {
                        video.volume = 1;
                        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                        volumeSlider.value = 100;
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    video.currentTime -= 5;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    video.currentTime += 5;
                    break;
            }
        }
    });
    
    // Модальное окно пополнения баланса
    const balanceBtn = document.querySelector('.balance-btn');
    const modal = document.getElementById('balance-modal');
    const closeModal = document.querySelector('.close-modal');
    const balanceForm = document.getElementById('balance-form');
    const submitBtn = document.getElementById('submit-btn');
    
    // Открытие модального окна
    balanceBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Валидация формы
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const amountInput = document.getElementById('amount');
    
    // Регулярные выражения для валидации
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s]{1,}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]{1,20}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const phoneRegex = /^(\+375-\d{2}-\d{3}-\d{2}-\d{2}|8\(375\)\d{2}-\d{3}-\d{2}-\d{2})$/;
    
    // Функция проверки валидности формы
    function checkFormValidity() {
        const isNameValid = nameRegex.test(nameInput.value);
        const isEmailValid = emailRegex.test(emailInput.value);
        const isPhoneValid = phoneRegex.test(phoneInput.value);
        const isGenderSelected = Array.from(genderInputs).some(input => input.checked);
        const isAmountValid = amountInput.value && amountInput.value > 0;
        
        return isNameValid && isEmailValid && isPhoneValid && isGenderSelected && isAmountValid;
    }
    
    // Функция обновления состояния кнопки отправки
    function updateSubmitButton() {
        submitBtn.disabled = !checkFormValidity();
    }
    
    // Валидация имени
    nameInput.addEventListener('input', function() {
        const errorElement = this.parentElement.querySelector('.error-message');
        if (!nameRegex.test(this.value)) {
            errorElement.textContent = 'Имя должно содержать не менее 1 символов (только буквы и пробелы)';
        } else {
            errorElement.textContent = '';
        }
        updateSubmitButton();
    });
    
    // Валидация email
    emailInput.addEventListener('input', function() {
        const errorElement = this.parentElement.querySelector('.error-message');
        if (!emailRegex.test(this.value)) {
            errorElement.textContent = 'Введите корректный email (не более 20 символов до @)';
        } else {
            errorElement.textContent = '';
        }
        updateSubmitButton();
    });
    
    // Валидация телефона
    phoneInput.addEventListener('input', function() {
        const errorElement = this.parentElement.querySelector('.error-message');
        if (!phoneRegex.test(this.value)) {
            errorElement.textContent = 'Формат: +375-XX-XXX-XX-XX или 8(375)XX-XXX-XX-XX';
        } else {
            errorElement.textContent = '';
        }
        updateSubmitButton();
    });
    
    // Валидация пола
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            const errorElement = this.closest('.form-group').querySelector('.error-message');
            errorElement.textContent = '';
            updateSubmitButton();
        });
    });
    
    // Валидация суммы
    amountInput.addEventListener('input', function() {
        const errorElement = this.parentElement.querySelector('.error-message');
        if (!this.value || this.value <= 0) {
            errorElement.textContent = 'Введите корректную сумму';
        } else {
            errorElement.textContent = '';
        }
        updateSubmitButton();
    });
    
    // Обработка отправки формы
    balanceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (checkFormValidity()) {
            // Здесь обычно отправка данных на сервер
            alert('Баланс успешно пополнен!');
            modal.style.display = 'none';
            balanceForm.reset();
            updateSubmitButton();
        }
    });
    
    // Инициализация состояния кнопки
    updateSubmitButton();
    
});
// Система открытия кейсов
class CaseOpeningSystem {
    constructor() {
        this.balance = 1000;
        this.selectedCase = null;
        this.inventory = [];
        this.caseItems = {
            mirage: [
                { name: "AK-47 | Красная линия", rarity: "classified", image: "images/ak47-redline.jpg", probability: 3 },
                { name: "AWP | Электрический hive", rarity: "restricted", image: "images/awp-electric.jpg", probability: 8 },
                { name: "M4A4 | Зевс-Ксено", rarity: "mil-spec", image: "images/m4a4-xeno.jpg", probability: 15 },
                { name: "USP-S | Килконфёрмд", rarity: "industrial", image: "images/usp-kill.jpg", probability: 25 },
                { name: "Glock-18 | Водные элементы", rarity: "consumer", image: "images/glock-water.jpg", probability: 35 },
                { name: "Нож | Бабочка | Ультрафиолет", rarity: "covert", image: "images/knife-butterfly.jpg", probability: 1 }
            ],
            nuke: [
                { name: "AWP | Дракон Лора", rarity: "covert", image: "images/awp-dragon.jpg", probability: 2 },
                { name: "M4A1-S | Золотая катушка", rarity: "classified", image: "images/m4a1-gold.jpg", probability: 5 },
                { name: "Desert Eagle | Коричневый жук", rarity: "restricted", image: "images/deagle-beetle.jpg", probability: 10 },
                { name: "P90 | Холодное кровотечение", rarity: "mil-spec", image: "images/p90-cold.jpg", probability: 20 },
                { name: "MP9 | Бильярдная", rarity: "industrial", image: "images/mp9-billiard.jpg", probability: 30 },
                { name: "Нож | Скелетный | Матовый", rarity: "covert", image: "images/knife-skeleton.jpg", probability: 1 }
            ],
            ancient: [
                { name: "AK-47 | Огненная змея", rarity: "covert", image: "images/ak47-firesnake.jpg", probability: 1 },
                { name: "AWP | Гиперзверь", rarity: "classified", image: "images/awp-hyperbeast.jpg", probability: 4 },
                { name: "M4A4 | Король драконов", rarity: "restricted", image: "images/m4a4-dragonking.jpg", probability: 8 },
                { name: "P2000 | Имперский дракон", rarity: "mil-spec", image: "images/p2000-dragon.jpg", probability: 15 },
                { name: "UMP-45 | Осциллятор", rarity: "industrial", image: "images/ump-oscillator.jpg", probability: 25 },
                { name: "Нож | Коготь | Тигровый зуб", rarity: "covert", image: "images/knife-tigertooth.jpg", probability: 1 }
            ]
        };
        
        this.casePrices = {
            mirage: 100,
            nuke: 150,
            ancient: 200
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateBalanceDisplay();
        this.updateInventory();
    }
    
    setupEventListeners() {
        // Выбор кейса
        document.querySelectorAll('.case-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectCase(e.currentTarget.dataset.case);
            });
        });
        
        // Открытие кейса
        document.getElementById('open-case-btn').addEventListener('click', () => {
            this.openCase();
        });
    }
    
    selectCase(caseType) {
        this.selectedCase = caseType;
        
        // Убираем выделение у всех кейсов
        document.querySelectorAll('.case-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Выделяем выбранный кейс
        document.querySelector(`[data-case="${caseType}"]`).classList.add('active');
        
        // Обновляем превью
        document.getElementById('case-preview-img').src = `images/${caseType}-case.jpg`;
        document.getElementById('selected-case-name').textContent = `${caseType.toUpperCase()} CASE`;
        document.getElementById('selected-case-price').textContent = `${this.casePrices[caseType]} ₽`;
        
        // Активируем кнопку открытия
        document.getElementById('open-case-btn').disabled = false;
    }
    
    openCase() {
        if (!this.selectedCase) {
            alert('Выберите кейс для открытия!');
            return;
        }
        
        const casePrice = this.casePrices[this.selectedCase];
        
        if (this.balance < casePrice) {
            alert('Недостаточно средств!');
            return;
        }
        
        // Спишем деньги
        this.balance -= casePrice;
        this.updateBalanceDisplay();
        
        // Запускаем анимацию открытия
        this.startOpeningAnimation();
    }
    
    startOpeningAnimation() {
        const animationElement = document.getElementById('opening-animation');
        const openBtn = document.getElementById('open-case-btn');
        
        // Показываем анимацию
        animationElement.classList.remove('hidden');
        openBtn.disabled = true;
        
        // Запускаем анимацию вращения
        const spinningItems = document.querySelector('.spinning-items');
        spinningItems.style.animation = 'spin 0.1s infinite linear';
        
        // Через 2 секунды останавливаем и показываем результат
        setTimeout(() => {
            this.stopAnimationAndShowResult();
        }, 2000);
    }
    
    stopAnimationAndShowResult() {
        const spinningItems = document.querySelector('.spinning-items');
        const resultItem = this.getRandomItem();
        
        // Останавливаем анимацию
        spinningItems.style.animation = 'none';
        
        // Показываем выигранный предмет
        this.showWonItem(resultItem);
        
        // Добавляем предмет в инвентарь
        this.inventory.push(resultItem);
        this.updateInventory();
        
        // Активируем кнопку открытия
        setTimeout(() => {
            document.getElementById('open-case-btn').disabled = false;
        }, 1000);
    }
    
    getRandomItem() {
        const items = this.caseItems[this.selectedCase];
        const totalProbability = items.reduce((sum, item) => sum + item.probability, 0);
        let random = Math.random() * totalProbability;
        
        for (const item of items) {
            random -= item.probability;
            if (random <= 0) {
                return { ...item };
            }
        }
        
        return items[items.length - 1];
    }
    
    showWonItem(item) {
        document.getElementById('won-item-img').src = item.image;
        document.getElementById('won-item-name').textContent = item.name;
        document.getElementById('won-item-rarity').textContent = this.getRarityText(item.rarity);
        document.getElementById('won-item-rarity').className = `item-rarity ${item.rarity}`;
    }
    
    getRarityText(rarity) {
        const rarityMap = {
            'consumer': 'Обычный',
            'industrial': 'Промышленный',
            'mil-spec': 'Армейский',
            'restricted': 'Запрещенный',
            'classified': 'Секретный',
            'covert': 'Тайный'
        };
        return rarityMap[rarity] || rarity;
    }
    
    updateBalanceDisplay() {
        const balanceElement = document.querySelector('.balance-amount');
        if (balanceElement) {
            balanceElement.textContent = `${this.balance} ₽`;
        }
    }
    
    updateInventory() {
        const inventoryGrid = document.getElementById('inventory-grid');
        if (!inventoryGrid) return;
        
        inventoryGrid.innerHTML = '';
        
        this.inventory.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="inventory-item-name">${item.name}</div>
                <div class="inventory-item-rarity ${item.rarity}">${this.getRarityText(item.rarity)}</div>
            `;
            inventoryGrid.appendChild(itemElement);
        });
    }
}

// Инициализация системы открытия кейсов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем HTML для баланса в секцию контрактов
    const contractsSection = document.getElementById('contracts');
    if (contractsSection) {
        const balanceInfo = document.createElement('div');
        balanceInfo.className = 'balance-info';
        balanceInfo.innerHTML = `Баланс: <span class="balance-amount">1000</span> ₽`;
        contractsSection.insertBefore(balanceInfo, contractsSection.firstChild.nextSibling);
    }
    
    // Инициализируем систему открытия кейсов
    window.caseSystem = new CaseOpeningSystem();
});
// Функция для перехода на страницу открытия кейса
function openCase(caseType) {
    window.location.href = `case-opening.html?case=${caseType}`;
}