using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_TrabajadorRol:Connection
    {
        public List<TrabajadorRol> list_trabajadorrol()
        {
            List<TrabajadorRol> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Trabajdor_by_Rol", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    TrabajadorRol entidad = null;
                    listEntidad = new List<TrabajadorRol>();
                    while (reader.Read())
                    {
                        entidad = new TrabajadorRol(reader.GetString(0), reader.GetInt32(1), reader.GetString(2), reader.GetString(3), reader.GetInt32(4));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<TrabajadorRol> roler_trabajador(TrabajadorRol _TrabajadorRol)
        {
            List<TrabajadorRol> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_RolTrabajdor", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@TrabajadorId", SqlDbType.Int).Value = _TrabajadorRol.TrabajadorId;

                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    TrabajadorRol entidad = null;
                    listEntidad = new List<TrabajadorRol>();
                    while (reader.Read())
                    {
                        entidad = new TrabajadorRol(reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }
        public TrabajadorRol_Result Managment_TrabajadorRol(TrabajadorRol _TrabajadorRol, int Action)
        {
            TrabajadorRol_Result resu = new TrabajadorRol_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_TrabajadorRol", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@ad_descripcion", SqlDbType.VarChar).Value = _TrabajadorRol.tr_Nombre;
                    command.Parameters.Add("@ad_TrabajadorId", SqlDbType.Int).Value = _TrabajadorRol.TrabajadorRolId;
                    command.Parameters.Add("@RolId", SqlDbType.Int).Value = _TrabajadorRol.RolId;
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