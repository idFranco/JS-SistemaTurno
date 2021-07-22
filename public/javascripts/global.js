var nameUser;
var dniUser;
var thisDay;
var thisHour;
var thisOption;
var persona = [];
var listadoTabla = [];
var listadoHs = [];
var listadoCompleto = [];

let altUser = {
    dni: '',
    nombre: '',
    apellido: '',
    fechaNac: '',
    direccion: '',
    telefono: '',
    email: '',
    pass: ''
};

let listHs = {
    horario: '',
    estado: '',
    opcion: ''
};

let altHs = {
    horario: '',
    nombre: ''
};

let listaCompleta = {
    fecha: '',
    horario: ''
};

function Usuario(dni, nombre, apellido, fechaNac, direccion, telefono, email, pass) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNac = fechaNac;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.pass = pass;
}

function Listado(horario, estado, opcion) {
    this.horario = horario;
    this.estado = estado;
    this.opcion = opcion;
};

function Horario(horario, nombre) {
    this.horario = horario;
    this.nombre = nombre;
};

function lCompleta(fecha, horario) {
    this.fecha = fecha;
    this.horario = horario;
};


function checkUser() {
    let bandUser = 0;
    listadoHs.forEach(Element => {
        if (Element.nombre === nameUser) {
            bandUser = 1;
        }
    });
    return bandUser;
}

module.exports = class Global {

    constructor() { }

    User(op, nUser) {

        if (op === "Set") {
            nameUser = nUser
        } else {
            return nameUser;
        }
    }

    Dni(op, nDni) {

        if (op === "Set") {
            dniUser = nDni
        } else {
            return dniUser;
        }
    }

    Date(op, day) {

        if (op === "Set") {
            thisDay = day
        } else {
            if (thisDay == undefined) {
                thisDay = this.toDay();
            }
            return thisDay;
        }
    }

    Hour(op, hour) {

        if (op === "Set") {
            thisHour = hour
        } else {
            return thisHour;
        }
    }

    Option(op, option) {

        if (op === "Set") {
            thisOption = option
        } else {
            return thisOption;
        }
    }

    toDay() {

        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let dateToDay;

        if (day < 10) {
            day = `0${day}`;
        };
        if (month < 10) {
            month = `0${month}`;
        }

        dateToDay = year + '-' + month + '-' + day;
        return dateToDay;

    }

    checkItem(body) {

        persona = [];
        let dni, nom, ape, fNac, dir, tel, email, pass, checkPass;
        let error = '';

        for (i = 0; i < 9; i++) {
            switch (i) {
                case 0:
                    (body.dni != '') ? dni = body.dni : error = "<span>Faltante de información: ingrese su número de documento</span>";
                    break;
                case 1:
                    (body.nombre != '') ? nom = body.nombre : error = "<span>Faltante de información: ingrese su nombre</span>";
                    break;
                case 2:
                    (body.apellido != '') ? ape = body.apellido : error = "<span>Faltante de información: ingrese su apellido</span>";
                    break;
                case 3:
                    (body.fnacimiento != '') ? fNac = body.fnacimiento : error = "<span>Faltante de información: ingrese su fecha de nacimiento</span>";
                    break;
                case 4:
                    (body.direccion != '') ? dir = body.direccion : error = "<span>Faltante de información: ingrese su domicilio</span>";
                    break;
                case 5:
                    (body.telefono != '') ? tel = body.telefono : error = "<span>Faltante de información: ingrese su número telefónico</span>";
                    break;
                case 6:
                    (body.email != '') ? email = body.email : error = "<span>Faltante de información: ingrese su email</span>";
                    break;
                case 7:
                    (body.password != '') ? pass = body.password : error = "<span>Faltante de información: ingrese su contraseña</span>";
                    break;
                case 8:
                    (body.passwordrep != '') ? checkPass = body.passwordrep : error = "<span>Faltante de información: no se ingreso el chequeo de la contraseña</span>";
                    break;
                default:
                    error = 'No se pudo procesar la solicitud. Vuelva a intentarlo';
            }
            if (error != '') { break; }

        }

        if (error === '') {
            altUser = new Usuario(dni, nom, ape, fNac, dir, tel, email, pass)
            persona.push(altUser);
        }

        return error;
    }

    getPersona() {
        return persona;
    }

    setHorario(result) {
        listadoHs = [];
        let count = 0;
        result.forEach(Element => {
            altHs = new Horario(Element.Horario, Element.Nombre);
            listadoHs.push(altHs);
            count = count + 1;
        });
        return count;
    }

    createTable(count) {
        listadoTabla = [];
        let check = checkUser();

        let i;
        let hora;
        let estado;
        let opcion;
        let hs = 8;
        let b = 0;
        let j = 0;
        let band = 0;

        for (i = 0; i < 17; i++) {

            if (hs < 10 && b === 0) {
                hs = '0' + hs;
            }

            (b === 0) ? hora = hs + ":00" : hora = hs + ":30";

            if (count > 0 && j < count) {
                if (listadoHs[j].horario === hora) {
                    if (listadoHs[j].nombre === nameUser) {
                        estado = nameUser;
                        opcion = "Quitar";
                    } else {
                        estado = "Turno reservado";
                        opcion = "";
                    }
                    j = j + 1;
                    band = 1;
                }
            }

            if (band === 0) {
                estado = "Disponible";
                (check === 0) ? opcion = "Asignar" : opcion = "";
            }
            band = 0;

            if (b != 1) {
                b++;
            } else {
                hs++;
                b = 0;
            };

            listHs = new Listado(hora, estado, opcion);
            listadoTabla.push(listHs);
        }

        return listadoTabla;
    }

    getListaCompleta(result) {

        var fecha, vFecha, format, cFecha;
        

        listadoCompleto = [];
        result.forEach(Element => {          
            listaCompleta = new lCompleta(Element.Fecha.toLocaleDateString(), Element.Horario);
            listadoCompleto.push(listaCompleta);
        });
        return listadoCompleto;
    }

}