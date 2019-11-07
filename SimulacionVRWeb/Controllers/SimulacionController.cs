using SimulacionVRWeb.Models.Bussines;
using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SimulacionVRWeb.Controllers
{
    public class SimulacionController : Controller
    {
        // GET: Simulacion
        public ActionResult Simulacion()
        {
            return View();
        }
        public ActionResult TipoSimulacion()
        {
            return View();
        }

        public String list_tiposimulacion()
        {
            B_TipoSimulacion b_TipoSimulacio = new B_TipoSimulacion();
            List<TipoSimulacion> _list = b_TipoSimulacio.list_tiposimulacion();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }

        public String Managment_TipoSimulacion(TipoSimulacion_S _TipoSimulacion)
        {
            B_TipoSimulacion b_TipoSimulacion = new B_TipoSimulacion();
            TipoSimulacion_Result a = b_TipoSimulacion.Managment_TipoSimulacion(new TipoSimulacion(_TipoSimulacion.TipoSimulacionId, _TipoSimulacion.ts_Nombre, _TipoSimulacion.ts_Descripticion, _TipoSimulacion.ts_Estado), _TipoSimulacion.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
    }
}