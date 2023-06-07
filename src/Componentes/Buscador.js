import React, { Component } from "react";

class Buscador extends Component {
  busquedaRef = React.createRef();
  obtenerDatos = (e) => {
    e.preventDefault();
    const termino = this.busquedaRef.current.value; //valor del input
    this.props.datosBusqueda(termino); //se envia al componente principal
  };

  render() {
    return (
      <form onSubmit={this.obtenerDatos}>
        <div className="row">
          <div className="form-group col-md-8">
            <input
              ref={this.busquedaRef}
              type="text"
              className="form-control form-control-lg"
              placeholder="Buscar"
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="submit"
              className="btn btn-lg btn-danger btn-block"
              value="Buscar....."
            />
          </div>
        </div>
      </form>
    );
  }
}

export default Buscador;
