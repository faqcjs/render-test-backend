
export const PersonForm = ({handleSubmit, handleChange, handleChangeTel, newName, newTel}) => {
  return (
    <div>
      
        <form onSubmit={handleSubmit}>
            <h3>Agregar contacto</h3>
            <div className="input-contenedor">

              <div className="coolinput">
                <label htmlFor="name" className="text">Nombre</label>
                <input type='text' onChange={handleChange} value={newName} name="name" className="input"/>
              </div>

              <div className="coolinput">
                <label htmlFor="tel" className="text">Telefono</label>
                <input type='tel'  className="input" onChange={handleChangeTel} value={newTel} name="tel"/>
              </div>

            </div>
            <div>
                <button type="submit">Agregar</button>
            </div>
        </form>
    </div>
  )
}
