
import {useState,useCallback,useEffect,useRef} from 'react'

function App() {
 //ref hook
 const passwordRef =useRef(null);
 

 const [length, setLength] = useState(6)
 const [isnumber, setIsNumber] = useState(false)
 const [ischaracter, setIsCharacter] = useState(false)
 const [password, setPassword] = useState("")

 const passwordGenerator =useCallback(()=>{
  let pass =""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(isnumber){str+="0123456789"}
  if(ischaracter){str+="~!@#$%^&*()_+{}[]:*"}
  for (let i = 0; i <length; i++) {
    let char = Math.floor(Math.random()*str.length+1)
    pass += str.charAt(char);
   }
   setPassword(pass)
 },[length,isnumber,ischaracter,setPassword])
  const copypass=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  },[password])
 useEffect(() => {
  passwordGenerator();
 }, [length,ischaracter,isnumber,passwordGenerator])
 
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4  my-20 text-orange bg-gray-500'>
    <h1 className="text-3xl text-center my-8 text-white-100">Password Generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" value={password} className='outline-none w-full py-1 px-3 bg-white text-black'placeholder='password' readOnly ref={passwordRef}/>
      <button className='bg-blue-700 text-white outline-none px-3 py-0.5 shrink-0' onClick={copypass}>Copy</button>
     </div>
     <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input className="cursor-pointer" type="range" min={6} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
        <label htmlFor="">Length:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input className="cursor-pointer" id="numberInput" type="checkbox" defaultChecked={isnumber} onChange={()=> {setIsNumber((prev)=>!prev)}}/>
      <label htmlFor="numberInput">Number</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input className="cursor-pointer" id="charInput" type="checkbox" defaultChecked={ischaracter} onChange={()=> {setIsCharacter((prev)=>!prev)}}/>
      <label htmlFor="charInput">Characters</label>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
