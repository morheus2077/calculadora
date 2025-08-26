import './App.css'
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useState, type FormEvent} from 'react'
import icone from '../public/Gasolinafavicon.png'

/*
calculo: alcool/gasolina
if calculo < 0.7 compensa usar o alcool
*/ 

interface InfoProps{
  titulo: string;
  gasolina: string | number;
  alcool: string | number;
}


function App() {

  const[alcool, setAlcool] = useState(0);
  const[gasolina, setGasolina] = useState(0);

  const[info, setInfo] = useState <InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault(); //prevenindo o comportamento padrao do formulario ao clicar no botao
    
    let calculo = (alcool/gasolina);
    console.log(calculo)
    
    if(calculo <= 0.7){
      setInfo({
        titulo: "Compensa usar Álcool!",
        gasolina: formatarMetical(gasolina),
        alcool: formatarMetical(alcool)
      })
    }else{
      setInfo({
        titulo: "Compensa usar Gasolina!",
        gasolina: formatarMetical(gasolina),
        alcool: formatarMetical(alcool)
      })
    }
  }


  //funcao para formatar a moeda
  function formatarMetical(valor: number){
    let meticalFormatado = valor.toLocaleString("pt-br",{
      style: "currency",
      currency:"Mzn"
    })

    return meticalFormatado;
  }


  //animacoes gsap
  gsap.registerPlugin(SplitText);
   let mySplitText = new SplitText(".split", {type: "chars"});
   let chars = mySplitText.chars;

   gsap.from(chars, {
    yPercent:130,
    stagger: 0.02,
    ease: "back.out",
    duration: 1
   })


  return (
    <>
    <div className='flex items-center justify-center flex-col h-screen text-white'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <div className='text-red-600'>
          <img className='w-28' 
          src={icone}
          alt="logotipo" />
        </div>
        <div className="split">
          <h1 className='main-text text-black font-bold md:text-2xl lg:text-xl'>Qual é a melhor opção?</h1>
        </div>
        </div>
         
        <div className=''>
           {/* input de alcool */}
          <form
          onSubmit={calcular}
          className='flex flex-col  justify-center gap-2 mt-5'>
            <label className='text-left text-black md:text-2xl lg:text-sm' htmlFor="">Álcool ( preço por litro)</label>
            <input className='bg-gray-300 w-[330px] md:w-[750px] md:h-14 lg:h-9 lg:w-96 text-black indent-2 md:text-2xl lg:text-xl rounded-sm h-9 font-bold' type="number"
            placeholder='60.90 Mzn'
            min= "1"
            step = "1"
            value={alcool}
            onChange={(e)=>{setAlcool(Number(e.target.value))}}
            required
             />
            {/* input de gasolina */}
             <label className='text-left text-black md:text-2xl lg:text-sm' htmlFor="">Gasolina ( preço por litro)</label>
            <input className='bg-gray-300 w-[330px] md:w-[750px] md:h-14 lg:h-9 lg:w-96 text-black indent-2 md:text-2xl lg:text-xl rounded-sm h-9 font-bold' type="number"
            placeholder='83.57 Mzn'
            min= "1"
            step = "1"
            value={gasolina}
            onChange={(e)=>{setGasolina(Number(e.target.value))}}
            required />
            <button type='submit' className='bg-[#ba3131] w-[330px] md:w-[750px] md:h-16 lg:h-11 lg:w-96 rounded-md h-11 cursor-pointer text-black font-bold hover:scale-105 transition-transform 0.9 hover:shadow-[#ba3131] hover:shadow-2xl md:mt-5 lg:mt-1'>Calcular</button>
          </form>

        </div>
    
        {info && Object.keys(info).length > 0 &&  (
           <div>
            <section className='max-w-64 w-60 h-32 flex flex-col items-center justify-center bg-[#ba3131] rounded-sm mt-8 font-bold hover:scale-110 transition-transform 0.5 hover:shadow-[#ba3131] shadow-2xl'>
              <h2>{info.titulo}</h2>
              <span className='text-xs'>Álcool: {info.alcool}</span>
              <span className='text-xs'>Gasolina: {info.gasolina}</span>
            </section>
          </div>
        )}
      </div>
    </>
  )
}

export default App
