using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Programa
    {

    }
    public class ProgramaApi
    {
        public int ProgramaId { get; set; }
        public String pr_Descripcion { get; set; }
        public int ParticipanteId { get; set; }
        public String FechaPrograma { get; set; }
        public String HoraInicio { get; set; }
        public String HoraFin { get; set; }
        public String si_descripcion { get; set; }
        public String si_GradoRiesgo { get; set; }
        public String si_maxpuntaje { get; set; }
        public String Nombre { get; set; }
        public int SimulacionId { get; set; }

        public ProgramaApi(int programaId, string pr_Descripcion, int participanteId, string fechaPrograma, string horaInicio, string horaFin, string si_descripcion, string si_GradoRiesgo, string si_maxpuntaje, string nombre, int simulacionId)
        {
            ProgramaId = programaId;
            this.pr_Descripcion = pr_Descripcion;
            ParticipanteId = participanteId;
            FechaPrograma = fechaPrograma;
            HoraInicio = horaInicio;
            HoraFin = horaFin;
            this.si_descripcion = si_descripcion;
            this.si_GradoRiesgo = si_GradoRiesgo;
            this.si_maxpuntaje = si_maxpuntaje;
            Nombre = nombre;
            SimulacionId = simulacionId;

        }
    }
}