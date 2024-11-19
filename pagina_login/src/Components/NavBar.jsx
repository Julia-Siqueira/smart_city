import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
          <div style={styles.logo}>
            <h1>Smart City</h1>
          </div>
          <ul style={styles.navLinks}>
            <li style={styles.navItem}>
              <Link to="/" style={styles.navLink}>Home</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/about" style={styles.navLink}>About</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/services" style={styles.navLink}>Services</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/contact" style={styles.navLink}>Contact</Link>
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