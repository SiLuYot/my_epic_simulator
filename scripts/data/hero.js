'use strict'

//json 데이터
class HeroData{
    constructor(name, element, 
        skill1, skill2, skill3)
    {
        this.name = name
        this.element = element
        this.skillArray = [skill1, skill2, skill3]
    }
}

//실제로 사용할 데이터
class BaseHero {
    constructor(attack, criticalDmg, speed, def, hp, element, skillArray) {
        this.attack = attack
        this.criticalDmg = criticalDmg * 0.01
        this.speed = speed
        this.hp = hp
        this.def = def
        this.element = element
        this.skillArray = skillArray

        this.attackMult = 1.0
        this.speedMult = 1.0
        this.defMult = 1.0
    }
}

module.exports = {
    BaseHero: BaseHero,
    HeroData: HeroData,
}
