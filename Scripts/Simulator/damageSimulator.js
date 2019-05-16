const hero = require('../data/hero')
const element = require('../data/element')
const enemy = require('../data/enemy')
const skill = require('../data/skill')

const jsonInstance = require('../manager/jsonManager').instance

window.onload = () => {
    initHeroList()
}

function initHeroList() {
    let heroList = document.getElementById("heroList")
    let heroTable = jsonInstance.heroTable

    for (i = 0; i < heroTable.length; i++) {
        let op = new Option()
        op.value = i
        op.text = heroTable[i].name

        heroList.options.add(op)
    }
}

function getNumerator(heroSkill, hero, attackRate, skillMult, elementMult){
    const fixedConst = 1.871

    let atkTotal = hero.attack
    let powerTotal = fixedConst * heroSkill.pow
    let multTotal = skillMult * elementMult * powerTotal

    let skillAttribute = new skill.SkillAttribute(heroSkill.skillAttribute)
    let numerator = skillAttribute.getAdditionMult(hero, atkTotal, attackRate) * multTotal
    return numerator
}

function getDenominator(def, defMult){
    let enemyDefTotal = def * defMult
    let denominator = (enemyDefTotal / 300) + 1

    return denominator
}

function getDamageResult(numerator, denominator, criticalDmg, criticalMult, totalMult){
    const missConst = 0.75
    const nomarlConst = 1
    const hardConst = 1.3

    let damage = (numerator / denominator) * totalMult

    let hitMiss = (damage * missConst).toFixed(3)
    let hitNomarl = (damage * nomarlConst).toFixed(3)
    let hitHard = (damage * hardConst).toFixed(3)
    let hitCritical = (damage * criticalDmg * criticalMult).toFixed(3)

    let msg = `
    hitMiss         :   ${hitMiss}
    hitNormal       :   ${hitNomarl}
    hitHard         :   ${hitHard}
    hitCritical     :   ${hitCritical}    
    `
    return msg;
}

function calculateDamage(hero, enemy, useSkillIndex, skillMultValue) {
    let atkUp = document.getElementById("atkUp").checked
    let atkGreateUp = document.getElementById("atkGreateUp").checked
    let speedUp = document.getElementById("speedUp").checked
    let speedGreateUp = document.getElementById("speedGreateUp").checked
    let defUp = document.getElementById("defUp").checked
    let criticalDmgUp = document.getElementById("criticalDmgUp").checked

    let defDown = document.getElementById("defDown").checked
    let target = document.getElementById("target").checked

    let heroSkill = hero.skillArray[useSkillIndex]

    let atkMult = atkUp ? 1.5 : 1.0
    atkMult = atkGreateUp ? 1.75 : atkMult

    let speedMult = speedUp ? 1.3 : 1.0
    speedMult = speedGreateUp ? 1.45 : speedMult

    let defMult = defUp ? 1.6 : 1.0
    
    let skillMult = skillMultValue * 0.01 + 1
    let criticalMult = criticalDmgUp ? 1.5 : 1.0
    let elementMult = hero.element.isAdvantageElement(enemy.element) ? 1.1 : 1
    let totalMult = target ? 1.15 : 1.0
    
    let enemyDefMult = defDown ? 0.3 : 1.0

    hero.attack *= atkMult
    hero.speed *= speedMult
    hero.def *= defMult    

    let numerator = getNumerator(heroSkill, hero, heroSkill.attackRate,
        skillMult, elementMult)        
    let denominator = getDenominator(enemy.def, enemyDefMult)

    let msg = `
    Skill Index     :   ${useSkillIndex + 1}`
    msg += getDamageResult(numerator, denominator, hero.criticalDmg, criticalMult, totalMult)

    if (heroSkill.soulBunAttackRate !== 0) {
        let numerator = getNumerator(heroSkill, hero, heroSkill.soulBunAttackRate,
            skillMult, elementMult)           
        let denominator = getDenominator(enemy.def, enemyDefMult)
    
        msg += '\n    SoulBurn'
        msg += getDamageResult(numerator, denominator, hero.criticalDmg, criticalMult, totalMult)
    }

    msg += '----------------'

    return msg
}

document.getElementById('simulate').onclick = () => {
    let heroList = document.getElementById("heroList")
    let attackValue = document.getElementById("attack_value").value
    let criticalValue = document.getElementById("critical_value").value
    let skillMultValue1 = document.getElementById("skillMult_value1").value
    let skillMultValue2 = document.getElementById("skillMult_value2").value
    let skillMultValue3 = document.getElementById("skillMult_value3").value
    let speedValue = document.getElementById("speed_value").value
    let defValue = document.getElementById("def_value").value
    let hpValue = document.getElementById("hp_value").value
    let enemyElementValue = document.getElementById("enemy_element").value
    let enemyDefValue = document.getElementById("enemy_def").value

    let index = heroList.selectedIndex
    let heroTableData = jsonInstance.heroTable[index]

    let heroData = new hero.BaseHero(attackValue, criticalValue, speedValue, defValue, hpValue, element.IndexToElement(heroTableData.element), heroTableData.skillArray)
    let enemyData = new enemy.BaseEnemy(enemyDefValue, element.IndexToElement(enemyElementValue))

    let msg =
        calculateDamage(heroData, enemyData, 0, skillMultValue1) +
        calculateDamage(heroData, enemyData, 1, skillMultValue2) +
        calculateDamage(heroData, enemyData, 2, skillMultValue3)

    //결과에 표시
    document.getElementById('result').value = msg
}

document.getElementById('atkUp').onclick = () => {
    let isChecked = document.getElementById("atkUp").checked

    if (isChecked)
        document.getElementById("atkGreateUp").checked = !isChecked
}

document.getElementById('atkGreateUp').onclick = () => {
    let isChecked = document.getElementById("atkGreateUp").checked

    if (isChecked)
        document.getElementById("atkUp").checked = !isChecked
}

document.getElementById('speedUp').onclick = () => {
    let isChecked = document.getElementById("speedUp").checked

    if (isChecked)
        document.getElementById("speedGreateUp").checked = !isChecked
}

document.getElementById('speedGreateUp').onclick = () => {
    let isChecked = document.getElementById("speedGreateUp").checked
    
    if (isChecked)
        document.getElementById("speedUp").checked = !isChecked
}