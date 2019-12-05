using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using SimulacionVRWeb.Models.Bussines;
using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebSocketSharp;

namespace SimulacionVRWeb.Controllers
{

    public class VRapiController : ApiController
    {
        [HttpGet]
        [Route("api/v1.0/VR/Login")]
        public HttpResponseMessage Login(String UserName, String Password)
        {
            B_Trabajador bTR = new B_Trabajador();
            TrabajadorApi tr = bTR.LoginApi(UserName, Password);
            return Request.CreateResponse(HttpStatusCode.OK, tr);
        }

        [HttpGet]
        [Route("api/v1.0/VR/Get_Program")]
        public HttpResponseMessage Get_Program(int TrabajadorId)
        {
            B_Programa bTR = new B_Programa();
            List<ProgramaApi> _list = bTR.list_ProgramaApi(TrabajadorId);
            return Request.CreateResponse(HttpStatusCode.OK, _list);

        }

        [HttpGet]
        [Route("api/v1.0/VR/Get_Report_Sesiones")]
        public HttpResponseMessage Get_Report_Sesiones(int TrabajadorId)
        {
            try
            {
                DataSet data = new DataSet();
                DataSet dataNew = new DataSet();
                B_Resultado bTR = new B_Resultado();
                data = bTR.list_ResultsaApi(TrabajadorId);
                dataNew.DataSetName = "data";
                List<temp> _list = Get_Sumulaciones(data);
                foreach (temp item in _list)
                {
                    DataTable table = new DataTable();
                    table.Columns.Add("Aciertos");
                    table.Columns.Add("Fallos");
                    table.Columns.Add("Concentracion");
                    table.Columns.Add("Nombre");
                    string aciertos = data.Tables[0].Compute("Sum(R_Aciertos)", "SimulacionId=" + item.SimulacionId + "").ToString(); ;
                    string fallos = data.Tables[0].Compute("Sum(R_Fallos)", "SimulacionId=" + item.SimulacionId + "").ToString();
                    string concen = data.Tables[0].Compute("Sum(R_NivelConcentracion)", "SimulacionId=" + item.SimulacionId + "").ToString();

                    object[] dato = { aciertos, fallos, concen, item.SimulacionName };
                    table.Rows.Add(dato);
                    table.TableName = item.SimulacionName;
                    dataNew.Tables.Add(table);

                }
                return Request.CreateResponse(HttpStatusCode.OK, dataNew);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }



        }

        [HttpPost]
        [Route("api/v1.0/VR/Get_Insert_Result")]
        public HttpResponseMessage Get_Insert_Result([FromBody] Resultado data)
        {
            P_Resultado res = new P_Resultado();
            String resp = res.InsertResultado(data);
            //TrabajadorApi tr = bTR.LoginApi(UserName, Password);
            return Request.CreateResponse(HttpStatusCode.OK, resp);

        }

        private List<temp> Get_Sumulaciones(DataSet data)
        {
            List<temp> _list = new List<temp>();
            int count = 0;
            if (data.Tables.Count > 0)
            {
                foreach (DataRow item in data.Tables[0].Rows)
                {
                    if (IsCorrect(Convert.ToInt32(item.ItemArray[8])) && count < 3)
                    {
                        int tempID = Convert.ToInt32(item.ItemArray[8]);
                        _list.Add(new temp(tempID, item.ItemArray[7].ToString()));
                        count++;
                    }
                }
            }
            bool IsCorrect(int id)
            {
                bool s = true;
                foreach (temp item in _list)
                {
                    if (item.SimulacionId == id)
                    {
                        s = false;
                    }
                }
                return s;
            }
            return _list;
        }


        //reporte de participantes por sesion
        [HttpGet]
        [Route("api/v1.0/VR/Get_Report_Sesiones_Values")]
        public HttpResponseMessage Get_Report_Sesiones_Values(int TrabajadorId)
        {
            try
            {
                DataSet data = new DataSet();
                DataSet dataNew = new DataSet();
                B_Resultado bTR = new B_Resultado();
                data = bTR.list_ResultsaApi(TrabajadorId);
                dataNew.DataSetName = "data";

                foreach (DataRow item in data.Tables[0].Rows)
                {
                    DataTable table = new DataTable();
                    table.Columns.Add("Aciertos");
                    table.Columns.Add("Fallos");
                    table.Columns.Add("Duracion");
                    table.Columns.Add("Nombre");

                    object[] dato = { item.ItemArray[1].ToString(), item.ItemArray[3].ToString(), item.ItemArray[2].ToString(), item.ItemArray[7].ToString() };
                    table.Rows.Add(dato);
                    table.TableName = item.ItemArray[7].ToString() + "-" + (item.ItemArray[6].ToString().Substring(0, 10));
                    dataNew.Tables.Add(table);
                }
                return Request.CreateResponse(HttpStatusCode.OK, dataNew);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet]
        [Route("api/v1.0/VR/NotificationResult")]
        public HttpResponseMessage NotificationResult()
        {
            HttpContext.Current.AcceptWebSocketRequest(new ResultWebSocketHandler());
            return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
        }

        class ResultWebSocketHandler : WebSocketHandler { 
            public ResultWebSocketHandler()
            {              

            }

            public static WebSocketCollection _notificationSocket = new WebSocketCollection();
            public override void OnOpen()
            {
                _notificationSocket.Add(this);
            }
            public override void OnMessage(String message)
            {
                _notificationSocket.Broadcast(message);
            }
        }

        [HttpPost]
        [Route("api/v1.0/VR/InsertNotification")]
        public HttpResponseMessage InsertNotification([FromBody] tempresult _json)
        {
            //using (var ws = new WebSocket("ws://localhost/VR_Simulator/api/v1.0/VR/NotificationResult"))
            //{
            //    ws.Connect();
            //    ws.Send(_json);
            //}
            String mJson = JsonConvert.SerializeObject(_json,Formatting.Indented);
            ResultWebSocketHandler._notificationSocket.Broadcast(mJson);
            //if (_json.Equals("1"))
            //{
            //    ResultWebSocketHandler._notificationSocket.Broadcast(_json);
            //}
            //else
            //{
            //    ResultWebSocketHandler._notificationSocket.Broadcast(_json);

            //}

            return Request.CreateResponse(HttpStatusCode.OK, _json);
        }

    }

    class temp
    {
        public int SimulacionId { get; set; }
        public String SimulacionName { get; set; }

        public temp(int simulacionId, string simulacionName)
        {
            SimulacionId = simulacionId;
            SimulacionName = simulacionName;
        }
    }

    public class tempresult
    {
        public String SimulacionName { get; set; }
        public String User { get; set; }
        public String Fallos { get; set; }
        public String Aciertos { get; set; } 
        public String Concentracion { get; set; }
        public int State { get; set; }

        public tempresult(String simulacionName, String user, String fallos, String aciertos, String concentracion, int state)
        {
            SimulacionName = simulacionName;
            User = user;
            Fallos = fallos;
            Aciertos = aciertos;
            Concentracion = concentracion;
            State = state;
        }
    }

}