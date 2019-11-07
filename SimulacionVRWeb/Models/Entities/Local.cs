using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Local
    {
        public int LocalId { get; set; }
        public String Lc_nombre { get; set; }
        public String LC_Descripcion { get; set; }
        public String Lc_Direccion { get; set; }
        public int Lc_Aforo { get; set; }
        public int Lc_Estado { get; set; }

        public Local(int LocalId, String Lc_nombre, String LC_Descripcion, String Lc_Direccion, int Lc_Aforo, int Lc_Estado)
        {
            this.LocalId = LocalId;
            this.Lc_nombre = Lc_nombre;
            this.LC_Descripcion = LC_Descripcion;
            this.Lc_Direccion = Lc_Direccion;
            this.Lc_Aforo = Lc_Aforo;
            this.Lc_Estado = Lc_Estado;
        }
    }

    public class Local_S
    {
        public int LocalId { get; set; }
        public String Lc_nombre { get; set; }
        public String LC_Descripcion { get; set; }
        public String Lc_Direccion { get; set; }
        public int Lc_Aforo { get; set; }
        public int Lc_Estado { get; set; }
        public int Action { get; set; }
    }
    public class Local_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
    }
}