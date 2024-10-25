import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Cadastro from './Cadastro';
import Sensores from './Sensores';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <h1 style={styles.title}>Bem vindo(a) ao DigiTown</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<Cadastro />}/>
          <Route path="/sensores" element={<Sensores />}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;

const styles = {
  title:{
    textAlign: 'center',
    color: 'white'
  }
}