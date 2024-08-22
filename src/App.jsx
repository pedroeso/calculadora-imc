import React, { useState } from 'react';
import InputMask from 'react-input-mask';

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = (e) => {
    e.preventDefault();
    const alturaMetros = parseFloat(altura.replace(',', '.')); // Substitui a vírgula por ponto e converte para número
    const pesoNumero = parseFloat(peso);
    const imcCalculado = (pesoNumero / (alturaMetros * alturaMetros)).toFixed(2);
    const imcFormatado = Number(imcCalculado).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setImc(imcFormatado);
    definirClassificacao(imcCalculado);
  };

  const definirClassificacao = (imc) => {
    if (imc < 18.5) setClassificacao('Abaixo do peso');
    else if (imc >= 18.5 && imc < 24.9) setClassificacao('Peso normal');
    else if (imc >= 25 && imc < 29.9) setClassificacao('Sobrepeso');
    else if (imc >= 30 && imc < 34.9) setClassificacao('Obesidade grau 1');
    else if (imc >= 35 && imc < 39.9) setClassificacao('Obesidade grau 2');
    else setClassificacao('Obesidade grau 3');
  };

  return (
    <div className='container' style={{ padding: '100px'}}>
      <div style={{ display:'flex', justifyContent: 'center'}}>
      <h1>Calculadora de IMC</h1>
      </div>
      <form onSubmit={calcularIMC}>
        <div style={{ display:'flex', justifyContent: 'center'}}>
          <label>Altura (m): </label>
          <InputMask
            mask="9,99"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>
        <div style={{ display:'flex', justifyContent: 'center'}}>
          <label style={{ paddingLeft: '5px'}}>Peso (kg): </label>
          <InputMask
            mask="999"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>
        <div style={{ display:'flex', justifyContent: 'center', paddingTop: '80px'}}>
          <button type="submit">Calcular IMC</button>
        </div>
      </form>

      {imc && (
        <div>
          <h2>Seu IMC é: {imc}</h2>
          <h3>Classificação: {classificacao}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
