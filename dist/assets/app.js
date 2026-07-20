function reduceNumber(value) {
  let n = Math.abs(Number(value) || 0);
  while (n > 9 && ![11, 22, 33].includes(n)) {
    n = String(n).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n || 1;
}
function lifePathFromDate(dateValue) {
  const digits = String(dateValue || '').replace(/\D/g, '');
  const total = digits.split('').reduce((sum, digit) => sum + Number(digit), 0);
  return reduceNumber(total);
}
function nameNumber(name) {
  const map = {a:1,j:1,s:1,b:2,k:2,t:2,c:3,l:3,u:3,d:4,m:4,v:4,e:5,n:5,w:5,f:6,o:6,x:6,g:7,p:7,y:7,h:8,q:8,z:8,i:9,r:9};
  const total = String(name || '').toLowerCase().split('').reduce((sum, char) => sum + (map[char] || 0), 0);
  return reduceNumber(total);
}
function personalYear(dateValue) {
  const now = new Date();
  const md = String(dateValue || '').slice(5).replace(/\D/g, '');
  const total = String(now.getFullYear()) + md;
  return reduceNumber(total.split('').reduce((sum, digit) => sum + Number(digit), 0));
}
function meaning(n) {
  const meanings = {1:'independence, initiative, and a clear personal direction',2:'cooperation, patience, and careful relationship rhythm',3:'expression, creativity, and social confidence',4:'structure, discipline, and steady practical work',5:'change, movement, and flexible decision making',6:'care, responsibility, and home-centered balance',7:'study, reflection, and private inner work',8:'management, ambition, and material responsibility',9:'completion, generosity, and broad perspective',11:'sensitivity, insight, and inspirational communication',22:'large-scale building, planning, and durable systems',33:'service, teaching, and mature emotional leadership'};
  return meanings[n] || meanings[1];
}
function runNumerology(event) {
  const root = event?.currentTarget?.closest('.numerology-tool-card, .hero-tool-card, .container') || document;
  const birth = root.querySelector('#birth');
  const name = root.querySelector('#name');
  const result = root.querySelector('#result');
  if (!birth || !name || !result) return;
  const life = lifePathFromDate(birth.value);
  const nameValue = nameNumber(name.value);
  const year = personalYear(birth.value);
  result.innerHTML = `<h3>Life Path ${life} / Name ${nameValue}</h3><p><strong>Life path:</strong> ${meaning(life)}.</p><p><strong>Name number:</strong> ${meaning(nameValue)}.</p><p><strong>Personal year:</strong> ${year}, often read as ${meaning(year)}.</p><p>This is a reflective numerology reading, not a fixed prediction.</p>`;
}
document.addEventListener('DOMContentLoaded', () => {const button = document.querySelector('[data-numerology]'); if (button) button.addEventListener('click', runNumerology);});

