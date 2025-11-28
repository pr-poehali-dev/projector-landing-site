import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const ReviewSection = () => {
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

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

  return (
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
  );
};

export default ReviewSection;
