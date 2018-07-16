
using DataTables;

namespace EditorGenerator.Models
{
    public class PatientRegisterModel
    {
        public string token_no { get; set; }

        public string ohip { get; set; }

        public string name { get; set; }

        public string birth_date { get; set; }

        public string expiry_date { get; set; }

        public string version_code { get; set; }

        public string service_time { get; set; }

        public string scan_time { get; set; }

        public string wait_time { get; set; }

        public string location { get; set; }

        public string date { get; set; }

        public string comment { get; set; }
    }
}