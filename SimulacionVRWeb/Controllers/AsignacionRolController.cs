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
        public String list_trabajadorrol()
        {
            B_TrabajadorRol b_TrabajadorRol = new B_TrabajadorRol();
            List<TrabajadorRol> _list = b_TrabajadorRol.list_trabajadorrol();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
        public String roler_trabajador(TrabajadorRol_S _TrabajadorRol)
        {
            B_TrabajadorRol b_TrabajadorRol = new B_TrabajadorRol();
            List<TrabajadorRol> _list = b_TrabajadorRol.roler_trabajador(new TrabajadorRol(_TrabajadorRol.TrabajadorId));
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
        public String Managment_TrabajadorRol(TrabajadorRol_S_C _TrabajadorRol)
        {
            B_TrabajadorRol b_TrabajadorRol = new B_TrabajadorRol();
            TrabajadorRol_Result a = b_TrabajadorRol.Managment_TrabajadorRol(new TrabajadorRol(_TrabajadorRol.TrabajadorRolId, _TrabajadorRol.RolId, _TrabajadorRol.ad_TrabajadorId, _TrabajadorRol.tr_Nombre, _TrabajadorRol.ad_Estado), _TrabajadorRol.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
    }
}