using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Trabajador
    {
        public String UserName { get; set; }
        public String Password { get; set; }

        public Trabajador(String UserName, String Password)
        {
            this.UserName = UserName;
            this.Password = Password;
        }
        public class Trabajador_S
        {
            public String UserName { get; set; }
            public String Password { get; set; }
        }
        public class Trabajador_Result
        {
            public int Result { get; set; }
            public String Message { get; set; }
        }
    }
}