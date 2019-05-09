const skill = require('../Data/skill')
const hero = require('../Data/hero')
const element = require('../Data/element')

const heroManager = require('../Manager/heroManager')
const heroInstance = new heroManager.HeroManager();

const dataManager = require('../Manager/dataManager')
const dataInstance = new dataManager.DataManager();

// let skill1 = new skill.BaseSkill(1.5, 0.95, 0)
// let skill2 = new skill.BaseSkill(1.2, 0.95, 0)
// let skillSet = new skill.SkillSet(skill1, skill2, null)

// let testHero = new hero.BaseHero(2504.5,207,new element.LightElement(), skillSet)

// heroManager = new manager.HeroManager()
// let msg = heroManager.attackSimulate(testHero, 0)

// alert(msg)

window.onload = () => {
    setHeroList()
}

function setHeroList() {
    let heroTable = []
    let table = dataInstance.heroTable

    table.forEach(data => {
        let array = data.skillSet.skillArray;
        let heroData = new hero.HeroData(data.name, element.IndexToElement(data.element),
            array[0].attackRate, array[0].pow, array[0].soulBunAttackRate,
            array[1].attackRate, array[1].pow, array[1].soulBunAttackRate,
            array[2].attackRate, array[2].pow, array[2].soulBunAttackRate)

        heroTable.push(heroData)
    });
    heroInstance.heroList = heroTable

    //let heroListForm = document.heroListForm;
    let heroList = document.getElementById("heroList");

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

    let heroData = heroInstance.heroList[index]
    let baseHeroData = new hero.BaseHero(3000, 150, heroData.element, heroData.skillSet)

    let msg = heroInstance.attackSimulate(baseHeroData, 2)

    alert(msg);
}