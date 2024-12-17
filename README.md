# System ERP wspomagający zarządzanie produkcją dla przedsiębiorstwa z sektora MŚP

## Opis:
W dzisiejszych czasach przedsiębiorstwa produkcyjne coraz częściej muszą mierzyć się z konkurencją innych firm z branży. Ze względu na globalizację i rozwój technologiczny, konieczność rywalizacji z przedsiębiorstwami zagranicznymi staje się coraz bardziej powszechna. Również na naszym rynku jak pokazuje raport Głównego Urzędu statystycznego liczba przedsiębiorstw niefinansowych w Polsce w latach 2010 do 2021 zwiększyła się o około 36,4%. Aby nie zostać w tyle, przedsiębiorcy wymyślają różne sposoby na poprawę wydajności i zmniejszenie kosztów produkcji.

Jednym z efektywnych rozwiązań są systemy wspomagające zarządzanie produkcją, które pomagają w planowaniu i monitorowaniu procesów produkcyjnych. Niemniej jednak, wprowadzenie takiego systemu często napotyka na liczne trudności. Jednym z problemów jest potrzeba indywidualnego wprowadzania takiego systemu dla każdej z firmy. Skutkiem tego jest często wysoka cena, jaką trzeba przeznaczyć na tę inwestycję. Inna trudność, jaka się pojawia to czas potrzebny na wprowadzenie takiego rozwiązania. Im większy i bardziej skomplikowany system, tym więcej czasu straci przedsiębiorstwo.

Aby rozwiązać, chociaż część z tych problemów powstała ta praca, której celem jest opracowanie projektu aplikacji wspomagającej zarządzanie produkcją w mniejszych i średnich przedsiębiorstwach. Z założenia aplikacja ma być uniwersalna, prosta i intuicyjna w obsłudze. Powinno to w znacznym stopniu przyspieszyć wdrażanie do firmy nowego systemu. Dane rozwiązanie będzie także darmowe i w języku polskim, co dla wielu też będzie dużym atutem. System będzie wykonany w formie aplikacji webowej, co pozwoli zwiększyć liczbę urządzeń, które będą mogły z niego korzystać. Głównym zadaniem aplikacji będzie zarządzanie oraz monitorowanie zleceń produkcyjnych. Osoba odpowiedzialna za konkretne zlecenie w przedsiębiorstwie będzie mogła przydzielać wybrane zadania pracownikom. Kierownik i pracownicy będą posiadali różne interfejsy, pozwalające wykonywać im różne czynności, odpowiednie do stanowiska, jakie pełnią. Wszystkie istotne informacje potrzebne do działania aplikacji będą przechowywane na serwerze w bazie danych.

## Typ aplikacji:
- front-end

## Zastosowane technologie:
- JavaScript
- ReactJs
- axios

## Jak uruchomić:
- Uruchom aplikacje back-end: https://github.com/barmie9/erp-system-back-end
- Zaaktualizuj url do back-endu w `ApiDataService.js`, jeśli to konieczne:
```JavaScript
const apiUrl = 'http://localhost:8080/';
```
- Uruchom aplikacje komendą: `npm start`

## Uwagi:
- Do uruchomienia niezbędna jest aplikacja back-end: 
https://github.com/barmie9/erp-system-back-end
- Do uruchomienia strony internetowej można użyć: `http://localhost:3000`


<hr style="border: 3px solid gray;"/>

## Domyślny opis jak uruchomić z Reacta:


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
