import React from "react";
import './Home.css';

function Home() {

    return (
        <div>
            <header className="App-header">
                <h1 className="h-color">System wspomagający zarządzanie produkcją</h1>
                <section>
                    <h2 className="h-color">Zalety systemu:</h2>
                    <ul>
                        <li>Zwiększenie wydajności produkcji</li>
                        <li>Uproszczone zarządzanie produkcją i pracownikami</li>
                        <li>Kontrola stanu magazynowego półproduktów</li>
                        <li>Uproszczone wdrożenie systemu do firmy</li>
                    </ul>
                </section>
                <hr className="home-line" />
                <section>
                    <h2 className="h-color">Funkcje pracownika:</h2>
                    <ul>
                        <li>Możliwość śledzenia przypisanych mu zadań</li>
                        <li>Dostęp do dokładnego opisu zadania, wraz z datą wykonania oraz potrzebnymi plikami niezbędnymi do pracy</li>
                        <li>Możliwość aktualizacji progresu aktualnego zadania</li>
                    </ul>
                </section>
                <section>
                    <h2 className="h-color">Funkcje kierownika:</h2>
                    <ul>
                        <li>Aktualizacja stanu magazynowego</li>
                        <li>Zarządzanie zleceniodawcami</li>
                        <li>Zarządzanie pracownikami</li>
                        <li>Zarządzanie maszynami</li>
                        <li>Możliwość rozbudowanego zarządzania zleceniami produkcyjnymi</li>
                        <li>Zarządzanie produkcją i pracownikami</li>
                    </ul>
                </section>
            </header>
        </div>
    )
}


export default Home;