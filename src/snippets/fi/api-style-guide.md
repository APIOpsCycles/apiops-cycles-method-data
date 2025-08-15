## API-tyyliopas

Tässä oppaassa esitetään parhaat käytännöt ja standardit RESTful APIen suunnitteluun ja toteutukseen turvallisuuden, johdonmukaisuuden, käytettävyyden ja organisaation tavoitteiden mukaisuuden varmistamiseksi. Se on myös linjassa API-auditoinnin tarkistuslistan kanssa.  

---

### 1\. Turvallisuus ja tietosuoja

#### HTTPS:n käyttöönotto

* Kaikkien API-rajapintojen on käytettävä HTTPS:ää tietojen salaamiseksi siirron aikana.  
* Arkaluonteisia tietoja (esim. tunnisteita, valtakirjoja, henkilötietoja) ei saa koskaan siirtää URL-osoitteissa tai kyselyparametreissa. Tällaiset tiedot on tallennettava pyynnön runkoon.

#### Roolipohjainen pääsynvalvonta (RBAC)

* Toteuta RBAC identiteettipalvelujen tarjoajien avulla ja ota käyttöoikeudet käyttöön API-logiikassa.  
* Dokumentoi roolikohtaiset käyttöoikeuskontrollit API-dokumentaatiossa.  
* **Kypsyystasot**:  
  * **Perustaso**: Roolit on määritelty ja käyttöoikeuksia valvotaan manuaalisesti.  
  * **Kasvava**: Identiteetin tarjoajat on integroitu.  
  * **Skaalautuminen**: Dynaamiset roolitarkastukset API-kuluttajien perusteella.  
  * **Innovointi**: Automatisoitu, käytäntölähtöinen RBAC:n täytäntöönpano.

#### OWASP API turvallisuusvaatimukset

* OWASP API Security Top 10 \-riskeihin vastaaminen, mukaan lukien:  
  * **API6:2023 \- rajoittamaton pääsy arkaluonteisiin liiketoimintavirtoihin**: Rajoita arkaluonteisia liiketoimintavirtoja asianmukaisella todennuksella ja valtuutuksella.  
  * **API7:2023 \- Palvelinpuolen pyyntöjen väärentäminen (SSRF)**: Validoi syötteet ja puhdista vastaukset SSRF-haavoittuvuuksien estämiseksi.  
  * **API2:2023 \- Rikkinäinen todennus**: Varmista vankat todennusmekanismit (esim. OAuth 2.0) ja validoi tunnisteiden vanhenemisen työnkulut.

#### Salaus tallennettaessa

* Tietokantoihin tallennetut arkaluonteiset tiedot on salattava tallennettaessa alan standardialgoritmeilla.  
* Varmista, ettei arkaluonteisia tietoja näy lokitiedoissa tai URL-osoitteissa.

---

### 2\. HTTP-menetelmät

#### Vakiokäyttö

* Käytä HTTP-menetelmiä johdonmukaisesti:  
  * `GET`: Hae tietoja muuttamatta palvelimen tilaa.  
  * `POST`: Luo uusia resursseja tai käynnistä palvelinpuolen toimintoja.  
  * `PUT`: Päivitetään olemassa olevia resursseja (käytetään täydellisiä resurssien hyötykuormia).  
  * `PATCH`: Olemassa olevan resurssin osittainen päivittäminen.  
  * `DELETE`: Resurssin poistaminen.

#### Idempotenssi

* Varmista, että PUT-, PATCH- ja DELETE-menetelmät ovat idempotentteja, eli useat samanlaiset pyynnöt johtavat samaan tilaan.

#### HTTP-menetelmien testaaminen

* Validoi kaikki HTTP-menetelmät integrointitesteillä, jotta varmistetaan odotetun käyttäytymisen noudattaminen.

---

### 3\. Virheiden käsittely ja vastaukset

#### Standardoitu virhemuoto

* Kaikkien sovellusrajapintojen on palautettava virheet standardoidussa muodossa. Esimerkki:

```
{
  "error": "invalid_request",
  "message": "The request is missing a required parameter.",
  "details": [
    "Parameter 'user_id' is required."
  ]
}
```

#### Sanalliset kuvaukset

* Sisällytä ihmiselle luettavat virheilmoitukset, jotka auttavat kehittäjiä ongelmien selvittämisessä.  
* Varmista, että virhekoodit ja \-kuvaukset ovat OpenAPI-spesifikaation mukaisia.

#### HTTP-tilakoodit

* Käytä asianmukaisia tilakoodeja kullekin toiminnolle:  
  * `200 OK`: Onnistuneet GET-, PUT- tai PATCH-operaatiot.  
  * `201 Created`: Onnistunut POST-operaatio, jonka tuloksena on uusi resurssi.  
  * `204 No Content`: Onnistunut DELETE-operaatio.  
  * `400 Bad Request`: Virheellinen syöttö tai puuttuvat parametrit.  
  * `401 Unauthorized`: Todennuksen epäonnistuminen.  
  * `403 Forbidden`: Riittämättömät oikeudet.  
  * `404 Not Found`: Resurssia ei ole olemassa.  
  * `429 Too Many Requests`: Nopeusraja ylitetty.

#### Virheskenaarioiden testaus

* Validoi kaikki virheskenaariot, jotta varmistetaan oikeat vastaukset ja toimivat virheilmoitukset.  
* **Kypsyystasot**:  
  * **Perustavat**: Perusvirheiden käsittely tärkeimmissä skenaarioissa.  
  * **Kasvava**: Yksityiskohtaiset virheilmoitukset kaikille päätepisteille.  
  * **Skaalautuminen**: Automaattinen virheiden validointi testityökalujen avulla.  
  * **Innovointi**: Tekoälypohjainen oivallus virhemalleista ja ennusteista.

---

### 4\. Dokumentointi ja kehittäjäkokemus

#### Vuorovaikutteinen dokumentaatio

* Luo API-dokumentaatiota OpenAPI-spesifikaation avulla (uusin tuettu versio).  
* Sisällytä esimerkkejä kaikille päätepisteille pyyntöjen/vastausten työnkulkujen havainnollistamiseksi.  
* **Kypsyystasot**:  
  * **Perustavat** tasot: Staattinen dokumentaatio ja esimerkkejä.  
  * **Kasvava**: Vuorovaikutteinen, automaattisesti luotu dokumentaatio.  
  * **Skaalautuva**: Kehittäjän työkalut API-testausohjelmia varten.  
  * **Innovointi**: Sulautetut kehittäjäympäristöt testausta varten.

#### Aloitusvaihe

* Tarjoa dokumentaatiossa "Getting Started" \-osio, joka opastaa uusia käyttäjiä todennuksen, yleisten työnkulkujen ja testauspisteiden käytössä.  
* Käytä viitteenä Getting Started Guide Template \-oppaan mallia.

#### Hiekkalaatikkoympäristö

* Tarjoa hiekkalaatikkoympäristö, joka heijastaa tuotantoskeemoja ja virhekoodeja testausta varten.  
* Validoi hiekkalaatikon mukauttaminen API-tarkastustesteillä.

---

### 5\. Nimeämiskäytännöt ja standardit

#### Resurssien nimeäminen

* Käytä resurssien nimissä kuvaavia, alan standardien mukaisia englanninkielisiä termejä (esim. `books`, `users`, `loans`).  
* Vältä moniselitteisiä termejä, kuten `type` tai  `status` ilman lisäselitystä.

#### Attribuuttien nimeäminen

* Käytä attribuuttien nimissä camelCase-kirjainta (esim. `userId`, `bookTitle`).  
* Vältä lyhenteitä ja lyhenteitä selkeyden varmistamiseksi.  
* Validoi nimeämiskäytännöt OpenAPI-validoinnin yhteydessä.

---

### 6\. Lokalisointi ja kansainvälistäminen

#### Accept Headers

* Tue lokalisointia käyttämällä API-vastausten `Accept-Language`-headeria.  
* Tarjoa lokalisoidut merkkijonot ja varmista, että kaikki virheilmoitukset voidaan kääntää.

#### Päiväys- ja aikamuodot

* Käytä ISO 8601 \-muotoa kaikissa päivämäärä- ja aikakentissä, aikavyöhykkeet mukaan lukien.

```
"createdAt": "2024-12-21T10:00:00Z"
```

**Lokalisoinnin testaaminen**

* Validoi lokalisoidut vastaukset ja virheilmoitukset toiminnallisilla testeillä.

---

### 7\. Versionointi ja poistaminen

#### Versiointistrategia

* Käytä semanttista versiointia (esim. `/v1`, `/v2`) merkittävien muutosten osoittamiseen.  
* Vältä rikkovia muutoksia version sisällä. Poistakaa vanhat päätepisteet käytöstä riittävän ajoissa.

#### Poistamisilmoitukset

* Ilmoita poistoista kehittäjäportaalin kautta ja sisällytä API-vastauksiin otsikot:

```
Deprecation: true
Sunset: 2025-01-01
Link: <https://developer.portal.com/docs/deprecation>; rel="deprecation"
```

---

### 8\. Sivutus ja suodatus

#### Sivutus

* Käytä tavallisia sivutusparametreja:  
  * `page`: Nykyinen sivunumero.  
  * `limit`: Kohteiden määrä sivua kohti.

#### Suodatus

* Salli suodatus yleisten attribuuttien (esim. `title`, `author`, `genre`) mukaan:

```
GET /books?title=harry&author=rowling
```


#### Sivujen lajittelun ja suodatuksen testaaminen

* Vahvista, että sivutus ja suodatus toimivat odotetulla tavalla API-testitapausten avulla.  
* **Kypsyystasot**:  
  * **Perustavat tasot**: Tukee perussivutusta ja suodatusta.  
  * **Kasvava**: Varmistetaan johdonmukainen käyttäytyminen kaikissa päätepisteissä.  
  * **Skaalautuminen**: Optimoi suorituskyky suurille tietokokonaisuuksille.  
  * **Innovointi**: Älykäs suodatus ja ennakoivan kyselyn tuki.

---

### 9\. Testaus ja validointi

#### Automatisoitu validointi

* Käytä Spectralin kaltaisia työkaluja OpenAPI-spesifikaatioiden validointiin täydellisyyden ja johdonmukaisuuden varmistamiseksi.

#### Virhetestaus

* Testaa kaikkien päätepisteiden virhetilanteet, jotta varmistetaan oikeat vastaukset ja toimivat virheilmoitukset.

#### OWASP-yhteensopivuuden testaus

* Testaa APIt OWASP API Security Top 10 \-riskien suhteen:  
  * **API6:2023 \- rajoittamaton pääsy arkaluonteisiin liiketoimintavirtoihin**: Validoi asianmukaiset pääsyrajoitukset.  
  * **API7:2023 \- Palvelinpuolen pyyntöjen väärentäminen (SSRF)**: Validoi syötteet ja vastaukset SSRF-haavoittuvuuksien estämiseksi.  
  * **API2:2023 \- Rikkinäinen todennus**: Testaa tunnisteiden vanhentuminen, päivitystyönkulut ja virheenkäsittely.

---

### 10\. API-tyylioppaan tarkentaminen ja validointi 

#### Tarkistaminen ja palaute

* Suorita tyylioppaan säännöllisiä tarkistuksia poikkitoiminnallisten tiimien (tuote, suunnittelu, vaatimustenmukaisuus) kanssa.  
* Kerää palautetta API-käyttäjiltä käytettävyysongelmien ratkaisemiseksi.

#### Versionhallinta

* Ylläpidä tyyliopasta versio-ohjatussa arkistossa, jotta voit seurata muutoksia ja varmistaa tiimin yhdenmukaisuuden.

#### Integrointi kehitystyönkulkuihin

* Sisällytä tyylioppaan periaatteet API-tarkistustyökaluihin ja CI/CD-putkiin.  
* Validoi OpenAPI-määrittelyt säännöllisesti oppaaseen nähden käyttämällä automaattisia työkaluja, kuten Spectralia.