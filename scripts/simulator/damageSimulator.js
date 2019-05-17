'use strict'

const hero = require('../data/hero')
const element = require('../data/element')
const enemy = require('../data/enemy')

const jsonInstance = require('../manager/jsonManager').instance

window.onload = () => {
    initHeroList()
    initEnemyElementTable()
}

function initHeroList() {
    let heroList = document.getElementById("heroList")
    let heroTable = jsonInstance.heroTable

    for (let i = 0; i < heroTable.length; i++) {
        let op = new Option()
        op.value = i
        op.text = heroTable[i].name

        heroList.options.add(op)
    }
}

function initEnemyElementTable() {
    let element_kind = document.getElementById("enemy_element")
    for (let i = 0; i < element.ElementTable.length; i++) {
        let op = new Option()
        op.value = i
        op.text = element.ElementTable[i].name

        if (i === 2)    //기본값 자연속성
            op.selected = 'selected'

        element_kind.add(op)
    }
}

function getNumerator(heroSkill, hero, attackRate, skillMult, elementMult) {
    const fixedConst = 1.871

    let powerTotal = fixedConst * heroSkill.pow
    let multTotal = skillMult * elementMult * powerTotal

    let numerator = heroSkill.getAdditionMult(hero, attackRate) * multTotal
    return numerator
}

function getDenominator(def, defMult) {
    let enemyDefTotal = def * defMult
    let denominator = (enemyDefTotal / 300) + 1

    return denominator
}

function getDamageResult(numerator, denominator, criticalDmg, criticalMult, totalMult) {
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

function getAtkMult() {
    let atkUp = document.getElementById("atkUp").checked
    let atkGreateUp = document.getElementById("atkGreateUp").checked
    let value = 1.0

    if (atkGreateUp) {
        value = 1.75
    }
    else if (atkUp) {
        value = 1.5
    }
    return value
}

function getSpeedMult() {
    let speedUp = document.getElementById("speedUp").checked
    let speedGreateUp = document.getElementById("speedGreateUp").checked
    let value = 1.0

    if (speedGreateUp) {
        value = 1.45
    }
    else if (speedUp) {
        value = 1.3
    }
    return value
}

function getDefMult() {
    let defUp = document.getElementById("defUp").checked
    let value = 1.0

    if (defUp) {
        value = 1.6
    }
    return value
}

function getcriticalDmgMult() {
    let criticalDmgUp = document.getElementById("criticalDmgUp").checked
    let value = 1.0

    if (criticalDmgUp) {
        value = 1.5
    }
    return value
}

function getTargetMult() {
    let target = document.getElementById("target").checked
    let value = 1.0

    if (target) {
        value = 1.15
    }
    return value
}

function getSkillMult(skillMultValue) {
    return skillMultValue * 0.01 + 1
}

function getElementMult(heroElement, enemyElement) {
    let isAdvantage = heroElement.isAdvantageElement(enemyElement)
    return isAdvantage ? 1.1 : 1
}

function getEnemyDefMult() {
    let defDown = document.getElementById("defDown").checked
    let value = 1.0

    if (defDown) {
        value = 0.3
    }
    return value
}

function calculateDamage(hero, enemy, useSkillIndex, skillMultValue) {
    hero.attackMult = getAtkMult()
    hero.speedMult = getSpeedMult()
    hero.defMult = getDefMult()

    let heroSkill = hero.skillArray[useSkillIndex]

    let numerator = getNumerator(heroSkill, hero, heroSkill.attackRate,
        getSkillMult(skillMultValue), getElementMult(hero.element, enemy.element))
    let denominator = getDenominator(enemy.def, getEnemyDefMult())

    let msg = `
    Skill Index     :   ${useSkillIndex + 1}`
    msg += getDamageResult(numerator, denominator, hero.criticalDmg, getcriticalDmgMult(), getTargetMult())

    if (heroSkill.soulBunAttackRate !== 0) {
        let numerator = getNumerator(heroSkill, hero, heroSkill.soulBunAttackRate,
            getSkillMult(skillMultValue), getElementMult(hero.element, enemy.element))
        let denominator = getDenominator(enemy.def, getEnemyDefMult())

        msg += '\n    SoulBurn'
        msg += getDamageResult(numerator, denominator, hero.criticalDmg, getcriticalDmgMult(), getTargetMult())
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

    let heroTableData = jsonInstance.getRefinedHeroData(heroList.selectedIndex)
    let heroElement = element.ElementTable[heroTableData.element]
    let enemyElement = element.ElementTable[enemyElementValue]

    let heroData = new hero.BaseHero(attackValue, criticalValue, speedValue, defValue, hpValue, heroElement, heroTableData.skillArray)
    let enemyData = new enemy.BaseEnemy(enemyDefValue, enemyElement)

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