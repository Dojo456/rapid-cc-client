import './App.css';
import { Calendar } from './calendar/calendar';

function App() {
  return (
    <div className="App">
      <div style={{ height:"10%", display:"flex", alignItems:"center", textAlign:"center"}}>
        <h1 style={{ display:"inline-block" }}>Rapid Contact Tracer</h1>
        <button style={{ display:"inline-block", position:"absolute", right:"30px" }}>
          Contact Trace
        </button>
      </div>
      <div className='calendar' style={{width:"80%", height:"90%", overflow:'hidden'}}>
        <Calendar/>
      </div>  
    </div>
  );
}

export default App;
