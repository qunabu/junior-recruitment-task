# Zadanie dla Junior Developera

Realizacja prostej listy ToDo (lista zadań do zrobienia) jako aplikacji internetowej, z wykorzystaniem HTML5 po stronie frontendu i dowolnej technologi po stronie backendu. Aplikacja umożliwia dodawanie, przeglądanie i oznaczanie jako wykonane różnych zadań, które zapisywane będą w bazie danych `SQLite`.
Dla backendu proponujemy prosty skrypt w PHP (przykład http://henryranch.net/software/ease-into-sqlite-3-with-php-and-pdo/).

## Funkcjonalność 
Aplikacja wyświetla listę zadań do wykonania. Zadania podzielone są na *wykonane* oraz *do zrobienia*. 
  - Zadania *wykonane* są przekreślone i są oznaczone kolorem (`#9eb2c0`) i zaznaczonym polem wyboru po lewej stronie.  
  - Zadania *do zrobienia* są oznaczone kolorem (`#2e3641`) i niezaznaczonym polem wyboru po lewej stronie. 
  - Pod listą zadań zawsze wyświetla się pole z możliwością dodania nowego zadania. Nowe zadanie jest zawsze *do zrobienia*
  - Po dodaniu nowego zadania, dodawane jest ono nad polem dodawana nowego zadania. Pole z możliwością dodania nowego zadania jest zawsze na samym dole listy. 
  - Nie można dodać zadania bez wpisania tytułu (walidacja powinna być i po stronie `frontend'u` i `backend'u`)
  - Każde zadanie można usunąć poprzez kliknięcie w ikonę kosza.
  - **Opcjonalnie** można zmieniać kolejność zadań poprzez przenoszenie ich *drag & drop*
  
## Frontend
Aplikacja ma przygotowany layout graficzny

![Layout Aplikacji](https://www.dropbox.com/s/bpah0svytmw78ie/to-do-list.png?dl=1&a) 

  - W katalogu `assets` jest plik Photoshop `PSD` gotowy do pocięcia do szablonu. 
  - Aplikacja ma być przygotowana jak `Single Page Application`, jeden plik HTML5 wraz z jednym głównym szablonem `CSS` i jednym plikiem `JavaScript`. 
  - Komunikacja między Frontendem a Backendem ma być dokonywana w tle, bez przeładowywana strony, najlepiej z wykorzystaniem `AJAX`. 
  - Aplikacja powinna być ostylowana przez `preprocess CSS`, preferujemy `SCSS` i `compass`.  
  - Logika aplikacji powinna być podzielona według wzorca `Model-View-Controller` lub `Model-View-Whatever`.
  - Prosimy o nie korzystanie z bibliotek JavaScriptowych lub użycie minimalnej ilości. Preferujemy bibliotekę `Vanilla JS`
  - Font z którego należy korzystać to [Lato](https://www.google.com/fonts#UsePlace:use/Collection:Lato), autorstwa [Łukasza Dziedzica](http://www.lukaszdziedzic.eu/) w wersji Normal i Bold. Prosimy o skorzystanie z wersji [Google Fonts](https://www.google.com/fonts#UsePlace:use/Collection:Lato).
  
## Backend 
  - Należy stworzyć skrypt który uwtorzy bazę danych `SQLite` oraz jej strukturtę. 
  - Należy stworzyć plik do którego będzie odwoływał się frontend który będzie wykonywał `CRUD` (create, read, update and delete) dla zadań ToDo. 
  - Nie będzie obsługi użytkowników oraz uwierzytelniania - każda osoba ma dostęp do tworzenia, czytania, aktualizacji i usuwania.
  
## Zdanie do wykonania 
  - Na swoim koncie github zrobić `fork` poniższego repozytorium.
  - Wykonać aplikację aby po wgraniu jej do katalogu była dostępna z katalogu `to-do-list` np `http://localhost/to-do-list`.
  - `Frontend` ma być dostępny w katalogu `to-do-list/frontend` np `http://localhost/to-do-list/frontend`.
  - `Backend` ma być dostępny w katalogu `to-do-list/backend` np `http://localhost/to-do-list/backend`.
  - Kod ma być **czytelny i opisany** przez komentarze, JavaScript zgodnie z [documentationjs](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md), PHP zgodnie z [phpdoc](https://www.phpdoc.org/docs/latest/getting-started/your-first-set-of-documentation.html) a inne językie zgodnie z wybraną specyfikacją. 
  - Aplikację zostawiamy w wersji developerskiej, nie minifikujemy plików, nie kompresujemy nie łączymy ich, etc.
  
## Powodzenia

### Copyrights

Projekt graficzny jest przerobioną wersja [To Do List (PSD)](https://www.behance.net/gallery/10852567/To-Do-List-(PSD)) autorska [Marijan Petrovski](https://www.behance.net/psdchat)