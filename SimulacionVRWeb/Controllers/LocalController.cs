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
    public class LocalController : Controller
    {
        // GET: Local
        public ActionResult Local()
        {
            return View();
        }

        public String list_local()
        {
            B_Local b_Local = new B_Local();
            List<Local> _list = b_Local.list_local();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }

        public String Managment_Local(Local_S _Local)
        {
            B_Local b_Local = new B_Local();
            Local_Result a = b_Local.Managment_Local(new Local(_Local.LocalId, _Local.Lc_nombre, _Local.LC_Descripcion, _Local.Lc_Direccion, _Local.Lc_Aforo, _Local.Lc_Estado), _Local.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;

        }
    }
}