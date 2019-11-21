using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_TrabajadorRol
    {
        public List<TrabajadorRol> list_trabajadorrol()
        {
            List<TrabajadorRol> listEntidad = null;
            P_TrabajadorRol dao = new P_TrabajadorRol();
            listEntidad = dao.list_trabajadorrol();
            return listEntidad;
        }
        public List<TrabajadorRol> roler_trabajador(TrabajadorRol _TrabajadorRol)
        {
            List<TrabajadorRol> listEntidad = null;
            P_TrabajadorRol dao = new P_TrabajadorRol();
            listEntidad = dao.roler_trabajador(_TrabajadorRol);
            return listEntidad;
        }
        public TrabajadorRol_Result Managment_TrabajadorRol(TrabajadorRol _TrabajadorRol, int Action)
        {
            P_TrabajadorRol dao = new P_TrabajadorRol();
            TrabajadorRol_Result ar = dao.Managment_TrabajadorRol(_TrabajadorRol, Action);
            return ar;
        }
    }
}