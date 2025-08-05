**REST API \-tarkistuslista**

**✅ Konsepti on valmis kun...**

| Kriteerit | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| API perustuu selkeisiin liiketoiminnallisiin tarpeisiin | API9:2019 | ❌ |
| API kätkee raa'an taustatiedon; suunniteltu yhteiskäyttöön. | API6:2023 | ❌ |
| Päätepisteillä on liiketoiminta-arvo ja ominaisuuksien kuvaukset. | API9:2023 | ✅ (kuvauksen kautta) |
| APIn suunnittelu on yhdenmukainen muiden APIen kanssa | API8:2023, API9:2023 | ❌ |
| Tietojen/attribuuttien nimeämisessä käytetään kuvailevaa englantia. | \- | ❌ |
| Pakolliset kentät on määritelty | API6:2019 | ✅ (pakollisen kautta) |
| Päivämäärät käyttävät ISO-muotoa aikavyöhykkeineen | API8:2019 | ✅ (via format: date-time) |
| Yleiset tiedot käyttävät vakioarvoja (esim. ISO). | API6:2023, API8:2019 | ➖ (via enum, format, pattern) |
| Kenttien nimissä vältetään lyhenteitä, käytetään kokonaisia sanoja. | API9:2023 | ❌ |
| Uusien resurssien luominen palauttaa tunnukset | API2:2023 | ✅ (vastausskeeman/esimerkin kautta) |

---

**🧪 API-suunnittelun prototyyppi on valmis kun...**

| Kriteerit | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Kaikki konseptin tarkistuslistan kohdat on tarkastettu | \- | ❌ |
| Loppupisteen polut sisältävät enintään kaksi resurssia/aliresurssia. | \- | ❌ |
| Päätepisteet ja attribuutit sisältävät esimerkkejä | \- | ✅ (esimerkin kautta, esimerkit) |
| POSTia käytetään luomiseen/päivittämiseen (ei PUTia, ellei se ole täysi). | \- | ❌ |
| DELETEa käytetään resurssien poistamiseen | \- | ❌ |
| Versionointistrategia päätetään; yhdyskäytävä tukee | API9:2023 | ❌ |
| GET:llä ei ole pyyntörunkoa; palauttaa 200 OK sisällön kanssa. | \- | ➖ (konventio; ei pakollinen) |
| GET palauttaa 204, jos vastauksen runko on tyhjä | \- | ✅ (voi määritellä 204-vastauksen) |
| POST palauttaa 200 OK päivityksen yhteydessä | \- | ✅ (voi määritellä tilakoodit) |
| POST palauttaa 201 Created with ID on create | \- | ✅ |
| DELETE palauttaa 204 OK onnistumisen yhteydessä | \- | ✅ |
| 400 virheet antavat tarkat virhetiedot | API6:2023 | ✅ (kuvattu vastausskeemassa) |
| 401 Unauthorized väärien tunnusten vuoksi. | API2:2023 | ✅ (vakiovastausdokumentaatio) |
| 403 Kielletty, kun kyseessä on luvaton operaatio. | API5:2023 | ✅ |

---

**🚀 API on ylläpidettävissä tuotannossa, kun...**

| Kriteerit | OWASP API Top 10 | OpenAPI 3.1.x |
| ----- | ----- | ----- |
| Kaikki prototyyppi/suunnittelukohteet auditoitu | \- | ❌ |
| Julkaistu API-hallinnan kautta | API10:2019, API8:2023 | ❌ |
| Näkyy kehittäjäportaalissa | API9:2023 | ❌ |
| Pääsee vain API-portin kautta | API9:2023, API8:2023 | ❌ |
| Nopeusrajoitukset on otettu käyttöön | API4:2023 | ❌ |
| Asiakirjat luodaan automaattisesti spekseistä/skeemasta. | API9:2023 | ✅ |
| Eritelmä päivittyy automaattisesti yhdyskäytävään/laitteistoportaaliin. | API9:2023 | ✅ (epäsuorasti työkalujen kautta) |
| Spec validoidaan jokaisen muutoksen yhteydessä | \- | ✅ (paras käytäntö) |
| Eritelmä sisältää pyyntö- ja vastausskeeman. | \- | ✅ |
| Skeema ja esimerkit läpäisevät validoinnin | \- | ✅ |
| Käyttää HTTPS:ää tai salattuja protokollia. | API10:2023 | ❌ |
| Julkaistu virallisessa org-verkkotunnuksessa | API8:2023 | ❌ |
| Autentikoinnilla suojatut päätepisteet | API2:2023, API4:2023 | ➖ (voi määritellä securitySchemes) |
| Token-pohjainen todennus | \- | ✅ (securitySchemesin kautta) |
| Suojattu CSRF:ltä | API8:2023 | ❌ |
| Kehys validoi syötteet automaattisesti | API8:2023 | ✅ (epäsuorasti skeeman kautta) |
| Ulostulot automaattinen poisto kehyksen toimesta | API8:2023 | ❌ |
| Tietojen salaus siirrossa/varastoinnissa olevien tietojen osalta | API8:2023 | ❌ |
| Viestin eheys toteutettu | API6:2023, API7:2023 | ❌ |
| UUID-tunnukset/pseudotunnisteet tietokantatunnusten sijasta. | API7:2023 | ➖ (suositellaan esimerkissä) |
| URL-osoitteissa ei ole arkaluonteisia tietoja | API7:2023 | ❌ |
| HTTP-menetelmät vain tarkoitetuille resursseille | API5:2023 | ✅ (määritelty poluissa) |

**ASync APIn tarkistuslista**  
**✅ Konsepti on valmis kun...**

| Kriteeri | AsyncAPI 2.x |
| ----- | ----- |
| API perustuu selkeisiin liiketoiminnallisiin tarpeisiin | ❌ |
| API kätkee raa'at taustatiedot; suunniteltu yhteiskäyttöön. | ❌ |
| APIlla on kuvaus, joka selittää sen liiketoiminnallisen arvon ja ominaisuudet. | ✅ |
| API on rakenteeltaan yhdenmukainen muiden APIjemme kanssa. | ❌ |
| APIn ja tietojen nimeämisessä käytetään hyvää englantia (tai muuta standardikieltä). | ❌ |
| Pakolliset kentät on määritelty | ✅ |
| Päivämäärät ovat ISO-standardin mukaisessa päivämäärämuodossa, mukaan lukien aikavyöhyke. | ✅ |
| Yleisissä tiedoissa käytetään vakioarvoja (esim. ISO). | ➖ |
| Kentät on kuvattu sanatarkasti, lyhenteitä välttäen. | ❌ |
| Uusia viestejä julkaistaessa asiaankuuluvat aiheet tai kanavat yksilöidään selkeästi. | ✅ |

---

**🧪 API-suunnittelun prototyyppi on valmis, kun...**

| Kriteeri | AsyncAPI 2.x |
| ----- | ----- |
| Kaikki konseptin tarkistuslistan kohdat on tarkastettu | ❌ |
| Viestisuunnittelu sisältää selkeän rakenteen (tapahtumat, komennot, kyselyt). | ✅ |
| Kaikkiin viesteihin ja attribuutteihin sisältyy esimerkkejä | ✅ |
| Viestit noudattavat johdonmukaista rakennetta eri aiheissa/kanavissa. | ✅ |
| Viestien versiointistrategia on päätetty | ❌ |
| Vastaanotettujen viestien kuittaukset on määritelty (tarvittaessa). | ✅ |
| Virheet tai ongelmat, joihin liittyvät viestit sisältävät erityisiä virhetietoja. | ✅ |
| Tunnistus- ja valtuutusstrategiat on määritetty | ➖ |

---

**🚀 API on ylläpidettävissä tuotannossa, kun...**

| Kriteeri | AsyncAPI 2.x |
| ----- | ----- |
| Kaikki prototyypin ja API-suunnittelun tarkistuslistojen kohteet tarkastetaan. | ❌ |
| APIta hallinnoidaan asianmukaisen AsyncAPI-hallintatyökalun avulla. | ❌ |
| API näkyy kehittäjäportaalissa | ❌ |
| Viestien lähettämisessä noudatetaan nopeusrajoituksia (tarvittaessa). | ❌ |
| API-dokumentaatio luodaan automaattisesti AsyncAPI-spekseistä. | ✅ |
| Eritelmä päivittyy automaattisesti API-työkaluihin ja portaaliin. | ✅ |
| Aiheiden/kanavien määrittely validoidaan jokaisen muutoksen yhteydessä. | ✅ |
| Määrittely sisältää viestien skeeman | ✅ |
| Viestien skeema ja esimerkit läpäisevät skeeman validoinnin. | ✅ |
| Viestien siirto varmistaa turvallisuuden (esim. MQTT/AMQP TLS:n kautta). | ❌ |
| APIta käytetään organisaation virallisen verkkotunnuksen alla. | ❌ |
| Kaikki aiheet/kanavat on suojattu todennuksella. | ➖ |
| APIssa on tunnisteisiin perustuva todennus | ✅ |
| Tietojen salaus siirrossa ja tallennuksessa toteutetaan tarpeen mukaan. | ❌ |
| Viestien eheys on toteutettu tarpeen mukaan | ❌ |
| UUID-tunnuksia tai pseudotunnisteita käytetään tietokantatunnusten sijasta. | ➖ |
| Arkaluonteisia tietoja ei paljasteta aiheissa tai kanavissa. | ❌ |
| Whitelistingin avulla määritetään, mitkä asiakkaat voivat julkaista/tilata. | ✅ |

