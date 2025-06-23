const input_km = document.getElementById("kilometros");
const input_litro_km = document.getElementById("litrosporkm");
const btn_enviar = document.getElementById("enviar");
const p_resposta = document.getElementById("resposta");

async function pega_valor_gasolina() {
  try {

    const response = await fetch('https://cors-anywhere.herokuapp.com/https://combustivelapi.com.br/api/precos');
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
  
    const data = await response.json();

    const preco_gasolina_pr = data.precos.gasolina.pr;

    console.log(preco_gasolina_pr)

    return parseFloat(preco_gasolina_pr)

  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}

async function funcaoClicar() {
  let km = parseFloat(input_km.value);
  let l_km = parseFloat(input_litro_km.value);

  if (isNaN(km) || isNaN(l_km)) {
    p_resposta.innerHTML = "Por favor, insira números válidos.";
    return;
  }

  let litros_consumidos = km / l_km;
  console.log("Litros consumidos:", litros_consumidos);

  let preco_gasolina = await pega_valor_gasolina();

  if (preco_gasolina === null) {
    p_resposta.innerHTML = "Não foi possível obter o preço da gasolina.";
    return;
  }

  let custo = litros_consumidos * preco_gasolina;

  p_resposta.innerHTML = `No estado do Paraná você irá gastar: R$ ${custo.toFixed(2)}`;
}


btn_enviar.addEventListener("click", funcaoClicar);
