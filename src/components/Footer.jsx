import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__name">Aditi S</p>
        <p className="footer__copy mono">&copy; {year} Aditi S. All rights reserved.</p>
        <a href="#home" className="footer__top">
          Back to top
          <ArrowUp size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
