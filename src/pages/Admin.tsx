import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Application {
  id: number;
  fullName: string;
  phone: string;
  age: number;
  contests: string[];
  photoUrl?: string;
  musicUrl?: string;
  createdAt: string;
}

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminToken', 'admin123');
      toast.success('Вход выполнен успешно');
      fetchApplications();
    } else {
      toast.error('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
    setApplications([]);
    toast.success('Выход выполнен');
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/fa394409-631e-4cf4-af38-ea49853be627', {
        method: 'GET',
        headers: {
          'X-Admin-Token': 'admin123',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке заявок');
      }

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      toast.error('Не удалось загрузить заявки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin123') {
      setIsAuthenticated(true);
      fetchApplications();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Вход для администратора</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Войти
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                Вернуться на главную
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Админ-панель КонкурсПрожектор</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Заявки участников</h2>
            <p className="text-muted-foreground">Всего заявок: {applications.length}</p>
          </div>
          <Button onClick={fetchApplications} disabled={loading}>
            <Icon name="RefreshCw" size={18} className="mr-2" />
            Обновить
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Icon name="Loader2" size={48} className="animate-spin text-primary" />
          </div>
        ) : applications.length === 0 ? (
          <Card className="border-none shadow-md">
            <CardContent className="p-12 text-center">
              <Icon name="Inbox" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">Заявок пока нет</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ID</TableHead>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Возраст</TableHead>
                      <TableHead>Конкурсы</TableHead>
                      <TableHead>Дата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">#{app.id}</TableCell>
                        <TableCell className="font-medium">{app.fullName}</TableCell>
                        <TableCell>{app.phone}</TableCell>
                        <TableCell>{app.age} лет</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {app.contests.map((contest, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {contest}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(app.createdAt).toLocaleString('ru-RU')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Admin;
