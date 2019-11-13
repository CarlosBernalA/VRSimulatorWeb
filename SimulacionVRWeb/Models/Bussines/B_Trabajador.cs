using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static SimulacionVRWeb.Models.Entities.Trabajador;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Trabajador
    {
        public List<Trabajador> list_trabajador()
        {
            List<Trabajador> listEntidad = null;
            P_Trabajador dao = new P_Trabajador();
            listEntidad = dao.list_trabajador();
            return listEntidad;
        }
        public Trabajador_Result Managment_Trabajador(Trabajador _Trabajador, int Action)
        {
            P_Trabajador dao = new P_Trabajador();
            Trabajador_Result ar = dao.Managment_Trabajador(_Trabajador, Action);
            return ar;
        }
        public Trabajador_Result login(Trabajador _Trabajador)
        {
            P_Trabajador dao = new P_Trabajador();
            Trabajador_Result ar = dao.login(_Trabajador);
            return ar;
        }
    }
}