import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Simple Todo. All rights reserved.</p>
    </footer>
  )
}

export default Footer