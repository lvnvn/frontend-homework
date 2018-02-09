'use strict';

// рекурсивная функция, отбрасывает точку - спускается на уровень вложенности
function set(object, property, value)
{
    let prop = property.substring(1, property.length)
    let idx = prop.indexOf('.');
    if(idx == -1)
    {
        object[prop] = value;
        return object;
    }
    
    if(!(prop.substring(0, idx) in object)) // у объекта нет требуемого свойства
    	object[prop.substring(0, idx)] = {};

    object[prop.substring(0, idx)] = set(object[prop.substring(0, idx)], prop.substring(idx), value);
    return object;
}
