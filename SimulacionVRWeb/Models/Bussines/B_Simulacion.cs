using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Simulacion
    {
        public List<Simulacion> list_simulacion()
        {
            List<Simulacion> listEntidad = null;
            P_Simulacion dao = new P_Simulacion();
            listEntidad = dao.list_simulacion();
            return listEntidad;
        }

        public Simulacion_Result Managment_Simulacion(Simulacion _Simulacion, int Action)
        {
            P_Simulacion dao = new P_Simulacion();
            Simulacion_Result ar = dao.Managment_Simulacion(_Simulacion, Action);
            return ar;
        }
    }
}