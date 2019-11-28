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
    public class P_Trabajador : Connection
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
        public Trabajador_Result Managment_Trabajador(Trabajador _Trabajador, int Action)
        {
            Trabajador_Result resu = new Trabajador_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Trabajador", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@TrabajadorId", SqlDbType.Int).Value = _Trabajador.TrabajadorId;
                    command.Parameters.Add("@AreaId", SqlDbType.Int).Value = _Trabajador.AreaId;
                    command.Parameters.Add("@tr_DNI", SqlDbType.VarChar).Value = _Trabajador.tr_DNI;
                    command.Parameters.Add("@tr_Nombre", SqlDbType.VarChar).Value = _Trabajador.tr_Nombre;
                    command.Parameters.Add("@tr_Apellidos", SqlDbType.VarChar).Value = _Trabajador.tr_Apellidos;
                    command.Parameters.Add("@tr_FechaNacimiento", SqlDbType.Date).Value = _Trabajador.tr_FechaNacimiento;
                    command.Parameters.Add("@tr_Direccion", SqlDbType.VarChar).Value = _Trabajador.tr_Direccion;
                    command.Parameters.Add("@tr_sexo", SqlDbType.VarChar).Value = _Trabajador.tr_Sexo;
                    command.Parameters.Add("@tr_InicioTrabajo", SqlDbType.Date).Value = _Trabajador.tr_InicioTrabajo;
                    command.Parameters.Add("@tr_Estado", SqlDbType.Int).Value = _Trabajador.tr_Estado;
                    command.Parameters.Add("@UserName", SqlDbType.VarChar).Value = _Trabajador.UserName;
                    command.Parameters.Add("@Password", SqlDbType.VarChar).Value = _Trabajador.Password;
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

        public TrabajadorApi LoginApi(String UserName, String Password)
        {
            TrabajadorApi resu = new TrabajadorApi();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {

                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Login_Participante", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@UserName", SqlDbType.VarChar).Value = UserName;
                    command.Parameters.Add("@Password", SqlDbType.VarChar).Value = Password;
                    SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                    if (reader.HasRows)
                    {

                        if (reader.Read())
                        {
                            resu = new TrabajadorApi(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3));

                        }
                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    resu.tr_Apellidos = e.Message;
                    connection.Close();
                }
            }
            return resu;
        }
        public List<Rpt_Trabajador> report_puntaje_trabajador()
        {
            List<Rpt_Trabajador> listEntidad = new List<Rpt_Trabajador>();
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Report_Puntaje_Trabajador", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Rpt_Trabajador entidad = null;
                    listEntidad = new List<Rpt_Trabajador>();
                    while (reader.Read())
                    {
                        entidad = new Rpt_Trabajador(reader.GetString(0), reader.GetString(1), reader.GetInt32(2), reader.GetInt32(3), reader.GetInt32(4), reader.GetString(5));

                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

    }
}