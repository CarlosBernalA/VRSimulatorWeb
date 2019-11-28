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

        public String list_simulacion()
        {
            B_Simulacion b_Simulacio = new B_Simulacion();
            List<Simulacion> _list = b_Simulacio.list_simulacion();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }

        public String Managment_Simulacion(Simulacion_S _Simulacion)
        {
            B_Simulacion b_Simulacion = new B_Simulacion();
            Simulacion_Result a = b_Simulacion.Managment_Simulacion(new Simulacion(_Simulacion.SimulacionId, _Simulacion.Nombre, _Simulacion.TipoSimulacionId, _Simulacion.si_descripcion, _Simulacion.si_maxpuntaje, _Simulacion.si_GradoRiesgo, _Simulacion.si_Estado), _Simulacion.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
        public String report_simulacion_aciertoss_fallos()
        {
            B_Simulacion b_Simulacion = new B_Simulacion();
            List<Simulacion_Rpt> _list = b_Simulacion.report_simulacion_aciertoss_fallos();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
    }
}