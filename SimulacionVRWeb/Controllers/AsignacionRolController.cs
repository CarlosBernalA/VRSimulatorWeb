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
    public class AsignacionRolController : Controller
    {
        // GET: AsignacionRol
        public ActionResult AsignacionRol()
        {
            return View();
        }
        public ActionResult Rol()
        {
            return View();
        }

        public String list_rol()
        {
            B_Rol b_Rol = new B_Rol();
            List<Rol> _list = b_Rol.list_rol();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }

        public String Managment_Rol(Rol_S _Rol)
        {
            B_Rol b_Rol = new B_Rol();
            Rol_Result a = b_Rol.Managment_Rol(new Rol(_Rol.rol_RolId, _Rol.rol_Nombre, _Rol.rol_Descripcion, _Rol.rol_Estado), _Rol.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
    }
}