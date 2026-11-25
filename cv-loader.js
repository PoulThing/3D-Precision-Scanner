async function readyCV(report){
 const start=Date.now(); let c;
 while(Date.now()-start<45000){
  c=globalThis.cv;
  if(c && typeof c.then==='function') {c=await Promise.race([Promise.resolve(c),new Promise((_,reject)=>setTimeout(()=>reject(Error('OpenCV promise timed out')),45000))]);}
  if(c && typeof c.Mat==='function'){let m;try{m=new c.Mat();}catch(e){await new Promise(r=>setTimeout(r,200));continue;}m.delete();report('OpenCV runtime initialized');if(!c.ORB||!c.findFundamentalMat)throw Error('OpenCV build lacks ORB or findFundamentalMat');report('ORB and RANSAC available');return c;}
  await new Promise(r=>setTimeout(r,200));
 }throw Error('OpenCV runtime initialization timed out');
}
