import { Category } from "./SkillsSidebar";

interface SkillsMobileDropdownProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function SkillsMobileDropdown({
  categories,
  selectedCategory,
  setSelectedCategory,
}: SkillsMobileDropdownProps) {
  return (
    <div className="md:hidden w-full p-6 border-b border-border/50 bg-background/50 backdrop-blur-md">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-3 bg-muted/80 text-foreground font-semibold rounded-xl neumorphic-inset focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {categories.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
