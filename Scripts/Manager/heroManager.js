const Element = require('../Data/element')
const Enemy = require('../Data/enemy')

class HeroManager {
    constructor() {
        this.fixedConst = 1.871
    }

    getHeroAttackPower(hero, enemy, useSkillIndex, isUseSoulBun) {
        let power = hero.getHeroAttackPower(useSkillIndex, isUseSoulBun) * this.fixedConst
        power += power*0.15
        //element = 속성 이점이 있을경우 1.1, 아니면 1
        let isAdvantageElement = hero.element.isAdvantageElement(enemy.element)
        let elementValue = isAdvantageElement ? 1.1 : 1

        return power * elementValue / (enemy.def / 300 + 1)
    }

    attackSimulate(hero) {
        let testHero = hero
        let testEnemy = new Enemy.BaseEnemy(55, new Element.EarthElement())

        let skillPower = this.getHeroAttackPower(testHero, testEnemy, 2, false)
        //skillPower = Math.round(skillPower);

        let hitMiss = (skillPower * 0.75)
        let hitNomarl = (skillPower * 1)
        let hitHard = (skillPower * 1.3)
        let hitCritical = (skillPower * testHero.criticalDmg)

        let msg =
        `
        hitMiss ${hitMiss}
        hitNomarl ${hitNomarl}
        hitHard ${hitHard}
        hitCritical ${hitCritical}
        `

        return msg
    }
}

module.exports = {
    HeroManager: HeroManager,
}