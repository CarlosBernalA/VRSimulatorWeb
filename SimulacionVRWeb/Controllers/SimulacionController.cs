using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}