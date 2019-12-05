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

        public String InsertResultado(Resultado data)
        {
            if (data!=null)
            {
                DataSet dts = new DataSet();
                List<ResultReport> listEntidad = new List<ResultReport>();
                using (SqlConnection connection = new SqlConnection(cadena))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Resultados", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@ResultadoId", SqlDbType.Int).Value = 0;
                    command.Parameters.Add("@ProgramaId", SqlDbType.Int).Value = data.ProgramaId;
                    command.Parameters.Add("@TrabajadorID", SqlDbType.Int).Value = data.ParticipanteId;
                    command.Parameters.Add("@R_Duracion", SqlDbType.Int).Value = data.R_Duraccion;
                    command.Parameters.Add("@R_NivelConcentracion", SqlDbType.Float).Value = data.R_NivelConcentracion;
                    command.Parameters.Add("@R_Aciertos", SqlDbType.Float).Value = data.R_Aciertos;
                    command.Parameters.Add("@R_Fallos", SqlDbType.Float).Value = data.R_Fallos;
                    SqlDataAdapter adapter = new SqlDataAdapter(command);
                    adapter.Fill(dts);
                    
                    connection.Close();
                }
                return dts.Tables[0].Rows[0].ItemArray[0].ToString();
            }
            else
            {
                return "";
            }
        }
    }
}