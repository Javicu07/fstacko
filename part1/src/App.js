//import logo from './logo.svg';
import './App.css';
import Message from './Message.js';


const Description = () => {
  return <p>This is the app from fullstack's course</p>
}

const App = () =>{
  
  return (
    <div className="App">
      <Message message='We working' />
      <Message message='at a course' />
      <Message message='from React' />
      <Description />
    </div>
  );
}

export default App;
