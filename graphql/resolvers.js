import { resolversProyecto } from '../models/proyecto/resolvers.js';
import { resolversUsuario } from '../models/usuario/resolvers.js';
import { resolversAvance } from '../models/avance/resolvers.js';
import { resolverInscripciones } from '../models/inscripcion/resolvers.js';
import { resolversAutenticacion } from '../models/auth/resolvers.js';

export const resolvers = [ resolversProyecto, resolversUsuario, resolversAvance, resolverInscripciones, resolversAutenticacion ];