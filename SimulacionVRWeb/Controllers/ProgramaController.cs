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
    public class ProgramaController : Controller
    {
        // GET: Programa
        public ActionResult Programa()
        {
            return View();
        }
        public String list_programa(Programa_S_C _Programa)
        {
            B_Programa b_Programa = new B_Programa();
            List<Programa> _list = b_Programa.list_programa(new Programa(_Programa.FechaInicio, _Programa.FechaFin));
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
    }
}