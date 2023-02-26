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
        showGameWinPage: false
    },
    methods: {
        /*Геттеры*/
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
        ChangeSkillPoints(allowChange, skill, freePoints) {
            if(eval(allowChange)) {
                eval(skill);
                eval(freePoints);
            }
        },
        SaveDataChar() {
            localStorage.setItem('data_char', JSON.stringify(this.char_properties));
        },
        SaveCurrentGame() {
            localStorage.setItem('current_game', this.curPage);
        },
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
        },
        GoToReadingPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showGameOverPage = false;
            this.showReadingPage = true;
        },
        GoToChoicePage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = true;
            this.showInfoPage = false;
            this.showGameOverPage = false;
            this.showReadingPage = false;
        },
        GoToInfoPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = true;
            this.showGameOverPage = false;
            this.showReadingPage = false;
        },
        GoToGameOverPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showGameOverPage = true;
            this.showReadingPage = false;
            this.total_games++;
            this.total_class_games[this.char_properties.class_name]['Поражений']++;
            localStorage.removeItem('data_char');
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
            this.total_games++;
            this.total_class_games[this.char_properties.class_name]['Побед']++;
            localStorage.removeItem('data_char');
            localStorage.removeItem('current_game');
            localStorage.setItem('total_class_games', JSON.stringify(this.total_class_games));
            localStorage.setItem('total_games', this.total_games);
        },
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
            this.UpdatePage();
        },
        UpdatePage() {
            if(this.curPage != 'defeat' & this.curPage != 'win') {
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
        NextPageAfterReading() {
            this.previousPage = this.curPage;
            this.curPage = this.pages[this.curPage].next_page;
            this.UpdatePage();
        },
        NextPageAfterChoice() {
            let radio_btns = document.querySelectorAll('.radio_btn');
            for(item of radio_btns) {
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
        PreviousPageBeforeInfo() {
            this.curPage = this.previousPage;
            this.UpdatePage();
        },
        GetTextPage() {
            let texts = [];

            for(let item of this.pages[this.curPage].text[this.char_properties.class_name]) {
                if((item.length > 1 && eval(item[1])) | item.length == 1)   //Отображать если в массиве один элемент или выполняется условие его отображения
                    texts.push(item[0]);
            }
            this.textPage = texts;
        },
        GetActionsPage() {
            let actions = "";
            let index = 0;

            for(let item of this.pages[this.curPage].actions[this.char_properties.class_name]) {
                if(item.length == 1 | (item.length > 1 && eval(item[1]))) {
                    actions += `<label><input class="radio_btn" type="radio" name="action" value="${index}" checked>
                    <span>${item[0][0]}</span></label>`;
                    
                }
                if(item.length > 1 && !eval(item[1])) {
                    actions += `<label><input class="radio_btn" type="radio" name="action" v-bind:value="i" checked style="display:none">
                    <span style="display:none">${item[0][0]}</span></label>`;
                }
                index++;
            }
            this.actionsPage = actions;
        },
        GetTitlePage() {
            this.titlePage = this.pages[this.curPage].place[this.char_properties.class_name];
        },
        GetBackGroundPage() {
            this.backgroundPage = this.pages[this.curPage].image[this.char_properties.class_name];
        },
    },

})
document.addEventListener("click", function(e) {
    elem = e.target;
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
