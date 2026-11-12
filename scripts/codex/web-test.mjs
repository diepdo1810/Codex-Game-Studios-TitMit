import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const args=process.argv.slice(2);let root='.',timeout=900000,dry=false;
for(let i=0;i<args.length;i++){
 if(args[i]==='--root'&&args[i+1])root=args[++i];
 else if(args[i]==='--timeout'&&args[i+1]){const seconds=Number(args[++i]);if(!Number.isInteger(seconds)||seconds<=0)throw Error('Invalid --timeout');timeout=seconds*1000}
 else if(args[i]==='--dry-run')dry=true;
 else throw Error('Usage: web-test.mjs [--root DIR] [--timeout SEC] [--dry-run]');
}
const cwd=resolve(root);console.log('engine\tWeb');
if(!existsSync(resolve(cwd,'package.json'))){console.log('rule\tweb:no-project\tNOT ASSESSED — no package.json');process.exit(0)}
let pkg;try{pkg=JSON.parse(readFileSync(resolve(cwd,'package.json'),'utf8'))}catch(e){console.log('rule\tweb:invalid-package\tFAIL — invalid package.json');process.exit(0)}
const script=pkg.scripts?.test;
if(!script){console.log('rule\tweb:no-test-script\tNOT ASSESSED — no test script');process.exit(0)}
if(!existsSync(resolve(cwd,'node_modules'))){console.log('rule\tweb:no-dependencies\tNOT ASSESSED — dependencies missing; install only with consent');process.exit(0)}
if(existsSync(resolve(cwd,'pnpm-lock.yaml'))||existsSync(resolve(cwd,'yarn.lock'))||existsSync(resolve(cwd,'bun.lockb'))){console.log('rule\tweb:package-manager\tNOT ASSESSED — use project package manager');process.exit(0)}
console.log('command\tnpm test');
if(dry){console.log('rule\tweb:dry-run\tNOT ASSESSED — test not executed');process.exit(0)}
const r=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['test'],{cwd,encoding:'utf8',timeout,maxBuffer:8*1024*1024});
const output=(r.stdout||'')+'\n'+(r.stderr||'');if(output.trim())process.stdout.write(output);
console.log('exit\t'+(r.status??'-'));
if(r.error?.code==='ETIMEDOUT'){console.log('rule\tweb:timeout\tFAIL — timed out');process.exit(0)}
if(r.error){console.log('rule\tweb:runner-unavailable\tNOT ASSESSED — '+r.error.message);process.exit(0)}
if(/no tests? found|0 tests? (?:passed|run)|no test files found/i.test(output)){console.log('rule\tweb:zero-tests\tNOT ASSESSED — zero tests');process.exit(0)}
if(/Executable doesn't exist at|browserType.launch: Executable doesn't exist/i.test(output)){console.log('rule\tweb:no-browser\tNOT ASSESSED — Playwright browser not installed');process.exit(0)}
console.log('rule\t'+(r.status===0?'web:0\tPASS automated command (visual inspection still required)':'web:nonzero\tFAIL automated command'));
