using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_TipoSimulacion
    {
        public List<TipoSimulacion> list_tiposimulacion()
        {
            List<TipoSimulacion> listEntidad = null;
            P_TipoSimulacion dao = new P_TipoSimulacion();
            listEntidad = dao.list_tiposimulacion();
            return listEntidad;
        }

        public TipoSimulacion_Result Managment_TipoSimulacion(TipoSimulacion _TipoSimulacion, int Action)
        {
            P_TipoSimulacion dao = new P_TipoSimulacion();
            TipoSimulacion_Result ar = dao.Managment_TipoSimulacion(_TipoSimulacion, Action);
            return ar;
        }
    }
}