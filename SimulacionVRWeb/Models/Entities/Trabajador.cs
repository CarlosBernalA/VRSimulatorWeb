using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Trabajador
    {
        public int TrabajadorId { get; set; }
        public int AreaId { get; set; }
        public String tr_DNI { get; set; }
        public String tr_Nombre { get; set; }
        public String tr_Apellidos { get; set; }
        public String tr_FechaNacimiento { get; set; }
        public String tr_Direccion { get; set; }
        public String tr_Sexo { get; set; }
        public String tr_InicioTrabajo { get; set; }
        public int tr_Estado { get; set; }
        public String are_Nombre { get; set; }
        public String UserName { get; set; }
        public String Password { get; set; }

        public Trabajador(int TrabajadorId, String tr_DNI, String tr_Nombre, String tr_Apellidos, String are_Nombre, int AreaId, String tr_InicioTrabajo, String tr_Sexo, String tr_FechaNacimiento, String tr_Direccion, String UserName, String Password, int tr_Estado)
        {
            this.TrabajadorId = TrabajadorId;
            this.tr_DNI = tr_DNI;
            this.tr_Nombre = tr_Nombre;
            this.tr_Apellidos = tr_Apellidos;
            this.are_Nombre = are_Nombre;
            this.AreaId = AreaId;
            this.tr_InicioTrabajo = tr_InicioTrabajo;
            this.tr_Sexo = tr_Sexo;
            this.tr_FechaNacimiento = tr_FechaNacimiento;
            this.tr_Direccion = tr_Direccion;
            this.UserName = UserName;
            this.Password = Password;
            this.tr_Estado = tr_Estado;
        }
        public Trabajador(String UserName, String Password)
        {
            this.UserName = UserName;
            this.Password = Password;
        }
        public class Trabajador_S_login
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