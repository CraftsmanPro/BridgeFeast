import { ChefHat } from 'lucide-react';
import { RecipeGenerator } from '@/components/recipe-generator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto text-center py-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <ChefHat className="h-12 w-12 text-primary" />
          <h1 className="font-headline text-5xl font-bold text-primary tracking-tighter">
            Fridge Feast
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          What culinary masterpiece can we create from your fridge today?
        </p>
      </header>
      <main className="flex-grow container mx-auto px-4 pb-8">
        <RecipeGenerator />
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Built with AI. Enjoy your meal!</p>
      </footer>
    </div>
  );
}
