using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Area
    {
        public int AreaId { get; set; }
        public String are_Nombre { get; set; }
        public String are_Descripcion { get; set; }
        public int are_Estado { get; set; }

        public Area(int AreaId, String are_Nombre, String are_Descripcion, int are_Estado)
        {
            this.AreaId = AreaId;
            this.are_Nombre = are_Nombre;
            this.are_Descripcion = are_Descripcion;
            this.are_Estado = are_Estado;
        }
    }
    public class Area_S{
        public int AreaId { get; set; }
        public String are_Nombre { get; set; }
        public String are_Descripcion { get; set; }
        public int are_Estado { get; set; }
        public int Action { get; set; }
    }
    public class Area_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
    }
}