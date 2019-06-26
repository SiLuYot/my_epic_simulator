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

function setHeroTable(selectedIndex = 0) {
    let heroList = document.getElementById('heroList')
    initOptionTable(heroList.options, jsonInstance.heroTable)

    if (selectedIndex < heroList.options.length) {
        heroList.options.selectedIndex = selectedIndex
    }
    else heroList.options.selectedIndex = heroList.options.length - 1
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

    let skill1 = getBaseSkillByDocument(1)
    let skill2 = getBaseSkillByDocument(2)
    let skill3 = getBaseSkillByDocument(3)

    let newHero = new hero.HeroData(name, element, skill1, skill2, skill3)

    return newHero
}

function getBaseSkillByDocument(num){        
    let att_rate = Number(document.getElementById(`att_rate_${num}`).value)
    let pow = Number(document.getElementById(`pow_${num}`).value)
    let soul_burn = Number(document.getElementById(`soul_burn_${num}`).value)
    let skill_kind = Number(document.getElementById(`skill_kind${num}`).value)
    let kind_rate = Number(document.getElementById(`kind_rate_${num}`).value)

    return new skill.BaseSkill(att_rate, pow, kind_rate, soul_burn, skill_kind)
}

function setDocumentHeroData(heroData) {
    document.getElementById('name').value = heroData.name
    document.getElementById('element').value = heroData.element

    let skill1 = heroData.skillArray[0]
    let skill2 = heroData.skillArray[1]
    let skill3 = heroData.skillArray[2]

    setSkillDocumentByBaseSkill(skill1, 1)
    setSkillDocumentByBaseSkill(skill2, 2)
    setSkillDocumentByBaseSkill(skill3, 3)
}

function setSkillDocumentByBaseSkill(skill, num){
    document.getElementById(`att_rate_${num}`).value    = skill.attackRate
    document.getElementById(`pow_${num}`).value         = skill.pow
    document.getElementById(`soul_burn_${num}`).value   = skill.soulBunAttackRate
    document.getElementById(`skill_kind${num}`).value   = skill.attributeIndex
    document.getElementById(`kind_rate_${num}`).value   = skill.additionRate * 100
    
    document.getElementById(`skill_kind${num}`).onchange()
}

function onChangeSkillKind(num){
    let skill_kind = document.getElementById(`skill_kind${num}`)
    if (skill_kind.selectedIndex !== 0) {
        document.getElementById(`kind_rate_${num}`).style.visibility = 'visible'
    }
    else {
        document.getElementById(`kind_rate_${num}`).style.visibility = 'hidden'
    }
}

document.getElementById('execute').onclick = () => {
    //입력된 데이터를 바탕으로 새로운 데이터 생성
    let newHero = getNewHeroData()
    //수정될 인덱스
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
    onChangeSkillKind(1)
}

document.getElementById('skill_kind2').onchange = () => {
    onChangeSkillKind(2)
}

document.getElementById('skill_kind3').onchange = () => {
    onChangeSkillKind(3)
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