using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Rol:Connection
    {
        public List<Rol> list_rol()
        {
            List<Rol> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Rol", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Rol entidad = null;
                    listEntidad = new List<Rol>();
                    while (reader.Read())
                    {
                        entidad = new Rol(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetInt32(3));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public Rol_Result Managment_Rol(Rol _Rol, int Action)
        {
            Rol_Result resu = new Rol_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Rol", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@RolId", SqlDbType.Int).Value = _Rol.rol_RolId;
                    command.Parameters.Add("@rol_Nombre", SqlDbType.VarChar).Value = _Rol.rol_Nombre;
                    command.Parameters.Add("@rol_Descripcion", SqlDbType.VarChar).Value = _Rol.rol_Descripcion;
                    command.Parameters.Add("@rol_Estado", SqlDbType.Int).Value = _Rol.rol_Estado;
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