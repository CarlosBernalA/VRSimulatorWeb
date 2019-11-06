using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace SimulacionVRWeb.Models.Persistent
{
    public class Connection
    {
        public static string cadena { get; set; }

        public Connection()
        {
            cadena = ConfigurationManager.ConnectionStrings["VR_CONECTION"].ConnectionString;
        }
    }
}