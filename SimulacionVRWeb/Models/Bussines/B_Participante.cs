using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Participante
    {

        public List<Participante> list_participante(Participante _Participante)
        {
            List<Participante> listEntidad = null;
            P_Participante dao = new P_Participante();
            listEntidad = dao.list_participante(_Participante);
            return listEntidad;
        }
        public Participante_Result Managment_Participante(Participante _Participante, int Action)
        {
            P_Participante dao = new P_Participante();
            Participante_Result ar = dao.Managment_Participante(_Participante, Action);
            return ar;
        }
        public List<Rpt_Participante_Aciertos_Fallos> report_participante_aciertos_fallos()
        {
            List<Rpt_Participante_Aciertos_Fallos> listEntidad = null;
            P_Participante dao = new P_Participante();
            listEntidad = dao.report_participante_aciertoss_fallos();
            return listEntidad;
        }
    }
}