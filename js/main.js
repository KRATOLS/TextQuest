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
        curReadingPage: 1,
        curChoicePage: 0,
        curTotalPage: 0,
        readingPages: reading_pages,
        classDescription: class_description,
        showMainMenu: false,
        showCreatingChar: false,
        showReadingPage: true
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
            this.showReadingPage = false;
        },
        GoToReadingPage() {
            this.showCreatingChar = false;
            this.showMainMenu = false;
            this.showReadingPage = true;
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
        }
    },

})

