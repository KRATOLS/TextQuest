pages = {
    1: { 
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Вы член шайки отчаянных головорезов известных в широких кругах, как "Кровавые клинки". До вашего предводителя дошли о том, что весьма богатый торговый караван должен пересечь границы Леса теней, планируя тем самым сократить маршрут. Вы тщательно спланировали засаду, и вам в этом деле отведена роль разведчика, который должен заблаговременно предупредить о приближении цели.'], 
                ['В обозначенное время вы заняли позицию на дереве недалеко от дороги, по которой должен был ехать караван.'],
                ['Прошло много времени спустя, прежде чем отдалённо послышались стуки копыт и на горизонте начали виднеться фигуры людей.']
            ],
            mage: [],
            warrior: []
        },
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "reading",
        next_page: 2,
    },
    2: {
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Наконец, караван приближается к вам, и вы понимаете, что его сопровождают рыцари королевской армии – отборнейшие воины, которые явно не по зубам даже вашей матёрой шайке.']
            ],
            mage: [],
            warrior: []
        },
        actions: {
            rogue: [
                [['Осмотреть рыцарей', 3]],
                [['Ерунда я и один справлюсь. Атаковать караван', 4, "this.events.sayUnluckyAttack = true"]],
                [['Бежать к своим. Нужно скорее предупредить их', 5]]
            ],
            mage: [],
            warrior: []
        },
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "choice",
    },
    3: {
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Вы видите закованных в латы и вооружённых до зубов воинов, готовых сразить любого, кто встанет у них на пути. Похоже, информатор вас надул и вместо обычных торговцев навёл вас на сборщиков податей.']
            ],
            mage: [],
            warrior: []
        },
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "info",
    },
    4: {
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Вы подбираете момент и стреляете из лука в одного из рыцарей, скачущего впереди. К несчастью, стрела отскочила от доспеха и теперь враги знают о вашем присутствии.']
            ],
            mage: [],
            warrior: []
        },
        actions: [
            [['Меня не сломить! Продолжить атаку', 6]],
            [['Чёрт, надо удирать! Бегите к своим', 5]],
        ],
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "choice",
    },
    5:  { 
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Вы со всех ног несётесь к своим побратимам в надежде найти их как можно быстрее и предупредить об опасности. Вы понимаете, что рисковать нельзя, какая бы добыча ни стояла на кону. С таким противником у вас нет и шанса на успех'], 
            ],
            mage: [],
            warrior: []
        },
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "reading",
        next_page: 7,
    },
    6: {
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Вы отчаянно бросились на врага с парой кинжалов, но закалённый сражениями воин без труда отразил ваш выпад и следующим резким движением снёс вам голову.']
            ],
            mage: [],
            warrior: []
        },
        type: "end",
    },
    7:  { 
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Наконец, вы добрались до своих товарищей. Едва переведя дух, вы тут же принялись объяснять вашему предводителю и остальным участникам операции что к чему.'], 
                ['Также вы признались, что в результате вашей глупой атаки на одного из воинов сопровождения, они наверняка будут готовы к нападению', "this.events.sayUnluckyAttack"],
                ['В конце вашего рассказа всем стало понятно, что дело дрянь. Однако несмотря на это, ваш предводитель твёрдо решил действовать по плану и не отступать. Сундуки, доверху набитые золотом… Когда ещё так повернётся удача? Этих денег хватит, чтобы обеспечить себя на всю оставшуюся жизнь и больше никогда не придётся брать в руки оружие. Так он мотивировал вас не бросать дело'],
            ],
            mage: [],
            warrior: []
        },
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "reading",
        next_page: 8,
    },
    8:  { 
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Речь главаря вас приободрила, и вы вместе с остальными решили поддаться зову судьбы и сразиться за беззаботное будущее. Вы и ваши товарищи заняли свои боевые позиции в ожидании появления противника.'], 
            ],
            mage: [],
            warrior: []
        },
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "reading",
        next_page: 9,
    },
    9: { 
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Некоторое время спустя на дороге появился караван вместе с сопровождающими его со всех сторон охранниками. Ваш предводитель даёт сигнал к атаке правому флангу.'], 
                ['Они должны выманить основные силы противника на себя, в то время как вы должны будете подойти к каравану с тыла и взять в заложники сборщиков.'],
                ['Ваши товарищи вступили в бой и какое-то время вы наблюдали за схваткой. Через некоторое время вам дают сигнал, и вы вместе со своими товарищами заходите к каравану в обход с левого фланга. '],
            ],
            mage: [],
            warrior: []
        },
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "reading",
        next_page: 10,
    },
    10: {
        place: {
            rogue: 'Лес теней',
            mage: '',
            warrior: ''
        },
        text: {
            rogue: [
                ['Путь к карете сборщиков вам преградили телохранители. С одним из них вы вступаете в схватку. Как планируете атаковать противника?']
            ],
            mage: [],
            warrior: []
        },
        actions: [
            [['Выстрелить из лука', 11], '!this.events.seeGuard'],
            [['Атаковать парными кинжалами', 12]],
            [['Оглядеть противника', 13, 'this.events.seeGuard = true']],
            [['Выстрелить в незакрытое место', 14], 'this.events.seeGuard']
        ],
        image: {
            rogue: '1_reading.jpeg',
            mage: '',
            warrior: ''
        },
        type: "choice",
    },
},
events = {
    sayUnluckyAttack: false,        //Неудачная атака стр.2;
    seeGuard: false                 //Оглядеть стражника стр.10;
}

class_description = {
    warrior: 'Мастер владения оружием ближнего боя. Имеет повышенную выносливость и устойчивость к физическому урону',
    rogue: 'Профессионально владеет оружием дальнего боя. Имеет способность взламывать замки и устойчивость к ядам',
    mage: 'Знаток магических искусств. Использует силы стихий для обороны и нападения. Имеет дар к убеждению'
}   