using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Local : Connection
    {
        public List<Local> list_local()
        {
            List<Local> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Local", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Local entidad = null;
                    listEntidad = new List<Local>();
                    while (reader.Read())
                    {
                        entidad = new Local(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetInt32(4), reader.GetInt32(5));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public Local_Result Managment_Local(Local _Local, int Action)
        {
            Local_Result resu = new Local_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Local", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@LocalId", SqlDbType.Int).Value = _Local.LocalId;
                    command.Parameters.Add("@Lc_nombre", SqlDbType.VarChar).Value = _Local.Lc_nombre;
                    command.Parameters.Add("@Lc_Descripcion", SqlDbType.VarChar).Value = _Local.LC_Descripcion;
                    command.Parameters.Add("@Lc_Direccion", SqlDbType.VarChar).Value = _Local.Lc_Direccion;
                    command.Parameters.Add("@Lc_Aforo", SqlDbType.Int).Value = _Local.Lc_Aforo;
                    command.Parameters.Add("@Lc_Estado", SqlDbType.Int).Value = _Local.Lc_Estado;
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