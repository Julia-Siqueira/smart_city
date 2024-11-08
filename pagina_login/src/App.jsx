import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Cadastro from './Cadastro';
import Sensores from './Sensores.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CrudUmidade from './CrudUmidade.jsx';
import TabelaSensores from './Tabelas.jsx';

function App() {
  return (
    <div style={styles.background}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<Cadastro />}/>
          {/* <Route path="/sensores" element={<PrivateRoute><Sensores /></PrivateRoute>}/> */}
          <Route path="/sensores" element={<Sensores />}/>
          <Route path="/crud" element={<CrudUmidade />}/>
          <Route path="/tabelas" element={<TabelaSensores />}/>
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