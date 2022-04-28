import React from "react";
import { Row, Col } from "react-bootstrap";

function About() {
  return (
    <div class="m-4">
      <Row className="justify-content-center">
        <Col xl="6">
          <h1>O projekcie</h1>
          <p>
            Aplikacja jest rozszerzeniem szkolnego systemu RVMS (Room
            Ventilation Monitoring System) - systemu monitoringu przewietrzenia
            powietrzeń. Wietrzenie powietrzeń jest konieczne, szczególnie w
            dobie pandemii.
          </p>
          <p>
            W celu zminimalizowania ryzyka zakażenia się patogenem pośród osób
            przebywających w jednej zamkniętej przestrzeni, a także zmniejszeniu
            się stężenia dwutlenku węgla, należy regularnie wietrzyć
            pomieszczenia.
          </p>
          <p>
            Wietrzenie zamkniętych stref wskazane jest niezależnie od danej pory
            roku czy panujących warunków atmosferycznych. Zalecane jest
            przeprowadzanie tego procesu minimum 3 razy dziennie w czasie od 10
            do 15 minut.
          </p>
          <h1>O aplikacji</h1>
          <p>
            Aplikacja internetowa pozwala na wygodny i szybki dostęp do danych
            przez każdą uprawnioną osobę w budynku użyteczności publicznej.
          </p>
          <p>
            Aplikacja pokazuje dane w czasie rzeczywistym na schematach pięter
            budynku, umożliwiając szybki podgląd na aktualny stan przewietrzenia
            poszczególnych pomieszczeń oraz ich temperaturę.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default About;
