export const Persons = ({persons, borrarContacto}) => {
    // Validación de seguridad
    if (!Array.isArray(persons)) {
        console.error('persons no es un array:', persons);
        return <div>No hay contactos disponibles</div>;
    }

    return (
        <div className="persons-container">
            <ul>
                {persons.length === 0 ? (
                    <li>No hay contactos</li>
                ) : (
                    persons.map((person) => (
                        <li key={person.id}>
                            <div className="nombre">
                                <span className="contact-name">{person.name}</span>
                                <span className="contact-number">{person.number}</span>
                            </div>
                            <button 
                                onClick={() => borrarContacto(person.id, person.name)} 
                                className="boton"
                            >
                                Eliminar contacto
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
