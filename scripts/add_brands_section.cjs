const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/CategoryPage.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Dodajemy importy z brands.ts
if (!content.includes('import { getBrandBySlug, slugifyBrand }')) {
  content = content.replace(
    'import { products as staticProducts } from "@/data/products";',
    'import { products as staticProducts } from "@/data/products";\nimport { getBrandBySlug, slugifyBrand } from "@/data/brands";'
  );
}

// 2. Szukamy miejsca na wstawienie sekcji marek (nad listą produktów)
const targetString = `{/* ── Lista produktów ── */}`;
const brandsSection = `
                {/* ── Popularne marki w tej kategorii (Wizualny Silos) ── */}
                {availableBrands.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#f81828] rounded-full inline-block"></span>
                      Popularne marki w tej kategorii
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {availableBrands.slice(0, 12).map(brandName => {
                        const brandData = getBrandBySlug(slugifyBrand(brandName));
                        if (!brandData || !brandData.logo) return null;
                        
                        const isSelected = selectedBrand === brandName;
                        
                        return (
                          <button
                            key={brandName}
                            onClick={() => updateParam("brand", isSelected ? "" : brandName)}
                            className={\`group relative flex items-center justify-center w-24 h-12 rounded-xl transition-all duration-300 overflow-hidden \${isSelected ? 'ring-2 ring-[#f81828] bg-white/10' : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10'}\`}
                            title={\`Filtruj po marce: \${brandName}\`}
                          >
                            <img 
                              src={brandData.logo} 
                              alt={\`Logo \${brandName}\`} 
                              className={\`max-w-[70%] max-h-[60%] object-contain transition-all duration-300 \${isSelected ? 'opacity-100 scale-110' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}\`}
                              loading="lazy"
                            />
                            {isSelected && (
                              <div className="absolute top-1 right-1 w-2 h-2 bg-[#f81828] rounded-full shadow-[0_0_8px_rgba(248,24,40,0.8)]"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                `;

if (content.includes(targetString) && !content.includes('Popularne marki w tej kategorii')) {
  content = content.replace(targetString, brandsSection + targetString);
  fs.writeFileSync(filePath, content);
  console.log('Dodano sekcję marek do CategoryPage.tsx');
} else {
  console.log('Nie znaleziono miejsca do wstawienia sekcji marek lub sekcja już istnieje.');
}
