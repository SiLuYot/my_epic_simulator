const Element = require('../Data/element')
const Enemy = require('../Data/enemy')

class HeroManager {
    constructor() {
        if(!!HeroManager.instance){
            return HeroManager.instance
        }
        HeroManager.instance = this;

        this.fixedConst = 1.871
        this.missConst = 0.75
        this.nomarlConst = 1
        this.hardConst = 1.3

        this.heroList = []
        
        return this
    }

    setDataList(list){
        this.heroList = list
    }

    getHeroAttackPower(hero, enemy, useSkillIndex, isUseSoulBun) {
        let power = hero.getHeroAttackPower(useSkillIndex, isUseSoulBun) * this.fixedConst
        
        //element = 속성 이점이 있을경우 1.1, 아니면 1
        let isAdvantageElement = hero.element.isAdvantageElement(enemy.element)
        let elementValue = isAdvantageElement ? 1.1 : 1

        return power * elementValue / (enemy.def / 300 + 1)
    }

    attackSimulate(hero, enemy, useSkillNum) {
        let testHero = hero
        // let testEnemy = new Enemy.BaseEnemy(55, new Element.EarthElement())

        let skillPower = this.getHeroAttackPower(testHero, enemy, useSkillNum, false)
        //skillPower = Math.round(skillPower);

        let hitMiss = (skillPower * this.missConst).toFixed(3)
        let hitNomarl = (skillPower * this.nomarlConst).toFixed(3)
        let hitHard = (skillPower * this.hardConst).toFixed(3)
        let hitCritical = (skillPower * testHero.criticalDmg).toFixed(3)

        let msg =
        `
        ------------------------------
        Skill Index     :   ${useSkillNum + 1}
        hitMiss         :   ${hitMiss}
        hitNormal       :   ${hitNomarl}
        hitHard         :   ${hitHard}
        hitCritical     :   ${hitCritical}
        ------------------------------
        `

        return msg
    }
}

module.exports = {
    HeroManager: HeroManager,
}