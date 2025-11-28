import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const ContactSection = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

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

  return (
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
  );
};

export default ContactSection;
