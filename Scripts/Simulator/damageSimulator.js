const hero = require('../Data/hero')
const element = require('../Data/element')
const enemy = require('../Data/enemy')

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

function calculateDamage(hero, enemy, useSkillIndex, skillMultValue){
    let atkUp = document.getElementById("atkUp").checked;
    let atkGreateUp = document.getElementById("atkGreateUp").checked;
    let speedUp = document.getElementById("speedUp").checked;
    let speedGreateUp = document.getElementById("speedGreateUp").checked;
    let defUp = document.getElementById("defUp").checked;
    let criticalDmgUp = document.getElementById("criticalDmgUp").checked;

    let defDown = document.getElementById("defDown").checked;
    let target = document.getElementById("target").checked;

    const fixedConst = 1.871
    const missConst = 0.75
    const nomarlConst = 1
    const hardConst = 1.3

    let skill = hero.skillArray[useSkillIndex]

    let atkMult = atkUp ? 1.5 : 1.0
    let defMult = defDown ? 0.3 : 1.0
    let skillMult = skillMultValue * 0.01 + 1    
    let elementMult = hero.element.isAdvantageElement(enemy.element) ? 1.1 : 1

    //속도비례면 곱 아니면 더하기
    let flatMult = 0

    let atkTotal = hero.attack * atkMult
    let powerTotal = fixedConst * skill.pow
    let multTotal = skillMult * elementMult * powerTotal
    let defTotal = enemy.def * defMult
    let numerator = (atkTotal * skill.attackRate + flatMult) * multTotal
    let denominator = (defTotal / 300) + 1

    let damage = numerator / denominator

    let hitMiss = (damage * missConst).toFixed(3)
    let hitNomarl = (damage * nomarlConst).toFixed(3)
    let hitHard = (damage * hardConst).toFixed(3)
    let hitCritical = (damage * hero.criticalDmg).toFixed(3)

    let msg =
    `
    Skill Index     :   ${useSkillIndex + 1}
    hitMiss         :   ${hitMiss}
    hitNormal       :   ${hitNomarl}
    hitHard         :   ${hitHard}
    hitCritical     :   ${hitCritical}
    ------------------------------
    `
    return msg
}

document.getElementById('simulate').onclick = () => {
    let heroList = document.getElementById("heroList")
    let attackValue = document.getElementById("attack_value").value
    let criticalValue = document.getElementById("critical_value").value
    let skillMultValue = document.getElementById("skillMult_value").value
    let enemyElementValue = document.getElementById("enemy_element").value
    let enemyDefValue = document.getElementById("enemy_def").value

    let index = heroList.selectedIndex
    let heroTableData = jsonManager.instance.heroTable[index]

    let heroData = new hero.BaseHero(attackValue, criticalValue, element.IndexToElement(heroTableData.element), heroTableData.skillArray)
    let enemyData = new enemy.BaseEnemy(enemyDefValue, element.IndexToElement(enemyElementValue))
    
    let msg =
    calculateDamage(heroData, enemyData, 0, skillMultValue) + 
    calculateDamage(heroData, enemyData, 1, skillMultValue) + 
    calculateDamage(heroData, enemyData, 2, skillMultValue)

    //결과에 표시
    document.getElementById('result').value = msg
}