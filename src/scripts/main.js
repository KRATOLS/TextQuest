import { pages, events, class_description, place_styles, weapons } from './const.js'      

// запрещаем вызов стандартного меню
document.oncontextmenu = function() {return false;};

Vue.component('text-pages', {
    props: ['text_array', 'style_obj'],
    template: `
        <div class="text_page">
            <p class="text_part" :style="style_obj"
            v-for="item in text_array">
                {{item}}
            </p>
        </div>
    `
})

Vue.component('title-pages', {
    props: ['title', 'style_obj'],
    template: `
        <div class="app__header" :style="style_obj">
            <h1>{{ title }}</h1>
        </div>
    `
})

Vue.component('actions-pages', {
    props: ['actions'],
    template: `
        <div class="choices" v-html="actions"></div>
    `
})

Vue.component('inventory-pages', {
    props: ['inventory'],
    template: `
        <div class="inventory__grid" v-html="inventory" ref="inv"></div>
    `
})

Vue.component('item-info', {
    props: ['item'],
    template: `
        <div v-if="item !== null">
            <h1>{{ item.name }}</h1>
            <p>{{ item.description }}</p>
            <p v-if="item.properties_desc !== null">{{ item.properties_desc }}</p>
        </div>
    `
})

const app = new Vue({
    el: '.main',
    data: {
        char_properties: localStorage.getItem('data_char') ? JSON.parse(localStorage.getItem('data_char')) : {
            free_points: 5,
            mind: 0,
            stamina: 0,
            power: 0,
            char_name: "",
            class_name: "rogue",
        },
        curPage: localStorage.getItem('current_game') ? localStorage.getItem('current_game') : 0,
        total_class_games: localStorage.getItem('total_class_games') ? JSON.parse(localStorage.getItem('total_class_games')) : {
            rogue: {'Побед': 0, 'Поражений': 0},
            mage: {'Побед': 0, 'Поражений': 0},
            warrior: {'Побед': 0, 'Поражений': 0},
        },
        total_games : localStorage.getItem('total_games') ? localStorage.getItem('total_games') : 0,
        inventory: localStorage.getItem('inventory') ? JSON.parse(localStorage.getItem('inventory')) : [
            null, null, null, null, 
            null, null, null, null, null
        ],
        selectedItem: "",
        inventoryPage: "",
        previousPage: 0,
        pages: pages,
        classDescription: class_description,
        textPage: [],
        titlePage: "",
        actionsPage: [],
        events: events,
        stylesTextPages: {},
        stylesTitlePages: {},
        place_styles: place_styles,
        backgroundPage: "",
        showMainMenu: true,
        showCreatingChar: false,
        showReadingPage: false,
        showChoicePage: false,
        showInfoPage: false,
        showGameOverPage: false,
        showGameWinPage: false,
        showInventory: false
    },
    methods: {
        /*Вспомогательные Геттеры*/
        GetPlace() {
            return this.pages[this.curPage].place[this.char_properties.class_name];
        },
        /*Методы отрисовки*/
        GetStylesForTextPages() {
            if (this.GetPlace() in place_styles)
                this.stylesTextPages = this.place_styles[this.GetPlace()]['text-pages'];
        },
        GetStylesForTitlePages() {
            if (this.GetPlace() in place_styles)
                this.stylesTitlePages = this.place_styles[this.GetPlace()]['title-pages'];
        },
        /*Изменение характеристик персонажа в зависимости от доступных очков*/
        ChangeSkillPoints(allowChange, skill, freePoints) {
            if(eval(allowChange)) {
                eval(skill);
                eval(freePoints);
            }
        },
        /*Сохранение данных игры*/
        SaveDataChar() {
            localStorage.setItem('data_char', JSON.stringify(this.char_properties));
        },
        SaveCurrentGame() {
            localStorage.setItem('current_game', this.curPage);
        },
        SaveInventoryItems() {
            localStorage.setItem('inventory',JSON.stringify(this.inventory));
        },
        /*Переходы между страницами*/
        GoToCreating() {
            let input_name = document.querySelector('.inputs__creating input');
            input_name.value = "";

            this.char_properties = {
                free_points: 5,
                mind: 0,
                stamina: 0,
                power: 0,
                char_name: "",
                class_name: "rogue",
            }
            this.inventory = [
                null, null, null, null,
                null, null, null, null, null
            ],
            this.showMainMenu = false;
            this.showCreatingChar = true;
            this.showReadingPage = false;
        },
        GoToMainMenu() {
            this.showCreatingChar = false;
            this.showMainMenu = true;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showGameOverPage = false;
            this.showReadingPage = false;
            this.showGameWinPage = false;
            this.showInventory = false;
        },
        GoToReadingPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showGameOverPage = false;
            this.showReadingPage = true;
            this.showInventory = false;
        },
        GoToChoicePage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = true;
            this.showInfoPage = false;
            this.showGameOverPage = false;
            this.showReadingPage = false;
            this.showInventory = false;
        },
        GoToInfoPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = true;
            this.showGameOverPage = false;
            this.showReadingPage = false;
            this.showInventory = false;
        },
        GoToInventory() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showGameOverPage = false;
            this.showReadingPage = false;
            this.showInventory = true;
        },
        GoToGameOverPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showGameOverPage = true;
            this.showReadingPage = false;
            this.showInventory = false;
            this.total_games++;
            this.total_class_games[this.char_properties.class_name]['Поражений']++;
            localStorage.removeItem('data_char');
            localStorage.removeItem('inventory');
            localStorage.removeItem('current_game');
            localStorage.setItem('total_class_games', JSON.stringify(this.total_class_games));
            localStorage.setItem('total_games', this.total_games);
        },
        GoToGameWinPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showReadingPage = false;
            this.showGameWinPage = true;
            this.showInventory = false;
            this.inventoryPage = "";
            this.total_games++;
            this.total_class_games[this.char_properties.class_name]['Побед']++;
            localStorage.removeItem('data_char');
            localStorage.removeItem('current_game');
            localStorage.removeItem('inventory');
            localStorage.setItem('total_class_games', JSON.stringify(this.total_class_games));
            localStorage.setItem('total_games', this.total_games);
        },
        ContinueGame() {
            /*Отрисовываем последнюю страницу*/
            this.UpdatePage()
        },
        /*Валидация в меню*/
        ValidCreatingChar() {
            let input_name = document.querySelector('.inputs__creating input');

            if(input_name.value !== "" & input_name.value !== null){
                if (input_name.value.length < 3) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Упс(',
                        text: 'Длина имени должна быть не меньше трёх символов'
                    })
                    return;
                }
                else {
                    this.char_name = input_name.value;
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Упс(',
                    text: 'Вы забыли назвать персонажа'
                })
                return;
            }

            if (this.char_properties.free_points > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Упс(',
                    text: 'У вас остались неизрасходованные очки талантов'
                })
                return;
            }
            this.curPage = 1;
            this.StartSetInventory();
            this.UpdatePage();
        },
        /*Обновление страницы для перехода на новую*/
        UpdatePage() {
            if(this.curPage != 'defeat' & 
               this.curPage != 'win' & 
               this.curPage != 'inventory'
             ){
                this.GetStylesForTextPages();
                this.GetStylesForTitlePages();
                this.GetTextPage();
                this.GetTitlePage();
                this.GetBackGroundPage();
                this.SaveDataChar();
                this.SaveCurrentGame();
            }
            switch(this.pages[this.curPage].type) {
                case 'reading':
                    this.GoToReadingPage();
                    break;
                case 'choice':
                    this.GoToChoicePage();
                    this.GetActionsPage();
                    break;
                case 'inventory_page':
                    this.FillInventoryIcons();
                    this.GoToInventory();
                    break;
                case 'info':
                    this.GoToInfoPage();
                    break;
                case 'win_game':
                    this.GoToGameWinPage();
                    break;
                default:
                    this.GoToGameOverPage();
            }
        },
        /*Определение номера следующей страницы в зависимости от типа предыдущей*/
        NextPageAfterReading() {
            this.previousPage = this.curPage;
            this.curPage = this.pages[this.curPage].next_page;
            this.UpdatePage();
        },
        NextPageAfterChoice() {
            let radio_btns = document.querySelectorAll('.radio_btn');
            for(let item of radio_btns) {
                if(item.checked) {
                    if (this.pages[this.curPage].actions[this.char_properties.class_name][item.value][0].length > 2)
                        eval(this.pages[this.curPage].actions[this.char_properties.class_name][item.value][0][2]);
                    this.previousPage = this.curPage;
                    this.curPage = this.pages[this.curPage].actions[this.char_properties.class_name][item.value][0][1];
                    this.UpdatePage();
                    break;
                }
            }
        },
        /*Получение данных о предыдущей странице и прсвоение её текущей для возврата к ранее посещённой странице*/
        PreviousPageBeforeInfo() {
            this.curPage = this.previousPage;
            this.UpdatePage();
        },
        /*Получение главного текста для страницы*/
        GetTextPage() {
            let texts = [];

            for(let item of this.pages[this.curPage].text[this.char_properties.class_name]) {
                if((item.length > 1 && eval(item[1])) | item.length == 1)   //Отображать если в массиве один элемент или выполняется условие его отображения
                    texts.push(item[0]);
            }
            this.textPage = texts;
        },
        /*Получение массива действий для страницы выбора*/
        GetActionsPage() {
            let actions = "";
            let index = 0;

            for(let item of this.pages[this.curPage].actions[this.char_properties.class_name]) {
                if(item.length == 1 | (item.length > 1 && eval(item[1]))) {
                    actions += `<label><input class="radio_btn" type="radio" name="action" value="${index}" checked>
                    <span>${item[0][0]}</span></label>`;    
                }
                index++;
            }
            this.actionsPage = actions;
        },
        /*Получение заголовка для страницы*/
        GetTitlePage() {
            this.titlePage = this.pages[this.curPage].place[this.char_properties.class_name];
        },
        /*Получение фонового изображения для картинки*/
        GetBackGroundPage() {
            this.backgroundPage = this.pages[this.curPage].image[this.char_properties.class_name];
        },
        /*Инвентарь*/
        /*Ищем свободные слоты*/
        GetFreeSlots() {
            for(let i=0; i < this.inventory.length; i++) {
                if(this.inventory[i] === null) {
                    return i;
                }
            }
            return null;
        },
        /*Добавляем оружие в инвентарь*/
        AddWeapon(weapon) {
            let free_slot = this.GetFreeSlots(); 
            if (free_slot !== null){
                this.inventory[free_slot] = weapon
                this.SaveInventoryItems()
            }
        },
        /*Инициализируем стартовый набор в инвентаре*/
        StartSetInventory() {
            if(this.char_properties.class_name == 'rogue') {
                this.inventory[0] = weapons.SimpleArch;
                this.inventory[1] = weapons.LightDoubleSwords;
            }
        },
        /*Заполняем инвентарь иконками*/
        FillInventoryIcons() {
            let html = "";

            for(let i=0; i < this.inventory.length; i++) {
                if(this.inventory[i] !== null) {
                    html += `
                        <div id="${i}" class="inventory__grid__item busy">
                            <img src="${this.inventory[i].image}" alt="inventoryItem">
                        </div>
                    `;
                }
                else {
                    html += `
                        <div id="${i}" class="inventory__grid__item free"></div>
                    `
                }
            }
            this.inventoryPage = html;
        },
        /*Удаляем прдемет из инвентаря*/
        RemoveInventoryItemById(id) {
            this.inventory[id] = null;
        },
        /*Получить выбранный предмет по id*/
        GetSelectedItemById(id) {
            this.selectedItem = this.inventory[id];
        }
    },

})
/*Обработчики событий*/
/*Добавление обработчика событий для кнопок выбора класса в меню создания персонажа*/
document.addEventListener("click", function(e) {
    let elem = e.target;
    if(elem.closest('.class__icons') == null)
        return;

    let warrior = document.querySelector('.class__warrior .btn');
    let rogue = document.querySelector('.class__rogue .btn');
    let mage = document.querySelector('.class__mage .btn');
    
    if (elem.closest('.class__warrior') != null){
        warrior.classList.add('classname_warrior_color');
        rogue.classList.remove('classname_rogue_color');
        mage.classList.remove('classname_mage_color');
    }
    else if (elem.closest('.class__rogue') != null) {
        warrior.classList.remove('classname_warrior_color');
        rogue.classList.add('classname_rogue_color');
        mage.classList.remove('classname_mage_color');
    }
    else if (elem.closest('.class__mage') != null) {
        warrior.classList.remove('classname_warrior_color');
        rogue.classList.remove('classname_rogue_color');
        mage.classList.add('classname_mage_color');
    }
    else {
        return;
    }
})
document.addEventListener("click", function(event) {
    let elem = event.target;

    if(elem.closest('.context-menu') !== null){
        let id = elem.closest('.inventory__grid__item.busy').id;
        
        if(elem.classList[0] == 'remove') {
            app.RemoveInventoryItemById(id);
            app.UpdatePage();
            // document.querySelector('.context-menu').remove();
        }
        else if(elem.classList[0] == 'info') {
            app.GetSelectedItemById(id);
            document.querySelector('.context-menu').remove();
        }
        else
            document.querySelector('.context-menu').remove();
    }   
    else if(elem.closest('.inventory__grid__item.busy') != null) {

        if (document.querySelector('.context-menu') != null) {
            document.querySelector('.context-menu').remove();
        }
        let menu = document.createElement('div');
        menu.classList.add('context-menu');
        menu.setAttribute("style", `
            left: ${event.pageX}px;
            top: ${event.pageY}px 
        `
        )
        menu.innerHTML = `
        <ul>
            <li><a href="#" class="remove">Удалить предмет</a></li>
            <li><a class="info" href="#" data-hystmodal="#myModal">Инфо</a></li>
            <li><a href="#" class="close">Закрыть</a></li>
        </ul>
        `
        // document.body.append(menu);

        // console.log(elem.closest('.inventory__grid__item.busy'));
        elem.closest('.inventory__grid__item.busy').append(menu);
    }
    else {
        return;
    }
})
const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    // настройки (не обязательно), см. API
});
