# TaskFlow - Uzdevumu Pārvaldības Sistēma

## Sistēmas prasības

### Minimālās prasības
- Node.js (versija 14.0.0 vai jaunāka)
- npm (versija 6.0.0 vai jaunāka)
- Moderna tīmekļa pārlūkprogramma (Chrome, Firefox, Safari, Edge)
- 2GB brīvas vietas diskā
- 4GB RAM
- react-beautiful-dnd lai varētu drag and drop

### Atbalstītās operētājsistēmas
- Windows 10/11
- macOS 10.15 vai jaunāka
- Linux (Ubuntu 20.04 vai jaunāka)

## Uzstādīšanas instrukcija

1. **Atkarību instalēšana**
   ```bash
   npm install
   ```

2. **Firebase konfigurācija**
   - Izveidojiet jaunu projektu [Firebase Console](https://console.firebase.google.com/)
   - Izveidojiet jaunu Web aplikāciju
   - Kopējiet Firebase konfigurācijas objektu
   - Izveidojiet failu `.env` projekta saknes direktorijā
   - Ievietojiet Firebase konfigurāciju:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

3. **Firebase Firestore uzstādīšana**
   - Firebase Console izvēlieties "Firestore Database"
   - Izveidojiet jaunu datubāzi "Production Mode"
   - Iestatiet sekojošas kolekcijas:
     - `tasks`
     - `groups`
     - `users`

## Palaišanas instrukcija

1. **Izstrādes vide**
   ```bash
   npm start
   ```
   Aplikācija būs pieejama: http://localhost:3000

2. **Produkcijas vide**
   ```bash
   npm run build
   ```
   Tiks izveidota optimizēta versija mapē `build`

## Lietošanas pamācība

1. **Reģistrācija/Pieslēgšanās**
   - Atveriet aplikāciju
   - Izveidojiet jaunu kontu vai pieslēdzieties ar esošu
   - Varat izmantot arī Google autentifikāciju

2. **Uzdevumu pārvaldība**
   - Izveidojiet jaunu uzdevumu ar "Pievienot jaunu uzdevumu" pogu
   - Velciet uzdevumus starp kolonnām, lai mainītu to statusu
   - Pievienojiet komentārus, rediģējiet vai dzēsiet uzdevumus

3. **Grupu pārvaldība**
   - Izveidojiet jaunas grupas
   - Pievienojiet dalībniekus grupām, izmantojot e-pasta adreses
   - Pārvaldiet grupu iestatījumus

## Problēmu novēršana

1. **Instalācijas problēmas**
   - Pārliecinieties, ka jums ir instalēta pareizā Node.js versija
   - Izdzēsiet `node_modules` mapi un `package-lock.json` failu
   - Palaidiet `npm install` vēlreiz

2. **Firebase kļūdas**
   - Pārbaudiet `.env` faila konfigurāciju
   - Pārliecinieties, ka Firebase projekts ir aktīvs
   - Pārbaudiet Firestore drošības noteikumus

3. **Palaišanas kļūdas**
   - Pārbaudiet, vai ports 3000 nav aizņemts
   - Pārbaudiet konsoles kļūdas pārlūkā
   - Pārbaudiet Node.js procesa kļūdas

