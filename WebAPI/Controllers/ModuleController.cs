using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.Data.SqlTypes;
namespace WebAPI.Controllers
        //Controller for Module Object -- CRUD Operations Of Module Table
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        SqlCommand cmd = new SqlCommand();
        private readonly IConfiguration _configuration;
        public ModuleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetAllModules()
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_GetAllModules";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                Console.Write("Error Getting Module Info");
            }

            return new JsonResult(table);
        }
        [HttpGet]
        [Route("List")]
        public JsonResult GetAllModulesList()
        {
            cmd.CommandType = CommandType.Text;
            cmd.CommandText = "SELECT ModuleCode FROM Modules";
            List<string> codes = new List<string>();
            string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        while (myReader.Read())
                        {
                            codes.Add(myReader.GetString(0));
                        }

                        myReader.Close();
                        myCon.Close();
                    }
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                Console.Write("Error Getting Module Info");
            }

            return new JsonResult(codes);
        }
        [HttpGet("{id}")]
        public JsonResult GetModuleById(int id)
        {
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 30;
            cmd.CommandText = "sp_GetAllModulesById";
            cmd.Parameters.Clear();
            SqlParameter paramId = new SqlParameter();
            paramId = new SqlParameter("@id", id);
            cmd.Parameters.Add(paramId);
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
            SqlDataReader myReader;
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Message);
                Console.Write("Error Getting Module Info");
            }

            return new JsonResult(table);
        }
        [HttpPost]
        [Route("AddModule")]
        public JsonResult Post(Module mod)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_InsertModule";
                SqlParameter paramModuleCode = new SqlParameter("@ModuleCode", mod.ModuleCode);
                SqlParameter paramModuleDescription = new SqlParameter("@ModuleDescription", mod.ModuleDescription);
                cmd.Parameters.Add(paramModuleCode);
                cmd.Parameters.Add(paramModuleDescription);
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }
                return new JsonResult("Added Successfully");
            }
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Adding Module");
            }

        }
        [HttpPut]
        [Route("UpdateModule")]
        public JsonResult Put(Module mod)
        {
            try
            {
                string query = @"
                    UPDATE Modules SET
                    ModuleCode = '" + mod.ModuleCode + @"',
                    ModuleDescription = '" + mod.ModuleDescription + @"' WHERE ModuleId='" + mod.ModuleId + "'";
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Updated Successfully");
            }
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Updating Module");
            }
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                //Deleting dependant data before deleting primary data
                SqlCommand cmd2 = new SqlCommand();
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "DELETE FROM Teacher_Modules WHERE ModuleId ='" + id + "'";
                cmd2.CommandType = CommandType.Text;
                cmd2.CommandText = "DELETE FROM Student_Modules WHERE ModuleId ='" + id + "'";
                using (SqlConnection myCon = new SqlConnection(_configuration.GetConnectionString("SchoolAppCon")))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    cmd2.Connection = myCon;
                    cmd.ExecuteNonQuery();
                    cmd2.ExecuteNonQuery();
                    myCon.Close();
                }
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 30;
                cmd.CommandText = "sp_DeleteModule";
                cmd.Parameters.Clear();
                SqlParameter paramId = new SqlParameter();
                paramId = new SqlParameter("@id", id);
                cmd.Parameters.Add(paramId);
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Deleted Successfully");
            }
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Deleting Module");
            }
        }

    }
}


