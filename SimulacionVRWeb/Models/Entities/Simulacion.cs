using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Simulacion
    {
        public int SimulacionId { get; set; }
        public String Nombre { get; set; }
        public int TipoSimulacionId { get; set; }
        public String si_descripcion { get; set; }
        public int si_maxpuntaje { get; set; }
        public int si_GradoRiesgo { get; set; }
        public int si_Estado { get; set; }
        public String ts_Nombre { get; set; }
        

        public Simulacion(int SimulacionId, String Nombre, int TipoSimulacionId, String si_descripcion, int si_maxpuntaje, int si_GradoRiesgo, int si_Estado)
        {
            this.SimulacionId = SimulacionId;
            this.Nombre = Nombre;
            this.TipoSimulacionId = TipoSimulacionId;
            this.si_descripcion = si_descripcion;
            this.si_maxpuntaje = si_maxpuntaje;
            this.si_GradoRiesgo = si_GradoRiesgo;
            this.si_Estado = si_Estado;
        }
        public Simulacion(int SimulacionId, String Nombre, int TipoSimulacionId, String si_descripcion, int si_maxpuntaje, int si_GradoRiesgo, int si_Estado, String ts_Nombre)
        {
            this.SimulacionId = SimulacionId;
            this.Nombre = Nombre;
            this.TipoSimulacionId = TipoSimulacionId;
            this.si_descripcion = si_descripcion;
            this.si_maxpuntaje = si_maxpuntaje;
            this.si_GradoRiesgo = si_GradoRiesgo;
            this.si_Estado = si_Estado;
            this.ts_Nombre = ts_Nombre;
        }
    }

    public class Simulacion_S
    {
        public int SimulacionId { get; set; }
        public String Nombre { get; set; }
        public int TipoSimulacionId { get; set; }
        public String si_descripcion { get; set; }
        public int si_maxpuntaje { get; set; }
        public int si_GradoRiesgo { get; set; }
        public int si_Estado { get; set; }
        public int Action { get; set; }
    }
    public class Simulacion_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
    }
}