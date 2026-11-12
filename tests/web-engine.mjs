import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,readFileSync,existsSync,rmSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {bashPath} from '../scripts/codex/shell.mjs';

const repo=resolve('.'),root=mkdtempSync(join(tmpdir(),'cgs web engine '));
const script=join(repo,'.agents/scripts/web-scaffold.sh'),detect=join(repo,'.agents/scripts/web-detect.sh'),runner=join(repo,'.agents/scripts/test-run.sh');
const invoke=(s,...a)=>spawnSync(bashPath(),[s,...a],{cwd:repo,encoding:'utf8'});
try {
 const initial=invoke(script,'--root',root,'--dry-run','--title','A & B','--starter','phaser');
 assert.equal(initial.status,0,initial.stderr);
 assert.match(initial.stdout,/WOULD_CREATE\s+package\.json/);
 assert.equal(existsSync(join(root,'package.json')),false,'dry-run must not write files');
 const create=invoke(script,'--root',root,'--title','A & B','--starter','phaser');
 assert.equal(create.status,0,create.stderr);
 const pkg=JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
 assert.ok(pkg.dependencies?.phaser,'Phaser starter must include Phaser');
 assert.ok(pkg.scripts?.build && pkg.scripts?.test && pkg.scripts?.smoke);
 assert.ok(existsSync(join(root,'package-lock.json')),'locked dependencies required');
 assert.ok(existsSync(join(root,'tests/integration/boot.spec.ts')),'playwright fixture required');
 assert.match(readFileSync(join(root,'index.html'),'utf8'),/A &amp; B/);
 const second=invoke(script,'--root',root,'--title','Different','--starter','none');
 assert.equal(second.status,3,'existing package.json must be preserved');
 assert.match(readFileSync(join(root,'index.html'),'utf8'),/A &amp; B/);
 const probe=invoke(detect,'--root',root);
 assert.equal(probe.status,0,probe.stderr);
 assert.match(probe.stdout,/package_json\s+present/);
 assert.match(probe.stdout,/package_manager\s+npm/);
 const run=invoke(runner,'web','--root',root);
 assert.equal(run.status,0,run.stderr);
 assert.match(run.stdout,/web:no-dependencies/);
 console.log('PASS Web: dry-run, Phaser scaffold, lockfile, browser tests, no overwrite, detection and missing-runner evidence');
} finally {
 const prefix=resolve(tmpdir());
 if(!resolve(root).startsWith(prefix+ (process.platform==='win32'?'\\':'/')))throw Error('Unsafe fixture cleanup');
 rmSync(root,{recursive:true,force:true});
}
