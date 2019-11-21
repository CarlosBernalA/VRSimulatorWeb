using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Resultado : Connection
    {
        public DataSet list_ResultsaApi(int TrabajadorID)
        {
            DataSet dts = new DataSet();
            List<ResultReport> listEntidad = new List<ResultReport>();
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Report_Participante", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@TrabajadorId", SqlDbType.Int).Value = TrabajadorID;
                SqlDataAdapter adapter = new SqlDataAdapter(command);
                adapter.Fill(dts);
                //SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                //if (reader.HasRows)
                //{
                //    ResultReport entidad = null;
                //    listEntidad = new List<ResultReport>();
                //    while (reader.Read())
                //    {
                //        entidad = new ResultReport(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2), reader.GetInt32(3), reader.GetInt32(4), reader.GetString(5), reader.GetString(6));
                //        listEntidad.Add(entidad);
                //    }
                //}
                //reader.Close();
                connection.Close();
            }
            return dts;
        }
    }
}