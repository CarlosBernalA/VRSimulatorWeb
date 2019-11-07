using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Rol
    {
        public List<Rol> list_rol()
        {
            List<Rol> listEntidad = null;
            P_Rol dao = new P_Rol();
            listEntidad = dao.list_rol();
            return listEntidad;
        }

        public Rol_Result Managment_Rol(Rol _Rol, int Action)
        {
            P_Rol dao = new P_Rol();
            Rol_Result ar = dao.Managment_Rol(_Rol, Action);
            return ar;
        }
    }
}