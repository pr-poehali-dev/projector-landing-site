import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [contests, setContests] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);

  const handleContestToggle = (contest: string) => {
    setContests(prev =>
      prev.includes(contest) ? prev.filter(c => c !== contest) : [...prev, contest]
    );
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !age || contests.length === 0) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/fa394409-631e-4cf4-af38-ea49853be627', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone,
          age: parseInt(age),
          contests,
          photoUrl: photoFile ? photoFile.name : null,
          musicUrl: musicFile ? musicFile.name : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке заявки');
      }

      toast.success('Заявка успешно отправлена!');
      setFullName('');
      setPhone('');
      setAge('');
      setContests([]);
      setPhotoFile(null);
      setMusicFile(null);
    } catch (error) {
      toast.error('Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  return (
    <section id="registration" className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-none shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Форма регистрации</h2>
            
            <form onSubmit={handleRegistrationSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullname">ФИО</Label>
                <Input
                  id="fullname"
                  placeholder="Иванов Иван Иванович"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="age">Возраст</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="18"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="mb-3 block">Выберите конкурсы для участия</Label>
                <div className="space-y-3">
                  {['Конкурс дефиле', 'Фотоконкурс', 'Конкурс талантов', 'Вечерний образ'].map((contest) => (
                    <div key={contest} className="flex items-center space-x-2">
                      <Checkbox
                        id={contest}
                        checked={contests.includes(contest)}
                        onCheckedChange={() => handleContestToggle(contest)}
                      />
                      <Label htmlFor={contest} className="cursor-pointer">
                        {contest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="photo">Загрузите фото</Label>
                <div className="mt-2 flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="relative bg-secondary/20 hover:bg-secondary/30 border-secondary"
                    onClick={() => document.getElementById('photo')?.click()}
                  >
                    Выбор файла
                  </Button>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {photoFile ? photoFile.name : 'Не выбран ни один файл'}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="music">Загрузите музыку</Label>
                <div className="mt-2 flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="relative bg-secondary/20 hover:bg-secondary/30 border-secondary"
                    onClick={() => document.getElementById('music')?.click()}
                  >
                    Выбор файла
                  </Button>
                  <input
                    type="file"
                    id="music"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {musicFile ? musicFile.name : 'Не выбран ни один файл'}
                  </span>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
                Зарегистрироваться
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationForm;