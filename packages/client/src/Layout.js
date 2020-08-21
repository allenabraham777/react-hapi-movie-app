import React from 'react';
import Nav from './Components/Nav';

function Layout({children}) {
  return (
    <section className="bg-dark vh-100">
      <Nav/>
      {children}
    </section>
  );
}

export default Layout;