using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Resultado
    {
        public List<ResultReport> list_ResultsaApi(int TrabajadorID)
        {
            List<ResultReport> listEntidad = null;
            P_Resultado dao = new P_Resultado();
            listEntidad = dao.list_ResultsaApi(TrabajadorID);
            return listEntidad;
        }
    }
}