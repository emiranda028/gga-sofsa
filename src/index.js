export default {
  async fetch(request, env) {
    const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
    if(request.method==='OPTIONS') return new Response(null,{headers:cors});
    if(request.method!=='POST') return new Response('GGA Proxy OK');
    try{
      const body=await request.json();
      const resp=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+env.OR_KEY,'HTTP-Referer':'https://emiranda028.github.io','X-Title':'GGA SOFSA'},body:JSON.stringify(body)});
      const data=await resp.json();
      return new Response(JSON.stringify(data),{headers:{...cors,'Content-Type':'application/json'}});
    }catch(e){return new Response(JSON.stringify({error:{message:e.message}}),{status:500,headers:cors});}
  }
};
