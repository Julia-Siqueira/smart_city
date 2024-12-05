import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
          <div style={styles.logo}>
          <Link to="/sensores" style={styles.navLink}><h1>Smart City</h1></Link>  
          </div>
          <ul style={styles.navLinks}>
            <li style={styles.navItem}>
              <Link to="/sensores" style={styles.navLink}>Tabelas</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/temperaturaCRUD" style={styles.navLink}>CRUD</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/estatisticas" style={styles.navLink}>Estatísticas</Link>
            </li>
          </ul>
        </nav>
      );
}

const styles = {
    navbar: {
        backgroundColor: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      logo: {
        color: '#4f728b',
        fontSize: '24px',
      },
      navLinks: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
      },
      navItem: {
        marginLeft: '20px',
      },
      navLink: {
        color: '#4f728b',
        textDecoration: 'none',
        fontSize: '18px',
      }
}

export default Navbar;