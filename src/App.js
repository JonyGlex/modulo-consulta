import React, { Component } from "react";
import Buscador from "./Componentes/Buscador";
import Resultado from "./Componentes/Resultado";

class App extends Component {
  scroll = () => {
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView("smooth", "start");
  };
  state = {
    termino: "",
    imagenes: [],
    pagina: "",
  };

  paginaAnterior = () => {
    //leer el state de la pagina acual
    let pagina = this.state.pagina;
    //leer si la pagina es 1, ya no ir hacias atras
    if (pagina === 1) return null;
    //restar uno a la pagina actual
    pagina -= 1;
    //agregar el cambio al state
    this.setState(
      {
        pagina,
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
  };
  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina += 1;
    this.setState(
      {
        pagina,
      },
      () => {
        this.consultarApi();
        this.scroll();
      }
    );
  };

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=31135533-f8f7cd37b39282e9bffb4f70e&q=${termino}&per_page=30&page=${pagina}`;
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) => this.setState({ imagenes: resultado.hits }));
  };

  datosBusqueda = (termino) => {
    this.setState(
      {
        termino: termino,
        pagina: 1,
      },
      () => {
        this.consultarApi();
      }
    );
  };
  render() {
    return (
      <div className="container p-3 my-3 bg-dark text-white">
        <div className="jumbotron">
          <p className="lead text-center">Buscador</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}
export default App;
