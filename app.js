import colors from "colors";
import { guardarDB, leerDb } from "./helpers/guardarArchivo.js";
import {
  confirmar,
  inquirerMenu,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  pausa,
} from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
  let opt;
  const tareas = new Tareas();
  const tareasDb = leerDb();

  if (tareasDb) {
    tareas.cargarTareaFromArray(tareasDb);
  }

  do {
    //Esto imprime el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1": // crear tarea
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2": //listar tareas
        tareas.listadoCompleto();

        break;

      case "3": //listar tareas completadas
        tareas.listarPendientesCompletadas(true);

        break;

      case "4": //listar tareas pendientes
        tareas.listarPendientesCompletadas(false);

        break;

      case "5": //completar tareas
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);

        break;

      case "6": //Borrar tarea
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          const ok = await confirmar("¿Esta seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada satisfactoriamente");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
