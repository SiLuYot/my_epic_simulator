class BaseSkill {
    constructor(attackRate, pow, soulBunAttackRate = 0) {
        this.attackRate = attackRate
        this.pow = pow
        this.soulBunAttackRate = soulBunAttackRate
        this.isSoulBunSkill = soulBunAttackRate !== 0
    }
}

class SkillSet {
    constructor(baseSkill1, baseSkill2, baseSkill3) {
        this.skillArray =
            [
                baseSkill1,
                baseSkill2,
                baseSkill3,
            ]
    }
}

module.exports = {
    BaseSkill: BaseSkill,
    SkillSet: SkillSet,
}