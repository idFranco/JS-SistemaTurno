let query;

module.exports = class Query {

    constructor() { }

    loginUser(data) {
        query = `SELECT \`DNI\`, \`Nombre\` FROM usuario WHERE \`Email\` = '${data.email}' AND \`Contraseña\` = '${data.password}'`;
        return query;
    }

    insertUsuario(Element) {
        query = `
        INSERT INTO \`usuario\` (\`DNI\`, \`Nombre\`, \`Apellido\`, \`FNacimiento\`, \`Direccion\`, \`Telefono\`, \`Email\`, \`Contraseña\`) 
        VALUES ('${Element.dni}', '${Element.nombre}', '${Element.apellido}', '${Element.fechaNac}', '${Element.direccion}', '${Element.telefono}', '${Element.email}', '${Element.pass}');
        `;
        return query;
    }

    insertHorario(fecha, hs, dni) {
        query = ` INSERT INTO \`horario\` (\`Fecha\`, \`Horario\`, \`fkDNI\`) VALUES ('${fecha}', '${hs}', '${dni}');`;
        return query;
    }

    selectHorario(fecha) {
        query = `SELECT \`Horario\`, \`Nombre\` FROM horario h JOIN usuario u ON h.\`Fecha\` = '${fecha}' AND h.\`fkDNI\` = u.\`DNI\` ORDER BY h.\`Horario\``;
        return query;
    }

    deleteHorario(fecha, dni){
        query = `DELETE FROM \`horario\` WHERE \`Fecha\` = '${fecha}' AND \`fkDNI\` = '${dni}'`;
        return query;
    }

    getListadoCompleto(dni){
        query = `SELECT \`Fecha\`, \`Horario\` FROM horario WHERE \`fkDNI\` = '${dni}'`;
        return query;
    }

}