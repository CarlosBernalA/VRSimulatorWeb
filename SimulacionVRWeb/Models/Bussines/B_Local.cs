using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Local
    {
        public List<Local> list_local()
        {
            List<Local> listEntidad = null;
            P_Local dao = new P_Local();
            listEntidad = dao.list_local();
            return listEntidad;
        }

        public Local_Result Managment_Local(Local _Local, int Action)
        {
            P_Local dao = new P_Local();
            Local_Result ar = dao.Managment_Local(_Local, Action);
            return ar;
        }
    }
}