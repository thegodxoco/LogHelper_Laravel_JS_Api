# LogHelperWS
- Ferran Garcia Lozano
- Ricard Ruiz Fages

## Índex   
1. Funcionalitats
2. Cas d'ús poc intuïtiu
3. Dificultats trobades
4. Bugs trobats
5. Requisits no implementats
6. Ampliacions i millores realitzades
7. Ampliacions i millores futures
8. Conclusions
9. Referències

### Funcionalitats:
L'objectiu d'aquest projecte és poder gestionar diferents servidors amb els seus logs corresponents. Així doncs podem crear, veure, editar i eliminar els servidors i logs de la base de dades.

### Cas d'ús poc intuïtiu:
Per a editar les dades d'un servidor/log l'usuari ha d'accedir a la pàgina del servidor/log concret i modificar-les directament de la taula que mostra l'informació d'aquest. Una vegada ha fet els canvis necessaris ha de clickar el botó **Save**  trobat sota la taula. 

### Dificultats trobades:
Durant el desenvolupament d'aquest projecte ens em trobat amb diferents dificultats. Les més importants han estat les validacions de les dades tant a nivell de servidor (Laravel) com a nivell de client (Javascript). Hem hagut de controlar que es complissin les restriccions pertinents (IPs úniques per a cada servidor, almenys una IPv4 o IPv6 per servidor, etc).

### Bugs trobats:
Després de fer qualsevol modificació dins de la pàgina d'un servidor o log concret, si tornem a la pàgina anterior mitjançant el navegador podrem veure com els canvis no es mostren. Això és degut a que al tornar enrere no es torna carregar el Javascript de tal manera que no refresca els llistats i aquests es mostren amb les dades antigues.

### Requisits no implementats:
Tots els requisits demanats en la rúbrica han estat implementats. 

### Ampliacions i millores realitzades:
S'han estilitzat les pàgines per tal de facilitar la navegació per aquestes. També s'ha afegit un botò per tornar a la pàgina inicial de la web.

### Ampliacions i millores futures:
En un futur s'haurà de implementar algun tipus de millora per tal de solventar el inconvenient mostrat en l'apartat 4.
Així doncs mitjancant una barra de navegació o diferents redireccions es pot millorar l'usabilitat de la web.

### Conclusions:
Gràcies a aquest projecte hem pogut implementar els diferents coneixements de PHP (Laravel), Javascript i HTML/CSS en una mateixa web. D'aquesta manera, tot i tenir diferents pautes indicades en la rúbrica, ens hem pogut organitzar el desenvolupament de l'aplicació des del principi i així optimitzar i gestionar els temps de millor manera. També en el nostre cas, al treballar en grup, ens hem agut de repartir les diferents tasques per poder ajuntar-les posteriorment en un sol projecte.

### Referències:
- HTML: [W3Schools](https://www.w3schools.com/html/)
- CSS: [W3Schools](https://www.w3schools.com/css/)
- Fetch API: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Laravel Seeder/Factory: [Faker](https://github.com/fzaninotto/Faker)
- Laravel Validation: [Laravel Documentation](https://laravel.com/docs/9.x/validation)
- URL Parameters: [W3Schools](https://www.w3schools.com/jsref/prop_loc_search.asp)
