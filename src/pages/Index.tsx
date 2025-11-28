import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [contests, setContests] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);

  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContestToggle = (contest: string) => {
    setContests(prev =>
      prev.includes(contest) ? prev.filter(c => c !== contest) : [...prev, contest]
    );
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !age || contests.length === 0) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    toast.success('Заявка успешно отправлена!');
    setFullName('');
    setPhone('');
    setAge('');
    setContests([]);
    setPhotoFile(null);
    setMusicFile(null);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewText || reviewRating === 0) {
      toast.error('Заполните все поля отзыва');
      return;
    }
    toast.success('Спасибо за ваш отзыв!');
    setReviewName('');
    setReviewText('');
    setReviewRating(0);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error('Заполните все поля формы');
      return;
    }
    toast.success('Сообщение отправлено!');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const scrollToRegistration = () => {
    const element = document.getElementById('registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">КонкурсПрожектор</h1>
          <Button variant="ghost" size="sm" className="text-sm">
            <Icon name="LogIn" size={18} className="mr-2" />
            Вход для админа
          </Button>
        </div>
      </header>

      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/10"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/dcd485fc-f845-498c-8ba8-0a39ddd1100c.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        />
        <div className="absolute inset-0 bg-primary/40" />
        
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-none shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-5xl font-bold mb-4 text-foreground">В центре внимания</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Присоединяйтесь к конкурсу дефиле и фото.<br />
                Покажите свой стиль и талант на подиуме!
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToRegistration}
              >
                Зарегистрироваться
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
            Зачем участвовать в «Прожекторе»?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift border-none shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Trophy" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Признание и награды</h3>
                <p className="text-muted-foreground">
                  Получите заслуженное признание своего таланта и профессиональные награды от жюри.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-none shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Camera" size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Профессиональная съёмка</h3>
                <p className="text-muted-foreground">
                  Работайте с опытными фотографами и получите качественное портфолио для карьеры.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-none shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Award" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Новые возможности</h3>
                <p className="text-muted-foreground">
                  Откройте двери к новым проектам, контрактам и сотрудничеству в индустрии моды.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Категории конкурса</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="hover-lift overflow-hidden border-none shadow-lg">
              <div className="relative h-64">
                <img
                  src="https://cdn.poehali.dev/files/c20e69a3-6e38-433e-af8c-4284612b3fe7.jpg"
                  alt="Дефиле"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white">Дефиле</h3>
              </div>
            </Card>

            <Card className="hover-lift overflow-hidden border-none shadow-lg">
              <div className="relative h-64">
                <img
                  src="https://cdn.poehali.dev/files/c20e69a3-6e38-433e-af8c-4284612b3fe7.jpg"
                  alt="Фотоконкурс"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white">Фотоконкурс</h3>
              </div>
            </Card>

            <Card className="hover-lift overflow-hidden border-none shadow-lg">
              <div className="relative h-64">
                <img
                  src="https://cdn.poehali.dev/files/5b49d16a-7780-4ab8-838a-f103836e3e53.jpg"
                  alt="Креативный образ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white">Креативный образ</h3>
              </div>
            </Card>

            <Card className="hover-lift overflow-hidden border-none shadow-lg">
              <div className="relative h-64">
                <img
                  src="https://cdn.poehali.dev/files/5b49d16a-7780-4ab8-838a-f103836e3e53.jpg"
                  alt="Артистизм"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white">Артистизм</h3>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-8">Как зарегистрироваться</h2>
          <p className="text-center text-muted-foreground mb-12">
            Следуйте простым шагам для регистрации на конкурс Прожектор
          </p>

          <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-primary/5">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <span className="text-lg font-semibold">Заполните форму</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14 text-muted-foreground">
                Укажите ваше ФИО, номер телефона и возраст для регистрации на конкурс.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-secondary/5">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="text-lg font-semibold">Выберите конкурсы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14 text-muted-foreground">
                Отметьте галочками конкурсы, в которых хотите участвовать: Дефиле, Фотоконкурс, Креативный образ или Артистизм.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-primary/5">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <span className="text-lg font-semibold">Загрузите материалы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14 text-muted-foreground">
                Прикрепите ваше фото и музыкальный трек для выступления. После отправки мы свяжемся с вами!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Галерея звезд</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[
              'https://cdn.poehali.dev/files/e143910c-e081-47fe-87dd-70486ef27e1d.jpg',
              'https://cdn.poehali.dev/files/e143910c-e081-47fe-87dd-70486ef27e1d.jpg',
              'https://cdn.poehali.dev/files/e143910c-e081-47fe-87dd-70486ef27e1d.jpg',
              'https://cdn.poehali.dev/files/e143910c-e081-47fe-87dd-70486ef27e1d.jpg',
              'https://cdn.poehali.dev/files/e143910c-e081-47fe-87dd-70486ef27e1d.jpg',
              'https://cdn.poehali.dev/files/e143910c-e081-47fe-87dd-70486ef27e1d.jpg',
            ].map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-lg hover-lift cursor-pointer"
              >
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Отзывы участников</h2>
          <p className="text-center text-muted-foreground mb-12">
            Узнайте, что говорят участники наших конкурсов о своем опыте
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="border-none shadow-md bg-primary/5">
              <CardContent className="p-8">
                <div className="text-6xl text-primary/30 mb-4">"</div>
                <p className="text-muted-foreground mb-6">
                  Организация конкурса прошла на высшем уровне! Все было продумано до мелочей.
                </p>
                <div>
                  <p className="font-semibold">Алексей Иванов</p>
                  <p className="text-sm text-muted-foreground">Директор компании</p>
                </div>
                <div className="text-6xl text-primary/30 text-right mt-4">"</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-secondary/5">
              <CardContent className="p-8">
                <div className="text-6xl text-secondary/30 mb-4">"</div>
                <p className="text-muted-foreground mb-6">
                  Большое спасибо за профессионализм и креативный подход!
                </p>
                <div>
                  <p className="font-semibold">Мария Смирнова</p>
                  <p className="text-sm text-muted-foreground">Участник конкурса</p>
                </div>
                <div className="text-6xl text-secondary/30 text-right mt-4">"</div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-primary/5">
              <CardContent className="p-8">
                <div className="text-6xl text-primary/30 mb-4">"</div>
                <p className="text-muted-foreground mb-6">
                  Незабываемые эмоции и яркие впечатления! Команда КонкурсПрожектор - настоящие профессионалы своего дела.
                </p>
                <div>
                  <p className="font-semibold">Екатерина Петрова</p>
                  <p className="text-sm text-muted-foreground">Участник конкурса</p>
                </div>
                <div className="text-6xl text-primary/30 text-right mt-4">"</div>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-2xl mx-auto border-none shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Оставьте свой отзыв</h3>
              <p className="text-center text-muted-foreground mb-6">
                Поделитесь впечатлениями о конкурсе Прожектор
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <Label>Ваша оценка</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="text-3xl transition-colors"
                      >
                        <Icon
                          name="Star"
                          size={32}
                          className={star <= reviewRating ? 'fill-secondary text-secondary' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Нажмите на звезду, чтобы оценить</p>
                </div>

                <div>
                  <Label htmlFor="review-name">Ваше имя</Label>
                  <Input
                    id="review-name"
                    placeholder="Введите ваше имя"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="review-text">Ваш отзыв</Label>
                  <Textarea
                    id="review-text"
                    placeholder="Расскажите о своих впечатлениях..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Минимум 10 символов</p>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Отправить отзыв
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Свяжитесь с нами</h2>
              <p className="text-center text-muted-foreground mb-8">
                Заполните форму ниже, и мы свяжемся с вами в ближайшее время
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6 mb-8">
                <div>
                  <Label htmlFor="contact-name">Имя</Label>
                  <Input
                    id="contact-name"
                    placeholder="Ваше имя"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Сообщение</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Ваше сообщение..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Отправить сообщение
                </Button>
              </form>

              <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="MapPin" size={32} className="text-primary" />
                  </div>
                  <p className="text-muted-foreground">г. Москва, ул. Прожектор, д. 10</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30"
            >
              <Icon name="Facebook" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30"
            >
              <Icon name="Instagram" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30"
            >
              <Icon name="Twitter" size={20} />
            </Button>
          </div>

          <div className="flex justify-center gap-8 mb-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Home</a>
            <a href="#registration" className="hover:text-primary transition-colors">Регистрация</a>
            <a href="#" className="hover:text-primary transition-colors">Конкурсы</a>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>© 2024 КонкурсПрожектор. Все права защищены.</p>
            <p className="mt-1">г. Москва, ул. Прожектор, д. 10</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
