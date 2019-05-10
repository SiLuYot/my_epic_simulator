const hero = require('../Data/hero')
const element = require('../Data/element')
const enemy = require('../Data/enemy')
const heroManager = require('../Manager/heroManager')
const heroInstance = new heroManager.HeroManager()

const jsonManager = require('../Manager/jsonManager')

window.onload = () => {
    jsonManager.instance.init(() => {
        initHeroList()
    })
}

function initHeroList() {
    let heroList = document.getElementById("heroList");
    let heroTable = jsonManager.instance.heroTable

    for (i = 0; i < heroTable.length; i++) {
        let op = new Option()
        op.value = i
        op.text = heroTable[i].name

        heroList.options.add(op)
    }
}

document.getElementById('simulate').onclick = () => {
    let heroList = document.getElementById("heroList")
    let attackValue = document.getElementById("attack_value").value
    let criticalValue = document.getElementById("critical_value").value

    let index = heroList.selectedIndex

    let heroData = jsonManager.instance.heroTable[index]
    let baseHeroData = new hero.BaseHero(attackValue, criticalValue, element.IndexToElement(heroData.element), heroData.skillSet)
    let testEnemy = new enemy.BaseEnemy(55, new element.EarthElement())
    
    let msg =   
    `
    공격받는 대상
    def         : ${testEnemy.def}
    element     : ${testEnemy.element.element}
    ` +
    heroInstance.attackSimulate(baseHeroData, testEnemy, 0) + 
    heroInstance.attackSimulate(baseHeroData, testEnemy, 1) + 
    heroInstance.attackSimulate(baseHeroData, testEnemy, 2)

    //결과에 표시
    document.getElementById('result').value = msg
}