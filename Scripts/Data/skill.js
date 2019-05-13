class BaseSkill {
    constructor(attackRate, pow, additionRate, soulBunAttackRate, skillAttribute) {
        this.attackRate = attackRate
        this.pow = pow
        this.additionRate = additionRate
        this.soulBunAttackRate = soulBunAttackRate
        this.skillAttribute = skillAttribute
    }
}

class SkillAttribute {
    constructor(name) {
        this.name = name
    }

    getAdditionMult(hero, atkTotal, attackRate) {
        return atkTotal * attackRate
    }
}

//자신의 속도비례
class SelfSpeedSkill extends SkillAttribute {
    constructor() {
        super('속도 비례')
    }

    getAdditionMult(hero, atkTotal, attackRate) {
        return (atkTotal * attackRate) * (1 + hero.speed * additionRate)
    }
}

//자신의 방어력 비례
class SelfDefSkill extends SkillAttribute {
    constructor() {
        super('방어 비례')
    }

    getAdditionMult(hero, atkTotal, attackRate) {
        return (atkTotal * attackRate) + (hero.def * additionRate)
    }
}

//자신의 최대 체력 비례
class SelfMaxHPSkill extends SkillAttribute {
    constructor() {
        super('최대 체력 비례')
    }

    getAdditionMult(hero, atkTotal, attackRate) {
        return (atkTotal * attackRate) + (hero.hp * additionRate)
    }
}

//자신의 현재 체력 비례
class SelfCurHPSkill extends SkillAttribute {

}

//자신의 잃어버린 체력 비례
class SelfMissingHPSkill extends SkillAttribute {

}

//대상의 최대 체력 비례
class TargetMaxHPSkill extends SkillAttribute {

}

//대상의 잃어버린 체력 비례
class TargetMissingHPSkill extends SkillAttribute {

}

//자신 집중 비례 스킬
class SelfFocusSkill extends SkillAttribute {

}

//자신이 버프가 있다면 데미지 증가
class SelfHaveBuffedSkill extends SkillAttribute {

}

//대상이 버프가 없다면 데미지 증가
class TargetNobuffedSkill extends SkillAttribute {

}

//대상이 버프가 있다면 데미지 증가
class TargetHavebuffedSkill extends SkillAttribute {

}

//대상이 디버프가 있다면 데미지 증가
class TargetHaveDebuffedSkill extends SkillAttribute {

}

//남은 대상의 수 만큼 데미지 증가
class TargetRemainCountSkill extends SkillAttribute {

}

//크리티컬일 경우 데미지 증가
class IsCritSkill extends SkillAttribute {

}

//대상이 죽으면 추가 데미지
class IsTargetDeadSkill extends SkillAttribute {

}

module.exports = {
    BaseSkill: BaseSkill,
    SkillAttribute: SkillAttribute,
    SelfSpeedSkill: SelfSpeedSkill,
    SelfDefSkill: SelfDefSkill,
    SelfMaxHPSkill: SelfMaxHPSkill,
}