'use strict'

class Element {
    constructor(name) {
        this.name = name
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
        return extendElement.name === 'Earth';
    }
}

class IceElement extends Element {
    constructor() {
        super('Ice')
    }
    isAdvantageElement(extendElement) {
        //얼음속성은 불속성에 유리
        return extendElement.name === 'Fire';
    }
}

class EarthElement extends Element {
    constructor() {
        super('Earth')
    }
    isAdvantageElement(extendElement) {
        //자연속성은 물속성에 유리
        return extendElement.name === 'Ice';
    }
}

class LightElement extends Element {
    constructor() {
        super('Light')
    }
    isAdvantageElement(extendElement) {
        //빛속성은 어둠속성에 유리
        return extendElement.name === 'Dark';
    }
}

class DarkElement extends Element {
    constructor() {
        super('Dark')
    }
    isAdvantageElement(extendElement) {
        //어둠속성은 빛속성에 유리
        return extendElement.name === 'Light';
    }
}

const ElementTable = [
    new FireElement(),
    new IceElement(),
    new EarthElement(),
    new LightElement(),
    new DarkElement()
]

module.exports = {    
    ElementTable: ElementTable,
}