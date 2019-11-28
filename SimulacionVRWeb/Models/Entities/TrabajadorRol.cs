using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class TrabajadorRol
    {
        public int TrabajadorRolId { get; set; }
        public String ad_descripcion { get; set; }
        public int ad_TrabajadorId { get; set; }
        public int RolId { get; set; }
        public int ad_Estado { get; set; }
        public int TrabajadorId { get; set; }
        public String tr_Nombre { get; set; }
        public String tr_Apellidos { get; set; }
        public int roles { get; set; }

        public TrabajadorRol(String ad_descripcion, int TrabajadorId, String tr_Nombre, String tr_Apellidos, int roles)
        {
            this.ad_descripcion = ad_descripcion;
            this.TrabajadorId = TrabajadorId;
            this.tr_Nombre = tr_Nombre;
            this.tr_Apellidos = tr_Apellidos;
            this.roles = roles;
        }

        public TrabajadorRol(int TrabajadorRolId, int RolId, int TrabajadorId, String tr_Nombre, int ad_Estado)
        {
            this.TrabajadorRolId = TrabajadorRolId;
            this.RolId = RolId;
            this.TrabajadorId = TrabajadorId;
            this.tr_Nombre = tr_Nombre;
            this.ad_Estado = ad_Estado;
        }
        public TrabajadorRol(int TrabajadorId)
        {
            this.TrabajadorId = TrabajadorId;
        }
        

    }
    public class TrabajadorRol_S_C
    {
        public int TrabajadorRolId { get; set; }
        public String tr_Nombre { get; set; }
        public int RolId { get; set; }
        public int ad_TrabajadorId { get; set; }
        public int ad_Estado { get; set; }
        public int Action { get; set; }
    }
    public class TrabajadorRol_S
    {
        public int TrabajadorId { get; set; }
    }
    public class TrabajadorRol_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
    }
}