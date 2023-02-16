Vue.component('text-pages', {
    props: ['text_array'],
    template: `
        <div class="text_page">
            <p class="text_part" 
            v-for="item in text_array">
                {{item}}
            </p>
        </div>
    `
})

Vue.component('title-pages', {
    props: ['title'],
    template: `
        <div class="app__header">
            <h1>{{ title }}</h1>
        </div>
    `
})

const app = new Vue({
    el: '.main',
    data: {
        char_properties: {
            free_points: 5,
            mind: 0,
            stamina: 0,
            power: 0,
            char_name: "",
            class_name: "rogue",
        },
        curPage: 1,
        pages: pages,
        classDescription: class_description,
        textPage: "",
        titlePage: "",
        backgroundPage: "",
        showMainMenu: true,
        showCreatingChar: false,
        showReadingPage: false,
        showChoicePage: false,
        showInfoPage: false,
        showGameOverPage: false
    },
    
    methods: {
        ChangeSkillPoints(allowChange, skill, freePoints) {
            if(eval(allowChange)) {
                eval(skill);
                eval(freePoints);
            }
        },
        SaveDataChar() {
            localStorage.setItem('data_char', JSON.stringify(this.char_properties));
        },
        GoToCreating() {
            this.showMainMenu = false;
            this.showCreatingChar = true;
            this.showReadingPage = false;
        },
        GoToMainMenu() {
            this.showCreatingChar = true;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = false;
            this.showGameOverPage = false;
            this.showReadingPage = false;
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
            this.showCreatingChar = true;
            this.showMainMenu = false;
            this.showChoicePage = false;
            this.showInfoPage = true;
            this.showGameOverPage = false;
            this.showReadingPage = false;
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
            
            this.SaveDataChar();
            this.GoToReadingPage();
            this.GetTextPage();
            this.GetTitlePage();
            this.GetBackGroundPage();
        },
        GetTextPage() {
            let texts = [];

            for(let item of this.pages[this.curPage].text[this.char_properties.class_name]) {
                if((item.length > 1 && eval(item[1])) | item.length == 1)   //Отображать если в массиве один элемент или выполняется условие его отображения
                    texts.push(item[0]);
            }
            this.textPage = texts;
        },
        GetTitlePage() {
            this.titlePage = this.pages[this.curPage].place[this.char_properties.class_name];
        },
        GetBackGroundPage() {
            this.backgroundPage = this.pages[this.curPage].image[this.char_properties.class_name];
        }
    },

})

