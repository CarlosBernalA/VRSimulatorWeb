using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Entities
{
    public class Participante
    {
        public int ParticipanteId { get; set; }
        public int TrabajadorId { get; set; }
        public int ProgramaId { get; set; }
        public String tr_Nombre { get; set; }
        public String tr_Apellidos { get; set; }
        public String are_Nombre { get; set; }
        public int Estado { get; set; }

        public Participante(int ParticipanteId, int Estado, int TrabajadorId, String tr_Nombre, String tr_Apellidos, String are_Nombre)
        {
            this.Estado = Estado;
            this.ParticipanteId = ParticipanteId;
            this.TrabajadorId = TrabajadorId;
            this.tr_Nombre = tr_Nombre;
            this.tr_Apellidos = tr_Apellidos;
            this.are_Nombre = are_Nombre;
        }
        public Participante(int ParticipanteId, int TrabajadorId, int ProgramaId, int Estado)
        {
            this.ParticipanteId = ParticipanteId;
            this.TrabajadorId = TrabajadorId;
            this.ProgramaId = ProgramaId;
            this.Estado = Estado;
        }
        public Participante(int ProgramaId)
        {
            this.ProgramaId = ProgramaId;
        }
    }
    public class Participante_S
    {
        public int ProgramaId { get; set; }
    }
    public class Participante_S_C
    {
        public int ParticipanteId { get; set; }
        public int TrabajadorId { get; set; }
        public int ProgramaId { get; set; }
        public int Estado { get; set; }
        public int Action { get; set; }
    }

    public class Participante_Result
    {
        public int Result { get; set; }
        public String Message { get; set; }
    }
}