import { v4 as uuid4 } from "uuid";

class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = uuid4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

export { Tarea };
