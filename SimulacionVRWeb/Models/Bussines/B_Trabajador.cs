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
        public Trabajador_Result login(Trabajador _Trabajador)
        {
            P_Trabajador dao = new P_Trabajador();
            Trabajador_Result ar = dao.login(_Trabajador);
            return ar;
        }

        public TrabajadorApi LoginApi(String UserName, String Password)
        {
            P_Trabajador dao = new P_Trabajador();
            TrabajadorApi ar = dao.LoginApi(UserName, Password);
            return ar;
        }
    }
}