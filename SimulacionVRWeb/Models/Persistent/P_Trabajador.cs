using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static SimulacionVRWeb.Models.Entities.Trabajador;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Trabajador:Connection
    {
        public List<Trabajador> list_trabajador()
        {
            List<Trabajador> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Trabajador", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Trabajador entidad = null;
                    listEntidad = new List<Trabajador>();
                    while (reader.Read())
                    {
                        entidad = new Trabajador(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetInt32(5), Convert.ToString(reader.GetDateTime(6)), reader.GetString(7), Convert.ToString(reader.GetDateTime(8)), reader.GetString(9), reader.GetString(10), reader.GetString(11), reader.GetInt32(12));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }
        public Trabajador_Result login(Trabajador _Trabajador)
        {
            Trabajador_Result resu = new Trabajador_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Login_Administrator", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@UserName", SqlDbType.VarChar).Value = _Trabajador.UserName;
                    command.Parameters.Add("@Password", SqlDbType.VarChar).Value = _Trabajador.Password;
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