const pantalla = document.getElementById("pantalla");

const botones = document.querySelectorAll("button");

const historial = document.getElementById("historial");

let operacion="";

function calcular(exp){

exp = exp.replace(/√/g,"Math.sqrt");

exp = exp.replace(/sin/g,"Math.sin");

exp = exp.replace(/cos/g,"Math.cos");

exp = exp.replace(/tan/g,"Math.tan");

return eval(exp);

}

botones.forEach(boton=>{

boton.addEventListener("click",()=>{

let valor = boton.textContent;

if(valor==="C"){

operacion="";
pantalla.value="";

return;

}

if(valor==="="){

try{

let resultado = calcular(operacion);

if(!isFinite(resultado)) throw "error";

pantalla.value=resultado;

let item=document.createElement("li");

item.textContent=operacion+" = "+resultado;

historial.prepend(item);

operacion=resultado.toString();

}catch{

pantalla.value="Error";

operacion="";

}

return;

}

operacion+=valor;

pantalla.value=operacion;

});

});

document.addEventListener("keydown",(e)=>{

let tecla=e.key;

if(!isNaN(tecla) || ["+","-","*","/","."].includes(tecla)){

operacion+=tecla;

pantalla.value=operacion;

}

if(tecla==="Enter"){

try{

let resultado=calcular(operacion);

pantalla.value=resultado;

operacion=resultado.toString();

}catch{

pantalla.value="Error";

operacion="";

}

}

if(tecla==="Backspace"){

operacion=operacion.slice(0,-1);

pantalla.value=operacion;

}

});