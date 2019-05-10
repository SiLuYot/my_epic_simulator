const hero = require('../Data/hero')
const command = require('../Command/command')

const jsonManager = require('../Manager/jsonManager')

window.onload = () => {
    jsonManager.instance.init()    
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

function GetNewHeroData(){
    let name = document.getElementById('name').value
    let element = document.getElementById('element').value

    let att_rate_1 = document.getElementById('att_rate_1').value
    let pow_1 = document.getElementById('pow_1').value
    let soul_burn_1 = document.getElementById('soul_burn_1').value

    let att_rate_2 = document.getElementById('att_rate_2').value
    let pow_2 = document.getElementById('pow_2').value
    let soul_burn_2 = document.getElementById('soul_burn_2').value

    let att_rate_3 = document.getElementById('att_rate_3').value
    let pow_3 = document.getElementById('pow_3').value
    let soul_burn_3 = document.getElementById('soul_burn_3').value

    let newHero = new hero.HeroData(name, element,
        att_rate_1, pow_1, soul_burn_1,
        att_rate_2, pow_2, soul_burn_2,
        att_rate_3, pow_3, soul_burn_3)

    return newHero
}