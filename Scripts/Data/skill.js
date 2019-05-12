class BaseSkill {
    constructor(attackRate, pow, soulBunAttackRate) {
        this.attackRate = attackRate
        this.pow = pow
        this.soulBunAttackRate = soulBunAttackRate
        //this.isSoulBunSkill = soulBunAttackRate !== 0
    }
}

module.exports = {
    BaseSkill: BaseSkill,
}