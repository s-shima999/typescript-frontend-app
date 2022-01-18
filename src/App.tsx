import logo from './logo.svg';
import './App.css';
import React, {useRef, useState} from 'react';
import axios from 'axios';
import { TestMessage } from './components/TestMessage';
import { device } from './types/device';

const server = 'http://localhost:3000/api/getTest';

export const App = () => {

  const [text, setText] = useState<string>('');
  const [device, setDevice] = useState<device[]>([]);

  // const mailaddresszRef = createRef<HTMLInputElement>();
  const mailaddresszRef = useRef<HTMLInputElement>(null);

  // const handleOnChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ):void => {    
  //   setText(() => event.target.value);
  // }

  const handleClick = (
    event: React.MouseEvent<HTMLElement>
  ):void => {
    axios.get<device[]>(`${server}?aaa=${text}?bbb=${mailaddresszRef.current?.value}`)
      .then((res) => { 
        console.log(res); 
        setDevice(() => res.data);
      })
      .catch(console.error);
  }

  return ( 
    <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <TestMessage>あいうえお</TestMessage>
    <div>
      ここに入力
      <input ref={mailaddresszRef} type="text" />
      {/* <input type="text" value={text} onChange={e => handleOnChange(e)} /> */}
      <button onClick={e => handleClick(e)}>Get Data</button> 
    </div> 
    <div>
      {device.map(dev=>{
        return `${dev.id}/${dev.name}`
      })}
    </div>
    </header>
  </div>
  ); 
}
export default App;
