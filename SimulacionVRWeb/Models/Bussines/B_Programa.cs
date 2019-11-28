using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Programa
    {
        public List<ProgramaApi> list_ProgramaApi(int TrabajadorID)
        {
            List<ProgramaApi> listEntidad = null;
            P_Programa dao = new P_Programa();
            listEntidad = dao.list_ProgramaApi(TrabajadorID);
            return listEntidad;
        }
        public List<Programa> list_programa(Programa _Programa)
        {
            List<Programa> listEntidad = null;
            P_Programa dao = new P_Programa();
            listEntidad = dao.list_programa(_Programa);
            return listEntidad;
        }
        public Programa_Result Managment_Programa(Programa _Programa, int Action)
        {
            P_Programa dao = new P_Programa();
            Programa_Result ar = dao.Managment_Programa(_Programa, Action);
            return ar;
        }
        public List<Programa_Report> report_programa_cantidad_participantes()
        {
            List<Programa_Report> listEntidad = null;
            P_Programa dao = new P_Programa();
            listEntidad = dao.report_programa_cantidad_participantes();
            return listEntidad;
        }
        public List<Programa_Report> report_programa_cantidad_aciertos_fallos()
        {
            List<Programa_Report> listEntidad = null;
            P_Programa dao = new P_Programa();
            listEntidad = dao.report_programa_cantidad_aciertos_fallos();
            return listEntidad;
        }
    }
}