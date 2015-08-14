'use strict';

//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',  
		password: '', 
		database: 'db.diplomado'
	}
);

connection.connect(function(err){
  if(err){
    console.log('Error al conectar la DB');
    return;
  }
  console.log('Conexion correcta');
});


//creamos un objeto para ir almacenando todo lo que necesitemos
var insigniaModel = {};
 
//obtenemos todos los usuarios
insigniaModel.getInsignias = function(callback){

	if (connection) {
		connection.query('SELECT * FROM mdl_user;', function(error, rows) {
			if(error){
				throw error;
			} else {
				callback(null, rows);
			}
		});
	}
}
 
//obtenemos un usuario por su id
insigniaModel.getInsigniaID = function(id, callback){
	if (connection) {
		var sql = 'SELECT * FROM employees WHERE EmployeeID = ' + connection.escape(id);
		connection.query(sql, function(error, row) {
			if(error) {
				throw error;
			} else {
				callback(null, row);
			}
		});
	}
}
 
 
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = insigniaModel;



function queryAll(){
	return "SELECT CONCAT(MU.firstname,' ', MU.lastname) AS NomComp, MU.email AS Email " +
"	, IDC.data AS Correo2, MU.phone1 AS Tel1, MU.phone2 AS Tel2, IDE.data AS Estado, IDCT.data AS CentTrab " +
"    , IDNV.data AS NivelCT, SUM(MGG.finalgrade *  MGI.aggregationcoef) AS CalifObt " +
"    , MC.fullname AS Diplomado, FROM_UNIXTIME(MC.startdate) AS FechaApertura, IFNULL(qTotal.total, 0) AS tTotal " +
"    , IFNULL(qBRONCE.bronce, 'NO') as Bronce, IFNULL(qPLATA.plata, 'NO') as Plata, IFNULL(qORO.oro, 'NO') as Oro " +
"    , IFNULL(qPLATINO.platino, 'NO') as Platino, IFNULL(qBIRRETE.birrete, 'NO') as Birrete, IFNULL(qMOUSE.mouse, 'NO') as Mouse " +
"FROM mdl_role  MR " +
"INNER JOIN mdl_role_assignments MRASS ON (MRASS.roleid = MR.id) " +
"INNER JOIN mdl_user MU ON (MRASS.userid = MU.id ) " +
"INNER JOIN mdl_user_info_data IDC ON (IDC.userid = MU.id AND IDC.fieldid = 7) " +
"INNER JOIN mdl_user_info_data IDE ON (IDE.userid = MU.id AND IDE.fieldid = 10) " +
"INNER JOIN mdl_user_info_data IDCT ON (MU.id = IDCT.userid AND IDCT.fieldid  = 18) " +
"INNER JOIN mdl_user_info_data IDNV ON (MU.id = IDNV.userid AND IDNV.fieldid  = 24) " +
"INNER JOIN mdl_grade_grades MGG ON (MGG.userid = MU.id) " +
"INNER JOIN mdl_grade_items MGI ON (MGI.id = MGG.itemid) " +
"INNER JOIN mdl_course MC ON (MC.id = MGI.courseid) " +
"LEFT JOIN (SELECT MBI.userid, MB.name AS platino, MB.courseid FROM mdl_badge_issued MBI " +
"			INNER JOIN mdl_badge MB ON (MB.id = MBI.badgeid AND MB.name like '%platino%') " +
"	)qPLATINO ON (qPLATINO.userid =mu.id AND qPLATINO.courseid = MC.id ) " +
"LEFT JOIN (SELECT MBI.userid, MB.name AS oro, MB.courseid FROM mdl_badge_issued MBI " +
"			INNER JOIN mdl_badge MB ON (MB.id = MBI.badgeid AND MB.name like '%oro%') " +
"	)qORO ON (qORO.userid=mu.id AND qORO.courseid = MC.id) " +
"LEFT JOIN (SELECT MBI.userid, MB.name AS plata, MB.courseid FROM mdl_badge_issued MBI " +
"			INNER JOIN mdl_badge MB ON (MB.id = MBI.badgeid AND MB.name like '%plata%') " +
"	)qPLATA ON (qPLATA.userid =mu.id AND qPLATA.courseid = MC.id) " +
"LEFT JOIN (SELECT MBI.userid, MB.name AS bronce, MB.courseid FROM mdl_badge_issued MBI " +
"			INNER JOIN mdl_badge MB ON (MB.id = MBI.badgeid AND MB.name like '%bronce%') " +
"	)qBRONCE ON (qBRONCE.userid =mu.id AND qBRONCE.courseid = MC.id)" +
"LEFT JOIN (SELECT MBI.userid, MB.name AS birrete, MB.courseid FROM mdl_badge_issued MBI " +
"			INNER JOIN mdl_badge MB ON (MB.id = MBI.badgeid AND MB.name like '%birrete%') " +
"	)qBIRRETE ON (qBIRRETE.userid =mu.id AND qBIRRETE.courseid = MC.id) " +
"LEFT JOIN (SELECT MBI.userid, MB.name AS mouse, MB.courseid FROM mdl_badge_issued MBI " +
"			INNER JOIN mdl_badge MB ON (MB.id = MBI.badgeid AND MB.name like '%mouse%') " +
"	)qMOUSE ON (qMOUSE.userid =mu.id AND qMOUSE.courseid = MC.id) " +
"LEFT JOIN (SELECT MBI.userid, MB.courseid, COUNT(MBI.badgeid) AS total FROM mdl_course MC " +
"			INNER JOIN mdl_badge MB ON (MB.courseid = MC.id) " +
"			INNER JOIN  mdl_badge_issued MBI ON (MBI.badgeid = MB.id) " +
"			GROUP BY MBI.userid " +
"	)qTotal ON (qTotal.userid =mu.id AND qTotal.courseid = MC.id) " +
"WHERE MRASS.roleid = 5 AND MGI.itemtype = 'mod' " +
"GROUP BY MGG.userid ORDER BY MGG.userid;"
}