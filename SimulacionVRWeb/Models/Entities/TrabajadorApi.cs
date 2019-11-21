using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class TrabajadorApi
    {
        public int TrabajadorId { get; set; }
        public String tr_Nombre { get; set; }
        public String tr_DNI { get; set; }
        public String tr_Apellidos { get; set; }

        public TrabajadorApi(int TrabajadorId,String tr_Nombre, String tr_DNI, String tr_Apellidos)
        {
            this.TrabajadorId = TrabajadorId;
            this.tr_Nombre = tr_Nombre;
            this.tr_DNI = tr_DNI;
            this.tr_Apellidos = tr_Apellidos;
        }

        public TrabajadorApi()
        {
        }
    }
}