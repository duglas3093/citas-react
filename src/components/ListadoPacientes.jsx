import { Paciente } from "./Paciente"


const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
        {pacientes && pacientes.length ? (
          <>
            <h2 className="font-bank text-3xl text-center">
              Lista de Pacientes
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {""}
              <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>
            {pacientes.map((paciente)=>(
              <Paciente 
                key={paciente.id} 
                paciente={paciente} 
                setPaciente={setPaciente}
                eliminarPaciente={eliminarPaciente}
              />
            ))}
          </>
        ):(
          <>
            <h2 className="font-bank text-3xl text-center">
              No hay pacientes
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
              comienza agregando pacientes {""}
              <span className="text-indigo-600 font-bold">y aparecenrán acá</span>
            </p>
          </>
        )}
    </div> 
  )
}

export default ListadoPacientes