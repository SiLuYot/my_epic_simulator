const skill = require('../Data/skill')
const hero = require('../Data/hero')
const element = require('../Data/element')

const heroManager = require('../Manager/heroManager')
const heroInstance = new heroManager.HeroManager();

const jsonManager = require('../Manager/jsonManager')
const jsonInstance = new jsonManager.JsonManager();

window.onload = () => {
    initHeroList()
}

function initHeroList() {    
    let heroList = document.getElementById("heroList");    
    let heroTable = jsonInstance.heroTable

    for (i = 0; i < heroTable.length; i++) {
        let op = new Option()
        op.value = i
        op.text = heroTable[i].name
        
        heroList.options.add(op)
    }
}

document.getElementById('simulate').onclick = () => {
    let heroList = document.getElementById("heroList");

    let index = heroList.selectedIndex

    let heroData = jsonInstance.heroTable[index]
    let baseHeroData = new hero.BaseHero(3000, 150, element.IndexToElement(heroData.element), heroData.skillSet)

    let msg = heroInstance.attackSimulate(baseHeroData, 2)

    alert(msg);
}