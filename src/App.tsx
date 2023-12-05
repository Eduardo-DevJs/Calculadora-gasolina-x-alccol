import logoImg from "./assets/logo.png";
import "./App.css"
import { FormEvent, useState } from "react";

interface InfoProps {
  title: string
  gasolina: string | number
  alcool: string | number
}

const App = () => {
  const [gasolinaInput, setGasolinaInput] = useState<number>(0)
  const [alcoolInput, setAlcoolInput] = useState<number>(0)
  const [info, setInfo] = useState<InfoProps>()

  const calcular = (e: FormEvent) => {
    e.preventDefault();

    const calculo = (alcoolInput / gasolinaInput);

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar alcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    } else {
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }
  }

  const formatarMoeda = (valor: number) =>{
    const valorFormatado = valor.toLocaleString('pt-BR', {
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img className="logo" src={logoImg} alt="Logo da calculadora de gasolina com alcool" />
        <h1 className="title">Qual a melhor opção</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro)</label>
          <input
            type="number"
            className="input"
            placeholder="4,90"
            min="1"
            value={alcoolInput}
            onChange={e => setAlcoolInput(Number(e.target.value))}
            step="0.01"
            required
          />
          <label>Gasolina (preço por litro)</label>
          <input
            type="number"
            className="input"
            placeholder="4,90"
            min="1"
            value={gasolinaInput}
            onChange={e => setGasolinaInput(Number(e.target.value))}
            step="0.01"
            required
          />

          <input className="button" type="submit" value="Calcular" />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result_title">{info.title}</h2>
            <span>Alcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
