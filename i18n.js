// i18n.js - Internationalization system for Virtuálne sídlo

const I18n = {
    currentLang: 'sk',
    translations: {},
    supportedLanguages: ['sk', 'hu'],
    isInitialized: false,

    // Embedded translations (fallback for file:// protocol)
    embeddedTranslations: {"sk":{"meta":{"title":{"index":"Virtuálne sídlo - Najlepšie virtuálne sídlo na Slovensku","services":"Služby - Virtuálne sídlo","contact":"Kontakt - Virtuálne sídlo"},"description":{"index":"Virtuálne sídlo už od 25€+DPH mesačne. Profesionálne riešenie pre vašu firmu bez ďalších poplatkov.","services":"Naše služby virtuálneho sídla. Flexibilné možnosti platby pre každého. Komárno, Bratislava, Rimavská Sobota.","contact":"Kontaktujte nás pre virtuálne sídlo. VIVA PARK 6139/1-A0, Komárno. Rýchle a profesionálne riešenie pre vašu firmu."}},"nav":{"accounting":"Účtovníctvo","payroll":"Mzdy","buyCompany":"Kúpa spoločnosti","contact":"Kontakt","packages":"Naše Balíky","flagTitle":"Magyar verzió"},"hero":{"title":"Virtuálne sídlo na prestížnej adrese","subtitle":"od 25€ mesačne iba pre limitovaný počet firiem","button":"Naše balíky"},"exclusive":{"limitedAccess":"Aby bola adresa sídla skutočne exkluzívna, je dostupná len pre limitovaný počet firiem / živnostníkov.","ownership":"Priestory sú v našom vlastníctve (na rozdiel od konkurencie), takže môžete mať istotu dlhodobej spolupráce a nemennosti adresy sídla.","title":"Postaráme sa nielen o vašu korešpondenciu","subtitle":"Naše sídlo je viac ako poštová schránka","servicesIntro":"V cene našim klientom poskytujeme:","service1":"Súhlas so zriadením sídla na adrese VIVA PARK 6139/1-A0, Komárno","service2":"Preberanie, úschovu zásielok a online evidenciu pošty","service3":"Emailovú notifikáciu o prijatej pošte. Zásielky si môžete vyzdvihnúť v sídle našej spoločnosti, ponúkame bezplatné parkovanie priamo v objekte.","service4":"Skenovanie zásielok a preposielanie skenov priamo klientovi"},"process":{"title":"Ako to funguje?","startText":"Chcem zmeniť sídlo, názov, konateľa","step1Title":"Kontaktujte nás","step1Desc":"bezplatná konzultácia telefonicky, e-mailom alebo osobne","step2Title":"Zistíme vaše potreby","step2Desc":"dodanie údajov k zmene (názov spol., sídlo, konateľ, atď)","step3Title":"Pripravíme a pošleme","step3Desc":"všetky potrebné dokumenty pre vás pripravíme a pošleme","step4Title":"Návratka","step4Desc":"dokumenty podpíšete a pošlete nám späť","step5Title":"Náš tím vyrieši celý proces zmien","step5Desc":"náš tím vybaví všetko za vás na príslušných úradoch","step6Title":"Zmeny zapísané v príslušných registroch","step6Desc":"Zmeny zapísané v obchodnom registri"},"servicesIntro":{"text1":"Ak ste sa rozhodli zmeniť sídlo, názov, spoločníkov, konateľov či doplniť predmety podnikania do vašej SRO tak je tu naša spoločnosť pre vás plne k dispozícií. Cez nás môžete zrealizovať akúkoľvek zmenu vo vašej SRO bez behania po úradoch, stresov či nekonečnej byrokracie. Naša spoločnosť sa o všetko postará a vy sa môžete pokojne naďalej venovať svojim podnikateľským aktivitám","text2":"Naša spoločnosť ponúka a sprostredkúva svojim klientom aj služby čoraz populárnejšieho virtuálneho sídla. Každá spoločnosť musí mať v obchodnom registri zapísanú nejakú adresu (sídlo). Pri zvažovaní nad alternatívami podnikatelia často zvažujú možnosť zapísať si do obchodného registra virtuálne sídlo z viacerých pozitívnych dôvodov."},"servicesCards":{"mailTitle":"Starostlivosť o vašu poštu","mailDesc":"Vašu poštu budeme preberať, fotiť a môžeme skenovať aj jej obsah na požiadanie.","notifyTitle":"Notifikácia","notifyDesc":"Ak vám príde pošta, informujeme vás o tom e-mailom.","forwardTitle":"Preposielanie pošty","forwardDesc":"Naša spoločnosť svojim klientom poštu aj preposiela fyzicky v dohodnutom termíne.","priceTitle":"Cena","priceDesc":"Cena za virtuálne sídlo je niekoľkonásobne nižšia ako prenájom drahej kancelárie."},"additionalBenefits":{"title":"Vaše výhody s našou službou","text":"Medzi ďalšie výhody patrí fakt, že nehnuteľnosť, v ktorej sa sídlo nachádza je v našom vlastníctve. Pri zakúpení tejto služby ďalej získate online evidenciu a správu pošty, skenovanie, preberanie a úschovu zásielok, emailovú notifikáciu o prijatej pošte a 1x mesačne preposielanie zásielok na vami zvolenú adresu. Získajte prémiovú adresu pre vašu firmu, dôveryhodnosť pred obchodnými partnermi."},"whyChooseUs":{"title1":"Prečo si vybrať virtuálne sídlo pre vašu firmu?","subtitle1":"Rýchle, jednoduché a výhodné riešenie pre podnikateľov.","desc1":"Naša služba virtuálneho sídla vám poskytne všetko potrebné a za poplatok vám obratom zašleme oficiálny súhlas na zriadenie sídla, ktorý je nevyhnutný na zápis do Obchodného registra. Okrem toho sa postaráme o všetku administratívu spojenú s prichádzajúcou poštou, čím vám ušetríme čas a zabezpečíme bezproblémový chod vašej firmy.","title2":"Šetrite čas aj peniaze s našimi službami.","subtitle2":"Virtuálne sídlo vám prináša flexibilitu a profesionálny vzhľad.","desc2":"Prečo investovať do fyzického prenájmu kancelárie, keď to nie je nevyhnutné? S virtuálnym sídlom výrazne znížite náklady firmy, ktoré by ste inak museli vynaložiť na nájomné, služby a ďalšie prevádzkové náklady spojené s fyzickým priestorom. Virtuálne sídlo vám umožňuje ušetriť peniaze a súčasne zabezpečiť profesionálny vzhľad a stabilitu vašej firmy.","imageAlt1":"Naša kancelária","imageAlt2":"Naša kancelária"},"cta":{"question":"Chcete sa dozvedieť viac o našich balíkoch?","link":"POZRITE SI VŠETKY NAŠE SLUŽBY"},"errorPage":{"title":"Stránka nebola nájdená - Virtuálne sídlo","heading":"Táto stránka neexistuje","message":"Možno bola presunutá alebo je adresa nesprávna. Skúste sa vrátiť na úvodnú stránku alebo nás kontaktovať.","backHome":"Späť na domov","contact":"Kontaktovať nás"},"errorPage500":{"title":"Interná chyba servera - Virtuálne sídlo","heading":"Interná chyba servera","message":"Niečo sa pokazilo na našej strane. Skúste to prosím o chvíľu znova.","backHome":"Späť na domov","contact":"Kontaktovať nás"},"footer":{"description":"Profesionálne virtuálne sídlo pre vašu firmu","contactTitle":"Kontakt","pagesTitle":"Stránky","legalTitle":"Právne","home":"Domov","contact":"Kontakt","services":"Služby","cookies":"Cookies","privacy":"Ochrana údajov","terms":"Obchodné podmienky","copyright":"© 2025 Virtuálne sídlo. Všetky práva vyhradené."},"servicesPage":{"heroLabel":"Služby","heroTitle":"Flexibilné možnosti platby pre každého.","pricingTitle":"Jednoduché a rýchle riešenia.","pricingSubtitle":"Postaráme sa o doručovanie pošty a komunikáciu s úradmi, aby ste sa mohli sústrediť na svoje podnikanie.","monthly":"Mesačne","yearly":"Ročne","discount":"-10% zľava","periodMonthly":"+ DPH / mesiac","periodYearly":"+ DPH / rok","topChoice":"Top voľba","interested":"Mám záujem","locations":{"bratislava":"Bratislava","komarno":"Komárno","rimavska":"Rimavská Sobota"},"servicesList":{"item1":"Preberanie zásielok ročne","item2":"Súhlas so zriadením sídla s.r.o. / živnosti","item3":"E-mailové notifikácie","item4":"Skenovanie obsahu zásielok","item5":"Preberanie doporučenej pošty","item6":"1x mesačne preposielanie zásielok na vami zvolenú adresu"},"features":{"title1":"Rýchle zriadenie","desc1":"Váš súhlas so zriadením sídla pripravíme do 24 hodín od objednávky.","title2":"Profesionálna adresa","desc2":"Získajte prestížnu adresu v centre mesta pre vašu firmu.","title3":"Správa pošty","desc3":"Kompletná starostlivosť o vašu poštu vrátane skenovania a preposielania.","title4":"Bez skrytých poplatkov","desc4":"Transparentné ceny bez ďalších poplatkov alebo nepríjemných prekvapení."},"faq":{"title":"Často kladené otázky","q1":"Ako dlho trvá zriadenie virtuálneho sídla?","a1":"Súhlas so zriadením sídla pripravíme do 24 hodín od objednávky a zaplatenia. Dokument obdržíte elektronicky a môžete ho ihneď použiť pre registráciu firmy.","q2":"Môžem používať virtuálne sídlo pre rôzne typy firiem?","a2":"Áno, naše virtuálne sídlo je vhodné pre s.r.o., živnosti, občianske združenia aj iné právne formy podnikania. Služba je v súlade so slovenským právom.","q3":"Čo zahŕňa správa pošty?","a3":"Preberáme všetku poštu na vašu adresu, skenujeme dôležité dokumenty, posielame emailové notifikácie a 1x mesačne vám preposielame poštu na vami zvolenú adresu.","q4":"Sú v cene zahrnuté všetky služby?","a4":"Áno, cena 25€ + DPH mesačne zahŕňa všetky uvedené služby bez ďalších poplatkov. Neúčtujeme žiadne skryté poplatky alebo dodatočné náklady.","q5":"Je možné službu kedykoľvek ukončiť?","a5":"Službu môžete ukončiť kedykoľvek s jednomesačnou výpovednou lehotou. Pri ročnom balíčku je výpovedná lehota 3 mesiace."}},"contactPage":{"heroLabel":"Kontakt","heroTitle":"Máte na nás otázku?","infoTitle":"Naše kontaktné údaje","emailLabel":"Email:","addressLabel":"Adresa:","phoneLabel":"Telefón:","hoursTitle":"Pracovné hodiny","weekdays":"Pondelok - Piatok:","weekdaysHours":"9:00 - 16:00","weekend":"Sobota - Nedeľa:","weekendHours":"Zatvorené","formTitle":"Napíšte nám","formDescription":"Radi odpovieme na vaše otázky a pomôžeme vám s výberom najlepšieho riešenia pre vašu firmu.","nameLabel":"Meno a priezvisko *","emailFormLabel":"Email *","phoneFormLabel":"Telefón","messageLabel":"Vaša správa *","messagePlaceholder":"Opíšte nám, čo vás zaujíma alebo aké máte otázky...","hasCompany":"Mám existujúcu firmu","companyName":"Názov firmy","ico":"IČO","icoPlaceholder":"12345678","formSubject":"Nová správa z kontaktného formulára","submitButton":"Odoslať správu","mapsTitle":"Kde nás nájdete","mapsInfo":"Naša kancelária sa nachádza v centre Komárna s dobrým prístupom a parkovaním v okolí.","mapsIframeTitle":"Naša adresa: VIVA PARK 6139/1-A0, Komárno"},"alerts":{"fillRequired":"Prosím vyplňte všetky povinné polia označené *","invalidEmail":"Prosím zadajte platnú emailovú adresu","tooFast":"Prosím chvíľu počkajte a skúste to znova.","tooMany":"Dosiahli ste limit odoslaní. Skúste to neskôr.","submitError":"Odoslanie sa nepodarilo. Skúste to prosím neskôr.","sending":"Odosielanie správy...","invalidName":"Meno môže obsahovať len písmená","invalidPhone":"Telefón môže obsahovať len čísla a +","thankYou":"Ďakujeme za vašu správu! Kontaktujeme vás čoskoro.","cookieInfo":"Informácie o cookies budú dostupné čoskoro.","privacyInfo":"Zásady ochrany údajov budú dostupné čoskoro.","termsInfo":"Obchodné podmienky budú dostupné čoskoro."}},"hu":{"meta":{"title":{"index":"Virtuálne sídlo - A legjobb virtuális székhely Szlovákiában","services":"Szolgáltatások - Virtuálne sídlo","contact":"Kontakt - Virtuálne sídlo"},"description":{"index":"Virtuálne sídlo už od 25€+DPH mesačne. Profesionálne riešenie pre vašu firmu bez ďalších poplatkov.","services":"Virtuális ülésszolgáltatásaink. Rugalmas fizetési lehetőségek mindenki számára. Komárno, Pozsony, Rimavská Sobota.","contact":"Kontaktujte nás pre virtuálne sídlo. VIVA PARK 6139/1-A0, Komárno. Rýchle a profesionálne riešenie pre vašu firmu."}},"nav":{"accounting":"Könyvelés","payroll":"Bérszámfejtés","buyCompany":"Cég vásárlása","contact":"Kontakt","packages":"Csomagjaink","flagTitle":"Slovenská verzia"},"hero":{"title":"Virtuális székhely presztízscímen","subtitle":"Havi 25€-tól, csak korlátozott számú cég számára","button":"Csomagjaink"},"exclusive":{"limitedAccess":"Annak érdekében, hogy a székhely címe valóban exkluzív legyen, csak korlátozott számú vállalkozás / egyéni vállalkozó számára érhető el.","ownership":"A helyiségek a mi tulajdonunkban vannak (a versenytársakkal ellentétben), így biztos lehet a hosszú távú együttműködésben és a székhely címének változatlanságában.","title":"Nem csak a levelezéséről gondoskodunk","subtitle":"Székhelyünk több mint egy postaláda","servicesIntro":"Az árban ügyfeleinknek biztosítjuk:","service1":"Hozzájárulás a székhely létrehozásához a VIVA PARK 6139/1-A0, Komárno címen","service2":"Küldemények átvétele, megőrzése és online postanyilvántartás","service3":"E-mail értesítés a beérkezett postáról. A küldeményeket cégünk székhelyén veheti át, ingyenes parkolást biztosítunk közvetlenül az épületben.","service4":"Küldemények szkennelése és a szkennelt másolatok közvetlen továbbítása az ügyfélnek"},"process":{"title":"Hogyan működik?","startText":"Változtatni akarom a székhelyet, nevet, ügyvezetőt","step1Title":"Lépjen velünk kapcsolatba","step1Desc":"ingyenes konzultáció telefonon, e-mailben vagy személyesen","step2Title":"Felmérjük az igényeit","step2Desc":"a változáshoz szükséges adatok megadása (cégnév, székhely, ügyvezető stb.)","step3Title":"Elkészítjük és elküldjük","step3Desc":"minden szükséges dokumentumot elkészítünk és elküldünk Önnek","step4Title":"Visszaküldés","step4Desc":"a dokumentumokat aláírja és visszaküldi nekünk","step5Title":"Csapatunk elintézi a teljes változási folyamatot","step5Desc":"csapatunk mindent elintéz Ön helyett az illetékes hivataloknál","step6Title":"Változások bejegyezve az illetékes nyilvántartásokba","step6Desc":"Változások bejegyezve a cégjegyzékbe"},"servicesIntro":{"text1":"Ha úgy döntött, hogy megváltoztatja székhelyét, nevét, tagjait, ügyvezetőit vagy bővíti tevékenységi köreit az Ön Kft-jében, vállalatunk teljes mértékben az Ön rendelkezésére áll. Nálunk bármilyen változást elintézhet Kft-jében hivatalról hivatalra járás, stressz és végtelen bürokrácia nélkül. Cégünk mindent elintéz, Ön pedig nyugodtan folytathatja üzleti tevékenységét.","text2":"Cégünk ügyfeleinek a egyre népszerűbb virtuális székhely szolgáltatást is kínálja és közvetíti. Minden társaságnak szerepelnie kell a cégjegyzékben egy címmel (székhellyel). Az alternatívák mérlegelésekor a vállalkozók gyakran több pozitív okból is a virtuális székhely bejegyzését fontolják."},"servicesCards":{"mailTitle":"Postája kezelése","mailDesc":"Postáját átvesszük, lefotózzuk, és igény szerint a tartalmát is beszkenneljük.","notifyTitle":"Értesítés","notifyDesc":"Ha érkezik posta, e-mailben értesítjük.","forwardTitle":"Posta továbbítása","forwardDesc":"Cégünk a leveleket egyeztetett időpontban fizikailag is továbbítja ügyfeleinek.","priceTitle":"Ár","priceDesc":"A virtuális székhely ára többszörösen alacsonyabb, mint egy drága iroda bérlése."},"additionalBenefits":{"title":"Az Ön előnyei szolgáltatásunkkal","text":"További előnyök közé tartozik, hogy az ingatlan, amelyben a központi iroda található, a mi tulajdonunkban van. Ha megvásárolja ezt a szolgáltatást, akkor online iktatást és postakezelést, szkennelést, a posta átvételét és tárolását, a beérkező postáról szóló e-mail értesítést, valamint havonta egyszer a posta továbbítását is megkapja az Ön által választott címre. Szerezzen prémium címet vállalkozásának, hitelességet üzleti partnerei előtt."},"whyChooseUs":{"title1":"Miért válasszon virtuális irodát vállalkozása számára?","subtitle1":"Gyors, egyszerű és jövedelmező megoldás a vállalkozók számára.","desc1":"Virtuális székhelyszolgáltatásunk mindent megad Önnek, amire szüksége van, és díj ellenében azonnal elküldjük Önnek a székhely létrehozásához szükséges hivatalos jóváhagyást, amely a cégjegyzékbe való bejegyzéshez szükséges. Ezen túlmenően a beérkező postával kapcsolatos összes papírmunkát is elintézzük, így időt takarítunk meg Önnek, és biztosítjuk vállalkozása zökkenőmentes működését.","title2":"Takarítson meg időt és pénzt szolgáltatásainkkal.","subtitle2":"A virtuális iroda rugalmasságot és professzionális megjelenést biztosít.","desc2":"Miért fektetne be egy fizikai irodabérletbe, ha nincs rá szükség? Egy virtuális irodával jelentősen csökkentheti vállalkozásának azon költségeit, amelyeket egyébként bérleti díjra, közüzemi szolgáltatásokra és egyéb, a fizikai helyiséggel kapcsolatos működési költségekre kellene fordítania. A virtuális iroda lehetővé teszi, hogy pénzt takarítson meg, miközben professzionális megjelenést és stabilitást biztosít vállalkozásának.","imageAlt1":"Irodánk","imageAlt2":"Irodánk"},"cta":{"question":"Szeretne többet megtudni csomagjainkról?","link":"TEKINTSE MEG AZ ÖSSZES SZOLGÁLTATÁSUNKAT"},"errorPage":{"title":"Az oldal nem található - Virtuálne sídlo","heading":"Ez az oldal nem található","message":"Lehet, hogy áthelyezték vagy a cím hibás. Próbáljon visszatérni a kezdőlapra, vagy lépjen velünk kapcsolatba.","backHome":"Vissza a kezdőlapra","contact":"Kapcsolat"},"errorPage500":{"title":"Szerverhiba - Virtuálne sídlo","heading":"Belső szerverhiba","message":"Valami hiba történt a szerveren. Kérjük, próbálja meg később.","backHome":"Vissza a kezdőlapra","contact":"Kapcsolat"},"footer":{"description":"Professzionális virtuális iroda cége számára","contactTitle":"Kontakt","pagesTitle":"Oldalak","legalTitle":"Jogi","home":"Otthon","contact":"Kontakt","services":"Csomagjaink","cookies":"Cookies","privacy":"Adatvédelem","terms":"Általános Szerződési Feltételek","copyright":"© 2025 Virtuálne sídlo. Minden jog fenntartva."},"servicesPage":{"heroLabel":"Csomagjaink","heroTitle":"Rugalmas fizetési lehetőségek mindenki számára.","pricingTitle":"Egyszerű és gyors megoldások.","pricingSubtitle":"Mi gondoskodunk a postai kézbesítésről és a hatóságokkal való kommunikációról, hogy Ön a vállalkozására koncentrálhasson.","monthly":"Havi","yearly":"Éves","discount":"-10% kedvezmény","periodMonthly":"+ ÁFA / hónap","periodYearly":"+ ÁFA / év","topChoice":"Legjobb választás","interested":"Érdekel","locations":{"bratislava":"Pozsony","komarno":"Komárom","rimavska":"Rimaszombat"},"servicesList":{"item1":"Csomagok átvétele évente","item2":"Hozzájárulás az s.r.o. székhelyének létrehozásához.","item3":"E-mail értesítések","item4":"A levelek tartalmának beolvasása","item5":"Ajánlott postai küldemények fogadása","item6":"1x havi továbbítás az Ön által választott címre"},"features":{"title1":"Gyors beállítás","desc1":"A megrendeléstől számított 24 órán belül elkészítjük az Ön hozzájárulását a székhely létrehozásához.","title2":"Professzionális cím","desc2":"Szerezzen presztízsértékű belvárosi címet vállalkozásának.","title3":"Levélkezelés","desc3":"Postájának teljes körű kezelése, beleértve a szkennelést és a továbbítást.","title4":"Nincsenek rejtett díjak","desc4":"Átlátható árképzés, extra díjak és kellemetlen meglepetések nélkül."},"faq":{"title":"Gyakran feltett kérdések","q1":"Mennyi időbe telik egy virtuális ülés beállítása?","a1":"A megrendeléstől és a fizetéstől számított 24 órán belül elkészítjük a hozzájárulást a székhely létrehozásához. A dokumentumot elektronikusan kapja meg, és azonnal felhasználhatja a cégbejegyzéshez.","q2":"Használhatok virtuális helyet különböző típusú vállalatok számára?","a2":"Igen, virtuális irodánk alkalmas kft-k, kereskedelmi társaságok, polgári társulások és más jogi formájú vállalkozások számára. A szolgáltatás megfelel a szlovák törvényeknek.","q3":"Mit jelent a levelek kezelése?","a3":"Minden levelet elviszünk az Ön címére, beszkenneljük a fontos dokumentumokat, e-mail értesítést küldünk, és havonta egyszer továbbítjuk leveleit az Ön által kiválasztott címre.","q4":"Minden szolgáltatás benne van?","a4":"Igen, a havi 25€ + ÁFA ár a fenti szolgáltatásokat tartalmazza, további költségek nélkül. Nem számítunk fel semmilyen rejtett díjat vagy további költséget.","q5":"A szolgáltatás bármikor megszüntethető?","a5":"Ön bármikor felmondhatja a Szolgáltatást egy hónapos felmondási idővel. Az éves csomag esetében a felmondási idő 3 hónap."}},"contactPage":{"heroLabel":"Kontakt","heroTitle":"Kérdése van hozzánk?","infoTitle":"Elérhetőségeink","emailLabel":"Email:","addressLabel":"Cím:","phoneLabel":"Telefon:","hoursTitle":"Nyitvatartási idő","weekdays":"Hétfő - Péntek:","weekdaysHours":"9:00 - 16:00","weekend":"Szombat - Vasárnap","weekendHours":"Zárva","formTitle":"Írjon nekünk","formDescription":"Szívesen válaszolunk kérdéseire, és segítünk kiválasztani a vállalkozásának legmegfelelőbb megoldást.","nameLabel":"Elő- és utónév *","emailFormLabel":"Email *","phoneFormLabel":"Telefon","messageLabel":"Az Ön üzenete *","messagePlaceholder":"Mondja el, mi érdekli, vagy milyen kérdései vannak...","hasCompany":"Van egy meglévő cégem","companyName":"Cég neve","ico":"IČO","icoPlaceholder":"12345678","formSubject":"Új üzenet a kapcsolatfelvételi űrlapról","submitButton":"Üzenet küldése","mapsTitle":"Hol talál minket","mapsInfo":"Irodánk Komárom központjában található, jó megközelíthetőséggel és parkolási lehetőséggel a közelben.","mapsIframeTitle":"Címünk: VIVA PARK 6139/1-A0, Komárno"},"alerts":{"fillRequired":"Kérjük, töltse ki az összes kötelező mezőt *","invalidEmail":"Kérjük, adjon meg érvényes email címet","tooFast":"Kérjük, várjon egy pillanatot, majd próbálja újra.","tooMany":"Elérte a beküldési limitet. Kérjük, próbálja később.","submitError":"A beküldés sikertelen. Kérjük, próbálja később.","sending":"Üzenet küldése...","invalidName":"A név csak betűket tartalmazhat","invalidPhone":"A telefonszám csak számokat és + jelet tartalmazhat","thankYou":"Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.","cookieInfo":"A cookie-kkal kapcsolatos információk hamarosan elérhetők lesznek.","privacyInfo":"Az adatvédelmi szabályzat hamarosan elérhető lesz.","termsInfo":"Az általános szerződési feltételek hamarosan elérhetők lesznek."}}},

    // Initialize the i18n system
    async init() {
        // Get saved language or detect from URL/browser
        this.currentLang = this.detectLanguage();

        // Load translations
        await this.loadTranslations(this.currentLang);

        // Apply translations to page
        this.translatePage();

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Update language switcher
        this.updateLanguageSwitcher();

        // Update page meta tags
        this.updateMetaTags();

        this.isInitialized = true;
    },

    // Detect language from URL, localStorage, or browser
    detectLanguage() {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            localStorage.setItem('preferred-language', urlLang);
            return urlLang;
        }

        // Check localStorage
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            return savedLang;
        }

        // Default to Slovak
        return 'sk';
    },

    // Load translations - try fetch first, fall back to embedded
    async loadTranslations(lang) {
        // First try to use embedded translations (works offline and with file:// protocol)
        if (this.embeddedTranslations[lang]) {
            this.translations = this.embeddedTranslations[lang];
            return;
        }

        // Fallback: try to fetch from JSON files (works on web servers)
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (response.ok) {
                this.translations = await response.json();
                return;
            }
        } catch (error) {
            // Fetch failed, use embedded translations
        }

        // Ultimate fallback to Slovak embedded
        this.translations = this.embeddedTranslations['sk'];
    },

    // Get translation by key (supports nested keys like "nav.contact")
    t(key) {
        if (!this.translations || Object.keys(this.translations).length === 0) {
            return key;
        }

        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return value;
    },

    // Translate all elements with data-i18n attribute
    translatePage() {
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation !== key) {
                element.placeholder = translation;
            }
        });

        // Translate titles
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation !== key) {
                element.title = translation;
            }
        });

        // Translate alt text
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.t(key);
            if (translation !== key) {
                element.alt = translation;
            }
        });

        // Translate value attributes (for hidden inputs)
        document.querySelectorAll('[data-i18n-value]').forEach(element => {
            const key = element.getAttribute('data-i18n-value');
            const translation = this.t(key);
            if (translation !== key) {
                element.value = translation;
            }
        });
    },

    // Switch language
    async switchLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);

        await this.loadTranslations(lang);
        this.translatePage();

        document.documentElement.lang = lang;
        this.updateLanguageSwitcher();
        this.updateMetaTags();

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);

        // Dispatch event for other scripts to react
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },

    // Update the language switcher button/link
    updateLanguageSwitcher() {
        const switcher = document.querySelector('.flag-link');
        if (!switcher) return;

        const otherLang = this.currentLang === 'sk' ? 'hu' : 'sk';
        const flagImg = switcher.querySelector('.flag-icon');

        // Update flag image to show the OTHER language's flag
        if (flagImg) {
            flagImg.src = `images/flag-${otherLang}.png`;
            flagImg.alt = otherLang === 'hu' ? 'Hungarian flag' : 'Slovak flag';
        }

        // Update title
        switcher.title = this.t('nav.flagTitle');

        // Remove old event listener by cloning
        const newSwitcher = switcher.cloneNode(true);
        switcher.parentNode.replaceChild(newSwitcher, switcher);

        // Add click handler
        newSwitcher.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetLang = I18n.currentLang === 'sk' ? 'hu' : 'sk';
            I18n.switchLanguage(targetLang);
        });
    },

    // Update page meta tags based on current page
    updateMetaTags() {
        const pageName = this.getPageName();

        // Update title
        const titleKey = `meta.title.${pageName}`;
        const title = this.t(titleKey);
        if (title !== titleKey) {
            document.title = title;
        }

        // Update meta description
        const descKey = `meta.description.${pageName}`;
        const desc = this.t(descKey);
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && desc !== descKey) {
            metaDesc.content = desc;
        }
    },

    // Get current page name from URL
    getPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');

        if (filename === '' || filename === 'index') return 'index';
        if (filename.includes('services')) return 'services';
        if (filename.includes('contact')) return 'contact';

        return 'index';
    },

    // Helper to get current language
    getLang() {
        return this.currentLang;
    },

    // Helper to check if current language is Hungarian
    isHungarian() {
        return this.currentLang === 'hu';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    I18n.init();
});

// Export for use in other scripts
window.I18n = I18n;
