using SimulacionVRWeb.Models.Bussines;
using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static SimulacionVRWeb.Models.Entities.Trabajador;

namespace SimulacionVRWeb.Controllers
{
    public class TrabajadorController : Controller
    {
        // GET: Trabajador
        public ActionResult Trabajador()
        {
            return View();
        }
        public String login(Trabajador_S _Trabajador)
        {
            B_Trabajador b_Trabajador = new B_Trabajador();
            Trabajador_Result a = b_Trabajador.login(new Trabajador(_Trabajador.UserName, _Trabajador.Password));
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
    }
}