'use strict'

const hero = require('../data/hero')
const skill = require('../data/skill')
const element = require('../data/element')
const command = require('../command/command')
const jsonInstance = require('../manager/jsonManager').instance

window.onload = () => {
    let element_kind = document.getElementById('element')
    let skill_kind1 = document.getElementById('skill_kind1')
    let skill_kind2 = document.getElementById('skill_kind2')
    let skill_kind3 = document.getElementById('skill_kind3')

    initOptionTable(element_kind.options, element.ElementTable)
    initOptionTable(skill_kind1.options, skill.SkillKindTable)
    initOptionTable(skill_kind2.options, skill.SkillKindTable)
    initOptionTable(skill_kind3.options, skill.SkillKindTable)

    setHeroTable()
}

function setHeroTable(selectedIndex) {
    let heroList = document.getElementById('heroList')
    initOptionTable(heroList.options, jsonInstance.heroTable)
    heroList.options.selectedIndex = selectedIndex

    // let selectedHero = jsonInstance.heroTable[selectedIndex]
    // if(selectedHero){
    //     setDocumentHeroData(selectedHero)
    // }
}

function initOptionTable(options, table) {
    //드랍리스트 초기화
    options.length = 0
    //테이블 데이터들 드랍리스트에 추가
    for (let i = 0; i < table.length; i++) {
        let op = new Option()
        op.value = i
        op.text = table[i].name

        options.add(op)
    }
}

function getNewHeroData() {
    let name = document.getElementById('name').value
    let element = document.getElementById('element').value

    let att_rate_1 = Number(document.getElementById('att_rate_1').value)
    let pow_1 = Number(document.getElementById('pow_1').value)
    let soul_burn_1 = Number(document.getElementById('soul_burn_1').value)
    let skill_kind1 = Number(document.getElementById('skill_kind1').value)
    let kind_rate_1 = Number(document.getElementById('kind_rate_1').value)

    let att_rate_2 = Number(document.getElementById('att_rate_2').value)
    let pow_2 = Number(document.getElementById('pow_2').value)
    let soul_burn_2 = Number(document.getElementById('soul_burn_2').value)
    let skill_kind2 = Number(document.getElementById('skill_kind2').value)
    let kind_rate_2 = Number(document.getElementById('kind_rate_2').value)

    let att_rate_3 = Number(document.getElementById('att_rate_3').value)
    let pow_3 = Number(document.getElementById('pow_3').value)
    let soul_burn_3 = Number(document.getElementById('soul_burn_3').value)
    let skill_kind3 = Number(document.getElementById('skill_kind3').value)
    let kind_rate_3 = Number(document.getElementById('kind_rate_3').value)

    let skill1 = new skill.BaseSkill(att_rate_1, pow_1, kind_rate_1, soul_burn_1, skill_kind1)
    let skill2 = new skill.BaseSkill(att_rate_2, pow_2, kind_rate_2, soul_burn_2, skill_kind2)
    let skill3 = new skill.BaseSkill(att_rate_3, pow_3, kind_rate_3, soul_burn_3, skill_kind3)

    let newHero = new hero.HeroData(name, element, skill1, skill2, skill3)

    return newHero
}

function setDocumentHeroData(heroData) {
    document.getElementById('name').value = heroData.name
    document.getElementById('element').value = heroData.element

    let skill1 = heroData.skillArray[0]
    document.getElementById('att_rate_1').value = skill1.attackRate
    document.getElementById('pow_1').value = skill1.pow
    document.getElementById('soul_burn_1').value = skill1.soulBunAttackRate
    document.getElementById('kind_rate_1').value = skill1.additionRate * 100
    document.getElementById('skill_kind1').value = skill1.attributeIndex
    document.getElementById('skill_kind1').onchange()

    let skill2 = heroData.skillArray[1]
    document.getElementById('att_rate_2').value = skill2.attackRate
    document.getElementById('pow_2').value = skill2.pow
    document.getElementById('soul_burn_2').value = skill2.soulBunAttackRate
    document.getElementById('kind_rate_2').value = skill2.additionRate * 100
    document.getElementById('skill_kind2').value = skill2.attributeIndex
    document.getElementById('skill_kind2').onchange()

    let skill3 = heroData.skillArray[2]
    document.getElementById('att_rate_3').value = skill3.attackRate
    document.getElementById('pow_3').value = skill3.pow
    document.getElementById('soul_burn_3').value = skill3.soulBunAttackRate
    document.getElementById('kind_rate_3').value = skill3.additionRate * 100
    document.getElementById('skill_kind3').value = skill3.attributeIndex
    document.getElementById('skill_kind3').onchange()
}

document.getElementById('execute').onclick = () => {
    //입력된 데이터를 바탕으로 새로운 영웅 생성
    let newHero = getNewHeroData()
    //수정될 영웅 인덱스
    let index = document.getElementById("heroList").selectedIndex

    //커맨드 매개변수 설정
    jsonInstance.setCommandParameter([newHero, index])
    //커맨드 실행
    jsonInstance.executeCommand()

    //변경된 테이블 다시 적용
    setHeroTable(index)

    //json 미리보기에 표시
    document.getElementById('result').value = JSON.stringify(newHero, null, 4)
}

document.getElementById('skill_kind1').onchange = () => {
    let skill_kind = document.getElementById('skill_kind1')
    if (skill_kind.selectedIndex !== 0) {
        document.getElementById('kind_rate_1').style.visibility = 'visible'
    }
    else {
        document.getElementById('kind_rate_1').style.visibility = 'hidden'
    }
}

document.getElementById('skill_kind2').onchange = () => {
    let skill_kind = document.getElementById('skill_kind2')
    if (skill_kind.selectedIndex !== 0) {
        document.getElementById('kind_rate_2').style.visibility = 'visible'
    }
    else {
        document.getElementById('kind_rate_2').style.visibility = 'hidden'
    }
}

document.getElementById('skill_kind3').onchange = () => {
    let skill_kind = document.getElementById('skill_kind3')
    if (skill_kind.selectedIndex !== 0) {
        document.getElementById('kind_rate_3').style.visibility = 'visible'
    }
    else {
        document.getElementById('kind_rate_3').style.visibility = 'hidden'
    }
}

document.getElementById('heroList').onchange = () => {
    let heroList = document.getElementById("heroList")
    let index = heroList.selectedIndex
    let heroData = jsonInstance.heroTable[index]

    setDocumentHeroData(heroData)
}

document.getElementById('modeRadio').onchange = () => {
    document.getElementById('heroListDiv').style.visibility = 'hidden'

    let modeList = document.getElementsByName('mode')

    for (let i = 0; i < modeList.length; i++) {
        if (modeList[i].checked) {

            //라디오 그룹 중 체크된 요소의 value
            switch (modeList[i].value) {
                case 'new':
                    jsonInstance.changeCommand(new command.HeroAddCommand())
                    break
                case 'edit':
                    jsonInstance.changeCommand(new command.HeroEditCommand())

                    document.getElementById("heroList").onchange()
                    document.getElementById('heroListDiv').style.visibility = 'visible'
                    break
                case 'delete':
                    jsonInstance.changeCommand(new command.HeroDeleteCommand())

                    document.getElementById("heroList").onchange()
                    document.getElementById('heroListDiv').style.visibility = 'visible'
                    break
            }
        }
    }
}