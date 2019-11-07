using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_TipoSimulacion:Connection
    {
        public List<TipoSimulacion> list_tiposimulacion()
        {
            List<TipoSimulacion> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Tipo_Simulacion", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    TipoSimulacion entidad = null;
                    listEntidad = new List<TipoSimulacion>();
                    while (reader.Read())
                    {
                        entidad = new TipoSimulacion(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetInt32(3));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public TipoSimulacion_Result Managment_TipoSimulacion(TipoSimulacion _TipoSimulacion, int Action)
        {
            TipoSimulacion_Result resu = new TipoSimulacion_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_TipoSimulacion", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@TipoSimulacionId", SqlDbType.Int).Value = _TipoSimulacion.TipoSimulacionId;
                    command.Parameters.Add("@ts_Nombre", SqlDbType.VarChar).Value = _TipoSimulacion.ts_Nombre;
                    command.Parameters.Add("@ts_Descripticion", SqlDbType.VarChar).Value = _TipoSimulacion.ts_Descripticion;
                    command.Parameters.Add("@ts_Estado", SqlDbType.Int).Value = _TipoSimulacion.ts_Estado;
                    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
                    SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                    if (reader.HasRows)
                    {

                        if (reader.Read())
                        {
                            id = reader.GetValue(0).ToString();
                        }
                    }
                    reader.Close();
                    connection.Close();
                    resu.Result = 1;
                    resu.Message = id;
                }
                catch (Exception e)
                {
                    connection.Close();
                    resu.Result = 0;
                    resu.Message = e.Message;
                }
            }
            return resu;
        }
    }
}