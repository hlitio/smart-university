import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Form from "react-bootstrap/Form";

import React, { useState, useEffect } from "react";
import Materias from "./materias.json";

import Table from "react-bootstrap/Table";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Bar, Doughnut, Chart, Pie } from "react-chartjs-2";
import Modal from "react-bootstrap/Modal";

function BestWay() {
  return (
    <Card className="mb-2">
      <Card.Header>Best Way</Card.Header>
      <Card.Body>
        <Card.Title>Analiza el mejor camino</Card.Title>
        <Card.Text>
          Aquí encontraras las diferentes alternativas para encontrar el camino
          mas adecuado para llegar a tu meta.
        </Card.Text>
        <Button variant="primary">Buscar</Button>
      </Card.Body>
    </Card>
  );
}

function Partner() {
  return (
    <Card className="mb-2">
      <Card.Header>Encuentra tu Partner</Card.Header>
      <Card.Body>
        <Card.Title>Arma tu equipo de trabajo</Card.Title>
        <Card.Text>
          Esta sección te muestra a otros estudiantes que cursan tu mismas
          materias.
        </Card.Text>
        <Button variant="primary">Buscar</Button>
      </Card.Body>
    </Card>
  );
}

function Proyectos() {
  return (
    <Card className="mb-2">
      <Card.Header>Proyectos</Card.Header>
      <Card.Body>
        <Card.Title>Unete a un equipo de desarrollo</Card.Title>
        <Card.Text>
          Aqui podras encontrar una equipo para desarrollar actividades en
          común.
        </Card.Text>
        <Button variant="primary">Buscar</Button>
      </Card.Body>
    </Card>
  );
}

function Tabla(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [datos, setDatos] = useState(0);
  let respuesta = [];

  if (!props.anios) {
    respuesta = Materias.filter(function (elemento) {
      return elemento.ano == props.anio;
    });
  }
  if (props.cursada) {
    respuesta = Materias.filter(function (elemento) {
      return elemento.cursada;
    });
  }

  if (props.porCursar) {
    let materiasAprobadas = Materias.filter((elemento) => elemento.cursada);
    let codigoAprobadas = materiasAprobadas.map((elemento) => elemento.codigo);
    let sinCursar = Materias.filter((elemento) => !elemento.cursada);

    respuesta = sinCursar.filter(function (elemento) {
      let habil = false;

      elemento.correlativa.forEach(
        (element) => (habil = codigoAprobadas.includes(element))
      );

      return habil;
    });
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Materia</th>
            <th>Correlativas</th>
          </tr>
        </thead>

        <tbody>
          {respuesta.map((element) => (
            <>
              <tr
                id={element.codigo}
                onClick={() => {
                  setDatos(element);
                  setModalShow(true);
                }}
              >
                <td>{element.codigo}</td>
                <td>{element.materia}</td>
                <td>
                  {element.correlativa.map((c) => {
                    return (
                      <>
                        <tr>{c}</tr>
                      </>
                    );
                  })}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        datos={datos}
      />
    </>
  );
}

function Curso() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0" id="mcarrera">
        <Accordion.Header>Materias de la Carrera</Accordion.Header>
        <Accordion.Body>
          <Tabs
            defaultActiveKey="primero"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="primero" title="Primero">
              <Tabla anio="1" />
            </Tab>
            <Tab eventKey="segundo" title="Segundo">
              <Tabla anio="2" />
            </Tab>
            <Tab eventKey="tercero" title="Tercero">
              <Tabla anio="3" />
            </Tab>
            <Tab eventKey="cuarto" title="Cuarto">
              <Tabla anio="4" />
            </Tab>
            <Tab eventKey="quinto" title="Quinto">
              <Tabla anio="5" />
            </Tab>
            <Tab eventKey="optativas" title="Optativas">
              <Tabla anio="6" />
            </Tab>
            <Tab eventKey="Extracurriculares" title="Extracurriculares">
              <Tabla anio="7" />
            </Tab>
          </Tabs>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" id="mcursadas">
        <Accordion.Header>Materias Cursadas</Accordion.Header>
        <Accordion.Body>
          <Tabla cursada />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" id="mhabilitadas">
        <Accordion.Header>Materias Habilitadas</Accordion.Header>
        <Accordion.Body>
          <Tabla porCursar />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

let data = {
  labels: ["Aprobadas", "Restantes"],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object

  datasets: [
    {
      label: "Progreso de la Carrera",
      data: [
        Materias.filter(function (elemento) {
          return elemento.cursada;
        }).length,
        Materias.filter((elemento) => !elemento.cursada).length
      ],
      // you can set indiviual colors for each bar
      backgroundColor: ["#0dcaf0", "#adb5bd"],
      borderWidth: 1
    }
  ]
};

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2
        style={{ textAlign: "center" }}
        Style="font-family: 'Roboto Slab';text-align: center ;"
      >
        Progreso
      </h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Progreso hasta el momento"
            }
          }
        }}
      />
    </div>
  );
}

function ModificarMaterias(props) {
  let [estado, setEstado] = useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modificar Materias
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Materia</th>
              <th>Correlativas</th>
              <th>Finalizada</th>
            </tr>
          </thead>

          <tbody>
            {Materias.map((element) => (
              <>
                <tr>
                  <td>{element.codigo}</td>
                  <td>{element.materia}</td>
                  <td>
                    {element.correlativa.map((c) => {
                      return (
                        <>
                          <tr>{c}</tr>
                        </>
                      );
                    })}
                  </td>
                  <td>
                    <Form.Check.Input
                      type="checkbox"
                      isValid
                      checked={element.cursada}
                      onChange={() => {
                        Materias[Materias.indexOf(element)].cursada = !Materias[
                          Materias.indexOf(element)
                        ].cursada;
                        setEstado(!estado);
                        data = {
                          labels: ["Aprobadas", "Restantes"],
                          // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object

                          datasets: [
                            {
                              label: "Progreso de la Carrera",
                              data: [
                                Materias.filter(function (elemento) {
                                  return elemento.cursada;
                                }).length,
                                Materias.filter((elemento) => !elemento.cursada)
                                  .length
                              ],
                              // you can set indiviual colors for each bar
                              backgroundColor: ["#0dcaf0", "#adb5bd"],
                              borderWidth: 1
                            }
                          ]
                        };
                      }}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  console.log(props.datos.materia);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.datos.materia}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Profesor: Homero Simpson</h4>
        <h3>Año: 2022</h3>
        <Tabs defaultActiveKey="curricula" id="tabMaterias" className="mb-3">
          <Tab eventKey="curricula" title="Curricula">
            <div className="m-2 p-3 border rounded">
              <p>Arrastrá aquí el archivo</p>
            </div>
          </Tab>
          <Tab eventKey="parciales" title="Parciales">
            <div className="m-2 p-3 border rounded">
              <p>Arrastrá aquí el archivo</p>
            </div>
          </Tab>
          <Tab eventKey="finales" title="Finales">
            <div className="m-2 p-3 border rounded">
              <p>Arrastrá aquí el archivo</p>
            </div>
          </Tab>
          <Tab eventKey="recursos" title="Recursos">
            <div className="m-2 p-3 border rounded">
              <p>Arrastrá aquí el archivo</p>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function App() {
  const [modalMaterias, setModalMaterias] = React.useState(false);
  return (
    <>
      <Container fluid="sm" className="warning">
        <Row>
          <Col className="shadow-lg p-3 mb-3 bg-white rounded">
            <Row>
              <Col md={9} className="p-4 text-center">
                <h1
                  className="nombre"
                  Style="font-family: 'Roboto Slab'; font-size: 3.5rem;"
                >
                  Hernán J. Hereñú
                </h1>
                <h2 Style="font-family: 'Roboto Flex', sans-serif; font-size: 1.5rem;">
                  Universidad de la Marina Mercante
                </h2>
                <h3 Style="font-family: 'Roboto Flex'; font-size: 1rem; font-style: italic;">
                  <b>Ingeniería en Sistemas de Información</b>
                </h3>
              </Col>
              <Col md={3} Style="display: flex; justify-content: center;">
                <Image
                  src="https://media-exp1.licdn.com/dms/image/C4D0BAQEdtRI2ohS3dw/company-logo_200_200/0/1519861694628?e=2147483647&v=beta&t=QCkqVSqId3jEhYm91qSfkaFwJrDwWcQglo8E6k1-CWA"
                  fluid
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={8} className="shadow-lg p-3 m-2  bg-white rounded ">
            <Curso />

            <div className="m-2 p-3 border rounded">
              
            </div>
            <div className="m-2 p-3 border rounded">
              <Button variant="primary" onClick={() => setModalMaterias(true)}>
                Modificar Materias
              </Button>
              <ModificarMaterias
                show={modalMaterias}
                onHide={() => setModalMaterias(false)}
              />
            </div>
          </Col>

          <Col className="shadow-lg p-3 m-2 bg-white rounded">
            <BestWay />

            <Partner />
            <Proyectos />
          </Col>
        </Row>
      </Container>
    </>
  );
}
