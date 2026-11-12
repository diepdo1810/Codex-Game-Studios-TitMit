import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {referenceTargets} from '../scripts/codex/reference-generation.mjs';

const root=resolve('.');
const plans=await referenceTargets({root});
for(const name of ['directory-structure.md','code-root-resolution.md','run-and-observe.md']){
  const target='.agents/docs/'+name;
  const generated=plans.find(p=>p.target===target);
  assert.ok(generated,'Reference target missing: '+target);
  const current=readFileSync(resolve(root,target),'utf8');
  assert.equal(generated.content,current,'Generated reference drift: '+target);
  assert.ok(generated.transform_ids.some(x=>x.startsWith('reference-overlay-sha256:')),'Source-bound reference overlay missing: '+target);
}
console.log('PASS reference overlays: three Codex Web docs reproduce byte-for-byte from pinned upstream');
