import { useEffect, useState } from "react"
import { Error } from "./Error"

export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre , setNombre] = useState('')
    const [propietario , setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [alta, setAlta] = useState('')
    const [sintomas, setSintomas] = useState('')

    const [error, setError] = useState(false)

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)
        }
    },[paciente])

    const generarId = ()=>{
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([nombre, propietario, email, alta, sintomas].includes('')) {
            console.log('Hay almenos un capo vacio')
            setError(true)
            return
        }
        setError(false)
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            alta,
            sintomas
        }

        if(paciente.id){
            //editando
            objetoPaciente.id = paciente.id
            const pacientesActualizdo = pacientes.map(pacienteState => (
                pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            ))
            setPacientes(pacientesActualizdo)
            setPaciente({})
        }else{
            //creando
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

        setNombre('')
        setPropietario('')
        setEmail('')
        setAlta('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-3/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

            <p className="text-lg mt-5  mb-10 text-center">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administrarlos</span>
            </p>
            <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>
                { error && <Error mensaje="Todos los campo son obligatorios"/> }
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold text-start">
                        Nombre de mascota
                    </label>
                    <input id="mascota" type="text" placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange ={(e) => setNombre(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold text-start">
                        Nombre del propietario
                    </label>
                    <input id="propietario" type="text" placeholder="Nombre del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange ={(e) => setPropietario(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold text-start">
                        Email
                    </label>
                    <input id="email" type="text" placeholder="email de contacto" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange ={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold text-start">
                        Alta
                    </label>
                    <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={alta} onChange ={(e) => setAlta(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold text-start">
                        Sintomas
                    </label>
                    <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los sintomas" value={sintomas} onChange ={(e) => setSintomas(e.target.value)}></textarea>
                    {/* <input id="sintomas" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/> */}
                </div>
                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercasse font-bold hover:bg-indigo-700 cursor-pointer transition-colors" value={!paciente.id ? 'Agregar paciente':'Editar paciente'}/>
            </form>
        </div>
    )
}