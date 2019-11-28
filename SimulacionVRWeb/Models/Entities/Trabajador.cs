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
        public class Trabajador_S
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
            public int Action { get; set; }
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
        public class Rpt_Trabajador
        {
            public String tr_Nombre { get; set; }
            public String tr_Apellidos { get; set; }
            public int R_Aciertos { get; set; }
            public int R_Fallos { get; set; }
            public int R_NivelConcentracion { get; set; }
            public double puntaje { get; set; }
            public String imagen { get; set; }
            public String sexo { get; set; }
            public Rpt_Trabajador(string tr_Nombre, string tr_Apellidos, int r_Aciertos, int r_Fallos, int r_NivelConcentracion, string Sexo)
            {
                this.tr_Nombre = tr_Nombre;
                this.tr_Apellidos = tr_Apellidos;
                this.R_Aciertos = r_Aciertos;
                this.R_Fallos = r_Fallos;
                this.R_NivelConcentracion = r_NivelConcentracion;
                this.puntaje = (r_Aciertos * 5) + (r_NivelConcentracion / 2);
                if (Sexo.Equals("M"))
                {
                    this.imagen = "https://www.amcharts.com/lib/images/faces/D05.png";
                }
                else
                {
                    this.imagen = "data:image/jpeg;base64,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";
                }


            }

        }
    }
}