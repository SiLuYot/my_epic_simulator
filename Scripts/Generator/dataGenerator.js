const hero = require('../Data/hero')
const skill = require('../Data/skill')
const command = require('../Command/command')
const jsonManager = require('../Manager/jsonManager')

const skillKindTable = [
    new skill.SkillAttribute('none'),
    new skill.SelfSpeedSkill(),
    new skill.SelfDefSkill(),
    new skill.SelfMaxHPSkill(),
]

window.onload = () => {    
    jsonManager.instance.init(() => {        

    })

    let skill_kind1 = document.getElementById("skill_kind1")
    let skill_kind2 = document.getElementById("skill_kind2")
    let skill_kind3 = document.getElementById("skill_kind3")

    initSkillKindOption(skill_kind1.options)
    initSkillKindOption(skill_kind2.options)
    initSkillKindOption(skill_kind3.options)
}

function initSkillKindOption(options){
    for (i = 0; i < skillKindTable.length; i++) {
        let op = new Option()
        op.value = i
        op.text = skillKindTable[i].name

        options.add(op)
    }
}

document.getElementById('create').onclick = () => {
    //입력된 데이터를 바탕으로 새로운 영웅 생성
    let newHero = GetNewHeroData();
    //json 미리보기에 표시
    document.getElementById('result').value = JSON.stringify(newHero, null, 4)
    //커맨드 변경
    jsonManager.instance.setAddCommand(new command.HeroAddCommand())
    //추가 실행
    jsonManager.instance.addProcess(newHero)
}

function GetNewHeroData() {
    let name = document.getElementById('name').value
    let element = document.getElementById('element').value

    let att_rate_1 = document.getElementById('att_rate_1').value
    let pow_1 = document.getElementById('pow_1').value
    let soul_burn_1 = document.getElementById('soul_burn_1').value
    let skill_kind1 = document.getElementById("skill_kind1").value
    let kind_rate_1 = document.getElementById("kind_rate_1").value

    let att_rate_2 = document.getElementById('att_rate_2').value
    let pow_2 = document.getElementById('pow_2').value
    let soul_burn_2 = document.getElementById('soul_burn_2').value
    let skill_kind2 = document.getElementById("skill_kind2").value
    let kind_rate_2 = document.getElementById("kind_rate_2").value

    let att_rate_3 = document.getElementById('att_rate_3').value
    let pow_3 = document.getElementById('pow_3').value
    let soul_burn_3 = document.getElementById('soul_burn_3').value
    let skill_kind3 = document.getElementById("skill_kind3").value
    let kind_rate_3 = document.getElementById("kind_rate_3").value

    let skillKindIndex1 = skillKindTable[skill_kind1.selectedIndex]
    let skillKindIndex2 = skillKindTable[skill_kind2.selectedIndex]
    let skillKindIndex3 = skillKindTable[skill_kind3.selectedIndex]

    let skill1 = new skill.BaseSkill(Number(att_rate_1), Number(pow_1), Number(kind_rate_1), Number(soul_burn_1),  skillKindIndex1)
    let skill2 = new skill.BaseSkill(Number(att_rate_2), Number(pow_2), Number(kind_rate_2), Number(soul_burn_2),  skillKindIndex2)
    let skill3 = new skill.BaseSkill(Number(att_rate_3), Number(pow_3), Number(kind_rate_3), Number(soul_burn_3),  skillKindIndex3)

    let newHero = new hero.HeroData(name, element, skill1, skill2, skill3)

    return newHero
}

document.getElementById("skill_kind1").onclick = () =>{
    let skill_kind = document.getElementById("skill_kind1")
    if(skill_kind.selectedIndex !== 0){
        document.getElementById("kind_rate_1").style.visibility = 'visible'
    }
    else{
        document.getElementById("kind_rate_1").style.visibility = 'hidden'
    }
}

document.getElementById("skill_kind2").onclick = () =>{
    let skill_kind = document.getElementById("skill_kind2")
    if(skill_kind.selectedIndex !== 0){
        document.getElementById("kind_rate_2").style.visibility = 'visible'
    }
    else{
        document.getElementById("kind_rate_2").style.visibility = 'hidden'
    }
}

document.getElementById("skill_kind3").onclick = () =>{
    let skill_kind = document.getElementById("skill_kind3")
    if(skill_kind.selectedIndex !== 0){
        document.getElementById("kind_rate_3").style.visibility = 'visible'
    }
    else{
        document.getElementById("kind_rate_3").style.visibility = 'hidden'
    }
}