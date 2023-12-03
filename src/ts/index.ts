
let use_seniors    : boolean  = false,
    use_babies     : boolean  = false,
    current_people : string[] = [];





const Adults = ['👨',  '👩'],
      Skins  = ['🏻',/*'🏼',*/'🏽',  '🏾',  '🏿'],
      Hairs  = ['🦰',  '🦱',  '🦲',  '🦳'],
      Old    = ['👴', '👵'];

const BGndrs = ['♂', '♀'];

const Blonde = '👱',
      Baby   = '👶',
      zwj    = `\u200D`;





// people who aren't blond are base + skin + zero-width joiner + hair
// we're skipping color because no font implements it, and direction because we don't care
// we're skipping fitzpatrick 2 because it's blond in most fonts and the eyebrow change is too hard to see
// we're skipping angrogynous adult because the glyph is really bad in most fonts

const list_std_people: string[] = [];

Adults.map( (adult: string) =>
  Skins.map( (skin: string) =>
    Hairs.map( (hair: string) =>

      list_std_people.push(`${adult}${skin}${zwj}${hair}`)

    )
  )
);





// blond people have their own sequence, because of course they do
// it's different than the base blond that comes up in fitzpatrick 2 in most fonts but not by much
// the ordering is different too, :cry:
// it's adult blonde + skin color + zero-width-joiner + be-gender

const list_blond_people: string[] = [];

Skins.map( (skin: string) =>
  BGndrs.map( (gender: string) =>
    list_blond_people.push(`${Blonde}${skin}${zwj}${gender}`)
  )
)





const list_seniors: string[] = [];

// Nobody implements hair color for seniors

Old.map( (senior: string) =>
  Skins.map( (skin: string) =>
    list_seniors.push(`${senior}${skin}`)
  )
);





const list_babies: string[] = [];

// Nobody implements hair color for babies either - or gender, for that matter

Skins.map( (skin: string) =>
  list_babies.push(`${Baby}${skin}`)
);





function reset(config?: { babies: boolean, seniors: boolean } | undefined) {

  const { babies, seniors } = (config ?? { babies: false, seniors: false });

  if (config !== undefined) {
    use_babies  = babies;
    use_seniors = seniors;
  }

  current_people =
    list_std_people.concat(
      list_blond_people,
      use_babies  ? list_babies : [],
      use_seniors ? list_seniors : []
    );

  current_people.sort(() => Math.random() - 0.5);  // we do not care about shuffle quality at all

}





function next_one(): string {

  if (current_people.length === 0) {
    reset();
  }

  const next_person = current_people.pop();
  if (next_person === undefined) { throw new Error('Could not refill?'); }

  return next_person;

}





function seq(n: number): number[] {

  return new Array(n)
    .fill(false)
    .map( (_: any, i: number) => i );

}





function next_n(n: number): string[] {

  return seq(n).map(
    (_: any) =>
      next_one()
  );

}





function next(n?: number | undefined): string | string[] {

  let use_n: number = 1;


  if (n === undefined) {
    /* no-op; use_n is still 1 */

  } else if (n < 1) {
    throw new Error('Count must be integer 1 or over, or undefined');

  } else if ( !(Number.isInteger(use_n)) ) {
    throw new Error('Count must be integer 1 or over, or undefined');

  } else {
    use_n = n;
  }


  return (use_n === 1)
    ? next_one()
    : next_n(use_n);

}





export {

  reset,

  next,
  next_one,
  next_n

};
