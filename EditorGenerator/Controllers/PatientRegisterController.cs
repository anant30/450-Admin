
using System;
using System.Collections.Generic;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using DataTables;
using EditorGenerator.Models;

namespace EditorGenerator.Controllers
{
    public class PatientRegisterController : ApiController
    {
        [Route("api/PatientRegister")]
        [HttpGet]
        [HttpPost]
        public IHttpActionResult PatientRegister()
        {
            var request = HttpContext.Current.Request;
            var settings = Properties.Settings.Default;

            using (var db = new Database(settings.DbType, settings.DbConnection))
            {
                // The following statement can be removed after the first run
                // (i.e. the database table has been created). It is a good idea
                // to do this to help improve performance.
                db.Sql(@"CREATE TABLE IF NOT EXISTS `PatientRegister` (
	`id` int(10) NOT NULL auto_increment,
	`token_no` int(10),
	`ohip` numeric(10,0),
	`name` varchar(255),
	`birth_date` date,
	`expiry_date` date,
	`version_code` varchar(255),
	`service_time` time,
	`scan_time` time,
	`wait_time` time,
	`location` int(3),
	`date` date,
    `comment` varchar(255),
	PRIMARY KEY( `id` )
);");

                var response = new Editor(db, "PatientRegister", "id")
                    .Model<PatientRegisterModel>()
                    .Field(new Field("id")
                    .Set(false)
                    .Validator(Validation.NotEmpty())
                    )
                    .Field(new Field("birth_date")
                            .Validator(Validation.DateFormat(Format.DATE_ISO_8601))
                            .GetFormatter(Format.DateSqlToFormat(Format.DATE_ISO_8601))
                            .SetFormatter(Format.DateFormatToSql(Format.DATE_ISO_8601))
                    )
                    .Field(new Field("expiry_date")
                            .Validator(Validation.DateFormat(Format.DATE_ISO_8601))
                            .GetFormatter(Format.DateSqlToFormat(Format.DATE_ISO_8601))
                            .SetFormatter(Format.DateFormatToSql(Format.DATE_ISO_8601))
                    )
                    .Field(new Field("service_time")
                            .Validator(Validation.DateFormat("HH:mm:ss"))
                            .GetFormatter(Format.DateTime("HH:mm:ss", "HH:mm:ss"))
                            .SetFormatter(Format.DateTime("HH:mm:ss", "HH:mm:ss"))
                    )
                    .Field(new Field("scan_time")
                            .Validator(Validation.DateFormat("HH:mm:ss"))
                            .GetFormatter(Format.DateTime("HH:mm:ss", "HH:mm:ss"))
                            .SetFormatter(Format.DateTime("HH:mm:ss", "HH:mm:ss"))
                    )
                    .Field(new Field("wait_time")
                            .Validator(Validation.DateFormat("HH:mm:ss"))
                            .GetFormatter(Format.DateTime("HH:mm:ss", "HH:mm:ss"))
                            .SetFormatter(Format.DateTime("HH:mm:ss", "HH:mm:ss"))
                    )
                    .Field(new Field("date")
                            .Validator(Validation.DateFormat(Format.DATE_ISO_8601))
                            .GetFormatter(Format.DateSqlToFormat(Format.DATE_ISO_8601))
                            .SetFormatter(Format.DateFormatToSql(Format.DATE_ISO_8601))
                    )
                    .Process(request)
                    .Data();

                return Json(response);
            }
        }
    }
}