class CaseOpeningSystem {
    constructor() {
        this.balance = 1000;
        this.selectedCase = null;
        this.caseData = null;
        this.isOpening = false;
        this.currentWonItem = null;
        
        this.caseDatabase = {
            mirage: {
                name: "MIRAGE CASE",
                price: 100,
                itemsCount: "39 предметов",
                image: "https://via.placeholder.com/200x200/1a1a1a/ffffff?text=MIRAGE+CASE",
                items: [
                    { name: "Glock-18 | Водные элементы", rarity: "consumer", probability: 40, price: 100 },
                    { name: "UMP-45 | Осциллятор", rarity: "industrial", probability: 30, price: 220 },
                    { name: "P2000 | Имперский дракон", rarity: "mil-spec", probability: 20, price: 450 },
                    { name: "AWP | Электрический hive", rarity: "restricted", probability: 8, price: 800 },
                    { name: "AK-47 | Красная линия", rarity: "restricted", probability: 2, price: 1500 },
                    { name: "Нож | Бабочка | Ультрафиолет", rarity: "extraordinary", probability: 1, price: 50000 }
                ]
            },
            nuke: {
                name: "NUKE CASE", 
                price: 150,
                itemsCount: "39 предметов",
                image: "https://via.placeholder.com/200x200/1a1a1a/ffffff?text=NUKE+CASE",
                items: [
                    { name: "MP9 | Бильярдная", rarity: "consumer", probability: 40, price: 150 },
                    { name: "P90 | Холодное кровотечение", rarity: "industrial", probability: 25, price: 300 },
                    { name: "Desert Eagle | Коричневый жук", rarity: "mil-spec", probability: 20, price: 600 },
                    { name: "M4A1-S | Золотая катушка", rarity: "restricted", probability: 10, price: 1200 },
                    { name: "AWP | Дракон Лора", rarity: "restricted", probability: 4, price: 3000 },
                    { name: "Нож | Скелетный | Матовый", rarity: "extraordinary", probability: 1, price: 75000 }
                ]
            },
            ancient: {
                name: "ANCIENT CASE",
                price: 200,
                itemsCount: "37 предметов", 
                image: "https://via.placeholder.com/200x200/1a1a1a/ffffff?text=ANCIENT+CASE",
                items: [
                    { name: "USP-S | Килконфёрмд", rarity: "consumer", probability: 35, price: 200 },
                    { name: "M4A4 | Зевс-Ксено", rarity: "industrial", probability: 25, price: 400 },
                    { name: "M4A4 | Король драконов", rarity: "mil-spec", probability: 20, price: 900 },
                    { name: "AWP | Гиперзверь", rarity: "restricted", probability: 15, price: 2000 },
                    { name: "AK-47 | Огненная змея", rarity: "restricted", probability: 4, price: 8000 },
                    { name: "Нож | Коготь | Тигровый зуб", rarity: "extraordinary", probability: 1, price: 100000 }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.getSelectedCaseFromURL();
        this.setupEventListeners();
        this.createItemsTrack();
        this.updateBalanceDisplay();
    }
    
    getSelectedCaseFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const caseType = urlParams.get('case');
        
        if (caseType && this.caseDatabase[caseType]) {
            this.selectedCase = caseType;
            this.caseData = this.caseDatabase[caseType];
            this.updateCaseInfo();
        } else {
            window.location.href = 'index.html';
        }
    }
    
    updateCaseInfo() {
        const caseImg = document.getElementById('large-case-img');
        const caseName = document.getElementById('large-case-name');
        const casePrice = document.getElementById('large-case-price');
        const caseItems = document.getElementById('large-case-items');
        
        if (caseImg) caseImg.src = this.caseData.image;
        if (caseName) caseName.textContent = this.caseData.name;
        if (casePrice) casePrice.textContent = `${this.caseData.price} ₽`;
        if (caseItems) caseItems.textContent = this.caseData.itemsCount;
    }
    
    createItemsTrack() {
        const track = document.getElementById('items-track');
        if (!track) {
            return;
        }
        
        track.innerHTML = '';
        
        for (let cycle = 0; cycle < 15; cycle++) {
            this.caseData.items.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = `track-item rarity-${item.rarity}`;
                itemElement.innerHTML = `
                    <div class="item-content">
                        <div class="weapon-name">${item.name.split(' | ')[0]}</div>
                        <div class="skin-name">${item.name.split(' | ')[1]}</div>
                        <div class="item-rarity">${this.getRarityDisplayName(item.rarity)}</div>
                        <div class="item-price">${item.price} ₽</div>
                    </div>
                `;
                track.appendChild(itemElement);
            });
        }
    }

    setupEventListeners() {
        const openBtn = document.getElementById('open-case-btn');
        if (!openBtn) {
            return;
        }
        
        openBtn.addEventListener('click', () => {
            this.openCase();
        });
    }
    
    openCase() {
        if (this.isOpening) {
            return;
        }
        
        if (this.balance < this.caseData.price) {
            alert('Недостаточно средств для открытия кейса!');
            return;
        }
        
        this.isOpening = true;
        this.balance -= this.caseData.price;
        this.updateBalanceDisplay();
        
        this.startOpeningAnimation();
    }
    
    startOpeningAnimation() {
        const openBtn = document.getElementById('open-case-btn');
        if (openBtn) {
            openBtn.disabled = true;
            openBtn.textContent = 'Открывается...';
        }

        this.currentWonItem = this.getRandomItem();
        
        this.animateItemsTrack();
    }

    animateItemsTrack() {
        const track = document.getElementById('items-track');
        if (!track) {
            return;
        }
        
        track.style.transition = 'none';
        track.style.transform = 'translateX(0px)';
        
        const stopPosition = -Math.random() * 8000 - 4000;
        
        setTimeout(() => {
            track.style.transition = 'transform 3s cubic-bezier(0.1, 0.8, 0.2, 1)';
            track.style.transform = `translateX(${stopPosition}px)`;
            
            setTimeout(() => {
                this.showResult();
            }, 3200);
            
        }, 100);
    }
    
    showResult() {
        if (!this.currentWonItem) {
            return;
        }
        
        const resultSection = document.getElementById('result-section');
        if (!resultSection) {
            return;
        }
        
        resultSection.innerHTML = `
            <div class="result-content">
                <h3>🎉 Поздравляем! Вы выиграли:</h3>
                <div class="won-item-large">
                    <div class="won-item-info-large">
                        <div class="item-name-large">
                            <div class="won-weapon-name">${this.currentWonItem.name.split(' | ')[0]}</div>
                            <div class="won-skin-name">${this.currentWonItem.name.split(' | ')[1]}</div>
                        </div>
                        <div class="item-rarity-large rarity-${this.currentWonItem.rarity}">
                            ${this.getRarityDisplayName(this.currentWonItem.rarity)}
                        </div>
                        <div class="item-price-estimate">
                            Примерная стоимость: <span>${this.currentWonItem.price} ₽</span>
                        </div>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="action-btn" onclick="openAgain()">🎁 Открыть еще раз</button>
                    <button class="action-btn secondary" onclick="goBack()">← Вернуться</button>
                </div>
            </div>
        `;
        
        resultSection.classList.remove('hidden');
        
        const openBtn = document.getElementById('open-case-btn');
        if (openBtn) {
            openBtn.disabled = false;
            openBtn.textContent = 'Открыть кейс';
        }
        
        this.isOpening = false;
    }
    
    getRandomItem() {
        const items = this.caseData.items;
        const totalProbability = items.reduce((sum, item) => sum + item.probability, 0);
        let random = Math.random() * totalProbability;
        
        for (const item of items) {
            random -= item.probability;
            
            if (random <= 0) {
                return { 
                    name: item.name, 
                    rarity: item.rarity, 
                    price: item.price
                };
            }
        }
        
        return { ...items[items.length - 1] };
    }

    getRarityDisplayName(rarity) {
        const rarityNames = {
            'consumer': 'Армейское качество',
            'industrial': 'Промышленное качество', 
            'mil-spec': 'Армейское',
            'restricted': 'Запрещенное',
            'extraordinary': 'Засекреченное'
        };
        return rarityNames[rarity] || rarity;
    }
    
    updateBalanceDisplay() {
        const balanceElement = document.querySelector('.balance-amount');
        if (balanceElement) {
            balanceElement.textContent = `${this.balance} ₽`;
        }
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function openAgain() {
    const resultSection = document.getElementById('result-section');
    if (resultSection) {
        resultSection.classList.add('hidden');
        resultSection.innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.caseOpeningSystem = new CaseOpeningSystem();
});