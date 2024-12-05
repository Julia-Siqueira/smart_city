import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Cadastro from './Cadastro';
import Sensores from './Sensores.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CrudUmidade from './CrudUmidade.jsx';
import TabelaSensores from './Tabelas.jsx';
import TabelaContador from './Contadores.jsx';
import TabelaTemperatura from './Temperatura.jsx';
import TabelaUmidade from './Umidade.jsx';
import TabelaLuminosidade from './Luminosidade.jsx';
import CrudSensor from './CrudUmidade.jsx';
import CrudLuminosidade from './CrudLuminosidade.jsx';
import CrudContador from './CrudContador.jsx';
import CrudTemperatura from './CrudTemperatura.jsx';
import Estatisticas from './Estatisticas.jsx';

function App() {
  return (
    <div style={styles.background}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro" element={<Cadastro />}/>
          <Route path="/sensores" element={<Sensores />}/>
          <Route path="/tabelas" element={<TabelaSensores />}/>
          <Route path="/contador" element={<TabelaContador />}/>
          <Route path="/temperatura" element={<TabelaTemperatura />}/>
          <Route path="/umidade" element={<TabelaUmidade />}/>
          <Route path="/luminosidade" element={<TabelaLuminosidade />}/>
          <Route path="/umidadeCRUD" element={<CrudUmidade/>} />
          <Route path="/luminosidadeCRUD" element={<CrudLuminosidade/>} />
          <Route path="/temperaturaCRUD" element={<CrudTemperatura />} />
          <Route path="/contadorCRUD" element={<CrudContador />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
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