import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">КонкурсПрожектор</h1>
        <Button variant="ghost" size="sm" className="text-sm" onClick={() => navigate('/admin')}>
          <Icon name="LogIn" size={18} className="mr-2" />
          Вход для админа
        </Button>
      </div>
    </header>
  );
};

export default Header;