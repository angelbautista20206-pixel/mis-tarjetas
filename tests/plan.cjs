// Pruebas del cálculo del plan de pagos (plan.html). Sin dependencias: node tests/plan.cjs
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const html = fs.readFileSync(new URL('../plan.html', 'file://' + __filename), 'utf8');
const src = html.match(/function simulate[\s\S]*?\n}\nfunction priority[\s\S]*?\n}\n/)[0];
const ctx = vm.createContext({});
vm.runInContext(src + ';this.simulate=simulate;this.priority=priority;', ctx);
const { simulate, priority } = ctx;

const A = { id: 'a', bal: 20000, rate: 60, min: 1000 }, B = { id: 'b', bal: 5000, rate: 40, min: 300 };

// Sin interés: 25,000 con 5,000 al mes termina en 5 meses y no cobra intereses.
let r = simulate([{ ...A, rate: 0 }, { ...B, rate: 0 }], 5000, 'avalancha', true, false);
assert.equal(r.never, false); assert.equal(r.months.length, 5); assert.equal(Math.round(r.totalInt), 0);

// Interés del primer mes con IVA: 20,000 × 5% × 1.16 = 1,160.
r = simulate([A], 3000, 'avalancha', true, false);
assert.equal(Math.round(r.months[0].int), 1160);
r = simulate([A], 3000, 'avalancha', false, false);
assert.equal(Math.round(r.months[0].int), 1000);

// Avalancha: el extra va a la tasa más alta; bola de nieve: al saldo menor.
r = simulate([A, B], 4000, 'avalancha', true, false);
assert.equal(r.months[0].pays.a, 3700); assert.equal(r.months[0].pays.b, 300);
r = simulate([A, B], 4000, 'bola', true, false);
assert.equal(r.months[0].pays.a, 1000); assert.equal(r.months[0].pays.b, 3000);
assert.equal(priority([A, B], 'avalancha')[0].id, 'a');
assert.equal(priority([A, B], 'bola')[0].id, 'b');

// Nunca se paga más que el presupuesto ni más que el saldo.
r = simulate([A, B], 4000, 'avalancha', true, false);
for (const m of r.months) assert(Object.values(m.pays).reduce((s, v) => s + v, 0) <= 4000 + 1e-6);
assert(r.cs.every(c => c.b === 0));

// Avalancha nunca cuesta más intereses que bola de nieve.
const av = simulate([A, B], 4000, 'avalancha', true, false), bo = simulate([A, B], 4000, 'bola', true, false);
assert(av.totalInt <= bo.totalInt + 1e-6);

// Si el mínimo no cubre el interés, la deuda nunca termina.
assert.equal(simulate([A], 1000, 'avalancha', true, true).never, true);

console.log('PASS: plan de pagos — sin interés, IVA, avalancha vs. bola de nieve, tope de presupuesto, deuda que no baja.');
