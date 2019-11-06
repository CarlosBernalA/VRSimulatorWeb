using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Area
    {
        int AreaId { get; set; }
        String are_Nombre { get; set; }
        String are_Descripcion { get; set; }
        int are_Estado { get; set; }

        public Area(int AreaId, String are_Nombre, String are_Descripcion, int are_Estado)
        {
            this.AreaId = AreaId;
            this.are_Nombre = are_Nombre;
            this.are_Descripcion = are_Descripcion;
            this.are_Estado = are_Estado;
        }
    }
}