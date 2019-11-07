using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class TipoSimulacion
    {
        public int TipoSimulacionId { get; set; }
        public String ts_Nombre { get; set; }
        public String ts_Descripticion { get; set; }
        public int ts_Estado { get; set; }

        public TipoSimulacion(int TipoSimulacionId, String ts_Nombre, String ts_Descripticion, int ts_Estado)
        {
            this.TipoSimulacionId = TipoSimulacionId;
            this.ts_Nombre = ts_Nombre;
            this.ts_Descripticion = ts_Descripticion;
            this.ts_Estado = ts_Estado;
        }
    }

    public class TipoSimulacion_S
    {
        public int TipoSimulacionId { get; set; }
        public String ts_Nombre { get; set; }
        public String ts_Descripticion { get; set; }
        public int ts_Estado { get; set; }
        public int Action { get; set; }
    }
    public class TipoSimulacion_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
    }
}