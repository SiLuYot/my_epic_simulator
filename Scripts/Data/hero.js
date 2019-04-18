const Skill = require('./skill')

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

        this.skillSet = new Skill.SkillSet(skill1, skill2, skill3)
    }
}

class BaseHero {
    constructor(attack, criticalDmg, element, skillSet) {
        this.attack = attack
        this.criticalDmg = criticalDmg * 0.01
        this.element = element
        this.skillSet = skillSet
    }

    getHeroAttackPower(skillIndex, isUseSoulBun) {
        //attack * att_rate * pow        
        let skill = this.skillSet.skillArray[skillIndex]
        let attackRate = skill.attackRate

        if (isUseSoulBun)
            attackRate = skill.isSoulBunSkill ? skill.soulBunAttackRate : skill.attackRate
        
        let value = this.attack * attackRate * skill.pow
        //value += value * 0.15
        return value
    }
}

module.exports = {
    BaseHero: BaseHero,
    HeroData: HeroData,
}
