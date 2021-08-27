const schemata = {
  profiles: [
    {
      _id: 0,
      username: "Ola",
      email: "ola@gmail.com",
    },
    {
      _id: 1,
      username: "Olsa",
      email: "olsa@gmail.com",
    },
  ],
  product: [
    {
      p_id: 0,
      title: "Soy-base organic candles",
      tag: ["minimalist", "vegetable-base", "organic", "healthy", "dietary"],
      description: "",
      SKU: "",
    },
    {
      p_id: 1,
      title: "That shirt you didn't want to wear outside",
      description: "",
      SKU: "",
    },
  ],
  tag: [
    {
      t_id: 0,
      material: ["100%cotton", "silk", "soft", "earth-friendly", "therapeutic"],
      place: ["at home", "funky", "comfy", "outdoor", "mart"],
      verb: [
        "jogging",
        "stay-at-home",
        "running",
        "havin a picnic",
        "out dating",
        "dining",
      ],
      good: ["awesome", "feel-good", "best", "bargain", "top"],
      neutral: ["meh", "just ok", "okay", "low profile", "needs"],
      bad: [
        "awful",
        "ridiculous",
        "poor",
        "low-quality",
        "too expensive",
        "wtf",
      ],
    },
  ],
  timestamp: {},
};
const newDate = new Date();
const timestamp = newDate.toTimeString().slice(0, 8);
console.log(schemata);
let _id = 0;
let t_id = 0;
let p_id = 0;
let username;
console.log(schemata.profiles[_id]);
console.log(schemata.profiles[_id].username);
console.log(
  schemata.product[p_id].title +
    " is a " +
    schemata.tag[t_id].material[4] +
    "-base product that everyone " +
    schemata.tag[t_id].good[3] +
    " to have while " +
    schemata.tag[t_id].place[0] +
    "."
);

console.log("HB00" + [_id]);
_id++;
console.log("HB00" + [_id]);

const profiles = schemata["profiles"];

profiles.forEach((profile, i) => {
  console.log(profile);
});

for (const index in profiles) {
  console.log(index);
}

const keys = Object.keys(profiles);
console.log(keys);

keys.forEach((key) => {
  console.log(key);
});
const vals = Object.values(profiles);
console.log(vals);

vals.forEach((val) => {
  console.log(val);
});

const entries = Object.entries(profiles);
console.log(entries);

for (const arr of entries) {
  console.log(arr[0]);
  console.log(arr[1]);
}
