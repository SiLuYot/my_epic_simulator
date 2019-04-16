class Element {
    constructor(element) {
        this.element = element
    }
    isAdvantageElement(extendElement) {
        throw new Error('isAdvantageElement() must be implement.');
    }
}

class FireElement extends Element {
    constructor() {
        super('Fire')
    }
    isAdvantageElement(extendElement) {
        //불속성은 자연속성에 유리
        return extendElement.element === 'Earth';
    }
}

class IceElement extends Element {
    constructor() {
        super('Ice')
    }
    isAdvantageElement(extendElement) {
        //얼음속성은 불속성에 유리
        return extendElement.element === 'Fire';
    }
}

class EarthElement extends Element {
    constructor() {
        super('Earth')
    }
    isAdvantageElement(extendElement) {
        //자연속성은 물속성에 유리
        return extendElement.element === 'Ice';
    }
}

class LightElement extends Element {
    constructor() {
        super('Light')
    }
    isAdvantageElement(extendElement) {
        //빛속성은 어둠속성에 유리
        return extendElement.element === 'Dark';
    }
}

class DarkElement extends Element {
    constructor() {
        super('Dark')
    }
    isAdvantageElement(extendElement) {
        //어둠속성은 빛속성에 유리
        return extendElement.element === 'Light';
    }
}

module.exports = {
    Element: Element,
    FireElement: FireElement,
    IceElement: IceElement,
    EarthElement: EarthElement,
    LightElement: LightElement,
    DarkElement: DarkElement,
}