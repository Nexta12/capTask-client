

import { paths } from '@routes/paths';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (

    <footer className='bg-primary py-6 relative ' >
         <div className="container text-white flex flex-col">
        
         <Link to={paths.Index} className="h3">CAPTASKS<sup>™</sup></Link>
         <span className='text-xs'>Copyright &copy; {new Date().getFullYear()}. All rights reserved</span>
         </div>
    </footer>
  )
};

export default Footer;
