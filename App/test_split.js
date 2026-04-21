const d = "M10 10 L20 20 Z M30 30 L40 40 Z m50 50 l60 60";
const parts = d.match(/[Mm][^Mm]*/g);
console.log(parts);
