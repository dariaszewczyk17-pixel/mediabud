const fs = require('fs');
const path = require('path');

const files = [
  'descriptions_pipeline.py',
  'enrich_products.ipynb',
  'generate_descriptions.py',
  'image_pipeline.py',
  'img_fix.ipynb',
  'pipeline_opisy.ipynb',
  'scrape_cats.ipynb'
];

for (const file of files) {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Zastąp tokeny placeholderem
    content = content.replace(/skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J/g, 'sk_REMOVED_FOR_SECURITY');
    content = content.replace(/skZFMehj3STc5EGpVcQPUP5PQRmE4kWEQps0Zso4Rl5Ri3QUfmKRViMkpQ6lkHXZTrnHn0kuQgj6y6x7b6Y0Uz0z1jXPmYCKXVbAvYeZcSFOD7mk6uPmYCKXVbAvYeZcSFOD7mk6uTEeE3MRSLTanEaUjtrPVEO6DkRdKAt6MOHv0zU4NgWek5XVMcahI6TvYOzLqORIR9J/g, 'sk_REMOVED_FOR_SECURITY');
    fs.writeFileSync(filePath, content);
    console.log(`Usunięto token z ${file}`);
  }
}
