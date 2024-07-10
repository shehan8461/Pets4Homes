import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './header.css';  // Ensure this points to where your CSS is stored

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="nav"> 
      <div className='navbardetails'>
        <Link to='/'><h1 className='twebpagename'>Pet4Homes</h1></Link> 
        <h3 id='h3'>Discover Top Deals from Leading Marketplaces in Sri Lanka.</h3>
        <ul className='other-topics'>
          <Link to='/'><li>Home</li></Link>  
          <Link to='/about'><li>About</li></Link>
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='Profile' className='h-7 w-7 rounded-full object-cover'></img>
            ) : (
              <li>Sign In</li>
            )}
          </Link>  
        </ul>
      </div>   
    </div>
  );
}
