import './App.css';
import { Calendar } from './calendar/calendar';

function App() {
  return (
    <div className="App">
      <div className='calendar' style={{width: "70%", height: "90%", overflow:'hidden'}}>
        <Calendar/>
      </div>  
    </div>
  );
}

export default App;
