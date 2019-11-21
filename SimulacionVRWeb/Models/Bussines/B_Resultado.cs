using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Resultado
    {
        public DataSet list_ResultsaApi(int TrabajadorID)
        {            
            P_Resultado dao = new P_Resultado();
            DataSet data=  dao.list_ResultsaApi(TrabajadorID);
            return data;
        }
    }
}