using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Rol
    {
        public int rol_RolId { get; set; }
        public String rol_Nombre { get; set; }
        public String rol_Descripcion { get; set; }
        public int rol_Estado { get; set; }

        public Rol(int rol_RolId, String rol_Nombre, String rol_Descripcion, int rol_Estado)
        {
            this.rol_RolId = rol_RolId;
            this.rol_Nombre = rol_Nombre;
            this.rol_Descripcion = rol_Descripcion;
            this.rol_Estado = rol_Estado; 
        }
    }

    public class Rol_S
    {
        public int rol_RolId { get; set; }
        public String rol_Nombre { get; set; }
        public String rol_Descripcion { get; set; }
        public int rol_Estado { get; set; }
        public int Action { get; set; }
    }
    public class Rol_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
    }
}