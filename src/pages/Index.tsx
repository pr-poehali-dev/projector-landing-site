import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import RegistrationForm from '@/components/RegistrationForm';
import ReviewSection from '@/components/ReviewSection';
import ContactSection from '@/components/ContactSection';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  title: string;
  image_url: string;
  description?: string;
}

interface GalleryImage {
  id: number;
  image_url: string;
  title?: string;
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  
  useEffect(() => {
    fetch('https://functions.poehali.dev/33f9ba55-b73d-4487-b00a-6243568e3d6d?type=categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error loading categories:', err));
    
    fetch('https://functions.poehali.dev/33f9ba55-b73d-4487-b00a-6243568e3d6d?type=gallery')
      .then(res => res.json())
      .then(data => setGallery(data))
      .catch(err => console.error('Error loading gallery:', err));
  }, []);
  
  const scrollToRegistration = () => {
    const element = document.getElementById('registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/10"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/a34fa95b-f632-4d3f-9a49-39f40060ac60/files/0b60b47a-a2d8-4888-8747-58960ff0dc74.jpg)',
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
            {categories.map((category) => (
              <Card key={category.id} className="hover-lift overflow-hidden border-none shadow-lg">
                <div className="relative h-64">
                  <img
                    src={category.image_url}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white">{category.title}</h3>
                </div>
              </Card>
            ))}
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

      <RegistrationForm />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Галерея звезд</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {gallery.map((img, idx) => (
              <div
                key={img.id}
                className="relative aspect-square overflow-hidden rounded-lg hover-lift cursor-pointer"
              >
                <img src={img.image_url} alt={img.title || `Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewSection />

      <ContactSection />

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