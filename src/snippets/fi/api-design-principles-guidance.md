## Kuinka aloittaa API Delivery -työskentely aiempien vaiheiden (”asemien”) pohjalta
Käytä tätä ohjetta `API Delivery` -prosessin alussa, kun API-sopimus (esim. OpenAPI) ja aiempien vaiheiden keskeiset tulokset on tarkistettu ja hyväksytty.
Tavoitteena ei ole kehittää toteutusta erillään muusta prosessista. Tavoitteena on muuttaa aikaisemmista vaiheista sovitut tulokset konkreettiseksi koodirakenteeksi, validointisäännöiksi, ajonaikaiseksi käyttäytymiseksi ja API-tuotteen toimittamista koskeviksi päätöksiksi.

---

### 1. Aloita validoidusta sopimuksesta
- Käsittele validoitua API-sopimusta ensisijaisena lähtökohtana toteutusta koskevissa päätöksissä.
- Pidä sopimus ja toteutus yhdenmukaisina koko API-tuotteen toimittamisen ajan.
- Käytä sopimusta pyyntöjen validoinnin, vastausten kartoituksen, dokumentoinnin ja testien ohjaamiseen.

---

### 2. Käytä domain-tuloksia liiketoiminnallisen merkityksen säilyttämiseksi
- Käytä `Domain Canvas` tuloksia ohjaamaan nimeämistä, sitä, miten toteutus jaetaan selkeisiin liiketoiminnallisiin vastuisiin, ja sitä, miten eri taustajärjestelmät kytketään toisiinsa paljastamatta niiden eroja.
- Säilytä entiteettien, attribuuttien, tilojen ja totuuden lähteen (source-of-truth) sääntöjen validoidut merkitykset.
- Vältä taustajärjestelmäkohtaisten mallien tai epäjohdonmukaisuuksien vuotamista julkiseen APIin.

---

### 3. Käytä matkan tuloksia kriittisten virtausten säilyttämiseen
- Käytä `Customer Journey Canvas` tuloksia tunnistamaan, mitkä käyttäjävirrat on tärkeintä tukea ensin.
- Käytä `API Consumer Experience` tuloksia pitääksesi APIn ymmärrettävänä, ennustettavana ja helposti integroitavana.
- Anna sovittujen matkan prioriteettien päättää, mitkä toteutustiet vaativat suurinta luotettavuutta, pienintä viivettä, selkeimpiä virheilmoituksia ja vahvinta operatiivista keskittymistä.

---

### 4. Käytä arvolupauksen tuloksia kuluttaja-arvon säilyttämiseen
- Käytä `API Value Proposition Canvas` tuloksia pitääksesi toteutuksen keskittyneenä sovittuihin ongelmiin, hyötyihin ja API-ominaisuuksiin.
- Säilytä kenttien merkitykset, käyttäytyminen ja lupaukset, jotka tekivät APIsta arvokkaan aikaisemmissa vaiheissa.
- Varmista, että virheiden käsittely, ajantasaisuus ja nimeäminen tukevat sekä tavoiteltua kehittäjäkokemusta että liiketoimintakäyttötapausta.

---

### 5. Käytä arkkitehtuurituloksia ajonaikaisten päätösten muotoiluun
- Käytä `Business Impact Canvas` tuloksia ohjaamaan joustavuutta, aikakatkaisuja, varajärjestelmiä ja suorituskyvyn heikkenemistä koskevia päätöksiä.
- Käytä `Locations Canvas` tuloksia ohjaamaan verkon rajoja, luottamusrajoja, pääsyreittejä ja käyttöönoton rajoituksia.
- Käytä `Capacity Canvas` tuloksia ohjaamaan nopeusrajoituksia, välimuistia, skaalausta ja huippukuormituksen käyttäytymistä.
- Käytä `API Metrics And Analytics` -ohjeistusta päättääksesi, mitä on seurattava ensimmäisestä toteutuksesta lähtien.

---

### 6. Käytä vuorovaikutus- ja protokollasuunnittelun tuloksia koodirakenteen muotoiluun
- Käytä `Interaction Canvas` tuloksia välttääksesi tukemattomien vuorovaikutustyyppien liian aikaista toteuttamista.
- Käytä `REST`-, `Event`- tai `GraphQL`-suunnittelutuloksia protokollakohtaisten pyyntöjen, vastausten ja validointikäyttäytymisen muotoiluun.
- Heijasta valittu vuorovaikutustyyli selkeästi koodin rakenteessa, vastuualueissa ja testausstrategiassa.

---

### 7. Käytä auditoinnin tuloksia toimituksen parantamiseen ennen kuin koodaus etenee liian pitkälle
- Käytä auditoinnin tuloksia epäselvyyksien poistamiseen ennen kuin toteutus leviää koko koodipohjaan.
- Korjaa epäselvät pyyntösäännöt, puuttuvat validoinnit, heikot virhesopimukset ja toiminnalliset aukot varhaisessa vaiheessa.
- Käsittele auditointia suunnittelun parantamisen kierroksena ennen tuotantoa, ei vain viimeisenä tarkastusporttina.

---

### 8. Sovella ohjeita ja tee yhteenveto
- Sovella näitä ohjeita nykyiseen APIhin ja toteutussuunnitelmaan.
- Tee yhteenveto vaikutuksista koodirakenteeseen, pyyntöjen validointiin, lähdeintegraatioon, tietoturvaan, seurantaan ja hälytyksiin sekä testaukseen.
- Älä luo erillistä toimitusartefaktia, ellei tiimi tai käyttäjä nimenomaisesti sitä tarvitse.
