const Skill = require('./skill')

//json 데이터
class HeroData{
    constructor(name, element, 
        att_rate_1, pow_1, soul_burn_1,
        att_rate_2, pow_2, soul_burn_2,
        att_rate_3, pow_3, soul_burn_3)
    {
        this.name = name
        this.element = element

        let skill1 = new Skill.BaseSkill(Number(att_rate_1), Number(pow_1), Number(soul_burn_1))
        let skill2 = new Skill.BaseSkill(Number(att_rate_2), Number(pow_2), Number(soul_burn_2))
        let skill3 = new Skill.BaseSkill(Number(att_rate_3), Number(pow_3), Number(soul_burn_3))

        this.skillArray = [skill1, skill2, skill3]
    }
}

//실제로 사용할 데이터
class BaseHero {
    constructor(attack, criticalDmg, element, skillArray) {
        this.attack = attack
        this.criticalDmg = criticalDmg * 0.01
        this.element = element
        this.skillArray = skillArray
    }
}

module.exports = {
    BaseHero: BaseHero,
    HeroData: HeroData,
}
