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
    }
}