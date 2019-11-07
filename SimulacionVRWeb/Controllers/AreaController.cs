using System.Text;
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
    public class AreaController : Controller
    {
        // GET: Area
        public ActionResult Area()
        {
            return View();
        }

        public String list_area()
        {
            B_Area b_Area = new B_Area();
            List<Area> _list = b_Area.list_area();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }

        public String Managment_Area(Area_S _area)
        {
            B_Area b_Area = new B_Area();
            Area_Result a = b_Area.Managment_Area(new Area(_area.AreaId, _area.are_Nombre, _area.are_Descripcion, _area.are_Estado), _area.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
    }
}