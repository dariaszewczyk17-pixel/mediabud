import fs from 'fs';
const file = '/data/workspace/997182e0-2691-4a98-9ab8-6744ed6d638b/mediabud/src/pages/CategoryPage.tsx';
let content = fs.readFileSync(file, 'utf-8');

const toReplace = `                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Sekcja SEO i FAQ (na dole strony) ── */}`;

const replacement = `                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Empty state */
              <div
                className="rounded-2xl p-12 text-center"
                style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl"
                  style={{ background: "rgba(248,24,40,0.08)", border: "1px solid rgba(248,24,40,0.15)" }}
                >
                  🏗️
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">
                  {hasActiveFilters ? "Brak wyników dla wybranych filtrów" : "Baza produktów w rozbudowie"}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
                  {hasActiveFilters
                    ? "Zmień lub wyczyść filtry, aby zobaczyć dostępne produkty."
                    : "Aktywnie uzupełniamy naszą bazę. Zadzwoń — z pewnością mamy to, czego szukasz!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {hasActiveFilters
                    ? <Button onClick={clearFilters} className="bg-[#f81828] hover:bg-[#c8000f]">Wyczyść filtry</Button>
                    : <>
                        <a href="tel:+48533553344">
                          <Button className="bg-[#f81828] hover:bg-[#c8000f]"><Phone className="w-4 h-4 mr-2" /> +48 533 553 344</Button>
                        </a>
                        <Link to="/kontakt">
                          <Button variant="outline" className="border-[#f81828]/40 text-[#f81828] hover:bg-[#f81828] hover:text-white"><Mail className="w-4 h-4 mr-2" /> Wyślij zapytanie</Button>
                        </Link>
                      </>
                  }
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Sekcja SEO i FAQ (na dole strony) ── */}`;

content = content.replace(toReplace, replacement);
fs.writeFileSync(file, content, 'utf-8');
console.log("Empty state przywrócony!");
