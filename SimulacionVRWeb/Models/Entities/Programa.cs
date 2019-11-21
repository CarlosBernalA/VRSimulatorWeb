using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Programa
    {
        public int ProgramaId { get; set; }
        public String pr_Descripcion { get; set; }
        public String FechaPrograma { get; set; }
        public String HoraInicio { get; set; }
        public String HoraFin { get; set; }
        public String tr_Nombre { get; set; }
        public String Nombre { get; set; }
        public int SimulacionId { get; set; }
        public int LocalId { get; set; }
        public String FechaInicio{ get; set; }
        public String FechaFin { get; set; }

        public Programa(int ProgramaId, String pr_Descripcion, String FechaPrograma, String HoraInicio, String HoraFin, String tr_Nombre, String Nombre, int SimulacionId, int LocalId)
        {
            this.ProgramaId = ProgramaId;
            this.pr_Descripcion = pr_Descripcion;
            this.FechaPrograma = FechaPrograma;
            this.HoraInicio = HoraInicio;
            this.HoraFin = HoraFin;
            this.tr_Nombre = tr_Nombre;
            this.Nombre = Nombre;
            this.SimulacionId = SimulacionId;
            this.LocalId = LocalId;
        }
        public Programa(String FechaInicio, String FechaFin)
        {
            this.FechaInicio = FechaInicio;
            this.FechaFin = FechaFin;
        }
    }
    public class Programa_S
    {
        public int ProgramaId { get; set; }
        public String pr_Descripcion { get; set; }
        public String FechaPrograma { get; set; }
        public String HoraInicio { get; set; }
        public String HoraFin { get; set; }
        public String tr_Nombre { get; set; }
        public String Nombre { get; set; }
        public int SimulacionId { get; set; }
        public int LocalId { get; set; }
        public int Action { get; set; }
    }
    public class Programa_S_C
    {
        public String FechaInicio { get; set; }
        public String FechaFin { get; set; }
    }
    public class Programa_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
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