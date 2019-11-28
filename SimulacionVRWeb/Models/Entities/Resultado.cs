using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Resultado
    {
        public int ResultadoId { get; set; }
        public String R_fechacreacion { get; set; }
        public int ProgramaId { get; set; }
        public int ParticipanteId { get; set; }
        public int R_Duraccion { get; set; }
        public int R_NivelConcentracion { get; set; }
        public int R_Aciertos { get; set; }
        public int R_Fallos { get; set; }

        public Resultado(int resultadoId, string r_fechacreacion, int programaId, int participanteId, int r_Duraccion, int r_NivelConcentracion, int r_Aciertos, int r_Fallos)
        {
            ResultadoId = resultadoId;
            R_fechacreacion = r_fechacreacion;
            ProgramaId = programaId;
            ParticipanteId = participanteId;
            R_Duraccion = r_Duraccion;
            R_NivelConcentracion = r_NivelConcentracion;
            R_Aciertos = r_Aciertos;
            R_Fallos = r_Fallos;
        }

    }

    public class ResultReport
    {
        public int ParticipanteId { get; set; }
        public int R_Aciertos { get; set; }
        public int R_Duraccion { get; set; }
        public int R_Fallos { get; set; }
        public int R_NivelConcentracion { get; set; }
        public String pr_Descripcion { get; set; }
        public String Nombre { get; set; }

        public ResultReport(int participanteId, int r_Aciertos, int r_Duraccion, int r_Fallos, int r_NivelConcentracion, string pr_Descripcion, string nombre)
        {
            ParticipanteId = participanteId;
            R_Aciertos = r_Aciertos;
            R_Duraccion = r_Duraccion;
            R_Fallos = r_Fallos;
            R_NivelConcentracion = r_NivelConcentracion;
            this.pr_Descripcion = pr_Descripcion;
            Nombre = nombre;
        }
    }
}