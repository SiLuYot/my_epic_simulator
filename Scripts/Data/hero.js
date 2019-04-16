const Skill = require('../Data/skill')

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
}
