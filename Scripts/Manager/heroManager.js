const Skill = require('../Data/skill')
const Element = require('../Data/element')
const Hero = require('../Data/hero')
const Enemy = require('../Data/enemy')

{
    let skill1 = new Skill.BaseSkill(1, 1)
    let skill2 = new Skill.BaseSkill(1, 1)
    let skill3 = new Skill.BaseSkill(1, 1)   
    let skillSet = new Skill.SkillSet(skill1, skill2, skill3)

    //테스트
    var myHero = new Hero.BaseHero(3000, 300, new Element.EarthElement(), skillSet)
}

{
    let skill1 = new Skill.BaseSkill(1, 1)
    let skill2 = new Skill.BaseSkill(1.5, 1, 2)
    let skill3 = new Skill.BaseSkill(1, 1)    //대상이 적을수록 데미지 증가 해야함
    let skillSet = new Skill.SkillSet(skill1, skill2, skill3)

    //헤이스트 공 3722 치피 171
    var myHaste = new Hero.BaseHero(3722, 171, new Element.FireElement(), skillSet)
}

{
    let skill1 = new Skill.BaseSkill(1, 0.95, 2)
    let skill2 = new Skill.BaseSkill(0, 0)
    let skill3 = new Skill.BaseSkill(2, 0.9)
    let skillSet = new Skill.SkillSet(skill1, skill2, skill3)

    //이세리아 공 1901 치피 164
    var myIseria = new Hero.BaseHero(1901, 164, new Element.EarthElement(), skillSet)
}

{
    let skill1 = new Skill.BaseSkill(1.1, 1, 1.4)
    let skill2 = new Skill.BaseSkill(0.8, 1)
    let skill3 = new Skill.BaseSkill(1.6, 1)
    let skillSet = new Skill.SkillSet(skill1, skill2, skill3)

    //키세 공 1196 치피 150
    var myKise = new Hero.BaseHero(1196, 150, new Element.IceElement(), skillSet)
}

{
    let skill1 = new Skill.BaseSkill(1, 0.95)
    let skill2 = new Skill.BaseSkill(0.8, 0.95)
    let skill3 = new Skill.BaseSkill(0.95, 1, 1.2)
    let skillSet = new Skill.SkillSet(skill1, skill2, skill3)

    //벨로나 공 2743 치피 244
    var myBellona = new Hero.BaseHero(2743, 244, new Element.EarthElement(), skillSet)
}

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

    testAttack() {
        let testHero = myBellona
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