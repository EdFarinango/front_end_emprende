import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import './styles.css';



function Footer() {
  return (
    <>
<footer className="bg-light text-center text-white">
  <div className="container p-4 pb-0">
    <section className="mb-4">
      <a className="btn text-white btn-floating m-1" style={{backgroundColor: '#4c4c4c'}} href="#!" role="button"><i /><FacebookIcon></FacebookIcon></a>
  
    </section>
  </div>
  <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
    © 2023 Copyright:
    <a className="text-white" href="https://mdbootstrap.com/">EmPreNde</a>
  </div>
</footer>

</>

   
  );
}

export default Footer;