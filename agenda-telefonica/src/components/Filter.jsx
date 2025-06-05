

export const Filter = ({filter, handleFilterChange}) => {
  return (
    <div className="contenedor-filter">
      <h3>Buscar</h3>
      <div className="coolinput">
          <label htmlFor="name" className="text">Nombre</label>
          <input type="text" value={filter} onChange={handleFilterChange} className="input" />
      </div>
    </div>
  )
}
