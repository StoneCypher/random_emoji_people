'use strict';

let use_seniors = false, use_babies = false, current_people = [];
const Adults = ['👨', '👩'], Skins = ['🏻', '🏽', '🏾', '🏿'], Hairs = ['🦰', '🦱', '🦲', '🦳'], Old = ['👴', '👵'];
const BGndrs = ['♂', '♀'];
const Blonde = '👱', Baby = '👶', zwj = `\u200D`;
const list_std_people = [];
Adults.map((adult) => Skins.map((skin) => Hairs.map((hair) => list_std_people.push(`${adult}${skin}${zwj}${hair}`))));
const list_blond_people = [];
Skins.map((skin) => BGndrs.map((gender) => list_blond_people.push(`${Blonde}${skin}${zwj}${gender}`)));
const list_seniors = [];
Old.map((senior) => Skins.map((skin) => list_seniors.push(`${senior}${skin}`)));
const list_babies = [];
Skins.map((skin) => list_babies.push(`${Baby}${skin}`));
function reset(config) {
    const { babies, seniors } = (config !== null && config !== void 0 ? config : { babies: false, seniors: false });
    if (config !== undefined) {
        use_babies = babies;
        use_seniors = seniors;
    }
    current_people =
        list_std_people.concat(list_blond_people, use_babies ? list_babies : [], use_seniors ? list_seniors : []);
    current_people.sort(() => Math.random() - 0.5);
}
function next_one() {
    if (current_people.length === 0) {
        reset();
    }
    const next_person = current_people.pop();
    if (next_person === undefined) {
        throw new Error('Could not refill?');
    }
    return next_person;
}
function seq(n) {
    return new Array(n)
        .fill(false)
        .map((_, i) => i);
}
function next_n(n) {
    return seq(n).map((_) => next_one());
}
function next(n) {
    let use_n = 1;
    if (n === undefined) ;
    else if (n < 1) {
        throw new Error('Count must be integer 1 or over, or undefined');
    }
    else if (!(Number.isInteger(use_n))) {
        throw new Error('Count must be integer 1 or over, or undefined');
    }
    else {
        use_n = n;
    }
    return (use_n === 1)
        ? next_one()
        : next_n(use_n);
}

exports.next = next;
exports.next_n = next_n;
exports.next_one = next_one;
exports.reset = reset;
