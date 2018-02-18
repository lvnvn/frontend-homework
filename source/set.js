'use strict';

// рекурсивная функция, отбрасывает точку - спускается на уровень вложенности
function set(object, property, value) {
    let prop;
    if(typeof property === 'string') {
        prop = property.split('.').slice(1);
    } else
        prop = property;
    
    if(prop.length === 1) {
        object[prop[0]] = value;
        return object;
    }
    
    const currProp = prop[0];
    prop.shift();

    if(!(currProp in object)) {// у объекта нет требуемого свойства
    	object[currProp] = {};
    }

    object[currProp] = set(object[currProp], prop, value);
    return object;
}
