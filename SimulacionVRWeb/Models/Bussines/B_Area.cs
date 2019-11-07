using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Area
    {
        //LISTAR AREAS
        public List<Area> list_area()
        {
            List<Area> listEntidad = null;
            P_Area dao = new P_Area();
            listEntidad = dao.list_area();
            return listEntidad;
        }
        //REALIZA MANTENIMIENTO DE DE AREAS
        public Area_Result Managment_Area(Area _area, int Action)
        {            
            P_Area dao = new P_Area();
            Area_Result ar = dao.Managment_Area(_area, Action);
            return ar;
        }
    }
}